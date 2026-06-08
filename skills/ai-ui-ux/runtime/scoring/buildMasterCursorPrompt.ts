import { designGoalLabel } from "../context";
import type { AuditProjectContext, CursorPrompt, CursorPromptPriority } from "../types";

export type MasterPromptMeta = {
  overallScore: number;
  pathname: string;
  theme: string;
  context: AuditProjectContext;
};

const PRIORITY_LABELS: Record<CursorPromptPriority, string> = {
  critical: "KRITIEK",
  high: "HOOG",
  medium: "MEDIUM",
};

function sortByPriority(prompts: CursorPrompt[]): CursorPrompt[] {
  const order: Record<CursorPromptPriority, number> = {
    critical: 0,
    high: 1,
    medium: 2,
  };
  return [...prompts].sort((a, b) => order[a.priority] - order[b.priority]);
}

export function buildMasterCursorPrompt(
  prompts: CursorPrompt[],
  meta: MasterPromptMeta,
): string {
  const sorted = sortByPriority(prompts);
  const { context, overallScore, pathname, theme } = meta;

  const competitorLine =
    context.competitors.length > 0
      ? context.competitors.map((c) => `${c.name} (${c.url})`).join(", ")
      : "geen";

  const overview = sorted
    .map((p, i) => {
      const section = p.sectionId ? ` #${p.sectionId}` : "";
      return `${i + 1}. [${PRIORITY_LABELS[p.priority]}]${section} — ${p.title} (${p.estimatedImpact})`;
    })
    .join("\n");

  const steps = sorted
    .map((p, i) => {
      const elements =
        p.elements.length > 0 ? `\nElementen: ${p.elements.join(" · ")}` : "";
      return `## Stap ${i + 1}: [${PRIORITY_LABELS[p.priority]}] ${p.title}

Sectie: ${p.sectionId ? `#${p.sectionId}` : "pagina-breed"} | Categorie: ${p.category} | Impact: ${p.estimatedImpact}${elements}

${p.prompt}`;
    })
    .join("\n\n---\n\n");

  return `# ${context.productName} — UI/UX Master Prompt (Cursor Agent)

## Context
- Omgeving: Enterprise marketing website (B2B SaaS)
- Stack: Next.js 16 App Router, React, TypeScript, CSS theme tokens (data-theme light/dark)
- Product: ${context.productName} — ${context.productDescription}
- Design goal: ${designGoalLabel(context.designGoal)}${context.previousSiteUrl ? ` (was: ${context.previousSiteUrl})` : ""}
- Huidige UI/UX score: ${overallScore}/100
- Pagina: ${pathname} · theme bij scan: ${theme}
- Concurrenten benchmark: ${competitorLine}
${context.designNotes ? `- Notities: ${context.designNotes}` : ""}

## Enterprise-eisen (elke stap)
- Minimale diff: alleen relevante bestanden wijzigen
- Design system: hergebruik GlassCard, section padding, CTA-varianten, bestaande tokens
- WCAG 2.1 AA: contrast, focus states, semantische HTML
- Light én dark theme moeten werken na elke wijziging
- Geen over-engineering, geen unrelated refactors

## Werkwijze (verplicht)
1. Werk onderstaande ${sorted.length} stappen **één voor één** af, in exact deze volgorde (kritiek → hoog → medium).
2. **Voltooi en bevestig elke stap** (welke bestanden, wat gewijzigd) voordat je naar de volgende gaat.
3. Na alle stappen: vat samen wat er is verbeterd en adviseer een UI/UX re-scan.

## Stappenoverzicht
${overview}

---

${steps}

---

## Afronding
Na stap ${sorted.length}: geef een korte samenvatting per categorie (clarity, hierarchy, visuals, cta, positioning) van wat er is opgelost. Verwachte score-verbetering: combinatie van alle impacts hierboven.`;
}
