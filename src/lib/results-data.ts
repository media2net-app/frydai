export type ComparisonMetric = {
  label: string;
  before: string;
  after: string;
  improved?: boolean;
};

export type ResultsKpi = {
  label: string;
  before: string;
  after: string;
  trend: string;
};

export const RESULTS_KPIS: ResultsKpi[] = [
  {
    label: "Monthly ops cost",
    before: "€18,150",
    after: "€149 / 4 wks",
    trend: "99% less",
  },
  {
    label: "Creatives / month",
    before: "4",
    after: "28+",
    trend: "7× output",
  },
  {
    label: "Research time",
    before: "12h / week",
    after: "Daily brief",
    trend: "Automated",
  },
  {
    label: "ROAS (example store)",
    before: "2.1×",
    after: "2.8×",
    trend: "+33%",
  },
];

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    label: "Monthly team & tools",
    before: "€18,150 · 9 freelancers + 8 SaaS",
    after: "€149 / 4 weeks · one operator",
    improved: true,
  },
  {
    label: "Creative turnaround",
    before: "3–5 days per brief",
    after: "Same-day hooks & scripts",
    improved: true,
  },
  {
    label: "Competitor intel",
    before: "Manual Reddit & ad library",
    after: "Daily scan · Telegram report",
    improved: true,
  },
  {
    label: "Ad optimization",
    before: "Check when you remember",
    after: "24/7 rules · scale or pause",
    improved: true,
  },
  {
    label: "Landing page updates",
    before: "Agency queue · weeks",
    after: "Angle-synced pages on demand",
    improved: true,
  },
  {
    label: "Visibility",
    before: "Scattered dashboards",
    after: "One thread · shipped work",
    improved: true,
  },
];
