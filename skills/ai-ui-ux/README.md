# AI UI/UX Skill — integration

Portable dev-only UI/UX audit tool for Next.js/React sites.

## Copy to another project

1. Copy the entire `skills/ai-ui-ux/` folder.
2. Add tsconfig path: `"@skills/*": ["./skills/*"]`
3. Create `src/app/api/ui-ux/audit/route.ts` (copy from frydai).
4. Add `DevToolsRail` + `UiUxAuditProvider` in root layout (dev only).
5. Set `OPENAI_API_KEY` in `.env.local`.
6. **Edit `project.config.ts`** — design goal, previous site, competitors.

## Project config

```ts
// skills/ai-ui-ux/project.config.ts
export const auditProjectConfig = {
  productName: "YourProduct",
  productDescription: "One-line category description",
  designGoal: "new", // "new" | "redesign" | "rebrand"
  previousSiteUrl: "https://old-site.com", // optional
  designNotes: "Optional context for the LLM",
  competitors: [
    { name: "Competitor", url: "https://competitor.com", notes: "optional" },
  ],
};
```

| Field | Purpose |
|-------|---------|
| `designGoal` | Tells the LLM whether this is greenfield, redesign, or rebrand |
| `previousSiteUrl` | Reference for regression checks (messaging, CTAs) |
| `competitors` | Benchmark positioning; enables **Positioning** score category |

Developers can add more competitors at runtime via `/dev/ui-ux` (stored in localStorage).

## Environment

```env
OPENAI_API_KEY=sk-...
UI_UX_AUDIT_MODEL=gpt-4o-mini
```

## API

| Endpoint | Description |
|----------|-------------|
| `POST /api/ui-ux/audit` | `{ snapshot, context? }` → LLM score; saves to SQLite; returns `{ id, report }` |
| `GET /api/ui-ux/reports` | List scan history |
| `GET /api/ui-ux/reports/[id]` | Full stored report (includes context) |
| `POST /api/ui-ux/reports/[id]/cursor-prompts` | Genereer gedetailleerde Cursor Agent prompts (enterprise) |

Database file: `data/ui-ux-audits.db` (gitignored).

After scan, redirects to `/dev/ui-ux?id=…` (dev only).

Only works when `NODE_ENV=development`.

## Runtime exports

```ts
import {
  UiUxAuditProvider,
  useUiUxAudit,
  AuditOverlayLayer,
  UiUxAuditSwitcher,
  auditProjectConfig,
  resolveAuditContext,
} from "@skills/ai-ui-ux/runtime";
```
