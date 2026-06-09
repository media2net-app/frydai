"use client";

import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { HeroFoundingPill } from "@/components/hero/HeroFoundingPill";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroOperatorShowcase } from "@/components/hero/HeroOperatorShowcase";
import { HeroSection } from "@/components/hero/HeroSection";
import {
  HERO_CHROME_TOP_SPACER,
  HERO_CHROME_TOP_SPACER_EXPANDED,
} from "@/components/layout/FoundingNoticeBar";
import { useHomepageChrome } from "@/components/layout/HomepageChromeContext";
import { copy, site } from "@/lib/copy";
import { cx } from "@/lib/cx";

function PlayIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

export function HeroBlock() {
  const { hero, foundingNotice } = copy;
  const { expanded } = useHomepageChrome();

  return (
    <div className="hero-block flex min-h-0 flex-col">
      <HeroSection>
        <div className="hero-viewport relative z-10">
          <div
            className={cx(
              "shrink-0 transition-[height] duration-500 ease-out",
              expanded ? HERO_CHROME_TOP_SPACER_EXPANDED : HERO_CHROME_TOP_SPACER,
            )}
            aria-hidden
          />

          <div
            className="hero-viewport-main flex min-h-0 flex-col overflow-hidden"
          >
            <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-visible">
              <div className="flex min-h-0 flex-col justify-center py-5 sm:py-6 lg:py-8">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                  <div className="flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)] lg:items-center lg:gap-6 xl:gap-10">
                    <div className="relative z-10 flex min-w-0 flex-col gap-5 text-left sm:gap-6 lg:gap-7">
                      <HeroFoundingPill label={hero.foundingPill} />

                      <HeroHeadline />

                      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:max-w-xl xl:max-w-2xl">
                        {hero.description}{" "}
                        <span className="block">
                          {hero.descriptionClosingLine1}
                          <br />
                          {hero.descriptionClosingLine2}
                        </span>
                      </p>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <DeployFrydaiButton
                          variant="header"
                          showArrow
                          className="w-full px-8 py-3.5 text-base sm:w-auto"
                        />
                        <a
                          href={site.demoUrl}
                          className="hero-glass-cta btn-secondary-hero radius-section inline-flex w-full items-center justify-center gap-2 border border-border-subtle px-8 py-3.5 text-base font-semibold text-foreground transition-colors sm:w-auto"
                        >
                          <PlayIcon />
                          {hero.ctaSecondary}
                        </a>
                      </div>

                      <p className="hero-cta-note flex items-center gap-2 text-sm text-muted">
                        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
                          <span className="relative h-2 w-2 rounded-full bg-amber-400" />
                        </span>
                        <span>
                          <span className="font-medium text-muted-strong">{foundingNotice.limited}</span>
                          <span className="mx-1.5">·</span>
                          <span className="hero-cta-price font-semibold">{foundingNotice.price}</span>
                        </span>
                      </p>
                      {hero.checkoutNote ? (
                        <p className="max-w-md text-xs leading-relaxed text-muted">{hero.checkoutNote}</p>
                      ) : null}

                      <div
                        className="hero-mobile-showcase-below relative w-full shrink-0 overflow-visible lg:hidden"
                      >
                        <HeroOperatorShowcase variant="mobile" />
                      </div>
                    </div>

                    <div className="relative hidden min-w-0 lg:flex lg:items-center lg:justify-center">
                      <div className="w-full max-w-[30rem]">
                        <HeroOperatorShowcase />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>
    </div>
  );
}
