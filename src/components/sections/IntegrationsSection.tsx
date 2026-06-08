"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import {
  INTEGRATION_DIRECTORY,
  INTEGRATION_TIER_LOGOS,
  INTEGRATION_USE_CASE_LOGOS,
  type IntegrationDirectoryItem,
  type IntegrationFilter,
  type IntegrationTierId,
  type IntegrationUseCaseId,
} from "@/lib/integrations-data";

function isRasterImage(src: string): boolean {
  return /\.(png|jpe?g|webp|avif)$/i.test(src);
}

function IntegrationIcon({
  item,
  size = 28,
}: {
  item: Pick<IntegrationDirectoryItem, "iconSrc" | "monogram" | "monogramClass" | "name">;
  size?: number;
}) {
  if (item.iconSrc) {
    return (
      <Image
        src={item.iconSrc}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        unoptimized={!isRasterImage(item.iconSrc)}
      />
    );
  }

  return (
    <span
      className={cx(
        "flex items-center justify-center rounded-md text-[10px] font-bold",
        item.monogramClass,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {item.monogram}
    </span>
  );
}

function LogoStrip({ logos, size = 22 }: { logos: string[]; size?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {logos.map((src) => (
        <span
          key={src}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-fill-subtle"
        >
          <Image
            src={src}
            alt=""
            width={size}
            height={size}
            className="object-contain"
            unoptimized={!isRasterImage(src)}
          />
        </span>
      ))}
    </div>
  );
}

function DirectoryTile({ item }: { item: IntegrationDirectoryItem }) {
  return (
    <div className="integration-directory-tile flex items-center gap-3 rounded-xl border border-border-subtle bg-fill-subtle/60 px-3 py-2.5 transition-colors hover:border-violet-500/25 hover:bg-fill-muted">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-raised">
        <IntegrationIcon item={item} size={22} />
      </span>
      <span className="truncate text-sm font-semibold text-foreground">{item.name}</span>
    </div>
  );
}

export function IntegrationsSection() {
  const { integrations: t } = copy;
  const [activeUseCase, setActiveUseCase] = useState<IntegrationUseCaseId>("ads");
  const [filter, setFilter] = useState<IntegrationFilter>("all");
  const [query, setQuery] = useState("");

  const activeUseCaseData =
    t.useCases.find((uc) => uc.id === activeUseCase) ?? t.useCases[0];

  const filteredDirectory = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return INTEGRATION_DIRECTORY.filter((item) => {
      const matchesCategory = filter === "all" || item.category === filter;
      const matchesQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.id.includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const filterOptions: IntegrationFilter[] = ["all", "channels", "store", "ads", "ai"];

  return (
    <section
      id="integrations"
      className="integrations-section scroll-mt-20 border-t border-border-subtle bg-surface py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">{t.subtitle}</p>
          <div className="mt-6 inline-flex items-baseline gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2">
            <span className="text-2xl font-bold tabular-nums text-violet-200 sm:text-3xl">{t.stat}</span>
            <span className="text-sm font-medium text-muted">{t.statLabel}</span>
          </div>
        </div>

        {/* How it works — 3 steps */}
        <div className="mt-12 sm:mt-16">
          <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
            {t.howItWorksTitle}
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
            {t.steps.map((step, index) => (
              <li key={step.title}>
                <GlassCard className="relative h-full p-5 sm:p-6">
                  <span className="font-mono text-xs font-bold text-violet-300/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </GlassCard>
              </li>
            ))}
          </ol>
        </div>

        {/* Three connection tiers — Viktor pattern */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mx-auto max-w-2xl text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t.tiersTitle}
          </h3>
          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
            {t.tiers.map((tier) => {
              const tierId = tier.id as IntegrationTierId;
              return (
                <GlassCard
                  key={tier.id}
                  className="flex h-full flex-col p-5 sm:p-6 integration-tier-card"
                >
                  <span className="inline-flex w-fit rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-200">
                    {tier.badge}
                  </span>
                  <h4 className="mt-4 text-lg font-bold text-foreground">{tier.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tier.description}</p>
                  <p className="mt-4 text-xs font-medium text-muted-strong">{tier.examplesLabel}</p>
                  <p className="mt-1 text-sm text-foreground/80">{tier.examples}</p>
                  <div className="mt-5 border-t border-border-subtle pt-4">
                    <LogoStrip logos={INTEGRATION_TIER_LOGOS[tierId]} />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Use cases */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t.useCasesTitle}
          </h3>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {t.useCases.map((uc) => {
              const isActive = uc.id === activeUseCase;
              return (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActiveUseCase(uc.id as IntegrationUseCaseId)}
                  className={cx(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "border-violet-600 bg-violet-600 text-white shadow-[0_4px_24px_rgba(124,58,237,0.4)]"
                      : "border-border-subtle text-muted hover:border-violet-500/25 hover:text-muted-strong",
                  )}
                >
                  {uc.tab}
                </button>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCaseData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <GlassCard className="overflow-hidden p-5 sm:p-8">
                  <p className="text-base leading-relaxed text-muted-strong sm:text-lg">
                    {activeUseCaseData.story}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {activeUseCaseData.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-border-subtle pt-5">
                    <LogoStrip
                      logos={INTEGRATION_USE_CASE_LOGOS[activeUseCaseData.id as IntegrationUseCaseId]}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Integration directory */}
        <div className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t.directoryTitle}
            </h3>
            <p className="mt-2 text-sm text-muted sm:text-base">{t.directorySubtitle}</p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">{t.searchPlaceholder}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-border-subtle bg-fill-subtle px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={cx(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
                    filter === key
                      ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                      : "border-border-subtle text-muted hover:text-muted-strong",
                  )}
                >
                  {t.categories[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDirectory.map((item) => (
              <DirectoryTile key={item.id} item={item} />
            ))}
          </div>
          {filteredDirectory.length === 0 && (
            <p className="mt-6 text-center text-sm text-muted">{t.directoryEmpty}</p>
          )}
        </div>

        {/* Multi-account */}
        <GlassCard className="mt-12 p-5 sm:mt-16 sm:p-8">
          <h3 className="text-lg font-bold text-foreground sm:text-xl">{t.multiAccountTitle}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {t.multiAccountBody}
          </p>
        </GlassCard>

        {/* Trust */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-center text-lg font-bold text-foreground sm:text-xl">{t.trustTitle}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.trustItems.map((item) => (
              <li key={item.title}>
                <GlassCard className="h-full p-4 sm:p-5">
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </GlassCard>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 sm:mt-14">
          <DeployFrydaiButton className="w-full sm:w-auto" />
          <p className="text-center text-xs text-muted">{t.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}
