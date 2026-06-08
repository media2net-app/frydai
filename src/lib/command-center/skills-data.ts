export type SkillCategory = "Research" | "Content" | "Store" | "Ads" | "Marketing" | "Ops";

export type DashboardSkill = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  enabled: boolean;
  isNew?: boolean;
};

const BASE_SKILLS: Omit<DashboardSkill, "id">[] = [
  { name: "Competitor analysis", category: "Research", description: "Track pricing, offers, and positioning across brands.", enabled: true },
  { name: "Reddit scraping", category: "Research", description: "Scan threads for sentiment, objections, and angles.", enabled: true },
  { name: "Trend detection", category: "Research", description: "Surface rising products and hooks from social signals.", enabled: true },
  { name: "Price monitoring", category: "Research", description: "Alert on flash sales and MAP violations.", enabled: true },
  { name: "Meta Ads Library scan", category: "Research", description: "Ingest competitor creatives and landing URLs.", enabled: true },
  { name: "Amazon listing audit", category: "Research", description: "Score listings vs. category leaders.", enabled: false },
  { name: "Creative strategy", category: "Content", description: "Turn intel into campaign angles and briefs.", enabled: true },
  { name: "UGC scripts", category: "Content", description: "Hook-first scripts ready for creators.", enabled: true },
  { name: "Static ads", category: "Content", description: "Generate static variants from winning angles.", enabled: true },
  { name: "Hook variants", category: "Content", description: "A/B hooks aligned with ad + LP congruency.", enabled: true },
  { name: "TikTok UGC angles", category: "Content", description: "Spark-ad ready concepts from trends.", enabled: true, isNew: true },
  { name: "Listicles", category: "Content", description: "Long-form pages matched to ad angles.", enabled: true },
  { name: "Advertorials", category: "Content", description: "Story-led pages with compliant claims.", enabled: true },
  { name: "Product pages", category: "Content", description: "PDP copy and structure optimizations.", enabled: true },
  { name: "Bundle offers", category: "Content", description: "Offer stacks and urgency blocks.", enabled: false },
  { name: "Product listings", category: "Store", description: "Titles, bullets, and backend keywords.", enabled: true },
  { name: "Image optimization", category: "Store", description: "Alt text and gallery recommendations.", enabled: true },
  { name: "SEO updates", category: "Store", description: "Collection and PDP meta refresh.", enabled: true },
  { name: "Inventory alerts", category: "Store", description: "Flag low stock and bundle breaks.", enabled: true },
  { name: "Trend analysis", category: "Store", description: "Niche momentum for catalog expansion.", enabled: false },
  { name: "Meta ads", category: "Ads", description: "Scale, pause, and refresh on CPA rules.", enabled: true },
  { name: "Ad analysis", category: "Ads", description: "Weekly ROAS and creative fatigue reports.", enabled: true },
  { name: "Budget scaling", category: "Ads", description: "Increase spend on winners with guardrails.", enabled: true },
  { name: "Creative refresh", category: "Ads", description: "Rotate hooks before CPA drifts.", enabled: true },
  { name: "Email marketing", category: "Marketing", description: "Flows and campaigns via Klaviyo.", enabled: true },
  { name: "Organic posting", category: "Marketing", description: "Queue posts from approved assets.", enabled: false },
  { name: "Klaviyo segments", category: "Marketing", description: "Behavioral segments from store events.", enabled: true, isNew: true },
  { name: "Cart abandonment v2", category: "Marketing", description: "Copy + timing experiments on flows.", enabled: true },
  { name: "Telegram commands", category: "Ops", description: "Approve, pause, or reprioritize via chat.", enabled: true },
  { name: "Custom rules", category: "Ops", description: "CPA ceilings, brand voice, banned claims.", enabled: true },
  { name: "Guardrails", category: "Ops", description: "Human-in-the-loop before spend changes.", enabled: true },
  { name: "Team workflows", category: "Ops", description: "Shared approvals for multi-seat brands.", enabled: false },
  { name: "Chargeback response", category: "Ops", description: "Draft evidence packs from order data.", enabled: false },
  { name: "Wholesale pricing calc", category: "Ops", description: "Margin scenarios for B2B SKUs.", enabled: false },
  { name: "Influencer outreach", category: "Marketing", description: "Shortlists and DM templates.", enabled: false },
  { name: "Weekly skill drops", category: "Ops", description: "Auto-enable trending capabilities.", enabled: true },
];

export const DASHBOARD_SKILLS: DashboardSkill[] = BASE_SKILLS.map((skill, index) => ({
  ...skill,
  id: `skill-${index + 1}`,
}));

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Research",
  "Content",
  "Store",
  "Ads",
  "Marketing",
  "Ops",
];

export function countEnabledSkills(skills: DashboardSkill[]) {
  return skills.filter((s) => s.enabled).length;
}
