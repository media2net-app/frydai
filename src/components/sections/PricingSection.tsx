"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { copy } from "@/lib/copy";
import {
  FOUNDING_FEATURES,
  FRYDAI_PERIOD,
  FRYDAI_PRICE,
  MONTHLY_SAVINGS,
  TEAM_LINE_ITEMS,
  TEAM_TOTAL,
} from "@/lib/pricing-data";

export function PricingSection() {
  const { pricing: t } = copy;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-border-subtle bg-surface py-16 sm:py-24 md:py-28"
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

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <GlassCard className="border-border-subtle p-5 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-300/80">
              {t.teamLabel}
            </p>
            <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">{t.teamTitle}</h3>

            <ul className="mt-6 space-y-2.5">
              {TEAM_LINE_ITEMS.map((item) => (
                <li
                  key={item.role}
                  className="flex items-center justify-between gap-4 border-b border-border-subtle pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-muted">{item.role}</span>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-muted-strong">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between gap-4 rounded-xl border border-rose-500/15 bg-rose-500/[0.06] px-4 py-3">
              <span className="text-sm font-semibold text-foreground/60">{t.teamTotalLabel}</span>
              <div className="text-right">
                <span className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                  {TEAM_TOTAL}
                </span>
                <span className="ml-1 text-sm text-muted">{t.teamPeriod}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="pricing-featured-card relative overflow-hidden border-violet-500/30 p-5 shadow-[0_0_48px_rgba(124,58,237,0.18)] sm:p-8">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo/15 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              <span className="inline-flex rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-200">
                {t.planBadge}
              </span>
              <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">{t.planTitle}</h3>
              <p className="mt-1 text-sm text-muted">{t.planSubtitle}</p>

              <div className="mt-6 flex flex-wrap items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {FRYDAI_PRICE}
                </span>
                <span className="text-lg text-muted">{FRYDAI_PERIOD}</span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {FOUNDING_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-strong">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-400">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <DeployFrydaiButton className="mt-8 w-full">
                {t.cta}
              </DeployFrydaiButton>
              <p className="mt-3 text-center text-xs text-muted">{t.ctaNote}</p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mx-auto mt-6 max-w-3xl border-violet-500/20 bg-violet-500/[0.06] p-5 text-center sm:mt-8 sm:p-6">
          <p className="text-sm text-muted">{t.mathLabel}</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-emerald-400 sm:text-4xl">
            {MONTHLY_SAVINGS}
          </p>
          <p className="mt-1 text-sm text-muted">{t.mathPer}</p>
          <p className="mt-3 text-[10px] text-muted">{t.mathNote}</p>
        </GlassCard>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
