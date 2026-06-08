import { designGoalLabel } from "../context";
import { saveAuditRecord } from "../db/store";
import type { ScanLogFn } from "../log/types";
import type { AuditProjectContext, AuditReport, PageSnapshot } from "../types";
import { scanSourceCode } from "../scanner/scanSourceCode";
import { buildAuditPrompt } from "./buildPrompt";

const DEFAULT_MODEL = "gpt-4o-mini";

function parseAuditReport(content: string): AuditReport {
  const trimmed = content.trim();
  const jsonStart = trimmed.indexOf("{");
  const jsonEnd = trimmed.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("LLM returned non-JSON response");
  }
  const parsed = JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1)) as AuditReport;
  if (typeof parsed.overallScore !== "number" || !Array.isArray(parsed.categories)) {
    throw new Error("Invalid audit JSON shape");
  }
  return { ...parsed, scannedAt: new Date().toISOString() };
}

function countCategoriesInPartialJson(text: string): number {
  return (text.match(/"score"\s*:/g) ?? []).length;
}

async function callAuditOpenAI(
  apiKey: string,
  model: string,
  prompt: string,
  onLog: ScanLogFn,
): Promise<string> {
  onLog(`OpenAI verbinding (${model})…`);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      stream: true,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a UI/UX auditor. Respond only with valid JSON matching the requested schema.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${errText.slice(0, 200)}`);
  }

  if (!res.body) throw new Error("OpenAI stream body ontbreekt");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let lastScoreCount = 0;
  let lastCharLog = 0;

  onLog("AI analyseert DOM + broncode (clarity, hierarchy, visuals, CTA, positioning)…", "stream");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
        };
        const token = parsed.choices?.[0]?.delta?.content ?? "";
        if (!token) continue;

        content += token;
        const scoreCount = countCategoriesInPartialJson(content);
        if (scoreCount > lastScoreCount) {
          lastScoreCount = scoreCount;
          onLog(`AI scoort categorie ${scoreCount}…`, "stream");
        } else if (content.length - lastCharLog >= 600) {
          lastCharLog = content.length;
          onLog(`AI response: ${content.length} tekens…`, "stream");
        }
      } catch {
        // skip malformed chunk
      }
    }
  }

  if (!content) throw new Error("Lege LLM response");
  onLog(`AI analyse voltooid (${content.length} tekens)`, "success");
  return content;
}

export async function runAudit(
  snapshot: PageSnapshot,
  context: AuditProjectContext,
  onLog: ScanLogFn,
  options?: { apiKey?: string; model?: string },
): Promise<{ id: string; report: AuditReport }> {
  const apiKey = options?.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY ontbreekt in .env.local");

  const model = options?.model ?? process.env.UI_UX_AUDIT_MODEL ?? DEFAULT_MODEL;

  onLog("AI audit fase gestart…");
  onLog(`Product: ${context.productName} · ${designGoalLabel(context.designGoal)}`);
  onLog(
    `Snapshot: ${snapshot.sections.length} secties · score-input uit DOM · theme ${snapshot.theme}`,
  );

  if (context.competitors.length > 0) {
    onLog(
      `Benchmark concurrenten: ${context.competitors.map((c) => c.name).join(", ")}`,
      "detail",
    );
  }

  const codeContext = scanSourceCode(snapshot, onLog);
  const snapshotWithCode = { ...snapshot, codeContext };

  const prompt = buildAuditPrompt(snapshotWithCode, context, codeContext);
  onLog(`Audit prompt samengesteld (~${Math.round(prompt.length / 4)} tokens)`, "success");
  onLog(
    `DOM + broncode: ${codeContext.componentFiles.length} components · ${codeContext.styleFiles.length} CSS · copy ${codeContext.copySource ? "ja" : "nee"}`,
    "detail",
  );

  const content = await callAuditOpenAI(apiKey, model, prompt, onLog);

  onLog("Scores en findings valideren…");
  const report = parseAuditReport(content);
  onLog(`Overall score: ${report.overallScore}/100`, "success");

  for (const cat of report.categories) {
    onLog(`  ▸ ${cat.label}: ${cat.score}/100`, "detail");
    for (const f of cat.findings.slice(0, 2)) {
      onLog(`      · ${f}`, "detail");
    }
  }

  if (report.quickWins.length > 0) {
    onLog(`${report.quickWins.length} quick wins geïdentificeerd`);
  }

  onLog("Opslaan in SQLite database…");
  const record = saveAuditRecord(snapshotWithCode, report, context);
  onLog(`Rapport opgeslagen: ${record.id}`, "success");
  onLog("Doorsturen naar scan overzicht…", "success");

  return { id: record.id, report: record.report };
}
