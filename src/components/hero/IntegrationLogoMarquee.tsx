"use client";

import { cx } from "@/lib/cx";
import {
  HERO_INTEGRATION_LOGOS,
  IntegrationLogoMark,
} from "@/components/hero/integration-logos";

/** Repeat logos within each half so wide viewports stay filled */
const LOGOS_PER_HALF = [
  ...HERO_INTEGRATION_LOGOS,
  ...HERO_INTEGRATION_LOGOS,
  ...HERO_INTEGRATION_LOGOS,
];

const MARQUEE_TRACK = [...LOGOS_PER_HALF, ...LOGOS_PER_HALF];

type IntegrationLogoMarqueeProps = {
  className?: string;
  /** Pause animation on hover (hero) */
  pauseOnHover?: boolean;
  ariaLabel?: string;
};

export function IntegrationLogoMarquee({
  className,
  pauseOnHover = false,
  ariaLabel,
}: IntegrationLogoMarqueeProps) {
  return (
    <div
      className={cx(
        "relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div
        className={cx(
          "flex w-max animate-hero-logo-marquee items-center gap-10 will-change-transform sm:gap-12 md:gap-14",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {MARQUEE_TRACK.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="shrink-0"
            aria-hidden={index >= LOGOS_PER_HALF.length}
          >
            <IntegrationLogoMark logo={logo} plain />
          </div>
        ))}
      </div>
    </div>
  );
}
