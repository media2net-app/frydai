"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FrydaiMark } from "@/components/brand/FrydaiLogo";
import { GlassCard } from "@/components/ui/GlassCard";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";

const TASKS = [
  { label: "Competitor pricing scan", status: "Research", tone: "violet" },
  { label: "UGC script: Day in My Life", status: "Brief ready", tone: "teal" },
  { label: "Scale winning ad sets +20%", status: "Ads", tone: "emerald" },
] as const;

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

type HeroOperatorShowcaseProps = {
  variant?: "desktop" | "mobile";
  /** column = rechterhelft hero op mobiel (compact) */
  mobileLayout?: "full" | "column";
};

function TelegramCard({ className }: { className?: string }) {
  const { hero } = copy;

  return (
    <GlassCard className={cx("hero-showcase-card h-full p-4", className)}>
      <div className="flex h-full items-start gap-3">
        <FrydaiMark className="h-10 w-10 shrink-0" variant="purple" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-sm font-semibold text-foreground">{hero.telegramSender}</p>
          <p className="mt-0.5 text-xs text-muted">
            {hero.telegramRole} · {hero.telegramTime}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-strong">
            &ldquo;{hero.telegramPreview}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border-subtle bg-fill-subtle px-3 py-2">
            <span className="text-lg" aria-hidden>
              📄
            </span>
            <span className="truncate text-xs font-medium text-violet-200">
              {hero.telegramAttachment}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function RevenueChip({ className }: { className?: string }) {
  const { hero } = copy;

  return (
    <GlassCard className={cx("hero-showcase-card h-full p-3", className)}>
      <div className="flex h-full flex-col justify-center">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {hero.revenueLabel}
        </p>
        <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {hero.revenueValue}
        </p>
        <p className="mt-0.5 text-xs font-medium text-emerald-400">{hero.revenueTrend}</p>
      </div>
    </GlassCard>
  );
}

/** Research task bar — always fills forward; eases at the end, then resets */
function ResearchProgressBar() {
  const [cycle, setCycle] = useState(0);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pauseRef.current) clearTimeout(pauseRef.current);
    };
  }, []);

  return (
    <div className="mt-2 h-1 overflow-hidden rounded-full bg-fill-muted">
      <motion.div
        key={cycle}
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400"
        initial={{ width: "12%" }}
        animate={{ width: "94%" }}
        transition={{
          duration: 5.5,
          ease: [0.32, 0, 0.12, 1],
        }}
        onAnimationComplete={() => {
          pauseRef.current = setTimeout(() => setCycle((c) => c + 1), 480);
        }}
      />
    </div>
  );
}

function TaskStack({ className }: { className?: string }) {
  return (
    <GlassCard className={cx("hero-showcase-card h-full p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Live queue
        </span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
          LIVE
        </span>
      </div>
      <ul className="space-y-2">
        {TASKS.map((task, i) => (
          <li
            key={task.label}
            className="rounded-lg border border-border-subtle bg-inset px-2.5 py-2"
          >
            <p className="truncate text-[11px] font-medium text-muted-strong">{task.label}</p>
            <p
              className={`mt-0.5 text-[10px] font-medium ${
                task.tone === "violet"
                  ? "text-violet-300"
                  : task.tone === "teal"
                    ? "text-teal-300"
                    : "text-emerald-300"
              }`}
            >
              {task.status}
            </p>
            {i === 0 && <ResearchProgressBar />}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

function DesktopShowcase() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[30rem]">
      <div
        className="pointer-events-none absolute -right-4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-violet-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-8 h-40 w-40 rounded-full bg-teal-500/15 blur-3xl"
        aria-hidden
      />

      <motion.div
        {...cardMotion}
        transition={{ duration: 0.45, delay: 0 }}
        className="absolute left-0 top-0 z-10 w-[44%] -rotate-3"
      >
        <RevenueChip />
      </motion.div>

      <motion.div
        {...cardMotion}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="absolute left-[4%] top-[40%] z-20 w-[48%] rotate-2"
      >
        <TaskStack />
      </motion.div>

      <motion.div
        {...cardMotion}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="absolute right-0 top-[8%] z-30 w-[54%] -rotate-1"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <TelegramCard />
        </motion.div>
      </motion.div>
    </div>
  );
}

const MOBILE_CARD_CLASS = "flex h-full w-full flex-col";

const MOBILE_SLIDES = [
  {
    id: "telegram",
    label: "Operator update",
    render: () => <TelegramCard className={MOBILE_CARD_CLASS} />,
  },
  {
    id: "revenue",
    label: "Revenue",
    render: () => <RevenueChip className={MOBILE_CARD_CLASS} />,
  },
  {
    id: "queue",
    label: "Live queue",
    render: () => <TaskStack className={MOBILE_CARD_CLASS} />,
  },
] as const;

/** Card body height — fits tallest card (live queue) */
const MOBILE_CARD_HEIGHT_FULL = "h-[17rem] sm:h-[17.5rem]";
const MOBILE_CARD_HEIGHT_COLUMN = "h-[12.5rem] sm:h-[13.5rem]";
/** Space for stacked cards peeking below the front card */
const MOBILE_STACK_PEEK_FULL = "pb-11";
const MOBILE_STACK_PEEK_COLUMN = "pb-7";

function stackDepth(cardIndex: number, frontIndex: number) {
  return (cardIndex - frontIndex + MOBILE_SLIDES.length) % MOBILE_SLIDES.length;
}

function MobileShowcase({ layout = "full" }: { layout?: "full" | "column" }) {
  const isColumn = layout === "column";
  const cardHeight = isColumn ? MOBILE_CARD_HEIGHT_COLUMN : MOBILE_CARD_HEIGHT_FULL;
  const stackPeek = isColumn ? MOBILE_STACK_PEEK_COLUMN : MOBILE_STACK_PEEK_FULL;
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollLeft, offsetWidth } = el;
      const index = Math.round(scrollLeft / Math.max(offsetWidth, 1));
      setActive(Math.min(Math.max(index, 0), MOBILE_SLIDES.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cx("relative overflow-visible", isColumn ? "mx-0" : "-mx-4 sm:mx-0", stackPeek)}>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-visible overscroll-x-contain [scrollbar-width:none] snap-x snap-mandatory [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="Frydai operator preview"
      >
        {MOBILE_SLIDES.map((frontSlide, frontIndex) => (
          <div
            key={frontSlide.id}
            className={cx("w-full shrink-0 snap-center", isColumn ? "px-0" : "px-4")}
            aria-label={frontSlide.label}
          >
            <div className={cx("relative mx-auto w-full overflow-visible", isColumn ? "max-w-full" : "max-w-[22rem]")}>
              <div className={cx("relative overflow-visible", cardHeight)}>
                {MOBILE_SLIDES.map((slide, cardIndex) => {
                  const depth = stackDepth(cardIndex, frontIndex);

                  return (
                    <div
                      key={slide.id}
                      className="absolute inset-0 overflow-visible transition-[transform,opacity] duration-300 ease-out"
                      style={{
                        zIndex: 30 - depth,
                        transform: `scale(${1 - depth * 0.05}) translateY(${depth * 12}px)`,
                        opacity: 1 - depth * 0.07,
                      }}
                    >
                      {slide.render()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {MOBILE_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={slide.label}
            aria-current={active === index ? "true" : undefined}
            className={cx(
              "h-1.5 rounded-full transition-all duration-300",
              active === index ? "w-6 bg-violet-400" : "w-1.5 bg-fill-muted",
            )}
          />
        ))}
      </div>
      <p className={cx("text-center text-muted", isColumn ? "mt-1 text-[9px]" : "mt-2 text-[10px]")}>
        Swipe the stack
      </p>
    </div>
  );
}

export function HeroOperatorShowcase({
  variant = "desktop",
  mobileLayout = "full",
}: HeroOperatorShowcaseProps) {
  if (variant === "mobile") {
    return <MobileShowcase layout={mobileLayout} />;
  }
  return <DesktopShowcase />;
}
