"use client";

import { IntegrationLogoMarquee } from "@/components/hero/IntegrationLogoMarquee";
import { copy } from "@/lib/copy";

export function HeroLogoSlider() {
  const { hero } = copy;

  return (
    <div className="relative z-10 mt-5 w-full sm:mt-6">
      <p className="text-center text-xs text-muted sm:text-sm">{hero.worksWith}</p>
      <IntegrationLogoMarquee
        className="mt-3 w-full"
        pauseOnHover
        ariaLabel={hero.worksWith}
      />
    </div>
  );
}
