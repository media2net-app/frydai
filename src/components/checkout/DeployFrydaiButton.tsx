"use client";

import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

const VARIANT_STYLES = {
  primary:
    "inline-flex justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110",
  secondary:
    "btn-secondary-hero inline-flex justify-center rounded-full border border-border-subtle bg-fill-subtle px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-fill-subtle",
  compact:
    "inline-flex justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110",
  pill: "shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:py-1.5 sm:text-xs",
} as const;

type DeployFrydaiButtonProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof VARIANT_STYLES;
  showArrow?: boolean;
};

export function DeployFrydaiButton({
  children,
  className,
  variant = "primary",
  showArrow = true,
}: DeployFrydaiButtonProps) {
  const { openCheckout } = useCheckout();
  const label = children ?? copy.hero.ctaPrimary;

  return (
    <button
      type="button"
      onClick={openCheckout}
      className={cx(VARIANT_STYLES[variant], className)}
    >
      {label}
      {showArrow ? " →" : ""}
    </button>
  );
}
