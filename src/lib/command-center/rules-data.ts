export type RuleCategory = "Spend" | "Brand" | "Approvals" | "Store";

export type DashboardRule = {
  id: string;
  name: string;
  category: RuleCategory;
  description: string;
  enabled: boolean;
};

export const DASHBOARD_RULES: DashboardRule[] = [
  {
    id: "r1",
    name: "CPA ceiling",
    category: "Spend",
    description: "Pause ad sets when CPA exceeds $25 for 48 hours.",
    enabled: true,
  },
  {
    id: "r2",
    name: "Daily spend cap",
    category: "Spend",
    description: "Never increase account spend more than 20% per day without approval.",
    enabled: true,
  },
  {
    id: "r3",
    name: "ROAS floor",
    category: "Spend",
    description: "Pause scaling when blended ROAS drops below 2.0x for 3 consecutive days.",
    enabled: true,
  },
  {
    id: "r4",
    name: "Brand voice",
    category: "Brand",
    description: "Friendly, science-backed tone — no medical claims without disclaimer.",
    enabled: true,
  },
  {
    id: "r5",
    name: "Banned phrases",
    category: "Brand",
    description: "Block “miracle”, “cure”, and competitor trademarks in generated copy.",
    enabled: true,
  },
  {
    id: "r6",
    name: "Claim checker",
    category: "Brand",
    description: "Flag unsubstantiated health claims before copy ships to ads or PDPs.",
    enabled: true,
  },
  {
    id: "r7",
    name: "Spend changes",
    category: "Approvals",
    description: "Require Telegram approval before scaling budgets or launching new campaigns.",
    enabled: true,
  },
  {
    id: "r8",
    name: "New creatives",
    category: "Approvals",
    description: "Ship creative previews to Telegram before uploading to Meta.",
    enabled: false,
  },
  {
    id: "r9",
    name: "New campaigns",
    category: "Approvals",
    description: "Block net-new campaign launches until you approve the brief in Telegram.",
    enabled: true,
  },
  {
    id: "r10",
    name: "Listing updates",
    category: "Store",
    description: "Auto-apply SEO title tweaks under 80 characters without approval.",
    enabled: true,
  },
  {
    id: "r11",
    name: "Price changes",
    category: "Store",
    description: "Never change live product prices — suggest only.",
    enabled: true,
  },
  {
    id: "r12",
    name: "Inventory sync",
    category: "Store",
    description: "Sync stock levels hourly — pause ads automatically when hero SKUs hit zero.",
    enabled: true,
  },
];

export const RULE_CATEGORIES: RuleCategory[] = ["Spend", "Brand", "Approvals", "Store"];
