"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

/** Hero h1 prefix — large on mobile, restrained from lg up */
export const HERO_HEADLINE_PREFIX_TEXT =
  "text-[clamp(2rem,9vw,2.75rem)] font-extrabold leading-[1.02] tracking-tight sm:text-[clamp(2.125rem,7vw,3rem)] lg:text-[clamp(1.5rem,2.35vw,2.35rem)] lg:font-bold lg:leading-[1.1] xl:text-[clamp(1.55rem,2.15vw,2.5rem)]";

/** Hero cycling line — slightly smaller than prefix on desktop */
export const HERO_HEADLINE_CYCLE_TEXT =
  "text-[clamp(1.35rem,5.5vw,2.125rem)] font-bold leading-[1.08] sm:text-[clamp(1.5rem,4.8vw,2.35rem)] lg:text-[clamp(1.3rem,2.05vw,2rem)] xl:text-[clamp(1.35rem,2.1vw,2.1rem)]";

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
  const [hasMounted, setHasMounted] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);
  const wordVariants = isBlock ? blockVariants : inlineVariants;

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
          "inline-block max-w-full font-bold",
          isBlock && textClassName,
          isBlock && "max-lg:whitespace-nowrap",
          className,
        )}
        variants={wordVariants}
        initial={hasMounted ? "hidden" : false}
        animate="visible"
        exit="exit"
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  if (isBlock) {
    return (
      <span className="relative block w-full max-w-full text-left lg:inline-block lg:w-auto">
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
            {word}
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
