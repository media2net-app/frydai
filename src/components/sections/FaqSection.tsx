"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import { copy, site } from "@/lib/copy";
import { FAQ_ITEMS } from "@/lib/faq-data";

function FaqItemRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 py-4 text-left sm:py-5"
      >
        <span className="text-sm font-semibold text-white sm:text-base">{item.question}</span>
        <span
          className={cx(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
            isOpen
              ? "border-violet-500/40 bg-violet-500/20 text-violet-200"
              : "border-white/15 bg-white/[0.04] text-white/50",
          )}
          aria-hidden
        >
          <svg
            className={cx("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-45")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-white/55 sm:pb-5 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const { faq: t } = copy;
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-white/10 bg-[#08080f] py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-white/55 sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <GlassCard className="mt-10 divide-y-0 px-4 sm:mt-14 sm:px-6">
          {FAQ_ITEMS.map((item) => (
            <FaqItemRow
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            />
          ))}
        </GlassCard>

        <div className="mt-10 text-center">
          <p className="text-sm text-white/45">{t.stillHaveQuestions}</p>
          <a
            href={site.whopCheckout}
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110"
          >
            {t.contactCta} →
          </a>
        </div>
      </div>
    </section>
  );
}
