"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
};

function TelegramCard({ className }: { className?: string }) {
  const { hero } = copy;

  return (
    <GlassCard className={cx("p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]", className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white">
          F
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{hero.telegramSender}</p>
          <p className="mt-0.5 text-xs text-white/45">
            {hero.telegramRole} · {hero.telegramTime}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            &ldquo;{hero.telegramPreview}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
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
    <GlassCard className={cx("p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]", className)}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
        {hero.revenueLabel}
      </p>
      <p className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
        {hero.revenueValue}
      </p>
      <p className="mt-0.5 text-xs font-medium text-emerald-400">{hero.revenueTrend}</p>
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
    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
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
    <GlassCard className={cx("p-3 shadow-[0_16px_44px_rgba(0,0,0,0.4)]", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
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
            className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-2"
          >
            <p className="truncate text-[11px] font-medium text-white/85">{task.label}</p>
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
    <div className="relative mx-auto w-full max-w-[500px] min-h-[22rem] sm:min-h-[24rem] xl:max-w-[520px]">
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
        className="absolute left-0 top-0 z-10 w-[46%] -rotate-3"
      >
        <RevenueChip />
      </motion.div>

      <motion.div
        {...cardMotion}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="absolute left-[6%] top-[42%] z-20 w-[52%] rotate-2"
      >
        <TaskStack />
      </motion.div>

      <motion.div
        {...cardMotion}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="absolute right-0 top-[10%] z-30 w-[58%] -rotate-1"
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

const MOBILE_SLIDES = [
  { id: "telegram", label: "Operator update", render: () => <TelegramCard /> },
  { id: "revenue", label: "Revenue", render: () => <RevenueChip /> },
  { id: "queue", label: "Live queue", render: () => <TaskStack /> },
] as const;

function MobileShowcase() {
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
      const index = Math.round(scrollLeft / Math.max(offsetWidth * 0.85, 1));
      setActive(Math.min(Math.max(index, 0), MOBILE_SLIDES.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative -mx-4 sm:mx-0">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] snap-x snap-mandatory [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="Frydai operator preview"
      >
        {MOBILE_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="w-[min(100%,22rem)] shrink-0 snap-center sm:w-[20rem]"
            aria-label={slide.label}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              {slide.render()}
            </motion.div>
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
              active === index ? "w-6 bg-violet-400" : "w-1.5 bg-white/25",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-white/35">Swipe for more</p>
    </div>
  );
}

export function HeroOperatorShowcase({ variant = "desktop" }: HeroOperatorShowcaseProps) {
  if (variant === "mobile") {
    return <MobileShowcase />;
  }
  return <DesktopShowcase />;
}
