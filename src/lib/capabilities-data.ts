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
      "Deep market analysis, competitor tracking, and trend discovery — fully autonomous. Frydai scans sources via Apify and Airtable and delivers actionable intel.",
    skills: [
      "/competitor-research",
      "/scrape-ads",
      "/summarize",
      "/video-analyzer",
    ],
    pipeline: [
      { label: "Data ingestion", value: "Apify · Airtable · Meta Ads Library" },
      { label: "Signal processing", value: "452 signals detected" },
      { label: "Pattern match", value: "92/100 confidence" },
      { label: "Intel report", value: "Delivered to Telegram when ready" },
    ],
  },
  {
    id: "adCreative",
    label: "Ad creative",
    title: "Ad creative on autopilot",
    description:
      "From competitor angles to scripts, static ads, and video — the full ad pipeline orchestrated by /ad-machine.",
    skills: [
      "/script-ads",
      "/generate-ad-statics",
      "/static-to-video",
      "/image-prompt-architect",
      "/ad-machine",
    ],
  },
  {
    id: "landingPages",
    label: "Landing pages",
    title: "Landing pages that convert",
    description:
      "Generate landing pages that match your ad angles for full funnel congruency — listicles, advertorials, and product pages built to convert.",
    skills: ["/build-page", "/script-ads", "/image-prompt-architect"],
  },
  {
    id: "storeManagement",
    label: "Store management",
    title: "Store management hands-free",
    description:
      "Manage listings, reviews, carts, and store health without lifting a finger. Your Shopify store stays fresh while Frydai runs 24/7.",
    skills: [
      "/listing-optimizer",
      "/store-health-monitor",
      "/review-responder",
      "/abandoned-cart-rescuer",
      "/order-status-updater",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    title: "Full-stack marketing ops",
    description:
      "Run Meta ads, email flows, and performance ops from one operator — coordinated with approval guardrails.",
    skills: ["/launch-ads", "/ad-order", "/abandoned-cart-rescuer", "/onboard"],
  },
  {
    id: "more",
    label: "40+ more",
    title: "40+ skills — 21 core workflows",
    description:
      "New e-com capabilities ship regularly to your operator. Core workflows cover research, ad creative, landing pages, Shopify ops, and Meta ads.",
    skills: ["/onboard", "/my-business", "/skill-creator", "/summarize", "/video-analyzer"],
  },
];
