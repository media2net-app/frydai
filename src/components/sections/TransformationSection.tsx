"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { IllustrativeDisclaimer } from "@/components/ui/IllustrativeDisclaimer";
import {
  TRANSFORMATION_AFTER_HERO,
  TRANSFORMATION_BEFORE_HERO,
  TRANSFORMATION_METRICS,
} from "@/lib/transformation-data";

const PANEL_TITLE_CLASS = "text-xl font-bold leading-7 text-foreground sm:text-xl";

function MetricGrid({ variant }: { variant: "before" | "after" }) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
      {TRANSFORMATION_METRICS.map((metric) => {
        const value = variant === "before" ? metric.before : metric.after;
        const delta = variant === "after" ? metric.delta : undefined;

        return (
          <div
            key={metric.label}
            className={cx(
              "rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3",
              variant === "before"
                ? "metric-before border-border-subtle bg-surface-raised"
                : "metric-after border-emerald-500/15 bg-emerald-500/[0.05]",
            )}
          >
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              {metric.label}
            </dt>
            <dd className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
              <span
                className={cx(
                  "text-sm font-semibold tabular-nums sm:text-base",
                  variant === "before" ? "metric-value text-muted-strong" : "metric-value text-foreground",
                )}
              >
                {value}
              </span>
              {delta ? (
                <span className="text-[11px] font-semibold text-emerald-400">{delta}</span>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function TransformationPanel({
  variant,
  label,
  title,
}: {
  variant: "before" | "after";
  label: string;
  title: string;
}) {
  const hero = variant === "before" ? TRANSFORMATION_BEFORE_HERO : TRANSFORMATION_AFTER_HERO;

  return (
    <GlassCard
      className={cx(
        "h-full p-5 sm:p-7",
        variant === "before"
          ? "transformation-before-panel border-rose-500/20 bg-gradient-to-b from-rose-950/25 via-transparent to-transparent"
          : "transformation-after-panel card-transformation-after border-violet-500/30 bg-gradient-to-b from-violet-950/30 via-transparent to-transparent shadow-[0_0_48px_rgba(124,58,237,0.18)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cx(
            "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            variant === "before" ? "bg-rose-500/15 text-rose-300" : "bg-violet-500/20 text-violet-200",
          )}
        >
          {label}
        </span>
        <span
          className={cx(
            "text-[11px] font-semibold tabular-nums",
            variant === "before" ? "text-rose-400/90" : "text-emerald-400",
          )}
        >
          {hero.badge}
        </span>
      </div>

      <h3 className={cx("mt-3", PANEL_TITLE_CLASS)}>{title}</h3>

      <div className="mt-6 border-b border-border-subtle pb-6">
        <p
          className={cx(
            "text-3xl font-bold tracking-tight tabular-nums sm:text-4xl md:text-[2.75rem]",
            variant === "before" ? "hero-stat-value-before text-muted-strong" : "hero-stat-value-after text-foreground",
          )}
        >
          {hero.value}
        </p>
        <p className="mt-1 text-sm text-muted">{hero.label}</p>
      </div>

      <MetricGrid variant={variant} />
    </GlassCard>
  );
}

export function TransformationSection() {
  const { transformation: t } = copy;
  const [mobileView, setMobileView] = useState<"before" | "after">("after");
  return (
    <section
      id="transformation"
      className="scroll-mt-20 border-t border-border-subtle bg-surface py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-200 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

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
                  : "border-border-subtle bg-inset text-muted",
              )}
            >
              {view === "before" ? t.beforeLabel : t.afterLabel}
            </button>
          ))}
        </div>

        <div className="relative mt-6 lg:mt-12">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
            aria-hidden
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-surface text-lg font-bold text-muted">
              →
            </div>
          </div>

          <div className="hidden gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
            <TransformationPanel variant="before" label={t.beforeLabel} title={t.beforeTitle} />
            <TransformationPanel
              variant="after"
              label={t.afterLabel}
              title={t.afterTitle}
            />
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
                <TransformationPanel
                  variant={mobileView}
                  label={mobileView === "before" ? t.beforeLabel : t.afterLabel}
                  title={mobileView === "before" ? t.beforeTitle : t.afterTitle}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {t.pills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-border-subtle bg-fill-subtle px-3 py-1.5 text-xs font-medium text-muted sm:px-4 sm:text-sm"
            >
              {pill}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3">
          <DeployFrydaiButton>{t.cta}</DeployFrydaiButton>
          <IllustrativeDisclaimer className="max-w-xl">
            {t.disclaimer}
          </IllustrativeDisclaimer>
        </div>
      </div>
    </section>
  );
}
