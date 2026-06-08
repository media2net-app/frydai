"use client";

import { useCheckout } from "@/components/checkout/CheckoutProvider";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

const VARIANT_STYLES = {
  primary:
    "radius-section inline-flex justify-center bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110",
  secondary:
    "btn-secondary-hero radius-section inline-flex justify-center border border-border-subtle bg-fill-subtle px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-fill-subtle",
  compact:
    "radius-section inline-flex justify-center bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110",
  pill: "shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:py-1.5 sm:text-xs",
  header:
    "header-get-started-cta radius-section inline-flex items-center justify-center border-0 bg-[#12101c] px-5 py-2 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(18,16,28,0.2)] transition-colors",
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
