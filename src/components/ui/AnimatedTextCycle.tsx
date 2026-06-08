"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsClient } from "@/hooks/use-is-client";
import { cx } from "@/lib/cx";

/** Hero h1 — large display scale (reference: full-width headline) */
export const HERO_HEADLINE_PREFIX_TEXT =
  "text-[clamp(2.5rem,9vw,4.25rem)] font-bold leading-[1.04] tracking-tight sm:text-[clamp(3rem,8vw,4.75rem)] lg:text-[clamp(2.75rem,4.2vw,4rem)] xl:text-[clamp(2.85rem,3.8vw,4.25rem)]";

/** Hero cycling line — same scale as prefix */
export const HERO_HEADLINE_CYCLE_TEXT =
  "text-[clamp(2.5rem,9vw,4.25rem)] font-bold leading-[1.04] tracking-tight sm:text-[clamp(3rem,8vw,4.75rem)] lg:text-[clamp(2.75rem,4.2vw,4rem)] xl:text-[clamp(2.85rem,3.8vw,4.25rem)]";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  layout?: "inline" | "block";
  /** Override default cycle font scale (block layout) */
  textClassName?: string;
}

const inlineVariants = {
  hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    y: 20,
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

function capitalizeFirstWord(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const blockVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

export function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
  layout = "inline",
  textClassName = HERO_HEADLINE_CYCLE_TEXT,
}: AnimatedTextCycleProps) {
  const isBlock = layout === "block";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const hasMounted = useIsClient();
  const measureRef = useRef<HTMLDivElement>(null);
  const wordVariants = isBlock ? blockVariants : inlineVariants;

  useEffect(() => {
    if (isBlock) return;
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex, words, isBlock]);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  if (words.length === 0) return null;

  const animatedWord = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={currentIndex}
        className={cx(
          "max-w-full font-bold",
          isBlock ? "block w-full" : "inline-block",
          isBlock && textClassName,
          className,
        )}
        variants={wordVariants}
        initial={hasMounted ? "hidden" : false}
        animate="visible"
        exit="exit"
      >
        {capitalizeFirstWord(words[currentIndex])}
      </motion.span>
    </AnimatePresence>
  );

  if (isBlock) {
    return (
      <span className="relative block w-full max-w-full text-left">
        {animatedWord}
      </span>
    );
  }

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={cx("font-bold", className)}>
            {capitalizeFirstWord(word)}
          </span>
        ))}
      </div>
      <motion.span
        className="relative inline-block align-baseline"
        animate={{
          width,
          transition: { type: "spring", stiffness: 150, damping: 15, mass: 1.2 },
        }}
      >
        {animatedWord}
      </motion.span>
    </>
  );
}
