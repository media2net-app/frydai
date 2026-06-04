"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import type { CapabilityItem, CapabilityId } from "@/lib/capabilities-data";
import { getAccentStyles } from "@/lib/capability-demo/accent";
import type { CapabilityDemoConfig, DemoState, StepTemplate } from "@/lib/capability-demo/types";
import { useCapabilityPipelineDemo } from "@/hooks/use-capability-pipeline-demo";
import { CapabilityPanelIcon } from "@/components/sections/capabilities/CapabilityPanelIcon";
import { LiveFeedBar } from "@/components/sections/capabilities/shared/LiveFeedBar";
import { PipelineStepCard } from "@/components/sections/capabilities/shared/PipelineStepCard";

function cycleText(config: CapabilityDemoConfig, state: DemoState, key: string) {
  const items = config.cycles[key];
  const idx = state.cycleIndex[key] ?? 0;
  return items[idx % items.length];
}

function AssetPreviewStrip({ active }: { active: boolean }) {
  const frames = ["UGC", "Static", "Video", "Carousel"];
  return (
    <div className="mt-2 flex gap-1">
      {frames.map((label, i) => (
        <motion.div
          key={label}
          animate={{
            opacity: active ? (i < 3 ? 1 : 0.35) : 0.5,
            scale: active && i === 1 ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 1.2, repeat: active && i === 1 ? Infinity : 0 }}
          className={cx(
            "flex h-8 flex-1 items-center justify-center rounded-md border text-[9px] font-semibold uppercase tracking-wide",
            i < 3
              ? "border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/10 text-fuchsia-200/90"
              : "border-white/10 bg-white/[0.03] text-white/30",
          )}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function PageBlockStrip({ active }: { active: boolean }) {
  const blocks = ["Hero", "Proof", "Offer", "FAQ"];
  return (
    <div className="mt-2 flex gap-1">
      {blocks.map((label, i) => (
        <motion.div
          key={label}
          animate={{ opacity: active ? 1 : 0.45 }}
          className="flex h-8 flex-1 items-center justify-center rounded-md border border-teal-500/20 bg-teal-500/10 text-[9px] font-semibold text-teal-200/80"
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function StepContent({
  template,
  config,
  state,
  metrics,
  capabilityId,
  activeStep,
  stepId,
  accentBar,
}: {
  template: StepTemplate;
  config: CapabilityDemoConfig;
  state: DemoState;
  metrics: Record<string, number>;
  capabilityId: CapabilityId;
  activeStep: string;
  stepId: string;
  accentBar: string;
}) {
  switch (template.type) {
    case "cycle":
      return (
        <>
          <motion.p
            key={cycleText(config, state, template.cycleKey)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium leading-snug text-white/85"
          >
            {cycleText(config, state, template.cycleKey)}
          </motion.p>
          {template.subtext ? (
            <p className="mt-2 text-[10px] text-white/40">{template.subtext}</p>
          ) : null}
        </>
      );

    case "cycleMetric":
      return (
        <>
          <motion.p
            key={cycleText(config, state, template.cycleKey)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-white/85"
          >
            {cycleText(config, state, template.cycleKey)}
          </motion.p>
          <p className="mt-1 text-[10px] tabular-nums text-white/40">
            {metrics[template.metricKey] ?? 0} {template.metricLabel}
          </p>
          {capabilityId === "adCreative" && stepId === "assets" ? (
            <AssetPreviewStrip active={activeStep === "assets"} />
          ) : null}
        </>
      );

    case "counter": {
      const value = metrics[template.metricKey] ?? 0;
      return (
        <>
          <motion.p key={value} className="text-sm font-bold tabular-nums text-white">
            {value}
            <span className="text-white/45">/{template.max}</span>{" "}
            <span className="text-xs font-normal text-white/45">{template.suffix}</span>
          </motion.p>
          {template.progress ? (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={cx("h-full rounded-full bg-gradient-to-r", accentBar)}
                animate={{ width: `${(value / template.max) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
          ) : null}
          {template.subtext ? (
            <p className="mt-2 text-[10px] text-white/40">{template.subtext}</p>
          ) : null}
          {capabilityId === "landingPages" && stepId === "build" ? (
            <PageBlockStrip active={activeStep === "build"} />
          ) : null}
        </>
      );
    }

    case "counterQuote": {
      const value = metrics[template.metricKey] ?? 0;
      const quote = config.cycles[template.quoteCycleKey];
      const qIdx = state.cycleIndex[template.quoteCycleKey] ?? 0;
      return (
        <>
          <motion.p key={value} className="text-sm font-bold tabular-nums text-white">
            {value}
            <span className="text-white/45">/{template.max}</span>{" "}
            <span className="text-xs font-normal text-white/45">{template.suffix}</span>
          </motion.p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={cx("h-full rounded-full bg-gradient-to-r", accentBar)}
              animate={{ width: `${(value / template.max) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <motion.p
            key={quote[qIdx % quote.length]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 line-clamp-2 text-[10px] italic leading-snug text-fuchsia-200/70"
          >
            &ldquo;{quote[qIdx % quote.length]}&rdquo;
          </motion.p>
        </>
      );
    }

    case "score": {
      const raw = metrics[template.metricKey] ?? 0;
      const display = template.displayDivisor
        ? (raw / template.displayDivisor).toFixed(1)
        : String(raw);
      const progressPct = template.displayDivisor
        ? (raw / template.max) * 100
        : raw;
      return (
        <>
          <motion.p key={raw} className="text-sm font-bold tabular-nums text-white">
            {display}
            {!template.displayDivisor ? (
              <>
                <span className="text-white/45">/{template.max}</span>{" "}
              </>
            ) : null}{" "}
            <span className="text-xs font-normal text-emerald-400/90">{template.scoreLabel}</span>
          </motion.p>
          {template.progress ? (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ) : null}
        </>
      );
    }

    case "cycleFooter":
      return (
        <>
          <motion.p
            key={cycleText(config, state, template.cycleKey)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-white/85"
          >
            {cycleText(config, state, template.cycleKey)}
          </motion.p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-teal-300/80">
            {template.footer.includes("Telegram") ? <span>📄</span> : null}
            <span>{template.footer}</span>
          </p>
        </>
      );

    case "cycleBadge":
      return (
        <>
          <motion.p
            key={cycleText(config, state, template.cycleKey)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-white/85"
          >
            {cycleText(config, state, template.cycleKey)}
          </motion.p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-fuchsia-300/80">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#1877F2]/20 text-[9px] font-bold text-[#4d9fff]">
              {template.badge}
            </span>
            <span>{template.badgeLabel}</span>
          </p>
        </>
      );

    default:
      return null;
  }
}

export function CapabilityDynamicPanel({
  item,
  isActive,
}: {
  item: CapabilityItem;
  isActive: boolean;
}) {
  const live = useCapabilityPipelineDemo(item.id, isActive);
  const accent = getAccentStyles(item.id);
  const { config, activeStep, activeIndex, feedLine, state, metrics } = live;
  const accentBar = `bg-gradient-to-r ${accent.progressBar}`;

  return (
    <GlassCard className="overflow-hidden p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <motion.div
          animate={isActive ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className={cx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
            accent.iconBorder,
            accent.iconBg,
            accent.iconText,
          )}
        >
          <CapabilityPanelIcon id={item.id} />
        </motion.div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{item.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/55 sm:text-base">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.skills.map((skill, i) => (
          <motion.span
            key={skill}
            animate={{
              borderColor:
                isActive && i === activeIndex % item.skills.length
                  ? accent.skillBorder
                  : "rgba(255, 255, 255, 0.1)",
              backgroundColor:
                isActive && i === activeIndex % item.skills.length
                  ? accent.skillBg
                  : "rgba(255, 255, 255, 0.04)",
            }}
            className="rounded-full border px-3 py-1 text-xs font-medium text-white/65"
          >
            {skill}
          </motion.span>
        ))}
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {config.stepIds.map((stepId, index) => {
          const step = config.steps[stepId];
          return (
            <PipelineStepCard
              key={stepId}
              label={step.label}
              stepId={stepId}
              activeStep={activeStep}
              completed={activeIndex > index}
              capabilityId={item.id}
            >
              <StepContent
                template={step.template}
                config={config}
                state={state}
                metrics={metrics}
                capabilityId={item.id}
                activeStep={activeStep}
                stepId={stepId}
                accentBar={accentBar}
              />
            </PipelineStepCard>
          );
        })}
      </div>

      <LiveFeedBar label={config.feedLabel} line={feedLine} />
    </GlassCard>
  );
}
