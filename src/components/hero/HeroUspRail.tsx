"use client";

import { UspBar } from "@/components/UspBar";
import { cx } from "@/lib/cx";

type HeroUspRailProps = {
  /** demo-top = bovenkant #demo; inline = binnen hero-viewport; seam = legacy */
  variant?: "demo-top" | "inline" | "seam";
};

/** USP-pill — boven #demo (demo-top) of legacy seam/inline */
export function HeroUspRail({ variant = "demo-top" }: HeroUspRailProps) {
  const isInline = variant === "inline";
  const isDemoTop = variant === "demo-top";

  return (
    <div className="hero-usp-rail relative shrink-0">
      <div
        className={cx(
          "flex justify-center px-4",
          isInline ? "pb-4 pt-2 sm:pb-5" : isDemoTop ? "py-0" : "pb-2 sm:pb-3",
        )}
      >
        <div
          className={cx(
            "hero-usp-pill radius-section relative w-fit max-w-full border border-border-subtle px-5 py-4 ring-4 ring-surface sm:px-8 sm:py-4",
            variant === "seam" && "translate-y-1/2",
          )}
        >
          <UspBar />
        </div>
      </div>
    </div>
  );
}
