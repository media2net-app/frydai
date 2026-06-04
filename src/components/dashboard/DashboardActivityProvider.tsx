"use client";

import { createContext, useContext } from "react";
import type { ActivityItem } from "@/lib/command-center-data";
import { useDashboardActivityFeed } from "@/hooks/use-dashboard-activity-feed";

const DashboardActivityContext = createContext<ActivityItem[] | null>(null);

export function DashboardActivityProvider({ children }: { children: React.ReactNode }) {
  const items = useDashboardActivityFeed();
  return (
    <DashboardActivityContext.Provider value={items}>{children}</DashboardActivityContext.Provider>
  );
}

export function useDashboardActivity() {
  const items = useContext(DashboardActivityContext);
  if (items === null) {
    throw new Error("useDashboardActivity must be used within DashboardActivityProvider");
  }
  return items;
}
