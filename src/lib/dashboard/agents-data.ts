import { AGENT_ROSTER } from "@/lib/command-center-data";

export type AgentTeamId = "research" | "content" | "ops";

export type DashboardAgent = {
  id: string;
  name: string;
  team: AgentTeamId;
  role: string;
  status: "online" | "idle" | "busy";
  currentTask?: string;
};

const TEAM_META: Record<AgentTeamId, { label: string; accent: string }> = {
  research: { label: "Research", accent: "text-violet-300" },
  content: { label: "Content", accent: "text-teal-300" },
  ops: { label: "Ops", accent: "text-emerald-300" },
};

const ROLES: Record<AgentTeamId, string[]> = {
  research: ["Competitor intel", "Signal scan", "Trend watch", "Listing audit", "Report writer"],
  content: ["UGC scripts", "Static ads", "LP copy", "Email flows", "Hook variants"],
  ops: ["Meta ads", "Store sync", "Workflow", "QA check", "Delivery"],
};

function buildAgents(): DashboardAgent[] {
  const agents: DashboardAgent[] = [];
  (Object.keys(AGENT_ROSTER) as AgentTeamId[]).forEach((team) => {
    AGENT_ROSTER[team].forEach((name, index) => {
      agents.push({
        id: `${team}-${name}`,
        name,
        team,
        role: ROLES[team][index % ROLES[team].length],
        status: index === 0 ? "busy" : index === 1 ? "online" : "idle",
        currentTask:
          index === 0
            ? team === "research"
              ? "Reddit sentiment scan"
              : team === "content"
                ? "UGC hook variants"
                : "Meta budget review"
            : undefined,
      });
    });
  });
  return agents;
}

export const DASHBOARD_AGENTS = buildAgents();
export { TEAM_META };
