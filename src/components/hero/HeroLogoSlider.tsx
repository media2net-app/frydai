"use client";

import { IntegrationLogoMarquee } from "@/components/hero/IntegrationLogoMarquee";
import { copy } from "@/lib/copy";

export function HeroLogoSlider() {
  const { hero } = copy;

  return (
    <div className="relative z-10 mt-[30px] w-full border-t border-border-subtle pt-[30px] sm:mt-[34px] sm:pt-[34px]">
      <p className="text-center text-xs text-muted sm:text-sm">{hero.worksWith}</p>
      <IntegrationLogoMarquee
        className="mt-4 w-full sm:mt-5"
        pauseOnHover
        ariaLabel={hero.worksWith}
      />
    </div>
  );
}
