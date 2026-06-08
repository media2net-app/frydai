"use client";

import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeId } from "@/lib/theme";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  logoVariant: "white" | "black";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeId {
  return DEFAULT_THEME;
}

function applyThemeToDocument(theme: ThemeId) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => readStoredTheme());

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyThemeToDocument(id);
    window.localStorage.setItem(THEME_STORAGE_KEY, id);

    document.documentElement.classList.add("theme-transition");
    window.setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      450,
    );
  }, []);

  const value = useMemo((): ThemeContextValue => {
    const logoVariant: ThemeContextValue["logoVariant"] =
      theme === "dark" ? "white" : "black";
    return { theme, setTheme, logoVariant };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
