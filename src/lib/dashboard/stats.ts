import { countConnectedConnectors, DASHBOARD_CONNECTORS } from "@/lib/dashboard/connectors-data";
import { countEnabledSkills, DASHBOARD_SKILLS } from "@/lib/dashboard/skills-data";

export const DASHBOARD_STATS = {
  activeTasks: 7,
  skillsEnabled: countEnabledSkills(DASHBOARD_SKILLS),
  skillsTotal: DASHBOARD_SKILLS.length,
  connectorsLive: countConnectedConnectors(DASHBOARD_CONNECTORS),
  connectorsTotal: DASHBOARD_CONNECTORS.length,
  reportsWeek: 4,
} as const;
