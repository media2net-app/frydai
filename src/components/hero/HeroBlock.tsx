import { HeroAvailabilityBadge } from "@/components/hero/HeroAvailabilityBadge";
import { DeployFrydaiButton } from "@/components/checkout/DeployFrydaiButton";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroLogoSlider } from "@/components/hero/HeroLogoSlider";
import { HeroOperatorShowcase } from "@/components/hero/HeroOperatorShowcase";
import { HeroSection } from "@/components/hero/HeroSection";
import { HERO_CHROME_TOP_SPACER } from "@/components/layout/FoundingNoticeBar";
import { UspBar } from "@/components/UspBar";
import { copy, site } from "@/lib/copy";

export function HeroBlock() {
  const { hero } = copy;

  return (
    <div className="flex min-h-0 flex-col lg:min-h-[100dvh]">
      <HeroSection>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className={`shrink-0 ${HERO_CHROME_TOP_SPACER}`} aria-hidden />

          {/* Scrollable hero body — USP bar stays pinned to viewport bottom */}
          <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto py-5 sm:justify-center sm:py-8 lg:py-10">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)] lg:gap-6 xl:grid-cols-[minmax(0,560px)_1fr] xl:gap-10">
                <div className="relative z-10 min-w-0 text-left">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/90 sm:text-xs">
                    {hero.eyebrow}
                  </p>

                  <HeroHeadline />

                  <p className="mt-4 max-w-xl text-base text-white/65 sm:mt-5 lg:mt-4 lg:max-w-lg lg:text-[1.05rem] lg:leading-relaxed xl:max-w-xl">
                    {hero.descriptionLine1}
                    <br />
                    {hero.descriptionLine2}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                    <DeployFrydaiButton className="w-full sm:w-auto" />
                    <a
                      href={site.demoUrl}
                      className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
                    >
                      {hero.ctaSecondary}
                    </a>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <HeroAvailabilityBadge label={hero.availabilityBadge} />
                  </div>

                  <div className="mt-6 w-full lg:hidden">
                    <HeroOperatorShowcase variant="mobile" />
                  </div>
                </div>

                <div className="relative hidden self-start lg:block lg:mt-1 xl:mt-0">
                  <div className="sticky top-28 xl:top-32">
                    <HeroOperatorShowcase />
                  </div>
                </div>
              </div>

              <HeroLogoSlider />
            </div>
          </div>

          <section className="shrink-0 border-t border-white/10 bg-white/[0.02] py-4 sm:py-5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <UspBar />
            </div>
          </section>
        </div>
      </HeroSection>
    </div>
  );
}
