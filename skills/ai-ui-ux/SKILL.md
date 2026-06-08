---
name: ai-ui-ux
description: >-
  Audit landing page UI/UX in development: DOM scan, grid/rulers overlays,
  LLM scoring with project context (new/redesign/rebrand, competitors). Use when
  reviewing design, clarity, hierarchy, visuals, CTAs, or competitive positioning.
---

# AI UI/UX Skill

## When to use

- Landing page review before/after redesign or rebrand
- Light vs dark theme polish
- Section spacing, CTA hierarchy, copy clarity checks
- Competitive positioning vs sites like ecomclaw.co

## Project context (important)

Edit `skills/ai-ui-ux/project.config.ts` per project:

```ts
designGoal: "new" | "redesign" | "rebrand"
previousSiteUrl: "https://www.frydai.ai"   // for redesign/rebrand
competitors: [{ name, url, notes? }]
```

**Frydai defaults:** `rebrand` of `https://www.frydai.ai`, competitor **EcomClaw** (`https://www.ecomclaw.co`).

Extra competitors can be added in **Scan overzicht** (dev UI, localStorage) without editing code.

## Dev workflow

1. Run `npm run dev` (tool is **development only**).
2. Configure `project.config.ts` (design goal, previous site, competitors).
3. Open the site; use the right **DevTools rail** → **UI/UX** → toggle **Aan**.
4. Enable overlays: Grid, Rulers, Secties, Metingen.
5. Click **Scan & score** (requires `OPENAI_API_KEY` in `.env.local`).
   - **Fase 1:** DOM scan in browser (live log links, sectie-highlight)
   - **Fase 2:** Broncode scan op server (React components, CSS, `messages/en.json`)
   - **Fase 3:** AI audit op DOM + code samen
6. Auto-redirect to **Scan overzicht** (`/dev/ui-ux`) — full report + history in SQLite.
7. Click **Genereer Cursor prompts** — per-sectie prompts voor Cursor Agent (enterprise constraints).
8. Kopieer prompts naar Cursor, implementeer, re-scan om score-delta te meten.

## Portable module

Copy `skills/ai-ui-ux/` to another project. Update `project.config.ts`. See [README.md](README.md).

## Frydai integration points

- Scanner reads `section[id]` landmarks: `#hero`, `#demo`, `#capabilities`, etc.
- Theme context: `data-theme` on `<html>`
- Dev rail: [src/components/dev-tools/DevToolsRail.tsx](../../src/components/dev-tools/DevToolsRail.tsx)
- Overview: [src/app/dev/ui-ux/](../../src/app/dev/ui-ux/)

## Rubric

See [rubric.md](rubric.md) for scoring criteria passed to the LLM.
