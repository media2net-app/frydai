import type { AuditProjectContext } from "./runtime/types";

/**
 * Per-project audit context. Copy and edit when integrating the skill elsewhere.
 */
export const auditProjectConfig: AuditProjectContext = {
  productName: "Frydai",
  productDescription:
    "AI operator for e-commerce: research, creatives, store ops, and Telegram delivery.",
  designGoal: "rebrand",
  previousSiteUrl: "https://www.frydai.ai",
  designNotes:
    "Rebranding of the original frydai.ai site. Evaluate whether the new design clearly signals evolution, keeps brand recognition, and improves conversion vs the old site.",
  competitors: [
    {
      name: "EcomClaw",
      url: "https://www.ecomclaw.co",
      notes: "Direct competitor in AI e-commerce operator space.",
    },
  ],
};
