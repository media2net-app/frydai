export type DashboardNavId =
  | "overview"
  | "rules"
  | "agents"
  | "schedules"
  | "skills"
  | "connectors"
  | "reports"
  | "activity"
  | "settings";

export type DashboardNavLabelKey = DashboardNavId;

export type DashboardNavGroupId = "workspace" | "operator" | "capabilities" | "output" | "system";

export type DashboardNavItem = {
  id: DashboardNavId;
  href: string;
  labelKey: DashboardNavLabelKey;
};

export type DashboardNavGroup = {
  id: DashboardNavGroupId;
  labelKey: DashboardNavGroupId;
  items: DashboardNavItem[];
};

export const DASHBOARD_NAV_GROUPS: DashboardNavGroup[] = [
  {
    id: "workspace",
    labelKey: "workspace",
    items: [{ id: "overview", href: "/dashboard", labelKey: "overview" }],
  },
  {
    id: "operator",
    labelKey: "operator",
    items: [
      { id: "rules", href: "/dashboard/rules", labelKey: "rules" },
      { id: "agents", href: "/dashboard/agents", labelKey: "agents" },
      { id: "schedules", href: "/dashboard/schedules", labelKey: "schedules" },
    ],
  },
  {
    id: "capabilities",
    labelKey: "capabilities",
    items: [
      { id: "skills", href: "/dashboard/skills", labelKey: "skills" },
      { id: "connectors", href: "/dashboard/connectors", labelKey: "connectors" },
    ],
  },
  {
    id: "output",
    labelKey: "output",
    items: [
      { id: "reports", href: "/dashboard/reports", labelKey: "reports" },
      { id: "activity", href: "/dashboard/activity", labelKey: "activity" },
    ],
  },
  {
    id: "system",
    labelKey: "system",
    items: [{ id: "settings", href: "/dashboard/settings", labelKey: "settings" }],
  },
];

/** Flat list for lookups */
export const DASHBOARD_NAV = DASHBOARD_NAV_GROUPS.flatMap((g) => g.items);

export function getDashboardNavId(pathname: string): DashboardNavId {
  if (pathname.startsWith("/dashboard/rules")) return "rules";
  if (pathname.startsWith("/dashboard/agents")) return "agents";
  if (pathname.startsWith("/dashboard/schedules")) return "schedules";
  if (pathname.startsWith("/dashboard/skills")) return "skills";
  if (pathname.startsWith("/dashboard/connectors")) return "connectors";
  if (pathname.startsWith("/dashboard/reports")) return "reports";
  if (pathname.startsWith("/dashboard/activity")) return "activity";
  if (pathname.startsWith("/dashboard/settings")) return "settings";
  return "overview";
}
