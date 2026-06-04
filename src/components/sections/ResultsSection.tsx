"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import { copy } from "@/lib/copy";
import { COMPARISON_METRICS, RESULTS_KPIS } from "@/lib/results-data";

function MetricRow({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "before" | "after";
}) {
  return (
    <div
      className={cx(
        "rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3",
        variant === "before"
          ? "border-white/[0.08] bg-white/[0.02]"
          : "border-emerald-500/20 bg-emerald-500/[0.06]",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <p
        className={cx(
          "mt-1 text-sm font-medium leading-snug",
          variant === "before" ? "text-white/55" : "text-white/90",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ComparisonCard({
  variant,
  label,
  title,
}: {
  variant: "before" | "after";
  label: string;
  title: string;
}) {
  return (
    <GlassCard
      className={cx(
        "h-full p-5 sm:p-6",
        variant === "before"
          ? "border-rose-500/15 bg-gradient-to-b from-rose-950/20 to-transparent"
          : "border-violet-500/25 bg-gradient-to-b from-violet-950/25 to-transparent shadow-[0_0_40px_rgba(124,58,237,0.12)]",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cx(
            "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            variant === "before"
              ? "bg-rose-500/15 text-rose-300"
              : "bg-violet-500/20 text-violet-200",
          )}
        >
          {label}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">{title}</h3>

      <div className="mt-5 space-y-2">
        {COMPARISON_METRICS.map((metric) => (
          <MetricRow
            key={metric.label}
            label={metric.label}
            value={variant === "before" ? metric.before : metric.after}
            variant={variant}
          />
        ))}
      </div>
    </GlassCard>
  );
}

export function ResultsSection() {
  const { results: t } = copy;
  const [mobileView, setMobileView] = useState<"before" | "after">("after");

  return (
    <section
      id="results"
      className="scroll-mt-20 border-t border-white/10 bg-[#0a0a12] py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-white/55 sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {RESULTS_KPIS.map((kpi) => (
            <GlassCard key={kpi.label} className="p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                {kpi.label}
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm text-white/40 line-through decoration-white/25">
                  {kpi.before}
                </span>
                <span className="text-lg font-bold tabular-nums text-white">{kpi.after}</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-emerald-400">{kpi.trend}</p>
            </GlassCard>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-white/35">{t.kpiFootnote}</p>

        <div className="mt-8 flex justify-center gap-2 lg:hidden">
          {(["before", "after"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setMobileView(view)}
              className={cx(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                mobileView === view
                  ? view === "after"
                    ? "border-violet-500/50 bg-violet-500/20 text-white"
                    : "border-rose-500/40 bg-rose-500/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/50",
              )}
            >
              {view === "before" ? t.beforeLabel : t.afterLabel}
            </button>
          ))}
        </div>

        <div className="relative mt-6 lg:mt-10">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a0a12] text-xs font-bold uppercase tracking-wider text-white/50 lg:flex"
            aria-hidden
          >
            {t.vs}
          </div>

          <div className="hidden gap-6 lg:grid lg:grid-cols-2">
            <ComparisonCard variant="before" label={t.beforeLabel} title={t.beforeTitle} />
            <ComparisonCard variant="after" label={t.afterLabel} title={t.afterTitle} />
          </div>

          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileView}
                initial={{ opacity: 0, x: mobileView === "after" ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mobileView === "after" ? -12 : 12 }}
                transition={{ duration: 0.2 }}
              >
                <ComparisonCard
                  variant={mobileView}
                  label={mobileView === "before" ? t.beforeLabel : t.afterLabel}
                  title={mobileView === "before" ? t.beforeTitle : t.afterTitle}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/35">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
