import type { TaskCategory } from "@/lib/command-center-data";

export type ProcessStageId = "intake" | "research" | "produce" | "ship";

export type ProcessStage = {
  id: ProcessStageId;
  label: string;
  description: string;
};

export const OPERATOR_PROCESS_STAGES: ProcessStage[] = [
  {
    id: "intake",
    label: "Intake",
    description: "New requests from Telegram, store events, and schedules.",
  },
  {
    id: "research",
    label: "Research",
    description: "Signals, competitor scans, and intel reports.",
  },
  {
    id: "produce",
    label: "Produce",
    description: "Creatives, copy, listings, and campaign assets.",
  },
  {
    id: "ship",
    label: "Ship",
    description: "Approvals, exports, and delivery to your channels.",
  },
];

export type WorkstreamId = "research" | "content" | "ads";

export type WorkstreamConfig = {
  id: WorkstreamId;
  label: string;
  categories: TaskCategory[];
  accent: string;
  border: string;
  dot: string;
};

export const OPERATOR_WORKSTREAMS: WorkstreamConfig[] = [
  {
    id: "research",
    label: "Research",
    categories: ["Research"],
    accent: "text-violet-300",
    border: "border-violet-500/25",
    dot: "bg-violet-400",
  },
  {
    id: "content",
    label: "Content & store",
    categories: ["Content"],
    accent: "text-teal-300",
    border: "border-teal-500/25",
    dot: "bg-teal-400",
  },
  {
    id: "ads",
    label: "Ads & growth",
    categories: ["Ads"],
    accent: "text-emerald-300",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400",
  },
];

export type DeliveryItem = {
  id: string;
  title: string;
  channel: string;
  status: "queued" | "sending" | "delivered";
  time: string;
};

export const OPERATOR_DELIVERIES: DeliveryItem[] = [
  {
    id: "d1",
    title: "ZenBlend_competitor_intel.pdf",
    channel: "Telegram",
    status: "queued",
    time: "Next batch",
  },
  {
    id: "d2",
    title: "UGC script — Morning Routine v3",
    channel: "Telegram",
    status: "sending",
    time: "Sending…",
  },
  {
    id: "d3",
    title: "Meta Ads report — Week 11",
    channel: "Telegram",
    status: "delivered",
    time: "12m ago",
  },
];
