"use client";

import { AnimatePresence, motion } from "framer-motion";

export function LiveFeedBar({ label, line }: { label: string; line: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border-subtle bg-surface-raised px-3 py-3 sm:px-4 sm:py-3.5">
      <div className="flex items-start justify-between gap-4">
        <div className="relative min-h-9 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-muted-strong sm:text-sm"
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">{label}</span>
        </div>
      </div>
    </div>
  );
}
