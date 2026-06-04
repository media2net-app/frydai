import type { CapabilityId } from "@/lib/capabilities-data";
import type { CapabilityDemoRegistry, DemoState } from "./types";

function nextCycle(prev: DemoState, key: string, len: number): number {
  return ((prev.cycleIndex[key] ?? 0) + 1) % len;
}

function advanceCycles(prev: DemoState, cycles: Record<string, string[]>): Record<string, number> {
  const cycleIndex = { ...prev.cycleIndex };
  for (const key of Object.keys(cycles)) {
    cycleIndex[key] = nextCycle(prev, key, cycles[key].length);
  }
  return cycleIndex;
}

const RESEARCH_CYCLES = {
  sources: ["X · trending posts", "Reddit · 47 threads", "Meta Ads Library", "Competitor stores"],
  reports: [
    "Next intel report · 07:00",
    "Report drafting — 84% complete",
    "Shipping to Telegram when ready",
    "Morning brief scheduled",
  ],
};

const AD_CYCLES = {
  briefs: [
    "Angle: social proof + before/after",
    "Angle: UGC testimonial · 30s",
    "Angle: problem-agitate-solve",
    "From winning Meta ad · 2.4x ROAS",
  ],
  hooks: [
    "Stop scrolling if you're tired of bloating…",
    "I tried every greens powder — then this…",
    "POV: your morning routine finally works",
    "Dermatologists hate this $29 hack",
  ],
  assets: ["UGC script · 42 sec", "Static ad · 1080×1080", "Video brief · hook-first", "Carousel · 4 frames"],
  exports: [
    "Queued for Meta Ads Manager",
    "Awaiting Telegram approval",
    "3 creatives ready to publish",
    "Scheduled · tomorrow 09:00",
  ],
};

const LANDING_CYCLES = {
  angles: ["Listicle · top 7 reasons", "Advertorial · doctor angle", "Product page · bundle hero", "Quiz funnel · 3 steps"],
  blocks: ["Hero + social proof", "Comparison table", "FAQ + guarantee", "Sticky CTA bar"],
  tests: ["Headline A vs B", "CTA: Shop now vs Try risk-free", "Price anchor test", "Trust badge placement"],
  publishes: ["Preview link sent", "Shopify draft saved", "A/B test armed", "Live · congruent with ads"],
};

const STORE_CYCLES = {
  listings: ["SKU-104 · title refresh", "Bundle · 2-pack variant", "New collection tag", "SEO meta updated"],
  images: ["Background removed", "Lifestyle crop 4:5", "Alt text generated", "Compression −38%"],
  trends: ["Niche trend: gut health", "Keyword spike +22%", "Competitor SKU mapped", "Seasonal tag added"],
  alerts: ["Low stock · 12 units", "Price sync complete", "Review summary queued", "Telegram digest sent"],
};

const MARKETING_CYCLES = {
  campaigns: ["ASC · broad · $120/day", "Retarget · 7-day view", "UGC creative test", "Lookalike 2% purchasers"],
  emails: ["Welcome flow · step 2", "Cart abandon · 1hr", "Win-back · 14 days", "Post-purchase upsell"],
  reports: ["ROAS 2.8 · yesterday", "CPA down 11% WoW", "Creative fatigue flagged", "Budget scale rec. sent"],
  channels: ["Meta · active", "Email · 3 flows live", "Organic · 2 posts queued", "Telegram · report ready"],
};

const MORE_CYCLES = {
  skills: ["Amazon listing audit", "Influencer outreach", "Chargeback response", "Wholesale pricing calc"],
  drops: ["Skill pack · Mar 12", "Skill pack · Mar 19", "Beta: TikTok Shop sync", "New: Klaviyo segments"],
  rules: ["Brand voice guardrail", "Max discount 25%", "Auto-pause below 1.5 ROAS", "Approval for spend >$500"],
  status: ["52 skills active", "53 skills active", "54 skills active", "55 skills active"],
};

export const CAPABILITY_DEMO_CONFIGS: CapabilityDemoRegistry = {
  research: {
    stepIds: ["ingest", "signals", "pattern", "report"],
    steps: {
      ingest: { label: "Data ingestion", template: { type: "cycle", cycleKey: "sources", subtext: "Sources scanning…" } },
      signals: {
        label: "Signal processing",
        template: { type: "counter", metricKey: "signals", max: 452, suffix: "signals", progress: true },
      },
      pattern: {
        label: "Pattern match",
        template: { type: "score", metricKey: "confidence", max: 100, scoreLabel: "confidence", progress: true },
      },
      report: {
        label: "Intel report",
        template: { type: "cycleFooter", cycleKey: "reports", footer: "via Telegram" },
      },
    },
    cycles: RESEARCH_CYCLES,
    feed: [
      "Scraping r/Supplements for AG1 mentions…",
      "Bloom pricing changed — logged",
      "Organifi ad angles indexed",
      "New hook pattern detected (+12% CTR est.)",
      "Competitor landing page diff saved",
      "Price drop alert queued for Telegram",
    ],
    feedLabel: "Live research feed",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { signals: 418, confidence: 78 },
      cycleIndex: {},
    },
    reducedMotion: {
      stepIndex: 2,
      feedIndex: 0,
      metrics: { signals: 452, confidence: 92 },
      cycleIndex: {},
    },
    microStepId: "signals",
    microMetricKey: "signals",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["ingest", "signals", "pattern", "report"][nextStepIndex];
      let { signals, confidence } = prev.metrics;
      if (step === "signals" || step === "pattern" || step === "report") {
        signals = Math.min(452, signals + Math.floor(4 + Math.random() * 9));
      } else {
        signals = Math.max(380, signals - 12);
      }
      if (step === "pattern" || step === "report") confidence = Math.min(92, confidence + 2);
      else if (step === "ingest") confidence = Math.max(74, confidence - 1);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { signals, confidence },
        cycleIndex: advanceCycles(prev, RESEARCH_CYCLES),
      };
    },
  },

  adCreative: {
    stepIds: ["brief", "hooks", "assets", "export"],
    steps: {
      brief: { label: "Creative brief", template: { type: "cycle", cycleKey: "briefs", subtext: "Synced from research intel" } },
      hooks: {
        label: "Hook variants",
        template: { type: "counterQuote", metricKey: "variants", max: 12, suffix: "variants", quoteCycleKey: "hooks" },
      },
      assets: {
        label: "Asset production",
        template: {
          type: "cycleMetric",
          cycleKey: "assets",
          metricKey: "assetsBuilt",
          metricMax: 4,
          metricLabel: "of 4 asset types built",
        },
      },
      export: {
        label: "Launch ready",
        template: { type: "cycleBadge", cycleKey: "exports", badge: "M", badgeLabel: "Meta Ads Manager" },
      },
    },
    cycles: AD_CYCLES,
    feed: [
      "Drafting hook variant #7 from competitor scan…",
      "UGC script aligned to landing page angle",
      "Static ad copy — CTA variant B selected",
      "TikTok UGC angle added to brief",
      "Thumbnail text A/B test queued",
      "Creative pack sent for approval",
    ],
    feedLabel: "Live creative feed",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { variants: 6, assetsBuilt: 1 },
      cycleIndex: {},
    },
    reducedMotion: {
      stepIndex: 3,
      feedIndex: 0,
      metrics: { variants: 12, assetsBuilt: 4 },
      cycleIndex: {},
    },
    microStepId: "hooks",
    microMetricKey: "variants",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["brief", "hooks", "assets", "export"][nextStepIndex];
      let { variants, assetsBuilt } = prev.metrics;
      if (step === "hooks" || step === "assets" || step === "export") variants = Math.min(12, variants + 1);
      else variants = Math.max(4, variants - 2);
      if (step === "assets" || step === "export") assetsBuilt = Math.min(4, assetsBuilt + 1);
      else if (step === "brief") assetsBuilt = Math.max(0, assetsBuilt - 1);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { variants, assetsBuilt },
        cycleIndex: advanceCycles(prev, AD_CYCLES),
      };
    },
  },

  landingPages: {
    stepIds: ["sync", "build", "optimize", "publish"],
    steps: {
      sync: { label: "Angle sync", template: { type: "cycle", cycleKey: "angles", subtext: "Matched to active ad creative" } },
      build: {
        label: "Page build",
        template: { type: "counter", metricKey: "sections", max: 8, suffix: "sections", progress: true, subtext: "blocks assembled" },
      },
      optimize: {
        label: "CRO polish",
        template: { type: "cycle", cycleKey: "tests", subtext: "A/B variants staged" },
      },
      publish: {
        label: "Go live",
        template: { type: "cycleFooter", cycleKey: "publishes", footer: "Full funnel congruency" },
      },
    },
    cycles: LANDING_CYCLES,
    feed: [
      "Mirroring hook from winning ad into hero…",
      "Listicle section 4 drafted",
      "Mobile CTA sticky bar added",
      "Shopify preview link generated",
      "Headline B queued for split test",
      "Page speed score 94 — passed",
    ],
    feedLabel: "Live page builder",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { sections: 3 },
      cycleIndex: {},
    },
    reducedMotion: { stepIndex: 3, feedIndex: 0, metrics: { sections: 8 }, cycleIndex: {} },
    microStepId: "build",
    microMetricKey: "sections",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["sync", "build", "optimize", "publish"][nextStepIndex];
      let { sections } = prev.metrics;
      if (step === "build" || step === "optimize" || step === "publish") sections = Math.min(8, sections + 1);
      else sections = Math.max(2, sections - 1);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { sections },
        cycleIndex: advanceCycles(prev, LANDING_CYCLES),
      };
    },
  },

  storeManagement: {
    stepIds: ["listings", "media", "trends", "alerts"],
    steps: {
      listings: { label: "Listings", template: { type: "cycle", cycleKey: "listings", subtext: "Catalog sync · Shopify" } },
      media: {
        label: "Image ops",
        template: { type: "counter", metricKey: "images", max: 24, suffix: "images", progress: true, subtext: "processed today" },
      },
      trends: { label: "Trend watch", template: { type: "cycle", cycleKey: "trends", subtext: "Niche signals tracked" } },
      alerts: { label: "Store alerts", template: { type: "cycleFooter", cycleKey: "alerts", footer: "24/7 monitoring" } },
    },
    cycles: STORE_CYCLES,
    feed: [
      "Refreshing product titles for SEO…",
      "Compressing gallery images batch #3",
      "Trend tag applied to collection",
      "Inventory threshold check complete",
      "Competitor price match evaluated",
      "Weekly store health report queued",
    ],
    feedLabel: "Live store feed",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { images: 14 },
      cycleIndex: {},
    },
    reducedMotion: { stepIndex: 3, feedIndex: 0, metrics: { images: 24 }, cycleIndex: {} },
    microStepId: "media",
    microMetricKey: "images",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["listings", "media", "trends", "alerts"][nextStepIndex];
      let { images } = prev.metrics;
      if (step === "media" || step === "trends" || step === "alerts") images = Math.min(24, images + 2);
      else images = Math.max(8, images - 3);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { images },
        cycleIndex: advanceCycles(prev, STORE_CYCLES),
      };
    },
  },

  marketing: {
    stepIds: ["campaigns", "lifecycle", "analytics", "orchestrate"],
    steps: {
      campaigns: { label: "Paid campaigns", template: { type: "cycle", cycleKey: "campaigns", subtext: "Meta · managed" } },
      lifecycle: { label: "Email flows", template: { type: "cycle", cycleKey: "emails", subtext: "Klaviyo · automated" } },
      analytics: {
        label: "Performance",
        template: {
          type: "score",
          metricKey: "roas",
          max: 35,
          scoreLabel: "ROAS",
          progress: true,
          displayDivisor: 10,
        },
      },
      orchestrate: { label: "Orchestration", template: { type: "cycle", cycleKey: "channels", subtext: "All channels aligned" } },
    },
    cycles: MARKETING_CYCLES,
    feed: [
      "Scaling winning ad set +15% budget…",
      "Cart abandon email triggered",
      "Organic post scheduled for 18:00",
      "CPA spike detected — rule applied",
      "Weekly performance digest drafting",
      "Creative refresh recommended in Telegram",
    ],
    feedLabel: "Live marketing feed",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { roas: 24 },
      cycleIndex: {},
    },
    reducedMotion: { stepIndex: 2, feedIndex: 0, metrics: { roas: 28 }, cycleIndex: {} },
    microStepId: "analytics",
    microMetricKey: "roas",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["campaigns", "lifecycle", "analytics", "orchestrate"][nextStepIndex];
      let { roas } = prev.metrics;
      if (step === "analytics" || step === "orchestrate") roas = Math.min(35, roas + 1);
      else if (step === "campaigns") roas = Math.max(20, roas - 1);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { roas },
        cycleIndex: advanceCycles(prev, MARKETING_CYCLES),
      };
    },
  },

  more: {
    stepIds: ["discover", "install", "configure", "fleet"],
    steps: {
      discover: { label: "Skill discovery", template: { type: "cycle", cycleKey: "skills", subtext: "Trending on X · e-com" } },
      install: {
        label: "Auto-install",
        template: { type: "counter", metricKey: "skillCount", max: 55, suffix: "skills", progress: true, subtext: "in your operator" },
      },
      configure: { label: "Your rules", template: { type: "cycle", cycleKey: "rules", subtext: "Guardrails active" } },
      fleet: { label: "Fleet status", template: { type: "cycle", cycleKey: "status", subtext: "Updated weekly" } },
    },
    cycles: MORE_CYCLES,
    feed: [
      "New skill detected: TikTok Shop listings…",
      "Installing skill pack — no downtime",
      "Guardrail updated from Telegram command",
      "Team workflow template applied",
      "Twitter trend mapped to operator capability",
      "Skill changelog sent to your channel",
    ],
    feedLabel: "Live skill feed",
    initial: {
      stepIndex: 0,
      feedIndex: 0,
      metrics: { skillCount: 50 },
      cycleIndex: {},
    },
    reducedMotion: { stepIndex: 3, feedIndex: 0, metrics: { skillCount: 55 }, cycleIndex: {} },
    microStepId: "install",
    microMetricKey: "skillCount",
    tick(prev) {
      const nextStepIndex = (prev.stepIndex + 1) % 4;
      const step = ["discover", "install", "configure", "fleet"][nextStepIndex];
      let { skillCount } = prev.metrics;
      if (step === "install" || step === "configure" || step === "fleet") skillCount = Math.min(55, skillCount + 1);
      else skillCount = Math.max(48, skillCount - 1);
      return {
        stepIndex: nextStepIndex,
        feedIndex: (prev.feedIndex + 1) % 6,
        metrics: { skillCount },
        cycleIndex: advanceCycles(prev, MORE_CYCLES),
      };
    },
  },
};

export function getDemoConfig(id: CapabilityId) {
  return CAPABILITY_DEMO_CONFIGS[id];
}
