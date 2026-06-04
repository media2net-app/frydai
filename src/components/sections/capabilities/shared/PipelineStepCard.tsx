"use client";

import { motion } from "framer-motion";
import { cx } from "@/lib/cx";
import { getAccentStyles } from "@/lib/capability-demo/accent";
import type { CapabilityId } from "@/lib/capabilities-data";

export function PipelineStepCard({
  label,
  stepId,
  activeStep,
  completed,
  capabilityId,
  children,
}: {
  label: string;
  stepId: string;
  activeStep: string;
  completed: boolean;
  capabilityId: CapabilityId;
  children: React.ReactNode;
}) {
  const accent = getAccentStyles(capabilityId);
  const isActive = activeStep === stepId;

  return (
    <motion.div
      layout
      className={cx(
        "relative rounded-xl border p-3 transition-colors duration-300",
        isActive && accent.activeCard,
        completed && !isActive && "border-emerald-500/25 bg-emerald-500/[0.06]",
        !isActive && !completed && "border-white/10 bg-white/[0.03]",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
        {isActive && (
          <span
            className={cx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
              accent.activeBadge,
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={cx(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  accent.activeDot,
                )}
              />
              <span className={cx("relative h-1.5 w-1.5 rounded-full", accent.activeDot)} />
            </span>
            Live
          </span>
        )}
        {completed && !isActive && (
          <span className="text-[9px] font-semibold text-emerald-400">✓</span>
        )}
      </div>
      {children}
    </motion.div>
  );
}
