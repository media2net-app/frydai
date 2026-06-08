import { GLOBAL_STYLE_FILES, SECTION_SOURCE_MAP } from "../scanner/sectionSourceMap";
import type { AuditProjectContext, AuditReport, CodeContext, CursorPrompt, PageSnapshot } from "../types";
import { FACTUAL_ACCURACY_RULES } from "./factualAccuracy";

const CURSOR_PROMPTS_SCHEMA = `{
  "cursorPrompts": [
    {
      "id": string (kebab-case, unique),
      "title": string (kort, Nederlands),
      "sectionId": string | null,
      "elements": string[] (concrete DOM elementen: headings, CTAs, spacing),
      "priority": "critical" | "high" | "medium",
      "category": "clarity" | "hierarchy" | "visuals" | "cta" | "positioning",
      "estimatedImpact": string (bijv. "+4 clarity, +2 CTA"),
      "prompt": string (volledige Cursor Agent prompt, Nederlands, copy-paste klaar)
    }
  ]
}`;

const ENTERPRISE_CONSTRAINTS = [
  "## Enterprise-omgeving (verplicht in elke prompt)",
  "Dit is een productie-grade enterprise marketing website (B2B SaaS / AI operator). Elke Cursor-prompt MOET expliciet eisen:",
  "",
  "1. Stack: Next.js 16 App Router, React, TypeScript, bestaande CSS-variabelen en theme tokens (data-theme light/dark).",
  "2. Minimale diff: Alleen relevante bestanden aanpassen; geen over-engineering of unrelated refactors.",
  "3. Design system: Hergebruik bestaande patronen (GlassCard, section padding, eyebrow labels, CTA-varianten). Geen one-off inline styles.",
  "4. Toegankelijkheid: WCAG 2.1 AA — contrast, focus states, semantische HTML, aria waar nodig, keyboard-navigatie.",
  "5. Responsive: Mobile-first; breakpoints consistent met bestaande secties.",
  "6. Performance: Geen zware assets of onnodige client components; respecteer bestaande Server/Client boundaries.",
  "7. Vertrouwen: Enterprise tone — professioneel, helder, geen gimmicky copy of visuele ruis.",
  "8. Thema's: Wijzigingen moeten in light én dark theme werken (check theme-*.css en globals.css tokens).",
  "9. Acceptatiecriteria: Elke prompt eindigt met meetbare criteria (spacing px, contrast ratio, één H1, primaire CTA zichtbaar boven fold, etc.).",
].join("\n");

function fileHintsForSections(snapshot: PageSnapshot): string {
  const hints = snapshot.sections
    .map((s) => {
      const key = s.id.toLowerCase();
      const files = SECTION_SOURCE_MAP[key];
      if (!files) return `- #${s.label} (${s.id}): zoek component in src/components/sections/ of src/components/hero/`;
      return `- #${s.label} (${s.id}): ${files.join(", ")}`;
    })
    .join("\n");

  return `Waarschijnlijke bronbestanden per sectie:\n${hints}\nGlobale styles: ${GLOBAL_STYLE_FILES.join(", ")}`;
}

export function buildCursorPromptsRequest(
  snapshot: PageSnapshot,
  report: AuditReport,
  context: AuditProjectContext,
  codeContext?: CodeContext,
): string {
  const snapshotJson = JSON.stringify({ ...snapshot, codeContext: undefined }, null, 2);
  const codeJson = codeContext ? JSON.stringify(codeContext, null, 2) : null;
  const reportJson = JSON.stringify(
    {
      overallScore: report.overallScore,
      categories: report.categories,
      quickWins: report.quickWins,
    },
    null,
    2,
  );
  const contextJson = JSON.stringify(context, null, 2);

  return `Je bent een senior UI/UX lead + frontend architect. Genereer gedetailleerde Cursor Agent prompts om ALLE verbeterpunten uit dit auditrapport te implementeren.

${ENTERPRISE_CONSTRAINTS}

## Projectcontext
${contextJson}

Product: ${context.productName} — ${context.productDescription}
Design goal: ${context.designGoal}
Huidige overall score: ${report.overallScore}/100
Actief theme bij scan: ${snapshot.theme}
Viewport: ${snapshot.viewport.width}×${snapshot.viewport.height}

${fileHintsForSections(snapshot)}

## Auditrapport (scores + findings)
${reportJson}

## DOM snapshot (secties, headings, CTAs, spacing, contentItems inventaris)
${snapshotJson}
${codeJson ? `\n## Source code context\n${codeJson}` : ""}

${FACTUAL_ACCURACY_RULES}

## Opdracht
Maak één Cursor-prompt PER concrete verbetering. Dek ALLE secties en elementen af waar scores < 85 of waar findings/quick wins iets noemen.

Regels voor elke prompt in het "prompt" veld:
- Start met: "Je werkt aan de enterprise marketing site van ${context.productName} (Next.js 16, App Router)."
- Noem exacte sectie-id, heading-tekst, CTA-tekst en gemeten waarden uit snapshot (fontSize, gapToNext px, rect afmetingen).
- Beschrijf het probleem kort (koppel aan category + finding). Citeer contentItems als bewijs.
- NOOIT "voeg testimonials/FAQ/pricing toe" als contentItems die al vermeldt.
- Geef concrete wijzigingen: copy-voorstellen, spacing-waarden, hiërarchie, contrast, CTA-hiërarchie.
- Noem waarschijnlijke bestandspaden om te editen.
- Eindig met acceptatiecriteria en "re-scan met UI/UX tool na implementatie".
- Schrijf de prompt in het Nederlands, direct plakbaar in Cursor Agent.
- Prioriteit: critical = blokkeert conversie/helderheid, high = merkbaar UX-probleem, medium = polish.

Minimaal ${Math.max(snapshot.sections.length, 5)} prompts (minstens één per zwakke sectie of categorie). Max 20 prompts.

Return ONLY valid JSON:
${CURSOR_PROMPTS_SCHEMA}`;
}

export function parseCursorPromptsResponse(content: string): CursorPrompt[] {
  const trimmed = content.trim();
  const jsonStart = trimmed.indexOf("{");
  const jsonEnd = trimmed.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("LLM returned non-JSON response");
  }
  const parsed = JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1)) as {
    cursorPrompts?: CursorPrompt[];
  };
  if (!Array.isArray(parsed.cursorPrompts) || parsed.cursorPrompts.length === 0) {
    throw new Error("Geen cursor prompts in LLM response");
  }
  for (const p of parsed.cursorPrompts) {
    if (!p.id || !p.title || !p.prompt || !p.priority || !p.category) {
      throw new Error("Ongeldige cursor prompt structuur");
    }
  }
  return parsed.cursorPrompts;
}
