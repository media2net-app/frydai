# Frydai — Volledig redesign (projectdocument)

> **Status:** strategie & planning  
> **Referentie design:** [Proceda homepage](/Users/gebruiker/Desktop/proceda) (`#08080f`, glass UI, gradient CTA’s)  
> **Huidige site:** [frydai.ai](https://frydai.ai/)  
> **Eerste bouwstap:** Hero  
> **Laatst bijgewerkt:** 4 juni 2026

---

## 1. Who is Frydai?

### 1.1 In één zin

**Frydai is geen SaaS-dashboard — het is een 24/7 AI-operator voor e-commerce founders** die onderzoek, creatives, landing pages en store-ops uitvoert en resultaten terugstuurt via Telegram (en optioneel WhatsApp / Slack).

### 1.2 Wat Frydai wél is

| Dimensie | Definitie |
|----------|-----------|
| **Producttype** | Subscription “operator” — één agent, vele skills |
| **Doelgroep** | Shopify / WooCommerce / Amazon-operators, DTC brands, solo founders & kleine teams |
| **Belofte** | Vervangt een verspreid freelancer-team (research, ads, creatives, listings, LP’s) voor **$187 / 4 weken** |
| **Werkwijze** | Autonoom met guardrails; proactieve updates; goedkeuringen via chat |
| **Differentiator** | **Uitvoerend** (ships work) vs. tools die alleen “inzicht” geven |
| **Kanalen** | Telegram-first; LINE / WhatsApp genoemd op huidige site |
| **Stack (positionering)** | Claude, Hermes, Gemini + integraties Shopify · Klaviyo · Meta |
| **Checkout** | Whop, EU VAT, cancel anytime |

### 1.3 Wat Frydai níet is

- Geen “nog een AI writing tool” of generiek ChatGPT-wrapper.
- Geen enterprise consultancy (Proceda = maatwerk B2B apps; Frydai = productized operator voor stores).
- Geen vervanging van strategische merkbeslissingen — wel executie + voorstellen + rapporten.

### 1.4 Merkpersoonlijkheid

| Trait | Manifestatie op de site |
|-------|------------------------|
| **Operator** | Taal als collega: “Done. Report inside.” — niet als software-handleiding |
| **Confident** | Grote claims, maar onderbouwd met concrete outputs (PDF’s, ROAS, taken) |
| **Always-on** | 24/7, “while you slept”, live command center |
| **Pragmatisch** | E-com metrics (ROAS, CPA, creatives/maand) boven buzzwords |
| **Accessible** | 5 min setup, geen technical knowledge (FAQ) |

### 1.5 Naam & betekenis (voor copy)

- **Frydai** = Friese/regionale “Fry”-associatie (Fryslân, eigenwijs, direct) + **AI**.
- Tagline-hoek huidige site: *“Not a SaaS. An operator.”* — sterk, behouden of aanscherpen naar Nederlands/EN variant afhankelijk van markt.

### 1.6 Jobs-to-be-done (JTBD)

1. **Intel zonder uren Reddit/Meta Library** — competitor pricing, sentiment, trends → ochtendbrief via Telegram.
2. **Creative pipeline vullen** — UGC scripts, ad angles, statics zonder designer bottleneck.
3. **Ads & listings optimaliseren** — schalen/pauzeren op CPA-regels, SEO listing updates.
4. **Minder SaaS-stack** — één subscription i.p.v. 8 losse tools + 9 freelancers.

### 1.7 Huidige site — inhoudelijke inventaris

| # | Sectie (huidig) | Functie |
|---|-----------------|--------|
| 0 | Nav + login | Wayfinding, Whop/login |
| 1 | **Hero** | Positionering + dubbele Telegram-mock + stats + model-logos |
| 2 | Command Center | Product demo (kanban, agents, feed) |
| 3 | Agent roster | Research / Content / Ops namen |
| 4 | Features tabs | Research, ads, LP, store, marketing |
| 5 | Research deep-dive | Pipeline visual (ingestion → report) |
| 6 | Creative gallery | Marquee + 18 creatives |
| 7 | Talk to operator | Chat + kanalen |
| 8 | Before / After | ROI-vergelijking |
| 9 | Team vs Frydai pricing | $18.150 vs $187 |
| 10 | How it works | 3 stappen |
| 11 | Founding plan | Pricing + bullets + math |
| 12 | Testimonials | 3 quotes |
| 13 | FAQ | 5 vragen |
| 14 | Final CTA + footer | Deploy |

**Problemen huidige UX (redesign drivers):**

- Visueel druk: hero toont dezelfde Telegram-card **twee keer**.
- Before/After bevat **onlogische cijfers** (ROAS 0.0x, conversion 0.0%) — ondermijnt vertrouwen.
- Veel herhaling (pricing math 2×, command center overlapt met hero).
- Minder “premium commercial” dan Proceda: minder glass hierarchy, minder rust in typografie.
- Marquee-creatives voelen template-achtig zonder merkcontext.

---

## 2. Redesign-voorstel

### 2.1 Strategische richting

**Van “feature-heavy landing” → “commercial operator brand”** in de stijl van Proceda:

- Donker canvas (`#08080f` / `#0a0a12`) met subtiele violet/indigo/fuchsia radial gradients.
- **Glass cards** voor productbewijs (niet platte grijze boxes).
- **Eén heldere hero-boodschap** + **één** product-visual (Telegram *of* mini command center — niet beide dubbel).
- Metrics en social proof **geloofwaardig** maken (ranges, footnotes, één sterke case).
- CTA-hiërarchie: primair **Deploy Frydai** (Whop), secundair **See it work** (92s video/demo).

### 2.2 Design system (voorstel)

| Token | Waarde | Opmerking |
|-------|--------|-----------|
| Background | `#08080f` | Align met Proceda |
| Surface | `white/5` + `border-white/10` | GlassCard pattern |
| Primary gradient | `violet-600 → purple-600 → indigo-500` | CTA’s |
| Accent text | `violet-300`, `emerald-400` (positieve trends) | |
| Font | Inter of Geist (bestaande stack checken bij implementatie) | |
| Radius | `rounded-full` buttons, `rounded-xl` cards | |
| Motion | Framer: subtiele cycle in headline, glass showcase rotate | Proceda-achtig |

**Frydai vs Proceda — bewuste verschillen:**

| Proceda | Frydai |
|---------|--------|
| “Automatiseer [sales/support/…] met AI” | “Run [research/ads/creatives/…] 24/7” — e-com woorden |
| Boek gesprek (lead gen) | Deploy / Whop checkout (self-serve) |
| Dashboard portfolio B2B | Command center + Telegram thread |
| NL/RO/EN i18n | Start **EN** (huidige site); NL later optioneel |

### 2.3 Nieuwe informatiearchitectuur (voorgestelde volgorde)

```
[Nav]
[Hero]                    ← START BOUW
[USP bar]                 ← 4 stats (5min / 50+ skills / 24/7 / 10x)
[Product proof]           ← 1 unified “Operator UI” (glass: Telegram + mini kanban)
[Capabilities]            ← 4–5 cards i.p.v. lange tabs
[How it works]            ← 3 stappen, compacter
[Results]                 ← 1 before/after (gefikst) + optioneel 1 KPI strip
[Pricing]                 ← Team vs Frydai + founding plan (1× math block)
[Social proof]            ← Testimonials + logo strip integraties
[FAQ]
[Final CTA]
[Footer]
```

**Geschrapt of samengevoegd:**

- Aparte “Agent roster” (GHOST, MACHINE, …) → integreren in capabilities of product proof tooltip.
- Dubbele pricing-math → één sectie.
- Creative marquee → verkorten tot **6–8** sterke assets + link “see gallery” (aparte pagina later).
- Research pipeline → één card in capabilities, niet eigen full-width sectie (tenzij A/B later).

### 2.4 Hero — concreet voorstel (eerste bouwsectie)

**Layout (desktop):** Proceda-pattern — links copy, rechts `HeroGlassShowcase`-achtig component.

| Element | Inhoud (EN voorstel) |
|---------|----------------------|
| Eyebrow | `LINE · 24/7 · TELEGRAM · WHATSAPP` (subtieler, mono, tracking-wide) |
| Headline | Prefix: **“Not a SaaS.”** — cycle words: `An operator` / `Your media buyer` / `Your research team` / `Your creative studio` — suffix optioneel leeg of **“for your store.”** |
| Subcopy | One subscription. Frydai runs research, creatives, landing pages and store ops — and ships the work back in Telegram. |
| Primary CTA | Deploy Frydai → (Whop URL) |
| Secondary CTA | See it work · 92s (modal of `#demo`) |
| Trust | Availability/scarcity badge optioneel: `Founding access · limited seats` |
| Visual | **Één** animated glass stack: (1) Telegram message + PDF attachment (2) kleine live task strip — geen duplicate card |
| Logo strip | Claude · Gemini · Telegram · Shopify (icons, muted) |

**Mobile:** visual onder copy; headline cycle in block layout (Proceda `HeroHeadline` patroon).

### 2.5 Copy-richtlijnen

- Korte zinnen. Actieve werkwoorden: *scraped, shipped, scaled, paused*.
- Vermijd dubbele superlatieven (“10x faster” + “7,492%” in dezelfde viewport).
- Elke metric: bron of context (*last 30 days · demo store*).
- FAQ antwoorden: max 3–4 zinnen, accordion.

### 2.6 Technische richting (implementatie)

| Keuze | Voorstel |
|-------|----------|
| Framework | **Next.js 15** App Router + TypeScript |
| Styling | Tailwind 4.x |
| Animatie | `framer-motion` (Proceda hergebruik waar licentie/ repo het toelaat) |
| i18n | `next-intl` — messages in `messages/en.json` (later `nl.json`) |
| Componenten | Port/adapt van Proceda: `HeroSection`, `GlassCard`, `HeroGlassShowcase`, `HeroHeadline`, `UspBar`, `HeroMobileNav` |
| Assets | Eigen Frydai logo; creatives in `/public/creatives/`; demo video embed |

Repo `frydai/` is nu leeg — **greenfield** of bestaande frydai.ai repo koppelen vóór hero-PR.

---

## 3. Plan van aanpak

### 3.1 Fasering

| Fase | Omschrijving | Deliverable |
|------|--------------|-------------|
| **0** | Project setup | Next.js scaffold, Tailwind, fonts, env Whop URL |
| **1** | **Hero + Nav + USP bar** | Shippable eerste milestone |
| **2** | Product proof (unified operator UI) | Glass showcase + optioneel light “live” animatie |
| **3** | Capabilities | 4–5 glass cards |
| **4** | How it works | 3 stappen |
| **5** | Results + pricing | Gefixte metrics, één math block |
| **6** | Social proof + FAQ + footer CTA | |
| **7** | Polish | SEO, OG images, performance, analytics |
| **8** | Optioneel NL + legal | Privacy, VAT copy |

### 3.2 Hero — takenlijst (fase 1 detail)

- [ ] **1.1** Scaffold `frydai` Next app (of bestaande repo importeren)
- [ ] **1.2** Design tokens in `globals.css` (background, gradients)
- [ ] **1.3** `HeroSection` + radial backgrounds
- [ ] **1.4** `SiteHeader` — logo, anchors (Features → `#capabilities`, Pricing → `#pricing`, FAQ), Log in, mobile nav
- [ ] **1.5** `HeroHeadline` — cycle words (e-com focus)
- [ ] **1.6** `HeroOperatorShowcase` — nieuw component: Telegram + attachment (geen duplicate)
- [ ] **1.7** CTA’s + Whop link uit env `NEXT_PUBLIC_WHOP_CHECKOUT_URL`
- [ ] **1.8** `HeroLogoSlider` / integraties strip
- [ ] **1.9** `UspBar` — 5min setup · 50+ skills · 24/7 · 10x (icons)
- [ ] **1.10** Responsive QA (375 / 768 / 1280)
- [ ] **1.11** Lighthouse pass hero (LCP image/video lazy)

**Acceptatiecriteria hero:**

1. Eén primaire boodschap zichtbaar binnen 3 seconden.
2. Geen dubbele Telegram-card.
3. Visueel op één lijn met Proceda (glass, gradient, dark).
4. Primary CTA werkt naar checkout; secondary naar demo.
5. CLS < 0.1 op mobile.

### 3.3 Bestandsstructuur (voorstel)

```
frydai/
├── WHOIS-FRYDAI.md          ← dit document
├── messages/
│   └── en.json              ← alle marketing copy
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx         ← secties als imports (stap voor stap)
│   │   └── globals.css
│   └── components/
│       ├── hero/
│       │   ├── HeroSection.tsx
│       │   ├── HeroHeadline.tsx
│       │   ├── HeroOperatorShowcase.tsx
│       │   └── HeroLogoSlider.tsx
│       ├── layout/
│       │   ├── SiteHeader.tsx
│       │   └── SiteFooter.tsx
│       ├── ui/
│       │   └── GlassCard.tsx
│       └── UspBar.tsx
└── public/
    ├── frydai-logo.svg
    └── creatives/
```

### 3.4 sectie-voor-sectie bouwvolgorde (na hero)

| Volgorde | Sectie | Geschatte effort |
|----------|--------|------------------|
| 2 | USP bar (als niet in hero-PR) | S |
| 3 | Product proof | M |
| 4 | Capabilities | M |
| 5 | How it works | S |
| 6 | Results (before/after) | M — copy review verplicht |
| 7 | Pricing | M |
| 8 | Testimonials | S |
| 9 | FAQ | S |
| 10 | Final CTA + Footer | S |

### 3.5 Open vragen (vóór/during hero)

1. **Repo-bron:** bestaat frydai.ai al in een andere map/git remote? Zo ja, die koppelen i.p.v. greenfield.
2. **Taal:** alleen EN of direct NL + EN?
3. **Whop URL + login URL** voor nav.
4. **Demo “92s”:** bestaande video-URL of placeholder tot asset klaar is?
5. **Brand assets:** logo SVG, kleur accent (Frydai-specifiek of Proceda-violet overnemen)?
6. **Before/after cijfers:** echte case study, bandbreedtes, of “illustrative demo” disclaimer?

### 3.6 Risico’s & mitigatie

| Risico | Mitigatie |
|--------|-----------|
| Te veel lijken op Proceda | Frydai-accentkleur (bijv. teal/gold) in gradient of eyebrow; e-com copy & Telegram UI |
| Ongeloofwaardige metrics | Footnotes + herzien before/after |
| Scope creep (command center 1:1) | MVP: statische glass mock; “live” later |
| Legal claims (ROAS, savings) | “Results vary” + FAQ disclaimer |

---

## 4. Volgende stap

**Start implementatie: Hero (fase 1).**

Wanneer je “go” geeft:

1. Bevestig repo/setup (greenfield in `frydai/` vs. bestaande codebase).
2. Bevestig Whop-URL + of violet design system OK is.
3. Ik scaffold Next.js en bouw hero + nav + USP volgens §2.4 en §3.2.

---

## Bijlage A — Proceda-patronen om te porten

| Proceda component | Pad | Frydai gebruik |
|-------------------|-----|----------------|
| `HeroSection` | `proceda/src/components/HeroSection.tsx` | Achtergrond gradients |
| `HeroHeadline` | `proceda/src/components/HeroHeadline.tsx` | Animated cycle |
| `HeroGlassShowcase` | `proceda/src/components/HeroGlassShowcase.tsx` | Basis voor Operator showcase |
| `GlassCard` | `proceda/src/components/GlassCard.tsx` | Alle sectie-cards |
| `UspBar` | `proceda/src/components/UspBar.tsx` | Direct onder hero |
| `HeroMobileNav` | `proceda/src/components/HeroMobileNav.tsx` | Mobile menu |

## Bijlage B — Hero copy draft (`messages/en.json`)

```json
{
  "nav": {
    "features": "Features",
    "howItWorks": "How it works",
    "pricing": "Pricing",
    "faq": "FAQ",
    "login": "Log in"
  },
  "hero": {
    "eyebrow": "LINE · 24/7 · TELEGRAM · WHATSAPP",
    "headlinePrefix": "Not a SaaS.",
    "headlineWords": ["An operator", "Your research team", "Your ad studio", "Your store ops"],
    "headlineSuffix": "for e-commerce.",
    "descriptionLine1": "One subscription. Twenty-four-seven.",
    "descriptionLine2": "Frydai runs research, creatives, landing pages and store ops — and ships the work back in Telegram.",
    "ctaPrimary": "Deploy Frydai",
    "ctaSecondary": "See it work · 92s",
    "availabilityBadge": "Founding access · limited seats",
    "telegramPreview": "Done. Scraped 47 competitors while you slept. Winning angles, full report inside.",
    "telegramAttachment": "ZenBlend_competitor_intel.pdf"
  }
}
```

---

*Einde document — wijzigingen via PR/commit per sectie; hero eerst.*
