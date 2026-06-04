"use client";

import { IntegrationLogoMarquee } from "@/components/hero/IntegrationLogoMarquee";
import { copy } from "@/lib/copy";

export function HeroLogoSlider() {
  const { hero } = copy;

  return (
    <div className="relative z-10 mt-5 w-full border-t border-white/10 pt-5 sm:mt-6 sm:pt-6">
      <p className="text-center text-xs text-white/45 sm:text-sm">{hero.worksWith}</p>
      <IntegrationLogoMarquee
        className="mt-4 w-full sm:mt-5"
        pauseOnHover
        ariaLabel={hero.worksWith}
      />
    </div>
  );
}
