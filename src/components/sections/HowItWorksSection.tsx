"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { copy, site } from "@/lib/copy";
import { HowItWorksStepVisual } from "@/components/sections/how-it-works/HowItWorksStepVisual";

export function HowItWorksSection() {
  const { howItWorks: t } = copy;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActiveStep((i) => (i + 1) % t.steps.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [t.steps.length]);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-white/10 bg-[#08080f] py-16 sm:py-24 md:py-28"
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

        <div className="relative mt-10 sm:mt-14">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-[88px] hidden h-px bg-gradient-to-r from-violet-500/20 via-violet-400/35 to-violet-500/20 lg:block"
            aria-hidden
          />

          <ol className="grid gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-6">
            {t.steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <li key={step.number} className="h-full">
                  <motion.button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="flex h-full w-full text-left"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard
                      className={cx(
                        "relative flex h-full min-h-0 flex-col overflow-hidden p-5 transition-all duration-300 sm:p-6",
                        isActive &&
                          "border-violet-400/40 shadow-[0_0_48px_rgba(124,58,237,0.18)] ring-1 ring-violet-500/20",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={cx(
                            "font-mono text-xs font-bold tracking-wider",
                            isActive ? "text-violet-300" : "text-white/30",
                          )}
                        >
                          {step.number}
                        </span>
                        <span
                          className={cx(
                            "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                            isActive
                              ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                              : "border-white/10 bg-white/[0.03] text-white/40",
                          )}
                        >
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>

                      <div className="mt-5 flex min-h-[11rem] flex-1 flex-col border-t border-white/10 pt-4">
                        <HowItWorksStepVisual stepIndex={index} active={isActive} />
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="how-it-works-active"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                        />
                      )}
                    </GlassCard>
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 sm:mt-14">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <DeployFrydaiButton className="w-full sm:w-auto" />
            <a
              href={site.demoUrl}
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
            >
              {t.ctaSecondary}
            </a>
          </div>
          <p className="text-center text-xs text-white/40">{t.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}
