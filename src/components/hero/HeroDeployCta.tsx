"use client";

import { useState } from "react";
import { WhopCheckoutModal } from "@/components/checkout/WhopCheckoutModal";
import { copy } from "@/lib/copy";

export function HeroDeployCta() {
  const { hero } = copy;
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setCheckoutOpen(true)}
        className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 sm:w-auto"
      >
        {hero.ctaPrimary} →
      </button>

      <WhopCheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
