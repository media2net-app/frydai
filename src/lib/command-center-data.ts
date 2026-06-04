export type TaskCategory = "Research" | "Content" | "Ads";

export type CommandTask = {
  id: string;
  title: string;
  status: string;
  category: TaskCategory;
};

export type ActivityItem = {
  id: string;
  message: string;
  time: string;
};

export const COMMAND_CENTER_TASKS = {
  todo: [
    {
      id: "t1",
      title: "Competitor pricing: Bloom, Organifi, AG1",
      status: "3 brands queued",
      category: "Research",
    },
    {
      id: "t2",
      title: 'UGC script: "Day in My Life"',
      status: "Brief ready",
      category: "Content",
    },
    {
      id: "t3",
      title: "Landing page: Morning Routine bundle",
      status: "Wireframe pending",
      category: "Content",
    },
  ],
  inProgress: [
    {
      id: "p1",
      title: 'Reddit sentiment: "AG1 vs competitors"',
      status: "Scanning 47 threads",
      category: "Research",
    },
    {
      id: "p2",
      title: 'Creative brief: "Morning Routine" angle',
      status: "Drafting hook variants",
      category: "Content",
    },
    {
      id: "p3",
      title: "Scale winning ad sets: Morning Routine",
      status: "Increasing budget +20%",
      category: "Ads",
    },
  ],
  done: [
    {
      id: "d1",
      title: "Meta Ads report — Week 11",
      status: "ROAS 3.2x",
      category: "Ads",
    },
    {
      id: "d2",
      title: "Pause creatives (CPA > $25)",
      status: "Saved ~$340/day",
      category: "Ads",
    },
    {
      id: "d3",
      title: 'UGC script: "After 30 Days"',
      status: "Approved — ready",
      category: "Content",
    },
  ],
} as const;

export const COMMAND_CENTER_ACTIVITY: ActivityItem[] = [
  { id: "a1", message: "Agent completed: Reddit research for niche #electronics", time: "Just now" },
  { id: "a2", message: "Ad set scaled: Morning Routine +20% budget", time: "2m ago" },
  { id: "a3", message: "Report generated: weekly performance summary", time: "5m ago" },
  { id: "a4", message: "Creative approved: UGC script v3", time: "8m ago" },
  { id: "a5", message: "Competitor detected: new ad from rival brand", time: "12m ago" },
  { id: "a6", message: "Listing optimized: product #882 SEO update", time: "15m ago" },
];

export const AGENT_ROSTER = {
  research: ["Ghost", "Spion", "Tracker", "Scout", "Analyst"],
  content: ["Machine", "Writer", "Caption", "Scripter", "Repurpose"],
  ops: ["Designer", "Ad Machine", "n8n", "Boss", "Builder"],
} as const;

/** Pool for incoming tasks when the board cycles */
export const INCOMING_TODO_POOL: Omit<CommandTask, "id">[] = [
  {
    title: "Price monitor: competitor flash sale",
    status: "Queued for scan",
    category: "Research",
  },
  {
    title: "Static ad: Summer bundle promo",
    status: "Brief uploaded",
    category: "Content",
  },
  {
    title: "Klaviyo flow: cart abandonment v2",
    status: "Awaiting copy draft",
    category: "Content",
  },
  {
    title: "TikTok spark ads: winning UGC clip",
    status: "Creative selected",
    category: "Ads",
  },
  {
    title: "Listing SEO: hero product #441",
    status: "Keywords ready",
    category: "Research",
  },
];

export const ACTIVITY_TEMPLATES: { message: string; forCategory?: TaskCategory }[] = [
  { message: "Task completed — shipped to Telegram", forCategory: "Research" },
  { message: "Creative approved and saved to drive", forCategory: "Content" },
  { message: "Ad set updated — budget +20% applied", forCategory: "Ads" },
  { message: "Agent Scout: new competitor ad detected" },
  { message: "Weekly intel report generated" },
  { message: "Listing optimized — SEO score +12" },
  { message: "UGC script v4 ready for review", forCategory: "Content" },
  { message: "Reddit scan finished — 47 threads analyzed", forCategory: "Research" },
];

export const IN_PROGRESS_STATUS = [
  "Agent running…",
  "Processing signals…",
  "Drafting output…",
  "Syncing with store…",
] as const;

export const DONE_STATUS: Record<TaskCategory, string[]> = {
  Research: ["Report delivered ✓", "Intel sent via Telegram", "Scan complete ✓"],
  Content: ["Approved — ready ✓", "Asset shipped ✓", "Brief complete ✓"],
  Ads: ["Live in ad account ✓", "ROAS holding — scaled ✓", "Saved ~$340/day ✓"],
};

export const MAX_COLUMN_ITEMS = 3;
export const MAX_DONE_HISTORY = 12;
export const MAX_ACTIVITY_ITEMS = 6;

/** Full board reset — demo loops back; paced for realistic task cycles */
export const SIMULATION_LOOP_MS = 300_000;

/** Fixed kanban geometry — board height never grows with animations */
export const KANBAN_SLOT_COUNT = 3;
export const ACTIVITY_SLOT_COUNT = 6;

/** Unified card height (all columns show progress bar) */
export const KANBAN_LIST_HEIGHT_CLASS = "h-[25.75rem] sm:h-[26.25rem]";
export const KANBAN_SLOT_HEIGHT_CLASS = "h-[8.25rem] sm:h-[8.5rem]";
