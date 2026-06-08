export type ReportStatus = "ready" | "generating" | "scheduled";

export type DashboardReport = {
  id: string;
  title: string;
  type: string;
  status: ReportStatus;
  date: string;
  size?: string;
};

export const DASHBOARD_REPORTS: DashboardReport[] = [
  {
    id: "rep1",
    title: "ZenBlend_competitor_intel.pdf",
    type: "Research",
    status: "ready",
    date: "Today · 07:02",
    size: "2.4 MB",
  },
  {
    id: "rep2",
    title: "Meta Ads — Week 11 summary",
    type: "Ads",
    status: "ready",
    date: "Yesterday",
    size: "840 KB",
  },
  {
    id: "rep3",
    title: "UGC scripts — Morning Routine bundle",
    type: "Content",
    status: "ready",
    date: "2 days ago",
    size: "156 KB",
  },
  {
    id: "rep4",
    title: "Reddit sentiment — AG1 vs competitors",
    type: "Research",
    status: "generating",
    date: "In progress",
  },
  {
    id: "rep5",
    title: "Store SEO — Q2 listing audit",
    type: "Store",
    status: "scheduled",
    date: "Wed 06:00",
  },
];
