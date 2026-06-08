/** Maps DOM section ids to likely React/CSS source files (per-project; edit for other sites). */
export const SECTION_SOURCE_MAP: Record<string, string[]> = {
  hero: [
    "src/components/hero/HeroBlock.tsx",
    "src/components/hero/HeroSection.tsx",
    "src/components/hero/HeroHeadline.tsx",
  ],
  header: ["src/components/layout/SiteHeader.tsx", "src/components/layout/HeroMobileNav.tsx"],
  footer: ["src/components/layout/SiteFooter.tsx"],
  demo: [
    "src/components/sections/CommandCenterSection.tsx",
    "src/components/sections/CommandCenterBoard.tsx",
  ],
  capabilities: ["src/components/sections/CapabilitiesSection.tsx"],
  creatives: ["src/components/sections/CreativesSection.tsx"],
  pricing: ["src/components/sections/PricingSection.tsx"],
  faq: ["src/components/sections/FaqSection.tsx"],
  testimonials: [
    "src/components/sections/TestimonialsSection.tsx",
    "src/lib/testimonials-data.ts",
  ],
  results: ["src/components/sections/ResultsSection.tsx"],
  "how-it-works": ["src/components/sections/HowItWorksSection.tsx"],
  transformation: ["src/components/sections/TransformationSection.tsx"],
};

export const GLOBAL_STYLE_FILES = [
  "src/app/globals.css",
  "src/app/theme-light.css",
  "src/app/hero-theme.css",
  "src/app/sections-theme.css",
];

export const COPY_SOURCE_FILE = "messages/en.json";

const FALLBACK_SECTION_PREFIXES = ["section-"];

export function resolveFilesForSection(sectionId: string, label?: string): string[] {
  const key = sectionId.toLowerCase();
  if (SECTION_SOURCE_MAP[key]) return SECTION_SOURCE_MAP[key];

  const labelKey = (label ?? "").toLowerCase();
  if (SECTION_SOURCE_MAP[labelKey]) return SECTION_SOURCE_MAP[labelKey];

  if (FALLBACK_SECTION_PREFIXES.some((p) => key.startsWith(p))) {
    return [];
  }

  return [];
}
