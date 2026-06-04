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
      "About five minutes. Connect Shopify, Meta Ads, and Telegram via OAuth — no code, no engineering. Frydai starts scanning and drafting work the same day.",
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
      "Yes. Set brand voice, spend limits, discount caps, and when Frydai must ask before acting. Approvals and updates happen in Telegram — or WhatsApp / Slack where enabled.",
  },
  {
    id: "skills",
    question: "What skills are included?",
    answer:
      "50+ e-commerce skills out of the box: competitor research, ad creative, landing pages, listing SEO, Meta ads, email flows, and more. New skills ship weekly to your operator automatically.",
  },
  {
    id: "cancel",
    question: "How does billing and cancellation work?",
    answer:
      "Founding access is $187 every four weeks via Whop. EU VAT is included where applicable. Cancel anytime from your Whop account — no lock-in, no sales call required.",
  },
];
