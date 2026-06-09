"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import { copy } from "@/lib/copy";
import { IllustrativeDisclaimer } from "@/components/ui/IllustrativeDisclaimer";
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
          ? "border-border-subtle bg-surface-raised"
          : "border-emerald-500/20 bg-emerald-500/[0.06]",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p
        className={cx(
          "mt-1 text-sm font-medium leading-snug",
          variant === "before" ? "text-muted" : "text-foreground",
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
          ? "results-comparison-before border-rose-500/15 bg-gradient-to-b from-rose-950/20 to-transparent"
          : "results-comparison-after border-violet-500/25 bg-gradient-to-b from-violet-950/25 to-transparent shadow-[0_0_40px_rgba(124,58,237,0.12)]",
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
      <h3 className="mt-3 text-lg font-bold text-foreground sm:text-xl">{title}</h3>

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
      className="results-section scroll-mt-20 border-t border-border-subtle bg-surface-alt py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {RESULTS_KPIS.map((kpi) => (
            <GlassCard key={kpi.label} className="results-kpi-card p-4 sm:p-5">
              <p className="results-kpi-label text-[10px] font-semibold uppercase tracking-wider text-muted">
                {kpi.label}
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="results-kpi-before text-sm text-muted line-through">
                  {kpi.before}
                </span>
                <span className="results-kpi-after text-lg font-bold tabular-nums text-foreground">
                  {kpi.after}
                </span>
              </div>
              <p className="results-kpi-trend mt-1.5 text-xs font-semibold text-emerald-400">
                {kpi.trend}
              </p>
            </GlassCard>
          ))}
        </div>
        <IllustrativeDisclaimer className="mx-auto mt-3 max-w-lg">
          {t.kpiFootnote}
        </IllustrativeDisclaimer>

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
                    ? "results-mobile-toggle-active-after border-violet-500/50 bg-violet-500/20 text-foreground"
                    : "border-rose-500/40 bg-rose-500/15 text-foreground"
                  : "border-border-subtle bg-inset text-muted",
              )}
            >
              {view === "before" ? t.beforeLabel : t.afterLabel}
            </button>
          ))}
        </div>

        <div className="relative mt-6 lg:mt-10">
          <div
            className="results-vs-badge pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface-alt text-xs font-bold uppercase tracking-wider text-muted lg:flex"
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

        <IllustrativeDisclaimer className="mx-auto mt-8 max-w-2xl">
          {t.disclaimer}
        </IllustrativeDisclaimer>
      </div>
    </section>
  );
}
