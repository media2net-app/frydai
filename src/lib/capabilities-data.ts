export type CapabilityId =
  | "research"
  | "adCreative"
  | "landingPages"
  | "storeManagement"
  | "marketing"
  | "more";

export type CapabilityPipelineStep = {
  label: string;
  value: string;
};

export type CapabilityItem = {
  id: CapabilityId;
  label: string;
  title: string;
  description: string;
  skills: string[];
  pipeline?: CapabilityPipelineStep[];
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "research",
    label: "Research",
    title: "AI-powered research",
    description:
      "Deep market analysis, competitor tracking, and trend discovery — fully autonomous. Frydai scans hundreds of sources and delivers actionable intel.",
    skills: ["Competitor analysis", "Reddit scraping", "Trend detection", "Price monitoring"],
    pipeline: [
      { label: "Data ingestion", value: "X · Reddit · Meta Ads" },
      { label: "Signal processing", value: "452 signals detected" },
      { label: "Pattern match", value: "92/100 confidence" },
      { label: "Intel report", value: "Auto-send 07:00 via Telegram" },
    ],
  },
  {
    id: "adCreative",
    label: "Ad creative",
    title: "Ad creative on autopilot",
    description:
      "From creative strategy to UGC scripts, static ads, and video briefs. Your entire creative pipeline — from insight to ready-to-run assets.",
    skills: ["Creative strategy", "UGC scripts", "Static ads", "Hook variants", "TikTok UGC angles"],
  },
  {
    id: "landingPages",
    label: "Landing pages",
    title: "Landing pages that convert",
    description:
      "Generate landing pages that match your ad angles for full funnel congruency. Listicles, advertorials, and product pages built to convert.",
    skills: ["Listicles", "Advertorials", "Product pages", "Bundle offers", "A/B copy variants"],
  },
  {
    id: "storeManagement",
    label: "Store management",
    title: "Store management hands-free",
    description:
      "Manage listings, product images, and niche trends without lifting a finger. Your store stays fresh while Frydai runs 24/7.",
    skills: ["Product listings", "Image optimization", "Trend analysis", "SEO updates", "Inventory alerts"],
  },
  {
    id: "marketing",
    label: "Marketing",
    title: "Full-stack marketing ops",
    description:
      "Run paid and organic marketing from one operator. Meta ads, email flows, performance reports, and content — coordinated automatically.",
    skills: ["Meta ads", "Email marketing", "Ad analysis", "Organic posting", "Budget scaling"],
  },
  {
    id: "more",
    label: "50+ more",
    title: "50+ skills — updated every week",
    description:
      "New e-com skills ship to your agent automatically. Trending tools on Twitter? Your operator often has them before the week is out.",
    skills: ["Weekly skill drops", "Telegram commands", "Custom rules", "Guardrails", "Team workflows"],
  },
];
