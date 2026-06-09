# Frydai marketing site (redesign)

Next.js homepage redesign — hero first, section-by-section.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WHOP_CHECKOUT_URL` | Whop product page (fallback checkout link) |
| `NEXT_PUBLIC_WHOP_PLAN_ID` | Embedded Whop checkout plan ID |
| `NEXT_PUBLIC_DEMO_URL` | Secondary CTA (default `#demo`) |
| `OPENAI_API_KEY` | UI/UX audit skill (development only) |
| `UI_UX_AUDIT_MODEL` | Optional OpenAI model (default `gpt-4o-mini`) |

Set the same variables in [Vercel](https://vercel.com) → Project → Settings → Environment Variables (Production, Preview, Development).

## UI/UX audit skill (dev only)

Portable module in [`skills/ai-ui-ux/`](./skills/ai-ui-ux/). In `npm run dev`:

1. Use the right **DevTools rail** (Thema + **UI/UX**).
2. Toggle **UI/UX → Aan** for grid, rulers, section outlines, and measurements.
3. Click **Scan & score** (requires `OPENAI_API_KEY` in `.env.local`) — opens `/dev/ui-ux` with full report.
4. Scans are stored in `data/ui-ux-audits.db` to compare scores over time.

Not included in production builds. See [skills/ai-ui-ux/README.md](./skills/ai-ui-ux/README.md) to copy into other projects.

## Project docs

See [WHOIS-FRYDAI.md](./WHOIS-FRYDAI.md) for brand, IA, and build order.
