import { hasPositioningContext } from "../context";
import type { AuditProjectContext, CodeContext, PageSnapshot } from "../types";
import { FACTUAL_ACCURACY_RULES } from "./factualAccuracy";

const BASE_SCHEMA = `{
  "overallScore": number (0-100),
  "categories": [
    {
      "id": "clarity" | "hierarchy" | "visuals" | "cta",
      "label": string,
      "score": number (0-100),
      "summary": string,
      "findings": string[]
    }
  ],
  "quickWins": string[]
}`;

const POSITIONING_SCHEMA = `{
  "overallScore": number (0-100),
  "categories": [
    {
      "id": "clarity" | "hierarchy" | "visuals" | "cta" | "positioning",
      "label": string,
      "score": number (0-100),
      "summary": string,
      "findings": string[]
    }
  ],
  "quickWins": string[]
}`;

function designGoalInstructions(context: AuditProjectContext): string {
  switch (context.designGoal) {
    case "new":
      return `Design goal: NEW product/site. Judge whether the page establishes category, trust, and differentiation from scratch. No prior site to compare.`;
    case "redesign":
      return `Design goal: REDESIGN of an existing site${context.previousSiteUrl ? ` (${context.previousSiteUrl})` : ""}. Judge whether the new layout improves clarity, hierarchy, and conversion while preserving what worked. Call out regressions vs a typical redesign (lost messaging, weaker hero, muddier CTAs).`;
    case "rebrand":
      return `Design goal: REBRAND of ${context.previousSiteUrl ?? "the previous site"}. Judge brand evolution: is Frydai still recognizable, does the new visual language feel intentional, and is the value prop at least as clear as before? Note risks of alienating existing users or looking generic after rebrand.`;
  }
}

function competitorInstructions(context: AuditProjectContext): string {
  if (context.competitors.length === 0) return "";

  const list = context.competitors
    .map((c) => `- ${c.name}: ${c.url}${c.notes ? ` (${c.notes})` : ""}`)
    .join("\n");

  return `
Competitors to benchmark against (you do not have their live DOM — use category knowledge and positioning):
${list}

For positioning: infer how this page would compare on messaging, proof, pricing signals, and CTA strength. Where does Frydai win or lose vs these competitors? Be specific about differentiation gaps.`;
}

export function buildAuditPrompt(
  snapshot: PageSnapshot,
  context: AuditProjectContext,
  codeContext?: CodeContext,
): string {
  const includePositioning = hasPositioningContext(context);
  const domPayload = { ...snapshot, codeContext: undefined };
  const payload = JSON.stringify(domPayload, null, 2);
  const codePayload = codeContext ? JSON.stringify(codeContext, null, 2) : null;
  const contextPayload = JSON.stringify(context, null, 2);

  const categoryBlock = includePositioning
    ? `- positioning: Differentiation vs competitors, brand fit for design goal (${context.designGoal}), messaging gaps, and whether the page would win a side-by-side comparison.`
    : "";

  const weightNote = includePositioning
    ? "Weighted average when positioning applies: Clarity 25%, Hierarchy 20%, Visuals 20%, CTA 15%, Positioning 20%."
    : "Weighted average: Clarity 30%, Hierarchy 25%, Visuals 25%, CTA 20%.";

  return `You are a senior UI/UX auditor for marketing websites and SaaS landing pages.

## Project context
${contextPayload}

${designGoalInstructions(context)}
${context.designNotes ? `\nAdditional notes: ${context.designNotes}` : ""}
${competitorInstructions(context)}

## Page under audit
Product: ${context.productName} — ${context.productDescription}

Analyze the live page using BOTH:
1. DOM snapshot (wat de gebruiker ziet — metrics, spacing, inventaris)
2. Source code context (hoe het is gebouwd — componenten, copy strings, CSS tokens)

${FACTUAL_ACCURACY_RULES}

Score each category 0-100:
- clarity: Is it obvious within 5 seconds what the product offers and who it's for?
- hierarchy: Logical heading order, section flow, scannable structure (one H1 ideal).
- visuals: Spacing rhythm, section gaps, consistency, glass/contrast cues from structure.
- cta: Primary action clear, not too many competing CTAs, secondary actions distinct.
${categoryBlock}

${weightNote}

Be specific and actionable. Reference section ids/labels from the snapshot. Write findings in Dutch.

Return ONLY valid JSON matching this schema (no markdown):
${includePositioning ? POSITIONING_SCHEMA : BASE_SCHEMA}

DOM snapshot:
${payload}
${codePayload ? `\nSource code context:\n${codePayload}` : ""}`;
}
