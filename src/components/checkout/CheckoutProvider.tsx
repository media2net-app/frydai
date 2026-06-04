"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DemoCheckoutModal } from "@/components/checkout/DemoCheckoutModal";

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
      <DemoCheckoutModal open={open} onClose={closeCheckout} />
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
