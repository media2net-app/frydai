export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "setup",
    question: "How long does setup take?",
    answer:
      "About five minutes. You'll add your Telegram bot token and OpenAI API key (required), then optionally connect Shopify, Meta Ads, and other platforms. Frydai starts drafting work the same day.",
  },
  {
    id: "get-started",
    question: "What do I need to get started?",
    answer:
      "A Telegram bot token (from BotFather) and an OpenAI API key — both required. Shopify and Meta Ads are optional but unlock more skills like /listing-optimizer and /launch-ads.",
  },
  {
    id: "own-bot",
    question: "Do I get my own bot?",
    answer:
      "Yes. Each customer gets a private operator in an isolated Docker container, connected to your own Telegram bot and your API keys — not a shared Frydai inbox.",
  },
  {
    id: "brand-voice",
    question: "How does Frydai learn my brand?",
    answer:
      "During setup you enter your business profile — niche, offer, customer, and tone. Frydai compiles this into SOUL.md (brand voice) and AGENTS.md (business facts) so every skill runs with your context from day one.",
  },
  {
    id: "creative-pipeline",
    question: "How does ad creative generation work?",
    answer:
      "Connect HiggsField for Soul 2.0 / FLUX images and DoP video. If HiggsField isn't connected, Frydai can fall back to OpenAI image generation — but only after you confirm in Telegram. Nothing switches vendors silently.",
  },
  {
    id: "research-stack",
    question: "What powers competitor research?",
    answer:
      "Skills like /competitor-research and /scrape-ads use Apify and Airtable when connected — scraping competitor ads, extracting angles, and shipping intel packs back to your chat as PDFs and briefs.",
  },
  {
    id: "models",
    question: "Which AI models power Frydai?",
    answer:
      "Frydai routes tasks across Claude, Hermes, and Gemini depending on the skill — research, copy, analysis, or ops. You do not pick models manually; the operator handles it.",
  },
  {
    id: "customize",
    question: "Can I customize rules and approvals?",
    answer:
      "Yes. Set brand voice, spend limits, discount caps, and when Frydai must ask before acting. Approvals and updates happen in Telegram — or WhatsApp where configured.",
  },
  {
    id: "skills",
    question: "What skills are included?",
    answer:
      "40+ e-commerce skills with 21 core workflows. Examples: /competitor-research, /scrape-ads, /generate-ad-statics, /launch-ads, /build-page, /listing-optimizer, /store-health-monitor, and /abandoned-cart-rescuer. New capabilities ship regularly.",
  },
  {
    id: "cancel",
    question: "How does billing and cancellation work?",
    answer:
      "Founding access is €149 every four weeks via Whop. EU VAT is included where applicable. Cancel anytime from your Whop account — no lock-in, no sales call required.",
  },
];
