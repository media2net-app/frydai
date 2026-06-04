export type ScheduleFrequency = "Daily" | "Weekly" | "On event";

export type DashboardSchedule = {
  id: string;
  name: string;
  frequency: ScheduleFrequency;
  time: string;
  channel: string;
  enabled: boolean;
  description: string;
};

export const DASHBOARD_SCHEDULES: DashboardSchedule[] = [
  {
    id: "s1",
    name: "Morning intel brief",
    frequency: "Daily",
    time: "07:00",
    channel: "Telegram",
    enabled: true,
    description: "Competitor pricing, trends, and overnight store signals.",
  },
  {
    id: "s2",
    name: "Meta performance report",
    frequency: "Weekly",
    time: "Mon 09:00",
    channel: "Telegram",
    enabled: true,
    description: "ROAS, CPA, and creative fatigue summary for active campaigns.",
  },
  {
    id: "s3",
    name: "Creative refresh check",
    frequency: "Daily",
    time: "14:00",
    channel: "Telegram",
    enabled: true,
    description: "Flag hooks older than 14 days with rising CPA.",
  },
  {
    id: "s4",
    name: "Listing SEO sweep",
    frequency: "Weekly",
    time: "Wed 06:00",
    channel: "Telegram",
    enabled: false,
    description: "Top 20 SKUs — title and meta recommendations.",
  },
  {
    id: "s5",
    name: "Low stock alert",
    frequency: "On event",
    time: "Realtime",
    channel: "Telegram",
    enabled: true,
    description: "Notify when hero SKUs drop below 5 days of cover.",
  },
  {
    id: "s6",
    name: "Klaviyo flow review",
    frequency: "Weekly",
    time: "Fri 11:00",
    channel: "Telegram",
    enabled: false,
    description: "Cart and post-purchase flow performance + copy suggestions.",
  },
];
