export type TransformationMetric = {
  label: string;
  before: string;
  after: string;
  /** Shown on after value when improved (e.g. ↓86%) */
  delta?: string;
};

export const TRANSFORMATION_BEFORE_HERO = {
  value: "€1.042",
  label: "Monthly revenue",
  badge: "↓ Losing money",
};

export const TRANSFORMATION_AFTER_HERO = {
  value: "€60.294",
  label: "Profit · 90 days",
  badge: "↑ Same store",
};

export const TRANSFORMATION_METRICS: TransformationMetric[] = [
  { label: "ROAS", before: "0.8×", after: "3.2×", delta: "↑ 4×" },
  { label: "Ad spend", before: "€1.200", after: "€18.800" },
  { label: "CPA", before: "€68", after: "€9,40", delta: "↓ 86%" },
  { label: "Creatives", before: "3 / month", after: "75+ / month" },
  { label: "Conversion", before: "0,4%", after: "3,4%", delta: "↑ 750%" },
  { label: "Profit", before: "−€158", after: "€60.294" },
];
