"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { cx } from "@/lib/cx";
import type { CommandTask, TaskCategory } from "@/lib/command-center-data";
import { AGENT_ROSTER } from "@/lib/command-center-data";
import {
  OPERATOR_DELIVERIES,
  OPERATOR_PROCESS_STAGES,
  OPERATOR_WORKSTREAMS,
  type WorkstreamId,
} from "@/lib/dashboard/processes-data";
import { useDashboardOperator } from "@/components/dashboard/DashboardOperatorProvider";
import {
  useCommandCenterLive,
  type InProgressTask,
} from "@/hooks/use-command-center-live";

function isInProgress(task: CommandTask | InProgressTask): task is InProgressTask {
  return "progress" in task && typeof task.progress === "number";
}

function tasksForCategories(
  tasks: (CommandTask | InProgressTask)[],
  categories: TaskCategory[],
) {
  return tasks.filter((t) => categories.includes(t.category));
}

function ProcessPipeline({
  counts,
  labels,
}: {
  counts: Record<string, number>;
  labels: Record<string, string>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {OPERATOR_PROCESS_STAGES.map((stage, index) => {
        const count = counts[stage.id] ?? 0;
        const isActive = count > 0;

        return (
          <div key={stage.id} className="relative flex min-w-0 flex-col">
            {index < OPERATOR_PROCESS_STAGES.length - 1 ? (
              <span
                className="pointer-events-none absolute right-0 top-7 hidden h-px w-4 translate-x-full bg-gradient-to-r from-white/20 to-transparent xl:block"
                aria-hidden
              />
            ) : null}
            <div
              className={cx(
                "flex flex-1 flex-col rounded-xl border px-4 py-4 transition-colors",
                isActive
                  ? "border-violet-500/30 bg-violet-500/[0.06]"
                  : "border-white/10 bg-white/[0.02]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                  {labels[stage.id] ?? stage.label}
                </span>
                <span
                  className={cx(
                    "tabular-nums text-lg font-bold",
                    isActive ? "text-white" : "text-white/35",
                  )}
                >
                  {count}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-white">{stage.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{stage.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TaskRow({
  task,
  showProgress,
}: {
  task: CommandTask | InProgressTask;
  showProgress?: boolean;
}) {
  const progress = isInProgress(task) ? task.progress : 0;

  return (
    <li className="rounded-lg border border-white/[0.08] bg-[#0c0c14] px-3 py-2.5">
      <p className="line-clamp-2 text-sm font-medium leading-snug text-white/90">{task.title}</p>
      <p className="mt-1 text-[11px] text-white/45">{task.status}</p>
      {showProgress && isInProgress(task) ? (
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[10px] text-white/40">
            <span>Running</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-teal-400"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </div>
      ) : null}
    </li>
  );
}

function WorkstreamTaskSection({
  label,
  tasks,
  showProgress,
}: {
  label: string;
  tasks: (CommandTask | InProgressTask)[];
  showProgress?: boolean;
}) {
  if (tasks.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
        {label}
      </p>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} showProgress={showProgress} />
        ))}
      </ul>
    </div>
  );
}

function WorkstreamColumn({
  streamId,
  label,
  accent,
  border,
  dot,
  queuedLabel,
  runningLabel,
  shippedLabel,
  todo,
  running,
  shipped,
}: {
  streamId: WorkstreamId;
  label: string;
  accent: string;
  border: string;
  dot: string;
  queuedLabel: string;
  runningLabel: string;
  shippedLabel: string;
  todo: CommandTask[];
  running: (CommandTask | InProgressTask)[];
  shipped: CommandTask[];
}) {
  const shippedVisible = shipped.slice(0, 2);
  const taskCount = running.length + todo.length + shippedVisible.length;

  if (taskCount === 0) return null;

  return (
    <section
      className={cx("flex min-h-0 flex-col rounded-xl border bg-[#06060c]/80", border)}
      aria-labelledby={`workstream-${streamId}`}
    >
      <header className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className={cx("h-2 w-2 rounded-full", dot)} aria-hidden />
        <h3 id={`workstream-${streamId}`} className={cx("text-sm font-semibold", accent)}>
          {label}
        </h3>
        <span className="ml-auto tabular-nums text-xs text-white/40">{taskCount}</span>
      </header>

      <div className="flex flex-col gap-4 p-3 sm:p-4">
        <WorkstreamTaskSection label={runningLabel} tasks={running} showProgress />
        <WorkstreamTaskSection label={queuedLabel} tasks={todo} />
        <WorkstreamTaskSection label={shippedLabel} tasks={shippedVisible} />
      </div>
    </section>
  );
}

export function DashboardCommandCenter() {
  const { commandCenter: t } = copy.dashboard.overview;
  const { statusPaused } = copy.dashboard;
  const { osEnabled } = useDashboardOperator();
  const live = useCommandCenterLive();

  const stageCounts = {
    intake: live.todo.length,
    research: tasksForCategories(live.inProgress, ["Research"]).length,
    produce: tasksForCategories(live.inProgress, ["Content"]).length,
    ship: live.done.length,
  };

  const stageLabels = {
    intake: t.stageCounts.intake,
    research: t.stageCounts.research,
    produce: t.stageCounts.produce,
    ship: t.stageCounts.ship,
  };

  return (
    <section
      className="mt-6 w-full overflow-hidden rounded-xl border border-white/10 bg-[#050508] sm:mt-8"
      aria-label={t.title}
    >
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">{t.title}</h2>
            <span
              className={cx(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                osEnabled
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-white/15 bg-white/[0.04] text-white/40",
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                {osEnabled ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                ) : null}
                <span
                  className={cx(
                    "relative inline-flex h-1.5 w-1.5 rounded-full",
                    osEnabled ? "bg-emerald-400" : "bg-white/30",
                  )}
                />
              </span>
              {osEnabled ? t.live : statusPaused}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {(
              [
                [t.metrics.agents, "36/36"],
                [t.metrics.tasksToday, live.stats.tasksToday],
                [t.metrics.inProduction, live.stats.content],
                [t.metrics.completed, live.stats.completed],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="text-right">
                <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
                <p className="tabular-nums text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t.processes}
          </p>
          <ProcessPipeline counts={stageCounts} labels={stageLabels} />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t.workstreams}
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-5">
            {OPERATOR_WORKSTREAMS.map((stream) => {
              const todo = tasksForCategories(live.todo, stream.categories);
              const running = tasksForCategories(live.inProgress, stream.categories);
              const shipped = tasksForCategories(live.done, stream.categories);

              return (
                <WorkstreamColumn
                  key={stream.id}
                  streamId={stream.id}
                  label={stream.label}
                  accent={stream.accent}
                  border={stream.border}
                  dot={stream.dot}
                  queuedLabel={t.queue}
                  runningLabel={t.running}
                  shippedLabel={t.shipped}
                  todo={todo}
                  running={running}
                  shipped={shipped}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-6 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t.deliveries}
          </p>
          <aside className="rounded-xl border border-white/10 bg-[#06060c]/80">
            <ul className="divide-y divide-white/[0.05]">
              {OPERATOR_DELIVERIES.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                  <span
                    className={cx(
                      "mt-1 h-2 w-2 shrink-0 rounded-full",
                      item.status === "delivered" && "bg-emerald-400",
                      item.status === "sending" && "animate-pulse bg-amber-400",
                      item.status === "queued" && "bg-white/25",
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white/85">{item.title}</p>
                    <p className="mt-0.5 text-[10px] text-white/40">
                      {item.channel} · {item.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t.agents}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                [copy.commandCenter.agentTeams.research, AGENT_ROSTER.research],
                [copy.commandCenter.agentTeams.content, AGENT_ROSTER.content],
                [copy.commandCenter.agentTeams.ops, AGENT_ROSTER.ops],
              ] as const
            ).map(([team, agents]) => (
              <div
                key={team}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {team}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-400/90">
                    {agents.length}/{agents.length} online
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {agents.map((name) => (
                    <span
                      key={name}
                      className="rounded-md border border-white/[0.08] bg-[#0c0c14] px-2 py-1 text-[10px] font-medium text-white/55"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
