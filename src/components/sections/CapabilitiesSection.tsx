"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";
import {
  CAPABILITIES,
  type CapabilityId,
  type CapabilityItem,
} from "@/lib/capabilities-data";
import { copy } from "@/lib/copy";
import { CapabilityDynamicPanel } from "@/components/sections/capabilities/CapabilityDynamicPanel";

function CapabilityPanel({
  item,
  tabActive,
}: {
  item: CapabilityItem;
  tabActive: boolean;
}) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <CapabilityDynamicPanel item={item} isActive={tabActive} />
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const { capabilities: t } = copy;
  const [active, setActive] = useState<CapabilityId>("research");
  const activeItem = CAPABILITIES.find((c) => c.id === active) ?? CAPABILITIES[0];
  const { ref, inView } = useInView({ rootMargin: "120px 0px" });

  return (
    <section
      ref={ref}
      id="capabilities"
      className="scroll-mt-20 border-t border-border-subtle bg-surface py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="flex gap-2 overflow-x-auto pb-2 [mask-image:linear-gradient(to_right,black_90%,transparent)] sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {CAPABILITIES.map((cap) => {
              const isActive = cap.id === active;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActive(cap.id)}
                  className={cx(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "border-violet-600 bg-violet-600 text-white shadow-[0_4px_24px_rgba(124,58,237,0.4)]"
                      : "capability-tab-inactive border-border-subtle text-muted hover:border-violet-500/25 hover:text-muted-strong",
                  )}
                >
                  {cap.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8">
            <AnimatePresence mode="wait">
              <CapabilityPanel item={activeItem} tabActive={inView && active === activeItem.id} />
            </AnimatePresence>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted sm:text-sm">
            {t.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
