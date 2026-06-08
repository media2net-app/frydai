"use client";

import { ConnectorLogo } from "@/components/connectors/ConnectorLogo";
import { DASHBOARD_AGENTS, TEAM_META, type AgentTeamId } from "@/lib/command-center/agents-data";
import { DASHBOARD_CONNECTORS } from "@/lib/command-center/connectors-data";
import { DASHBOARD_REPORTS } from "@/lib/command-center/reports-data";
import { DASHBOARD_RULES } from "@/lib/command-center/rules-data";
import { DASHBOARD_SCHEDULES } from "@/lib/command-center/schedules-data";
import {
  countEnabledSkills,
  DASHBOARD_SKILLS,
} from "@/lib/command-center/skills-data";
import type { CommandCenterViewId } from "@/lib/command-center/nav";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import type { ActivityItem } from "@/lib/command-center-data";

function PanelCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "command-center-panel-card rounded-xl border border-border-subtle bg-inset p-3 sm:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "green" | "amber" | "violet" | "neutral";
}) {
  const tones = {
    green: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
    amber: "border-amber-500/25 bg-amber-500/10 text-amber-700",
    violet: "border-violet-500/25 bg-violet-500/10 text-violet-700",
    neutral: "border-border-subtle bg-fill-subtle text-muted-strong",
  };
  return (
    <span
      className={cx(
        "inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function RulesPanel() {
  const t = copy.dashboard.rules;
  const active = DASHBOARD_RULES.filter((r) => r.enabled).length;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">{t.countLabel.replace("{count}", String(active))}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {DASHBOARD_RULES.slice(0, 6).map((rule) => (
          <PanelCard key={rule.id} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{rule.name}</p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted">
                  {rule.description}
                </p>
              </div>
              <span
                className={cx(
                  "relative h-5 w-9 shrink-0 rounded-full",
                  rule.enabled ? "bg-violet-600" : "bg-fill-muted",
                )}
                aria-hidden
              >
                <span
                  className={cx(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow",
                    rule.enabled ? "left-[1.1rem]" : "left-0.5",
                  )}
                />
              </span>
            </div>
            <StatusPill tone={rule.enabled ? "green" : "neutral"}>
              {rule.enabled ? t.enabled : t.disabled}
            </StatusPill>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}

function AgentsPanel() {
  const t = copy.dashboard.agents;
  const teams: AgentTeamId[] = ["research", "content", "ops"];

  return (
    <div className="space-y-4">
      {teams.map((teamId) => {
        const meta = TEAM_META[teamId];
        const agents = DASHBOARD_AGENTS.filter((a) => a.team === teamId);
        return (
          <section key={teamId}>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {meta.label}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <PanelCard key={agent.id}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{agent.name}</p>
                    <StatusPill
                      tone={
                        agent.status === "online"
                          ? "green"
                          : agent.status === "busy"
                            ? "amber"
                            : "neutral"
                      }
                    >
                      {agent.status === "online"
                        ? t.online
                        : agent.status === "busy"
                          ? t.busy
                          : t.idle}
                    </StatusPill>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">{agent.role}</p>
                  {agent.currentTask ? (
                    <p className="mt-2 line-clamp-1 text-[11px] text-violet-700">
                      {agent.currentTask}
                    </p>
                  ) : null}
                </PanelCard>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SchedulesPanel() {
  const t = copy.dashboard.schedules;

  return (
    <div className="space-y-2">
      {DASHBOARD_SCHEDULES.map((schedule) => (
        <PanelCard key={schedule.id} className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{schedule.name}</p>
            <p className="mt-0.5 text-[11px] text-muted">
              {schedule.frequency} · {schedule.time} · {schedule.channel}
            </p>
          </div>
          <StatusPill tone={schedule.enabled ? "green" : "neutral"}>
            {schedule.enabled ? t.enabled : t.disabled}
          </StatusPill>
        </PanelCard>
      ))}
    </div>
  );
}

function SkillsPanel() {
  const t = copy.dashboard.skills;
  const enabled = countEnabledSkills(DASHBOARD_SKILLS);
  const preview = DASHBOARD_SKILLS.filter((s) => s.enabled).slice(0, 8);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">{t.countLabel.replace("{count}", String(enabled))}</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {preview.map((skill) => (
          <PanelCard key={skill.id}>
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground">{skill.name}</p>
              {skill.isNew ? (
                <StatusPill tone="violet">{t.weeklyDrop}</StatusPill>
              ) : null}
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] text-muted">{skill.description}</p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-muted">
              {skill.category}
            </p>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}

function ConnectorsPanel() {
  const t = copy.dashboard.connectors;
  const connected = DASHBOARD_CONNECTORS.filter((c) => c.status === "connected");

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {connected.map((connector) => (
        <PanelCard key={connector.id} className="flex items-center gap-3">
          <ConnectorLogo connector={connector} size={28} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{connector.name}</p>
            <p className="line-clamp-1 text-[11px] text-muted">{connector.description}</p>
          </div>
          <StatusPill tone="green">{t.connected}</StatusPill>
        </PanelCard>
      ))}
    </div>
  );
}

function ReportsPanel() {
  const t = copy.dashboard.reports;

  return (
    <div className="space-y-2">
      {DASHBOARD_REPORTS.map((report) => (
        <PanelCard key={report.id} className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{report.title}</p>
            <p className="mt-0.5 text-[11px] text-muted">
              {report.type} · {report.date}
              {report.size ? ` · ${report.size}` : ""}
            </p>
          </div>
          <StatusPill
            tone={
              report.status === "ready"
                ? "green"
                : report.status === "generating"
                  ? "amber"
                  : "neutral"
            }
          >
            {report.status === "ready"
              ? t.ready
              : report.status === "generating"
                ? t.generating
                : t.scheduled}
          </StatusPill>
        </PanelCard>
      ))}
    </div>
  );
}

function ActivityPanel({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <PanelCard
            className={cx(
              item.time === "Just now" && "border-emerald-500/25 bg-emerald-500/[0.06]",
            )}
          >
            <p className="text-[12px] leading-snug text-muted-strong">{item.message}</p>
            <p
              className={cx(
                "mt-1 text-[10px]",
                item.time === "Just now" ? "font-medium text-emerald-700" : "text-muted",
              )}
            >
              {item.time}
            </p>
          </PanelCard>
        </li>
      ))}
    </ul>
  );
}

function SettingsPanel() {
  const t = copy.dashboard.settings;

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <PanelCard>
        <h3 className="text-sm font-semibold text-foreground">{t.operator}</h3>
        <dl className="mt-3 space-y-2 text-[12px]">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.operatorName}</dt>
            <dd className="font-medium text-foreground">{t.operatorNameValue}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{t.timezone}</dt>
            <dd className="font-medium text-foreground">{t.timezoneValue}</dd>
          </div>
        </dl>
      </PanelCard>
      <PanelCard>
        <h3 className="text-sm font-semibold text-foreground">{t.notifications}</h3>
        <ul className="mt-3 space-y-2 text-[12px]">
          {[t.notifyTelegram, t.notifyProactive, t.notifyEmail].map((label, i) => (
            <li key={label} className="flex items-center justify-between gap-3">
              <span className="text-muted-strong">{label}</span>
              <span
                className={cx(
                  "relative h-5 w-9 rounded-full",
                  i < 2 ? "bg-violet-600" : "bg-fill-muted",
                )}
                aria-hidden
              >
                <span
                  className={cx(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow",
                    i < 2 ? "left-[1.1rem]" : "left-0.5",
                  )}
                />
              </span>
            </li>
          ))}
        </ul>
      </PanelCard>
      <PanelCard className="lg:col-span-2">
        <h3 className="text-sm font-semibold text-foreground">{t.billing}</h3>
        <p className="mt-2 text-[12px] text-muted">{t.billingPlan}</p>
        <p className="mt-2 text-[11px] text-muted">{t.demoNote}</p>
      </PanelCard>
    </div>
  );
}

type CommandCenterPanelViewProps = {
  view: CommandCenterViewId;
  activity: ActivityItem[];
};

export function CommandCenterPanelView({ view, activity }: CommandCenterPanelViewProps) {
  switch (view) {
    case "rules":
      return <RulesPanel />;
    case "agents":
      return <AgentsPanel />;
    case "schedules":
      return <SchedulesPanel />;
    case "skills":
      return <SkillsPanel />;
    case "connectors":
      return <ConnectorsPanel />;
    case "reports":
      return <ReportsPanel />;
    case "activity":
      return <ActivityPanel items={activity} />;
    case "settings":
      return <SettingsPanel />;
    default:
      return null;
  }
}
