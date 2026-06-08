"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { VIKTOR_LANDING } from "@/lib/viktor-landing-data";
import { ViktorCta } from "@/components/viktor/viktor-shared";

const TAB_ICONS: Record<string, string> = {
  founders: "M12 4v16M4 12h16",
  marketing: "M3 17l6-6 4 4 8-8",
  store: "M4 7h16v13H4z M8 7V4h8v3",
  research: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
};

function TabIcon({ id }: { id: string }) {
  const d = TAB_ICONS[id] ?? TAB_ICONS.founders;
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeatureCheck() {
  return (
    <span className="viktor-feature-check-icon" aria-hidden>
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ViktorUseCasesSection() {
  const { useCases: t, hero } = VIKTOR_LANDING;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(t.tabs[0].id);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.15 || progress > 0.85) return;
    const index = Math.min(
      t.tabs.length - 1,
      Math.max(0, Math.floor(((progress - 0.15) / 0.7) * t.tabs.length)),
    );
    const next = t.tabs[index]?.id;
    if (next) setActiveId(next);
  });

  const activeTab = t.tabs.find((tab) => tab.id === activeId) ?? t.tabs[0];

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="viktor-usecases-section scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
        <div className="viktor-usecases-left">
          <motion.p
            className="viktor-usecases-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            className="viktor-usecases-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {t.title}
          </motion.h2>

          <nav className="viktor-usecases-nav mt-10" aria-label={t.eyebrow}>
            {t.tabs.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  className={`viktor-usecases-tab ${isActive ? "viktor-usecases-tab--active" : ""}`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="viktor-usecase-active-pill"
                      className="viktor-usecases-tab-bg"
                      transition={{ type: "spring", bounce: 0.12, duration: 0.45 }}
                    />
                  ) : null}
                  <TabIcon id={tab.id} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  {isActive ? (
                    <span className="viktor-usecases-tab-spinner" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </nav>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ViktorCta variant="white" className="px-6">
              {hero.ctaPrimary}
            </ViktorCta>
          </motion.div>
        </div>

        <motion.div
          className="viktor-usecases-panel"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3 className="viktor-usecases-panel-headline">{activeTab.headline}</h3>
              <ul className="viktor-usecases-feature-grid mt-8">
                {activeTab.features.map((feature) => (
                  <li key={feature.title} className="viktor-usecases-feature">
                    <FeatureCheck />
                    <div>
                      <p className="viktor-usecases-feature-title">{feature.title}</p>
                      <p className="viktor-usecases-feature-desc mt-1">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
