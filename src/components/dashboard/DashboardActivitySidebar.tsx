"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ActivityFeedList } from "@/components/dashboard/ActivityFeedList";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { useDashboardActivity } from "@/components/dashboard/DashboardActivityProvider";
import { useDashboardOperator } from "@/components/dashboard/DashboardOperatorProvider";

const STORAGE_KEY = "frydai-activity-sidebar-expanded";
const EXPANDED_WIDTH = "17.5rem";
const COLLAPSED_WIDTH = "3.25rem";

type ActivitySidebarPanelProps = {
  expanded: boolean;
  onToggleExpanded: () => void;
  onNavigate?: () => void;
  className?: string;
};

export function ActivitySidebarPanel({
  expanded,
  onToggleExpanded,
  onNavigate,
  className,
}: ActivitySidebarPanelProps) {
  const { activitySidebar: t, activity: activityPage, statusLive, statusPaused } = copy.dashboard;
  const { osEnabled } = useDashboardOperator();
  const items = useDashboardActivity();

  return (
    <aside
      style={{ width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
      className={cx(
        "flex h-full shrink-0 flex-col overflow-hidden border-l border-white/10 bg-[#06060c] transition-[width] duration-300 ease-out",
        className,
      )}
      aria-label={t.title}
    >
      <div
        className={cx(
          "flex h-14 shrink-0 items-center border-b border-white/10",
          expanded ? "justify-between gap-2 px-3" : "justify-center px-1",
        )}
      >
        {expanded ? (
          <>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-white">{t.title}</h2>
              <span
                className={cx(
                  "mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide",
                  osEnabled ? "text-emerald-300" : "text-white/35",
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {osEnabled ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  ) : null}
                  <span
                    className={cx(
                      "relative inline-flex h-1.5 w-1.5 rounded-full",
                      osEnabled ? "bg-emerald-400" : "bg-white/30",
                    )}
                  />
                </span>
                {osEnabled ? statusLive : statusPaused}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleExpanded}
              className="shrink-0 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label={t.collapse}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onToggleExpanded}
            className="flex flex-col items-center gap-2 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label={t.expand}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {expanded ? (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
            <ActivityFeedList items={items} compact />
          </div>
          <div className="shrink-0 border-t border-white/10 p-3">
            <Link
              href="/dashboard/activity"
              onClick={onNavigate}
              className="block rounded-lg border border-white/10 px-3 py-2 text-center text-[11px] font-medium text-violet-300/90 transition-colors hover:bg-white/[0.04] hover:text-violet-200"
            >
              {activityPage.title} →
            </Link>
          </div>
        </>
      ) : null}
    </aside>
  );
}

export function DashboardActivitySidebar({ onNavigate }: { onNavigate?: () => void }) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setExpanded(stored === "true");
    } catch {
      /* ignore */
    }
  }, []);

  function toggleExpanded() {
    setExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <ActivitySidebarPanel
      expanded={expanded}
      onToggleExpanded={toggleExpanded}
      onNavigate={onNavigate}
    />
  );
}
