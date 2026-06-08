"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { VIKTOR_LANDING } from "@/lib/viktor-landing-data";
import { ViktorFrydaiMarkIcon } from "@/components/viktor/ViktorFrydaiMarkIcon";

const CARD_HEIGHT = 92;

type HowItWorksCard = (typeof VIKTOR_LANDING.howItWorks.steps)[number]["cards"][number];
type FadePosition = "top" | "center" | "bottom";

function HowItWorksCardRow({ card, position }: { card: HowItWorksCard; position: FadePosition }) {
  const isActive = position === "center";
  const isOperator = "isOperator" in card && card.isOperator;
  const iconSrc = "iconSrc" in card ? card.iconSrc : undefined;
  const badge = "badge" in card ? card.badge : undefined;

  return (
    <div
      className={`viktor-hiw-card flex items-center gap-3 px-3 transition-all duration-500 ${
        isActive ? "viktor-hiw-card--active" : "viktor-hiw-card--dim"
      } ${position === "top" ? "viktor-hiw-card--top" : ""} ${position === "bottom" ? "viktor-hiw-card--bottom" : ""}`}
      style={{ height: CARD_HEIGHT }}
    >
      {isOperator ? (
        <ViktorFrydaiMarkIcon />
      ) : iconSrc ? (
        <span className="viktor-hiw-card-icon">
          <Image src={iconSrc} alt="" width={22} height={22} className="object-contain" unoptimized />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold">{card.name}</p>
          {badge && isActive ? <span className="viktor-hiw-card-badge">{badge}</span> : null}
        </div>
        <p className="truncate text-xs opacity-80">{card.subtitle}</p>
      </div>
    </div>
  );
}

export function ViktorHowItWorksSection() {
  const { howItWorks: t } = VIKTOR_LANDING;
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const step = Math.min(t.steps.length - 1, Math.max(0, Math.floor(progress * t.steps.length)));
    setActiveStep(step);
  });

  const step = t.steps[activeStep] ?? t.steps[0];
  const cardOffset = -activeStep * CARD_HEIGHT * 3;
  const fadePositions: FadePosition[] = ["top", "center", "bottom"];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="viktor-hiw-section scroll-mt-28"
      style={{ height: `${t.steps.length * 100}vh` }}
      aria-label={t.eyebrow}
    >
      <div className="viktor-hiw-sticky">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="viktor-hiw-copy">
            <span className="viktor-eyebrow">{t.eyebrow}</span>
            <h2 className="viktor-hiw-title mt-4">
              {t.titlePrefix}{" "}
              <span className="viktor-gradient-text">{t.titleHighlight}</span>
            </h2>
          </div>

          <div className="viktor-hiw-panel">
            <div className="viktor-hiw-glass">
              <div className="viktor-hiw-cards-viewport" aria-live="polite">
                <motion.div
                  className="viktor-hiw-cards-track"
                  animate={{ y: cardOffset }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.steps.flatMap((stepItem, stepIndex) =>
                    stepItem.cards.map((card, cardIndex) => (
                      <HowItWorksCardRow
                        key={`${stepIndex}-${card.id}`}
                        card={card}
                        position={
                          stepIndex === activeStep ? (fadePositions[cardIndex] ?? "center") : "center"
                        }
                      />
                    )),
                  )}
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="viktor-hiw-step-content"
                >
                  <p className="viktor-hiw-step-num">/{step.number}</p>
                  <h3 className="viktor-hiw-step-title">{step.title}</h3>
                  <p className="viktor-hiw-step-desc">{step.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
