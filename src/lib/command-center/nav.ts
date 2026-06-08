export type CommandCenterViewId =
  | "overview"
  | "rules"
  | "agents"
  | "schedules"
  | "skills"
  | "connectors"
  | "reports"
  | "activity"
  | "settings";

export type CommandCenterNavLabelKey = CommandCenterViewId;

export type CommandCenterNavGroupId =
  | "workspace"
  | "operator"
  | "capabilities"
  | "output"
  | "system";

export type CommandCenterNavItem = {
  id: CommandCenterViewId;
  labelKey: CommandCenterNavLabelKey;
};

export type CommandCenterNavGroup = {
  id: CommandCenterNavGroupId;
  labelKey: CommandCenterNavGroupId;
  items: CommandCenterNavItem[];
};

export const COMMAND_CENTER_NAV_GROUPS: CommandCenterNavGroup[] = [
  {
    id: "workspace",
    labelKey: "workspace",
    items: [{ id: "overview", labelKey: "overview" }],
  },
  {
    id: "operator",
    labelKey: "operator",
    items: [
      { id: "rules", labelKey: "rules" },
      { id: "agents", labelKey: "agents" },
      { id: "schedules", labelKey: "schedules" },
    ],
  },
  {
    id: "capabilities",
    labelKey: "capabilities",
    items: [
      { id: "skills", labelKey: "skills" },
      { id: "connectors", labelKey: "connectors" },
    ],
  },
  {
    id: "output",
    labelKey: "output",
    items: [
      { id: "reports", labelKey: "reports" },
      { id: "activity", labelKey: "activity" },
    ],
  },
  {
    id: "system",
    labelKey: "system",
    items: [{ id: "settings", labelKey: "settings" }],
  },
];
