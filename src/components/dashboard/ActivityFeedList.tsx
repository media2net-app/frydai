"use client";

import { cx } from "@/lib/cx";
import type { ActivityItem } from "@/lib/command-center-data";

type ActivityFeedListProps = {
  items: ActivityItem[];
  compact?: boolean;
  className?: string;
};

export function ActivityFeedList({ items, compact = false, className }: ActivityFeedListProps) {
  return (
    <ul className={cx("divide-y divide-white/[0.05]", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className={cx("flex gap-3", compact ? "px-3 py-3" : "px-4 py-4 sm:px-5")}
        >
          <span
            className={cx(
              "shrink-0 rounded-full bg-violet-500/80",
              compact ? "mt-1.5 h-1.5 w-1.5" : "mt-2 h-2 w-2",
            )}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p
              className={cx(
                "leading-relaxed text-white/85",
                compact ? "line-clamp-3 text-xs" : "text-sm sm:text-base",
              )}
            >
              {item.message}
            </p>
            <p
              className={cx(
                "mt-1 font-mono",
                compact ? "text-[10px]" : "text-[11px]",
                item.time === "Just now" ? "text-emerald-400/90" : "text-white/40",
              )}
            >
              {item.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
