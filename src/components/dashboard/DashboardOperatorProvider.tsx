"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "frydai-operator-os-enabled";

type DashboardOperatorContextValue = {
  osEnabled: boolean;
  setOsEnabled: (enabled: boolean) => void;
  toggleOs: () => void;
};

const DashboardOperatorContext = createContext<DashboardOperatorContextValue | null>(null);

export function DashboardOperatorProvider({ children }: { children: React.ReactNode }) {
  const [osEnabled, setOsEnabledState] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setOsEnabledState(stored === "true");
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setOsEnabled = useCallback((enabled: boolean) => {
    setOsEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleOs = useCallback(() => {
    setOsEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <DashboardOperatorContext.Provider
      value={{
        osEnabled: hydrated ? osEnabled : true,
        setOsEnabled,
        toggleOs,
      }}
    >
      {children}
    </DashboardOperatorContext.Provider>
  );
}

export function useDashboardOperator() {
  const ctx = useContext(DashboardOperatorContext);
  if (!ctx) {
    throw new Error("useDashboardOperator must be used within DashboardOperatorProvider");
  }
  return ctx;
}

/** Marketing / shared hooks — always “on” outside dashboard shell */
export function useOperatorOsEnabled() {
  const ctx = useContext(DashboardOperatorContext);
  return ctx?.osEnabled ?? true;
}
