# UI/UX Audit Rubric

## Design goal (project context)

Set in `project.config.ts` — affects how the LLM interprets scores.

| Goal | When to use | Audit focus |
|------|-------------|-------------|
| `new` | Greenfield site or product | Category establishment, trust, first impression |
| `redesign` | Same brand, new layout/UX | Improvements vs old site; avoid regressions in messaging or CTAs |
| `rebrand` | New visual identity + positioning (e.g. frydai.ai → new Frydai) | Brand recognition, evolution narrative, clarity at least as strong as before |

When `previousSiteUrl` is set, the auditor assumes familiarity with the old site category and compares implied messaging strength.

## Competitors

Add in `project.config.ts` (defaults) or via **Scan overzicht → Concurrenten** (saved in localStorage for dev).

The LLM does not scrape competitor DOM — it benchmarks positioning, proof, pricing signals, and CTA strength from category knowledge. List name, URL, and optional notes per competitor.

Example for Frydai: **EcomClaw** (`https://www.ecomclaw.co`).

When competitors or rebrand/redesign context applies, a fifth category **Positioning** is scored.

## Categories (0–100 each)

### Clarity
- Value proposition visible in hero (headline + subcopy)
- Product category obvious (AI operator / e-commerce)
- Pricing or trial path discoverable without deep scroll
- Jargon minimized; benefits over features

### Hierarchy
- Single H1 on page
- H2 per major section; no skipped levels
- Logical section order: problem → product → proof → pricing → FAQ
- Eyebrow labels support scan path

### Visuals
- Consistent section padding and vertical rhythm (gapToNext stable)
- Glass/card patterns consistent within theme
- Sufficient contrast for body and muted text
- No white-on-white or invisible borders in light mode

### CTA
- One clear primary action (Deploy / Start)
- Secondary actions visually subordinate
- Founding/urgency bar supports without overwhelming
- Repeated CTAs intentional, not noisy

### Positioning (when rebrand/redesign or competitors configured)
- Clear differentiation vs listed competitors
- Rebrand feels intentional, not generic template
- Messaging would win or hold in side-by-side comparison
- Proof, pricing, and urgency match category expectations

## Overall score

**Standard:** Clarity 30%, Hierarchy 25%, Visuals 25%, CTA 20%.

**With positioning:** Clarity 25%, Hierarchy 20%, Visuals 20%, CTA 15%, Positioning 20%.
