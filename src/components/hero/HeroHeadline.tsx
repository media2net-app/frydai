"use client";

import { AnimatedTextCycle } from "@/components/ui/AnimatedTextCycle";
import { copy } from "@/lib/copy";

export function HeroHeadline() {
  const { hero } = copy;
  const suffix = hero.headlineSuffix?.trim();

  return (
    <h1 className="mt-5 flex w-full max-w-full flex-col items-start gap-0 overflow-hidden text-left font-bold leading-[1.05] tracking-tight text-white sm:mt-6 lg:text-[clamp(1.65rem,3vw,3.25rem)] lg:leading-[1.12] xl:text-[clamp(1.75rem,3.4vw,3.5rem)]">
      {/* Line 1: fixed prefix */}
      <span className="block w-full text-white">{hero.headlinePrefix}</span>

      {/* Line 2: cycling service (gradient) */}
      <span className="mt-1 block w-full max-w-full py-0.5 lg:mt-2">
        <AnimatedTextCycle
          words={hero.headlineWords}
          interval={3200}
          layout="block"
          maxFontSize={72}
          minFontSize={26}
          className="bg-gradient-to-r from-violet-300 via-teal-200 to-violet-200 bg-clip-text text-transparent"
        />
        {suffix ? (
          <span className="ml-1 text-white lg:ml-2">{suffix}</span>
        ) : null}
      </span>
    </h1>
  );
}
