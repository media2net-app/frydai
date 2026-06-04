"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SCROLL_THRESHOLD = 12;

type HomepageChromeContextValue = {
  scrolled: boolean;
  expanded: boolean;
};

const HomepageChromeContext = createContext<HomepageChromeContextValue | null>(
  null,
);

export function HomepageChromeProvider({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <HomepageChromeContext.Provider value={{ scrolled, expanded: !scrolled }}>
      {children}
    </HomepageChromeContext.Provider>
  );
}

/** Defaults to compact (scrolled) when used outside the homepage provider */
export function useHomepageChrome() {
  const ctx = useContext(HomepageChromeContext);
  return ctx ?? { scrolled: true, expanded: false };
}
