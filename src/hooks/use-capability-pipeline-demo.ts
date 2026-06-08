"use client";

import { useEffect, useState } from "react";
import type { CapabilityId } from "@/lib/capabilities-data";
import { getDemoConfig } from "@/lib/capability-demo/configs";
import type { DemoState } from "@/lib/capability-demo/types";

function getInitialDemoState(capabilityId: CapabilityId): DemoState {
  const cfg = getDemoConfig(capabilityId);
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return cfg.reducedMotion;
  }
  return cfg.initial;
}

export function useCapabilityPipelineDemo(capabilityId: CapabilityId, enabled: boolean) {
  const config = getDemoConfig(capabilityId);
  const [state, setState] = useState<DemoState>(() => getInitialDemoState(capabilityId));

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cfg = getDemoConfig(capabilityId);

    const interval = setInterval(() => {
      setState((prev) => cfg.tick(prev));
    }, 2400);

    const micro =
      cfg.microStepId && cfg.microMetricKey
        ? setInterval(() => {
            setState((prev) => {
              const activeStep = cfg.stepIds[prev.stepIndex];
              if (activeStep !== cfg.microStepId) return prev;
              const key = cfg.microMetricKey!;
              const template = cfg.steps[activeStep]?.template;
              let max = 999;
              if (
                template &&
                (template.type === "counter" ||
                  template.type === "counterQuote" ||
                  template.type === "score")
              ) {
                max = template.max;
              }
              const current = prev.metrics[key] ?? 0;
              return {
                ...prev,
                metrics: { ...prev.metrics, [key]: Math.min(max, current + 1) },
              };
            });
          }, 200)
        : undefined;

    return () => {
      clearInterval(interval);
      if (micro) clearInterval(micro);
    };
  }, [enabled, capabilityId]);

  const activeStep = config.stepIds[state.stepIndex];
  const activeIndex = state.stepIndex;
  const feedLine = config.feed[state.feedIndex % config.feed.length];

  return {
    config,
    state,
    activeStep,
    activeIndex,
    feedLine,
    metrics: state.metrics,
    cycleIndex: state.cycleIndex,
  };
}
