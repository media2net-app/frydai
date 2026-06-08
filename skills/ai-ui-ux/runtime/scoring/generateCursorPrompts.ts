import { designGoalLabel } from "../context";
import { getAuditRecord, updateAuditCursorPrompts } from "../db/store";
import type { StoredAuditRecord } from "../db/types";
import type { ScanLogFn } from "../log/types";
import type { CursorPrompt } from "../types";
import { scanSourceCode } from "../scanner/scanSourceCode";
import { buildCursorPromptsRequest, parseCursorPromptsResponse } from "./buildCursorPrompts";

export type GenerateLogFn = ScanLogFn;

const DEFAULT_MODEL = "gpt-4o-mini";

function countTitlesInPartialJson(text: string): number {
  return (text.match(/"title"\s*:/g) ?? []).length;
}

async function callOpenAIStreaming(
  apiKey: string,
  model: string,
  prompt: string,
  onLog: GenerateLogFn,
): Promise<string> {
  onLog(`Verbinding met OpenAI API (${model})…`);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      stream: true,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You generate detailed Cursor Agent prompts for enterprise UI/UX improvements. Respond only with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${errText.slice(0, 200)}`);
  }

  if (!res.body) {
    throw new Error("OpenAI stream body ontbreekt");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let lastTitleCount = 0;
  let lastCharLog = 0;

  onLog("AI stream gestart — wacht op tokens…", "stream");

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

        const titleCount = countTitlesInPartialJson(content);
        if (titleCount > lastTitleCount) {
          lastTitleCount = titleCount;
          onLog(`AI schrijft prompt ${titleCount}…`, "stream");
        } else if (content.length - lastCharLog >= 800) {
          lastCharLog = content.length;
          onLog(`AI stream: ${content.length} tekens ontvangen…`, "stream");
        }
      } catch {
        // skip malformed SSE chunk
      }
    }
  }

  if (!content) {
    throw new Error("Lege LLM response");
  }

  onLog(`AI stream voltooid: ${content.length} tekens`, "success");
  return content;
}

function logRecordAnalysis(record: StoredAuditRecord, onLog: GenerateLogFn) {
  onLog("Rapport ophalen uit SQLite database…");
  onLog(
    `Rapport geladen · ${record.pathname} · score ${record.overallScore}/100 · theme ${record.theme}`,
    "success",
  );
  onLog(
    `Project: ${record.context.productName} · doel: ${designGoalLabel(record.context.designGoal)}`,
  );

  if (record.context.previousSiteUrl) {
    onLog(`Vorige site referentie: ${record.context.previousSiteUrl}`);
  }

  if (record.context.designNotes) {
    onLog(`Design notities: ${record.context.designNotes}`, "detail");
  }

  onLog(
    `DOM snapshot: ${record.snapshot.sections.length} secties · ${record.snapshot.h1Count}× H1 · ${record.snapshot.primaryCtaCount} primaire CTA's · viewport ${record.snapshot.viewport.width}×${record.snapshot.viewport.height}`,
  );

  for (const section of record.snapshot.sections) {
    const headingPreview = section.headings[0]?.text
      ? ` · "${section.headings[0].text.slice(0, 40)}${section.headings[0].text.length > 40 ? "…" : ""}"`
      : "";
    const inventory =
      section.contentSummary && section.contentSummary !== "Geen gestructureerde content gedetecteerd"
        ? ` · inventaris: ${section.contentSummary}`
        : "";
    onLog(
      `  ▸ #${section.label} (${section.id}): ${section.headings.length} headings, ${section.ctas.length} CTAs, ${section.rect.width}×${section.rect.height}px${section.gapToNext != null ? `, gap ${section.gapToNext}px` : ""}${headingPreview}${inventory}`,
      "detail",
    );
  }

  onLog("Audit scores en findings analyseren…");
  for (const cat of record.report.categories) {
    onLog(`  ▸ ${cat.label}: ${cat.score}/100 (${cat.findings.length} findings)`);
    for (const finding of cat.findings) {
      onLog(`      · ${finding}`, "detail");
    }
  }

  if (record.report.quickWins.length > 0) {
    onLog(`${record.report.quickWins.length} quick wins meenemen in prompts:`);
    for (const win of record.report.quickWins) {
      onLog(`  → ${win}`, "detail");
    }
  }

  if (record.context.competitors.length > 0) {
    onLog("Concurrenten benchmark opnemen:");
    for (const c of record.context.competitors) {
      onLog(`  ▸ ${c.name} (${c.url})${c.notes ? ` — ${c.notes}` : ""}`, "detail");
    }
  }

  onLog(
    "Enterprise constraints toepassen: WCAG 2.1 AA, design system, light/dark theme, minimale diff",
  );
  onLog("Bronbestanden koppelen per sectie-id (hero, pricing, capabilities, …)");
}

export async function generateCursorPrompts(
  reportId: string,
  onLog: GenerateLogFn,
  options?: { apiKey?: string; model?: string },
): Promise<{ cursorPrompts: CursorPrompt[]; generatedAt: string }> {
  const apiKey = options?.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY ontbreekt in .env.local");
  }

  const model = options?.model ?? process.env.UI_UX_AUDIT_MODEL ?? DEFAULT_MODEL;
  const record = getAuditRecord(reportId);
  if (!record) {
    throw new Error("Rapport niet gevonden");
  }

  logRecordAnalysis(record, onLog);

  const codeContext =
    record.snapshot.codeContext ?? scanSourceCode(record.snapshot, onLog);

  const llmPrompt = buildCursorPromptsRequest(
    record.snapshot,
    record.report,
    record.context,
    codeContext,
  );
  const estimatedTokens = Math.round(llmPrompt.length / 4);
  onLog(`LLM prompt samengesteld (~${estimatedTokens} tokens, ${llmPrompt.length} tekens)`);

  const minPrompts = Math.max(record.snapshot.sections.length, 5);
  onLog(`AI opdracht: genereer ${minPrompts}–20 gedetailleerde Cursor prompts per element/sectie`);

  const content = await callOpenAIStreaming(apiKey, model, llmPrompt, onLog);

  onLog("JSON response valideren en prompts extraheren…");
  const cursorPrompts = parseCursorPromptsResponse(content);
  onLog(`${cursorPrompts.length} prompts succesvol geparsed`, "success");

  for (const p of cursorPrompts) {
    onLog(
      `  ✓ [${p.priority.toUpperCase()}] ${p.title}${p.sectionId ? ` (#${p.sectionId})` : ""} — ${p.estimatedImpact}`,
      "detail",
    );
  }

  onLog("Opslaan in SQLite database (report_json bijwerken)…");
  const updated = updateAuditCursorPrompts(reportId, cursorPrompts);
  if (!updated?.report.cursorPromptsGeneratedAt) {
    throw new Error("Kon rapport niet bijwerken");
  }

  onLog("Klaar — prompts beschikbaar in overzicht", "success");

  return {
    cursorPrompts: updated.report.cursorPrompts!,
    generatedAt: updated.report.cursorPromptsGeneratedAt,
  };
}
