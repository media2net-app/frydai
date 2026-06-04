"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cx } from "@/lib/cx";
import { FRYDAI_MARK_PATHS, FRYDAI_MARK_VIEWBOX } from "@/components/brand/frydai-mark-paths";
import type { FrydaiMarkVariant } from "@/components/brand/frydai-mark-types";

export type { FrydaiMarkVariant } from "@/components/brand/frydai-mark-types";

type FrydaiMarkProps = {
  className?: string;
  variant?: FrydaiMarkVariant;
};

const MARK_FILL: Record<FrydaiMarkVariant, string> = {
  white: "#FFFFFF",
  black: "#000000",
  purple: "#7C3AED",
  current: "currentColor",
};

export function FrydaiMark({ className, variant }: FrydaiMarkProps) {
  const { logoVariant } = useTheme();
  const fill = MARK_FILL[variant ?? logoVariant];

  return (
    <span
      className={cx("inline-flex shrink-0 items-center justify-center", className)}
      aria-hidden
    >
      <svg
        viewBox={FRYDAI_MARK_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        className="h-full w-full"
      >
        <path fill={fill} d={FRYDAI_MARK_PATHS} />
      </svg>
    </span>
  );
}

type FrydaiLogoProps = {
  className?: string;
  wordmarkClassName?: string;
  markClassName?: string;
  showWordmark?: boolean;
  markVariant?: FrydaiMarkVariant;
};

export function FrydaiLogo({
  className,
  wordmarkClassName,
  markClassName = "h-7 w-7 sm:h-8 sm:w-8",
  showWordmark = true,
  markVariant,
}: FrydaiLogoProps) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <FrydaiMark className={markClassName} variant={markVariant} />
      {showWordmark ? (
        <span className={cx("font-bold leading-none tracking-tight text-foreground", wordmarkClassName)}>
          Frydai
        </span>
      ) : null}
    </span>
  );
}

type FrydaiLogoLinkProps = FrydaiLogoProps & {
  href?: string;
  onClick?: () => void;
};

export function FrydaiLogoLink({
  href = "/",
  onClick,
  className,
  wordmarkClassName = "text-lg sm:text-xl",
  markClassName,
  showWordmark = true,
  markVariant,
}: FrydaiLogoLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "inline-flex items-center text-foreground transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="Frydai home"
    >
      <FrydaiLogo
        wordmarkClassName={wordmarkClassName}
        markClassName={markClassName}
        showWordmark={showWordmark}
        markVariant={markVariant}
      />
    </Link>
  );
}
