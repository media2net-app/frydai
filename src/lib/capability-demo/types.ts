import type { CapabilityId } from "@/lib/capabilities-data";

export type DemoState = {
  stepIndex: number;
  feedIndex: number;
  metrics: Record<string, number>;
  cycleIndex: Record<string, number>;
};

export type StepTemplate =
  | { type: "cycle"; cycleKey: string; subtext?: string }
  | {
      type: "counter";
      metricKey: string;
      max: number;
      suffix: string;
      subtext?: string;
      progress?: boolean;
    }
  | {
      type: "score";
      metricKey: string;
      max: number;
      scoreLabel: string;
      progress?: boolean;
      displayDivisor?: number;
    }
  | {
      type: "cycleMetric";
      cycleKey: string;
      metricKey: string;
      metricMax: number;
      metricLabel: string;
    }
  | {
      type: "counterQuote";
      metricKey: string;
      max: number;
      suffix: string;
      quoteCycleKey: string;
    }
  | { type: "cycleFooter"; cycleKey: string; footer: string }
  | { type: "cycleBadge"; cycleKey: string; badge: string; badgeLabel: string }
  | { type: "skillGrid"; metricKey: string; max: number };

export type CapabilityDemoConfig = {
  stepIds: string[];
  steps: Record<string, { label: string; template: StepTemplate }>;
  cycles: Record<string, string[]>;
  feed: string[];
  feedLabel: string;
  initial: DemoState;
  reducedMotion: DemoState;
  microStepId?: string;
  microMetricKey?: string;
  tick: (prev: DemoState) => DemoState;
};

export type CapabilityDemoRegistry = Record<CapabilityId, CapabilityDemoConfig>;
