"use client";

import { HeroLogoSlider } from "@/components/hero/HeroLogoSlider";
import { IllustrativeDisclaimer } from "@/components/ui/IllustrativeDisclaimer";
import { copy } from "@/lib/copy";

/** Glass cap: PRODUCT PROOF + Command Center titel */
export function CommandCenterIntro() {
  const { commandCenter: t } = copy;

  return (
    <div
      className="hero-next-section-cap relative rounded-t-[1.75rem] px-4 pb-4 pt-5 sm:rounded-t-[2rem] sm:px-6 sm:pb-5 sm:pt-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="hero-next-section-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.2em] sm:text-xs">
          {t.eyebrow}
        </p>
        <h2 className="hero-next-section-title mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t.title}
        </h2>
        <p className="hero-next-section-subtitle mt-2 text-base sm:mt-3 sm:text-lg">
          {t.subtitle}
        </p>
        <IllustrativeDisclaimer className="mx-auto mt-3 max-w-xl">
          {t.demoDisclaimer}
        </IllustrativeDisclaimer>
        <HeroLogoSlider />
      </div>
    </div>
  );
}
