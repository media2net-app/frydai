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
| `NEXT_PUBLIC_LOGIN_URL` | Nav login link |
| `NEXT_PUBLIC_DEMO_URL` | Secondary CTA (default `#demo`) |

Set the same variables in [Vercel](https://vercel.com) → Project → Settings → Environment Variables (Production, Preview, Development).

## Project docs

See [WHOIS-FRYDAI.md](./WHOIS-FRYDAI.md) for brand, IA, and build order.
