"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const DemoCheckoutModal = dynamic(
  () =>
    import("@/components/checkout/DemoCheckoutModal").then((m) => ({
      default: m.DemoCheckoutModal,
    })),
  { ssr: false },
);

type CheckoutContextValue = {
  openCheckout: () => void;
  closeCheckout: () => void;
  isCheckoutOpen: boolean;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openCheckout = useCallback(() => setOpen(true), []);
  const closeCheckout = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openCheckout, closeCheckout, isCheckoutOpen: open }),
    [open, openCheckout, closeCheckout],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      {open ? <DemoCheckoutModal open onClose={closeCheckout} /> : null}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
}
