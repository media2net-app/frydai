import { HeroAvailabilityBadge } from "@/components/hero/HeroAvailabilityBadge";
import { HeroDeployCta } from "@/components/hero/HeroDeployCta";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { HeroLogoSlider } from "@/components/hero/HeroLogoSlider";
import { HeroOperatorShowcase } from "@/components/hero/HeroOperatorShowcase";
import { HeroSection } from "@/components/hero/HeroSection";
import { UspBar } from "@/components/UspBar";
import { copy, site } from "@/lib/copy";

export function HeroBlock() {
  const { hero } = copy;

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection>
        <div className="relative z-10 flex w-full flex-1 flex-col pt-[calc(5.75rem+2rem)] pb-8 sm:pt-[calc(6rem+2.5rem)] sm:pb-10 md:pb-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)] lg:gap-6 xl:grid-cols-[minmax(0,560px)_1fr] xl:gap-10">
              {/* Left: copy — constrained width so visuals stay visible */}
              <div className="relative z-10 min-w-0 text-left">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/90 sm:text-xs">
                  {hero.eyebrow}
                </p>

                <HeroHeadline />

                <p className="mt-5 max-w-xl text-base text-white/65 sm:mt-6 sm:text-lg md:max-w-lg lg:max-w-xl">
                  {hero.descriptionLine1}
                  <br />
                  {hero.descriptionLine2}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <HeroDeployCta />
                  <a
                    href={site.demoUrl}
                    className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>

                <div className="mt-4 sm:mt-5">
                  <HeroAvailabilityBadge label={hero.availabilityBadge} />
                </div>

                <div className="mt-10 lg:hidden">
                  <HeroOperatorShowcase variant="mobile" />
                </div>
              </div>

              {/* Right: aligned with headline (not vertically centered in full column) */}
              <div className="relative hidden self-start lg:block lg:mt-1 xl:mt-0">
                <div className="sticky top-28 xl:top-32">
                  <HeroOperatorShowcase />
                </div>
              </div>
            </div>

            <HeroLogoSlider />
          </div>
        </div>
      </HeroSection>

      <section className="shrink-0 border-y border-white/10 bg-white/[0.02] py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <UspBar />
        </div>
      </section>
    </div>
  );
}
