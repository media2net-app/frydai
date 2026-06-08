"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SCROLL_THRESHOLD = 12;

type HomepageChromeContextValue = {
  scrolled: boolean;
  pastHero: boolean;
  /** Large hero logo at top; compact size once user scrolls */
  expanded: boolean;
};

const HomepageChromeContext = createContext<HomepageChromeContextValue | null>(
  null,
);

export function HomepageChromeProvider({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);

      const hero = document.getElementById("hero");
      if (!hero) {
        setPastHero(window.scrollY > SCROLL_THRESHOLD);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setPastHero(heroBottom <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <HomepageChromeContext.Provider value={{ scrolled, pastHero, expanded: !scrolled }}>
      {children}
    </HomepageChromeContext.Provider>
  );
}

/** Defaults to compact chrome when used outside the homepage provider */
export function useHomepageChrome() {
  const ctx = useContext(HomepageChromeContext);
  return ctx ?? { scrolled: true, pastHero: true, expanded: false };
}
