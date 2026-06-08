import { platformLogos } from "@/lib/platform-logos";
import type { ConnectorCategory } from "@/lib/command-center/connectors-data";

export type IntegrationFilter = "all" | ConnectorCategory;

export type IntegrationDirectoryItem = {
  id: string;
  name: string;
  category: ConnectorCategory;
  iconSrc?: string;
  monogram: string;
  monogramClass: string;
};

export type IntegrationTierId = "native" | "channels" | "ai";

export type IntegrationUseCaseId = "ads" | "store" | "research";

/** Directory grid — Frydai e-commerce stack */
export const INTEGRATION_DIRECTORY: IntegrationDirectoryItem[] = [
  {
    id: "shopify",
    name: "Shopify",
    category: "store",
    iconSrc: platformLogos.shopify,
    monogram: "Sh",
    monogramClass: "text-[#96bf48] bg-[#96bf48]/15",
  },
  {
    id: "meta",
    name: "Meta Ads",
    category: "ads",
    iconSrc: platformLogos.meta,
    monogram: "M",
    monogramClass: "text-[#6eb0ff] bg-[#6eb0ff]/15",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "ads",
    iconSrc: platformLogos.googleAds,
    monogram: "G",
    monogramClass: "text-blue-300 bg-blue-500/20",
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "ads",
    iconSrc: platformLogos.klaviyo,
    monogram: "K",
    monogramClass: "text-orange-300 bg-orange-500/20",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "store",
    iconSrc: platformLogos.stripe,
    monogram: "St",
    monogramClass: "text-violet-300 bg-violet-500/20",
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "channels",
    iconSrc: platformLogos.telegram,
    monogram: "T",
    monogramClass: "text-sky-300 bg-sky-500/20",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "channels",
    iconSrc: platformLogos.whatsapp,
    monogram: "W",
    monogramClass: "text-emerald-300 bg-emerald-500/20",
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    iconSrc: platformLogos.claude,
    monogram: "C",
    monogramClass: "text-orange-200 bg-orange-500/15",
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "ai",
    iconSrc: platformLogos.gemini,
    monogram: "G",
    monogramClass: "text-cyan-300 bg-cyan-500/20",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "ai",
    iconSrc: platformLogos.openai,
    monogram: "O",
    monogramClass: "text-emerald-200 bg-emerald-500/15",
  },
  {
    id: "hermes",
    name: "Hermes",
    category: "ai",
    iconSrc: "/platforms/hermes.png",
    monogram: "H",
    monogramClass: "text-violet-300 bg-violet-500/20",
  },
  {
    id: "notion",
    name: "Notion",
    category: "store",
    iconSrc: platformLogos.notion,
    monogram: "N",
    monogramClass: "text-foreground/80 bg-fill-muted",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "ads",
    iconSrc: platformLogos.hubspot,
    monogram: "H",
    monogramClass: "text-orange-300 bg-orange-500/20",
  },
  {
    id: "mistral",
    name: "Mistral",
    category: "ai",
    iconSrc: platformLogos.mistral,
    monogram: "Mi",
    monogramClass: "text-amber-200 bg-amber-500/15",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "store",
    monogram: "Wo",
    monogramClass: "text-purple-300 bg-purple-500/20",
  },
  {
    id: "amazon",
    name: "Amazon",
    category: "store",
    monogram: "A",
    monogramClass: "text-amber-300 bg-amber-500/20",
  },
  {
    id: "line",
    name: "LINE",
    category: "channels",
    monogram: "L",
    monogramClass: "text-green-300 bg-green-500/20",
  },
  {
    id: "slack",
    name: "Slack",
    category: "channels",
    monogram: "S",
    monogramClass: "text-violet-300 bg-violet-500/20",
  },
];

export const INTEGRATION_TIER_LOGOS: Record<IntegrationTierId, string[]> = {
  native: [
    platformLogos.shopify,
    platformLogos.meta,
    platformLogos.googleAds,
    platformLogos.klaviyo,
    platformLogos.stripe,
  ],
  channels: [platformLogos.telegram, platformLogos.whatsapp],
  ai: [platformLogos.claude, platformLogos.gemini, "/platforms/hermes.png", platformLogos.openai],
};

export const INTEGRATION_USE_CASE_LOGOS: Record<IntegrationUseCaseId, string[]> = {
  ads: [platformLogos.meta, platformLogos.googleAds, platformLogos.klaviyo],
  store: [platformLogos.shopify, platformLogos.stripe, platformLogos.notion],
  research: [platformLogos.claude, platformLogos.gemini, platformLogos.telegram],
};
