"use client";

import {
  AnimatedTextCycle,
  HERO_HEADLINE_CYCLE_TEXT,
  HERO_HEADLINE_PREFIX_TEXT,
} from "@/components/ui/AnimatedTextCycle";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

export function HeroHeadline() {
  const { hero } = copy;
  const suffix = hero.headlineSuffix?.trim();

  return (
    <h1 className="mt-4 flex w-full max-w-full flex-col items-start gap-0 text-left sm:mt-6 lg:max-w-xl xl:max-w-2xl">
      <span className={cx("block w-full text-white", HERO_HEADLINE_PREFIX_TEXT)}>
        {hero.headlinePrefix}
      </span>

      <span className="mt-2 block w-full max-w-full sm:mt-2.5 lg:mt-2">
        <AnimatedTextCycle
          words={hero.headlineWords}
          interval={3200}
          layout="block"
          textClassName={HERO_HEADLINE_CYCLE_TEXT}
          className="bg-gradient-to-r from-violet-300 via-teal-200 to-violet-200 bg-clip-text text-transparent"
        />
        {suffix ? (
          <span
            className={cx("ml-1 text-white lg:ml-2", HERO_HEADLINE_CYCLE_TEXT)}
          >
            {suffix}
          </span>
        ) : null}
      </span>
    </h1>
  );
}
