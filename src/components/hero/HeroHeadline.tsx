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
    <h1 className="flex w-full flex-col items-start text-left">
      <span
        className={cx(
          "block w-full text-foreground",
          HERO_HEADLINE_PREFIX_TEXT,
        )}
      >
        {hero.headlinePrefix}
      </span>

      <span className="mt-1 block w-full sm:mt-1.5">
        <AnimatedTextCycle
          words={hero.headlineWords}
          interval={3200}
          layout="block"
          textClassName={HERO_HEADLINE_CYCLE_TEXT}
          className="headline-gradient bg-gradient-to-r from-violet-400 via-violet-800 to-violet-600 bg-clip-text text-transparent"
        />
        {suffix ? (
          <span className="ml-1 text-foreground">{suffix}</span>
        ) : null}
      </span>
    </h1>
  );
}
