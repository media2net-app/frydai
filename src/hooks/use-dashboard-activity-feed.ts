"use client";

import { useEffect, useState } from "react";
import { useOperatorOsEnabled } from "@/components/dashboard/DashboardOperatorProvider";
import type { ActivityItem } from "@/lib/command-center-data";
import { ACTIVITY_TEMPLATES, COMMAND_CENTER_ACTIVITY } from "@/lib/command-center-data";

export const ACTIVITY_FEED_MAX_ITEMS = 24;

function formatTime(offsetMinutes: number) {
  if (offsetMinutes === 0) return "Just now";
  if (offsetMinutes === 1) return "1m ago";
  return `${offsetMinutes}m ago`;
}

export function useDashboardActivityFeed(maxItems = ACTIVITY_FEED_MAX_ITEMS) {
  const osEnabled = useOperatorOsEnabled();
  const [items, setItems] = useState<ActivityItem[]>(COMMAND_CENTER_ACTIVITY);

  useEffect(() => {
    if (!osEnabled) return;

    const interval = setInterval(() => {
      const template = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
      const entry: ActivityItem = {
        id: `live-${Date.now()}`,
        message: template.message,
        time: "Just now",
      };
      setItems((prev) => {
        const next = [entry, ...prev.map((item, i) => ({ ...item, time: formatTime(i + 1) }))];
        return next.slice(0, maxItems);
      });
    }, 12_000);
    return () => clearInterval(interval);
  }, [maxItems, osEnabled]);

  return items;
}
