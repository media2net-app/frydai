import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import { DASHBOARD_AGENTS, TEAM_META, type AgentTeamId } from "@/lib/dashboard/agents-data";

const STATUS_STYLES = {
  online: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25",
  busy: "text-amber-300 bg-amber-500/15 border-amber-500/25",
  idle: "text-white/45 bg-white/[0.04] border-white/10",
} as const;

export function DashboardAgentsView() {
  const t = copy.dashboard.agents;
  const teams: AgentTeamId[] = ["research", "content", "ops"];

  return (
    <div className="space-y-8">
      {teams.map((teamId) => {
        const meta = TEAM_META[teamId];
        const agents = DASHBOARD_AGENTS.filter((a) => a.team === teamId);
        return (
          <section key={teamId}>
            <h2 className={cx("mb-3 text-sm font-semibold", meta.accent)}>{meta.label}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {agents.map((agent) => (
                <DashboardPanel key={agent.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <span
                      className={cx(
                        "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                        STATUS_STYLES[agent.status],
                      )}
                    >
                      {agent.status === "online"
                        ? t.online
                        : agent.status === "busy"
                          ? t.busy
                          : t.idle}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{agent.role}</p>
                  {agent.currentTask ? (
                    <p className="mt-3 line-clamp-2 text-xs text-violet-300/80">{agent.currentTask}</p>
                  ) : null}
                </DashboardPanel>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
