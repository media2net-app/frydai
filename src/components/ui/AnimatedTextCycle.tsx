"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  layout?: "inline" | "block";
  maxFontSize?: number;
  minFontSize?: number;
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
  hidden: { y: 28, opacity: 0, scale: 0.94, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
  exit: {
    y: -28,
    opacity: 0,
    scale: 1.04,
    filter: "blur(10px)",
    transition: { duration: 0.35, ease: "easeIn" as const },
  },
};

export function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
  layout = "inline",
  maxFontSize = 76,
  minFontSize = 28,
}: AnimatedTextCycleProps) {
  const isBlock = layout === "block";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const [fitFontSize, setFitFontSize] = useState(maxFontSize);
  const measureRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordVariants = isBlock ? blockVariants : inlineVariants;

  useLayoutEffect(() => {
    if (!isBlock) return;

    const fit = () => {
      const el = fitRef.current;
      const container = containerRef.current;
      if (!el || !container) return;

      const maxWidth = container.clientWidth;
      if (!maxWidth) return;

      let size = maxFontSize;
      el.style.fontSize = `${size}px`;
      el.style.whiteSpace = "nowrap";

      while (el.scrollWidth > maxWidth && size > minFontSize) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }

      setFitFontSize(size);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(containerRef.current!);
    window.addEventListener("resize", fit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [currentIndex, words, isBlock, maxFontSize, minFontSize]);

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
        ref={isBlock ? fitRef : undefined}
        className={cx("inline-block max-w-full font-bold", className)}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          whiteSpace: "nowrap",
          fontSize: isBlock ? `${fitFontSize}px` : undefined,
        }}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  if (isBlock) {
    return (
      <span
        ref={containerRef}
        className="relative block w-full max-w-full text-left lg:inline-block lg:w-auto"
      >
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
