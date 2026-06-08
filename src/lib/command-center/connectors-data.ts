import { platformLogos } from "@/lib/platform-logos";

export type ConnectorCategory = "channels" | "store" | "ads" | "ai";

export type ConnectorStatus = "connected" | "available" | "coming_soon";

export type DashboardConnector = {
  id: string;
  name: string;
  category: ConnectorCategory;
  description: string;
  status: ConnectorStatus;
  /** Optional image under /platforms */
  iconSrc?: string;
  /** Fallback monogram when no asset */
  monogram: string;
  monogramClass: string;
};

export const DASHBOARD_CONNECTORS: DashboardConnector[] = [
  {
    id: "telegram",
    name: "Telegram",
    category: "channels",
    description: "Primary channel — tasks, approvals, and reports.",
    status: "connected",
    iconSrc: platformLogos.telegram,
    monogram: "T",
    monogramClass: "text-sky-300 bg-sky-500/20",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "channels",
    description: "Optional channel for alerts and quick approvals.",
    status: "available",
    iconSrc: platformLogos.whatsapp,
    monogram: "W",
    monogramClass: "text-emerald-300 bg-emerald-500/20",
  },
  {
    id: "line",
    name: "LINE",
    category: "channels",
    description: "Popular in JP/TW markets for operator updates.",
    status: "coming_soon",
    monogram: "L",
    monogramClass: "text-green-300 bg-green-500/20",
  },
  {
    id: "slack",
    name: "Slack",
    category: "channels",
    description: "Team inbox for multi-seat brands.",
    status: "coming_soon",
    monogram: "S",
    monogramClass: "text-violet-300 bg-violet-500/20",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "store",
    description: "Catalog, orders, and listing updates.",
    status: "connected",
    iconSrc: platformLogos.shopify,
    monogram: "Sh",
    monogramClass: "text-[#96bf48] bg-[#96bf48]/15",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "store",
    description: "WordPress store sync and SEO tasks.",
    status: "available",
    monogram: "Wo",
    monogramClass: "text-purple-300 bg-purple-500/20",
  },
  {
    id: "amazon",
    name: "Amazon",
    category: "store",
    description: "Listing audits and competitive ASIN tracking.",
    status: "coming_soon",
    monogram: "A",
    monogramClass: "text-amber-300 bg-amber-500/20",
  },
  {
    id: "meta",
    name: "Meta Ads",
    category: "ads",
    description: "Campaign management, scaling, and creative sync.",
    status: "connected",
    iconSrc: platformLogos.meta,
    monogram: "M",
    monogramClass: "text-[#6eb0ff] bg-[#6eb0ff]/15",
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "ads",
    description: "Email flows, segments, and lifecycle campaigns.",
    status: "available",
    iconSrc: platformLogos.klaviyo,
    monogram: "K",
    monogramClass: "text-orange-300 bg-orange-500/20",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "ads",
    description: "Search and Performance Max coordination.",
    status: "coming_soon",
    iconSrc: platformLogos.googleAds,
    monogram: "G",
    monogramClass: "text-blue-300 bg-blue-500/20",
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    description: "Primary reasoning model for research and copy.",
    status: "connected",
    iconSrc: platformLogos.claude,
    monogram: "C",
    monogramClass: "text-orange-200 bg-orange-500/15",
  },
  {
    id: "hermes",
    name: "Hermes",
    category: "ai",
    description: "Fast execution layer for ops and tooling.",
    status: "connected",
    iconSrc: "/platforms/hermes.png",
    monogram: "H",
    monogramClass: "text-violet-300 bg-violet-500/20",
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "ai",
    description: "Multimodal analysis for creatives and listings.",
    status: "available",
    iconSrc: platformLogos.gemini,
    monogram: "G",
    monogramClass: "text-cyan-300 bg-cyan-500/20",
  },
];

export const CONNECTOR_CATEGORIES: ConnectorCategory[] = ["channels", "store", "ads", "ai"];

export function countConnectedConnectors(connectors: DashboardConnector[]) {
  return connectors.filter((c) => c.status === "connected").length;
}
