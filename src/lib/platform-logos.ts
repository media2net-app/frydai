/** Official platform logos — SVG from Integrations/ (Viktor) or high-res Viktor PNG/WebP */
export const platformLogos = {
  shopify: "/platforms/shopify.svg",
  meta: "/platforms/meta.png",
  telegram: "/platforms/telegram.webp",
  whatsapp: "/platforms/whatsapp.webp",
  stripe: "/platforms/stripe.svg",
  googleAds: "/platforms/google-ads.svg",
  notion: "/platforms/notion.svg",
  hubspot: "/platforms/hubspot.svg",
  klaviyo: "/platforms/klaviyo.svg",
  openai: "/platforms/openai.svg",
  claude: "/platforms/claude.svg",
  gemini: "/platforms/gemini.webp",
  mistral: "/platforms/mistral.svg",
} as const;

export type PlatformLogoId = keyof typeof platformLogos;
