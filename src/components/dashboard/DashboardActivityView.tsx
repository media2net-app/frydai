"use client";

import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { ActivityFeedList } from "@/components/dashboard/ActivityFeedList";
import { copy } from "@/lib/copy";
import { useDashboardActivity } from "@/components/dashboard/DashboardActivityProvider";

export function DashboardActivityView() {
  const { activity: t } = copy.dashboard;
  const items = useDashboardActivity();

  return (
    <DashboardPanel className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-white">{t.live}</h2>
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>
      <ActivityFeedList items={items} />
    </DashboardPanel>
  );
}
