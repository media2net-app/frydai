export const FACTUAL_ACCURACY_RULES = `
## Factual accuracy (VERPLICHT)
DOM snapshot + broncode (codeContext) zijn ground truth samen.

Per sectie bevat de DOM snapshot:
- textSample, contentItems, contentSummary, headings, ctas, rect, gapToNext

Broncode (codeContext) bevat:
- componentFiles: React/TSX bron per sectie-id (structuur, componenten, classNames)
- styleFiles: globals.css + theme CSS (tokens, light/dark)
- copySource: messages/en.json strings (werkelijke headline copy vs DOM textSample artefacten)

Regels:
1. NOOIT aanbevelen om content TOE TE VOEGEN die contentItems, copySource of component code al tonen.
2. Als DOM textSample tekst aan elkaar plakt (bijv. headline prefix + cycle zonder spatie): check copySource en component code vóór je "ontbrekende copy" concludeert.
3. Adviseer VERBETEREN met concrete bestandspaden uit codeContext (bijv. HeroHeadline.tsx, messages/en.json).
4. Elke finding MOET evidence citeren: sectie-id + DOM veld OF bronbestand + regel/component.
5. Geen generieke SaaS-checklist zonder snapshot/code-bewijs.
`.trim();
