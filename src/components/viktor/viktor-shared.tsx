"use client";

import Link from "next/link";
import { useCheckout } from "@/components/checkout/CheckoutProvider";

export function ViktorCta({
  children,
  variant = "primary",
  className = "",
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "white";
  className?: string;
  href?: string;
}) {
  const { openCheckout } = useCheckout();
  const cls =
    variant === "primary"
      ? "viktor-btn-primary"
      : variant === "purple"
        ? "viktor-btn-purple"
        : variant === "white"
          ? "viktor-btn-white"
          : "viktor-btn-secondary";

  if (href) {
    return (
      <Link href={href} className={`${cls} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={openCheckout} className={`${cls} ${className}`}>
      {children}
    </button>
  );
}
