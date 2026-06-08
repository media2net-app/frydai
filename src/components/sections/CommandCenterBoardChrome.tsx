"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import type { CommandCenterViewId } from "@/lib/command-center/nav";

function AnimatedStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-right">
      <p className="text-[10px] text-muted">{label}</p>
      <motion.p
        key={String(value)}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-bold text-foreground"
      >
        {value}
      </motion.p>
    </div>
  );
}

type CommandCenterBoardChromeProps = {
  placement: "header" | "footer";
  title: string;
  subtitle?: string | null;
  activeView: CommandCenterViewId;
  stats?: {
    tasksToday: number;
    content: number;
    completed: number;
  };
};

export function CommandCenterBoardChrome({
  placement,
  title,
  subtitle,
  activeView,
  stats,
}: CommandCenterBoardChromeProps) {
  const { commandCenter: t } = copy;
  const showStats = activeView === "overview" && stats;

  return (
    <div
      className={cx(
        "command-center-board-chrome flex shrink-0 flex-wrap items-center justify-between gap-3 bg-surface-raised px-4 py-3 sm:px-5",
        placement === "header"
          ? "command-center-board-header border-b border-border-subtle"
          : "command-center-board-footer border-t border-border-subtle",
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {t.live}
          </span>
        </div>
        {subtitle ? (
          <p className="mt-1 max-w-xl text-[11px] leading-snug text-muted sm:text-xs">{subtitle}</p>
        ) : null}
      </div>
      {showStats ? (
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <AnimatedStat label={t.stats.agents} value={t.stats.agentsValue} />
          <AnimatedStat label={t.stats.tasksToday} value={stats.tasksToday} />
          <AnimatedStat label={t.stats.content} value={stats.content} />
          <AnimatedStat label={t.stats.completed} value={stats.completed} />
        </div>
      ) : null}
    </div>
  );
}
