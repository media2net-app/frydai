export const VIKTOR_LANDING = {
  nav: {
    items: [
      { label: "Product", href: "#integrations", hasDropdown: true },
      { label: "How it works", href: "#how-it-works", hasDropdown: false },
      { label: "Pricing", href: "#pricing", hasDropdown: false },
      { label: "Compare", href: "#compare", hasDropdown: true },
      { label: "Resources", href: "#faq", hasDropdown: true },
    ],
    cta: "Claim your seat",
  },
  hero: {
    stat: "500+ DTC brands on the waitlist",
    title: "Not a chatbot.",
    titleAccent: "An operator.",
    subtitle:
      "Frydai is the AI operator that connects to your e-commerce stack and does the work. Research, ad creatives, landing pages, store ops — shipped to Telegram.",
    ctaPrimary: "Claim your seat",
    ctaSecondary: "See it work · 92s",
    trust: [
      "Founding access · €149 / 4 weeks",
      "5 min setup",
      "Cancel anytime",
    ],
    trustedByLabel: "Built for operators at",
    trustedBy: ["ZenBlend", "NordSkin", "PeakFuel", "LumeHome", "CraftBox", "VeloWear"],
  },
  valueCards: [
    {
      id: "output",
      visual: "chat-pdf",
      title: "Real output, not just text.",
      description:
        "Frydai doesn't brainstorm. It ships. Competitor PDFs your team can share. Ad creatives ready for Meta. Landing pages you'd think an agency built.",
    },
    {
      id: "tools",
      visual: "floating-logos",
      title: "One message, all your tools.",
      description:
        "Shopify, Meta Ads, Klaviyo, Google Ads. Frydai queries them all in a single run. No tab-switching, no CSV exports.",
    },
    {
      id: "memory",
      visual: "chat-memory",
      title: "Never repeat yourself.",
      description:
        "Every task makes Frydai smarter about your brand. It remembers what worked, what didn't, and how you like things done.",
    },
  ],
  comparison: {
    eyebrow: "Frydai vs AI tools",
    title: "You've tried the AI tools.",
    titleAccent: "The work is still there.",
    subtitle:
      "ChatGPT. Claude. Canva. Freelancers. You're already using AI. You're also still doing the work at midnight.",
    columns: {
      task: "Task",
      others: "Other tools",
      frydai: "Frydai",
    },
    rows: [
      {
        task: "Competitor research",
        others: "ChatGPT — Gives you prompts for how to research.",
        frydai: "Scrapes competitors. Hands you the PDF in Telegram.",
      },
      {
        task: "Ad creative",
        others: "Canva + freelancer — You brief, wait, and revise.",
        frydai: "Generates hooks and statics. Ships for approval same day.",
      },
      {
        task: "Store ops",
        others: "VA + Shopify admin — Manual listing and SEO edits.",
        frydai: "Updates listings, flags inventory, reports every morning.",
      },
      {
        task: "Ad scaling",
        others: "Meta Ads Manager — You watch dashboards all day.",
        frydai: "Flags winners, pauses losers, asks before budget shifts.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    titlePrefix: "Deploying your first AI operator has never been",
    titleHighlight: "this easy.",
    steps: [
      {
        number: "01",
        title: "Connect",
        description:
          "Add your Telegram bot token and OpenAI API key, then optionally connect Shopify and Meta Ads — setup takes about five minutes.",
        cards: [
          {
            id: "shopify",
            name: "Shopify",
            subtitle: "Store & catalog sync",
            iconSrc: "/platforms/shopify.svg",
          },
          {
            id: "frydai",
            name: "Frydai",
            subtitle: "Your AI operator in Telegram",
            badge: "E-commerce",
            isOperator: true,
          },
          {
            id: "meta",
            name: "Meta Ads",
            subtitle: "Campaign management",
            iconSrc: "/platforms/meta.png",
          },
        ],
      },
      {
        number: "02",
        title: "Ask",
        description:
          "Talk to Frydai like a colleague. \"Pull this week's ROAS.\" \"Scrape competitor angles.\" \"Pause ads above $40 CPA.\"",
        cards: [
          {
            id: "telegram",
            name: "Telegram",
            subtitle: "Primary operator channel",
            iconSrc: "/platforms/telegram.webp",
          },
          {
            id: "frydai",
            name: "Frydai",
            subtitle: "Your AI operator in Telegram",
            badge: "E-commerce",
            isOperator: true,
          },
          {
            id: "whatsapp",
            name: "WhatsApp",
            subtitle: "Alerts & approvals",
            iconSrc: "/platforms/whatsapp.webp",
          },
        ],
      },
      {
        number: "03",
        title: "Frydai delivers",
        description:
          "Research, creatives, listings, and reports land in your chat. Recurring tasks run on schedule. Sensitive actions wait for your approval.",
        cards: [
          {
            id: "claude",
            name: "Claude",
            subtitle: "Research & copy layer",
            iconSrc: "/platforms/claude.svg",
          },
          {
            id: "frydai",
            name: "Frydai",
            subtitle: "Your AI operator in Telegram",
            badge: "E-commerce",
            isOperator: true,
          },
          {
            id: "gemini",
            name: "Gemini",
            subtitle: "Creative analysis",
            iconSrc: "/platforms/gemini.webp",
          },
        ],
      },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "What Frydai can own for your store",
    tabs: [
      {
        id: "founders",
        label: "DTC founders",
        headline: "One operator that does the research, ads, and ops you keep putting off.",
        features: [
          {
            title: "Live store pulse",
            description:
              "Revenue, ROAS, and ad spend from Shopify and Meta, delivered to Telegram every morning.",
          },
          {
            title: "Competitor intel on autopilot",
            description: "Weekly PDFs with winning angles, pricing shifts, and ad hooks.",
          },
          {
            title: "Creative pipeline that runs itself",
            description: "Static ads, UGC briefs, and hook variants without an agency retainer.",
          },
          {
            title: "Landing pages in minutes",
            description: "Listicles and product pages built from your research, ready to deploy.",
          },
        ],
      },
      {
        id: "marketing",
        label: "Ads & growth",
        headline: "Frydai manages your ad accounts, writes your hooks, and reports on all of it. Every day.",
        features: [
          {
            title: "Full-funnel ad intelligence",
            description: "Spend, CAC, CTR, and ROAS across Meta and Google Ads in one thread.",
          },
          {
            title: "Creative engine",
            description: "Static ads, hook variants, and UGC scripts shipped for approval.",
          },
          {
            title: "Email coordination",
            description: "Klaviyo flows triggered from live ad and store performance data.",
          },
          {
            title: "Stakeholder reporting",
            description: "Performance summaries with narrative and next actions, not raw exports.",
          },
        ],
      },
      {
        id: "store",
        label: "Store ops",
        headline: "Frydai eliminates the listing wrangling, inventory chasing, and manual updates that eat your evenings.",
        features: [
          {
            title: "Catalog updates",
            description: "Listings, SEO, and product copy refreshed without opening admin.",
          },
          {
            title: "Revenue summaries",
            description: "Stripe and Shopify data in a morning Telegram digest.",
          },
          {
            title: "Multi-store support",
            description: "Separate connections per brand — no confusion, no crossed wires.",
          },
          {
            title: "Inventory alerts",
            description: "Flags low stock and pricing anomalies before they cost you sales.",
          },
        ],
      },
      {
        id: "research",
        label: "Research & creative",
        headline: "Frydai scrapes, analyzes, and ships creative work — while you focus on the brand.",
        features: [
          {
            title: "Deep competitor scans",
            description: "Hundreds of sources distilled into actionable intel.",
          },
          {
            title: "Ad creative production",
            description: "From strategy to ready-to-run assets in your outbox.",
          },
          {
            title: "Landing page drafts",
            description: "Built from research findings with full funnel congruency.",
          },
          {
            title: "Trend detection",
            description: "Reddit, Meta Ad Library, and niche signals surfaced automatically.",
          },
        ],
      },
    ],
  },
  finalCta: {
    title: "Ready to deploy your operator?",
    subtitle:
      "Founding access · €149 every 4 weeks. All skills and integrations included. EU VAT included where applicable — cancel anytime from Whop, no lock-in, no sales call.",
    features: [
      "40+ e-commerce skills · 21 core workflows",
      "Telegram & WhatsApp",
      "Research, creatives, store ops",
      "Approval guardrails",
      "Cancel anytime",
    ],
    ctaPrimary: "Claim your seat",
    ctaSecondary: "See all plans",
  },
  footer: {
    tagline: "AI operator for e-commerce — research, creatives, and store ops shipped to Telegram 24/7.",
    compare: "Compare styles",
    original: "Original homepage",
    viktor: "Viktor preview",
    copyright: "© {year} Frydai. Style preview for comparison.",
  },
} as const;
