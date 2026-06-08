"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandCenterBoardChrome } from "@/components/sections/CommandCenterBoardChrome";
import { CommandCenterPanelView } from "@/components/sections/CommandCenterPanelView";
import { CommandCenterSidebar } from "@/components/sections/CommandCenterSidebar";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import type { CommandTask, TaskCategory } from "@/lib/command-center-data";
import {
  ACTIVITY_SLOT_COUNT,
  KANBAN_LIST_HEIGHT_CLASS,
  KANBAN_SLOT_COUNT,
  KANBAN_SLOT_HEIGHT_CLASS,
} from "@/lib/command-center-data";
import { copy } from "@/lib/copy";
import type { CommandCenterViewId } from "@/lib/command-center/nav";
import {
  useCommandCenterLive,
  type HighlightTone,
  type InProgressTask,
} from "@/hooks/use-command-center-live";
import { useInView } from "@/hooks/use-in-view";

function getViewHeader(view: CommandCenterViewId) {
  const { commandCenter, dashboard: d } = copy;

  if (view === "overview") {
    return { title: commandCenter.boardTitle, subtitle: null as string | null };
  }

  const section = {
    rules: d.rules,
    agents: d.agents,
    schedules: d.schedules,
    skills: d.skills,
    connectors: d.connectors,
    reports: d.reports,
    activity: d.activity,
    settings: d.settings,
  }[view];

  return {
    title: section.title,
    subtitle: section.subtitle,
  };
}

function isInProgressTask(task: CommandTask | InProgressTask): task is InProgressTask {
  return "progress" in task && typeof task.progress === "number";
}

const CATEGORY_STYLES: Record<TaskCategory, string> = {
  Research: "text-violet-300 bg-violet-500/15 border-violet-500/25",
  Content: "text-teal-300 bg-teal-500/15 border-teal-500/25",
  Ads: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25",
};

const taskEnter = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const activityEnter = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
};

function CategoryPill({ category }: { category: TaskCategory }) {
  return (
    <span
      className={cx(
        "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        CATEGORY_STYLES[category],
      )}
    >
      {category}
    </span>
  );
}

type ColumnKind = "todo" | "inProgress" | "done";

function ProgressBar({
  progress,
  columnKind,
  active,
  labels,
}: {
  progress: number;
  columnKind: ColumnKind;
  active?: boolean;
  labels: { queued: string; running: string; complete: string };
}) {
  const value = Math.min(100, Math.max(0, progress));
  const label =
    columnKind === "todo"
      ? labels.queued
      : columnKind === "done" || value >= 100
        ? labels.complete
        : labels.running;

  const fillClass =
    columnKind === "done" || value >= 100
      ? "bg-emerald-400"
      : value === 0
        ? "bg-fill-muted"
        : "bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-400";

  return (
    <div className="shrink-0 pt-1">
      <div className="mb-1 flex items-center justify-between gap-2 text-[9px]">
        <span
          className={cx(
            columnKind === "done" || value >= 100
              ? "font-medium text-emerald-400/90"
              : active
                ? "font-medium text-emerald-400/80"
                : "text-muted",
          )}
        >
          {label}
        </span>
        <span className="tabular-nums text-muted">{Math.round(value)}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-fill-muted">
        <motion.div
          className={cx("h-full rounded-full", fillClass)}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={
            columnKind === "inProgress" && active
              ? { duration: 0.12, ease: "linear" }
              : { duration: 0.25, ease: "easeOut" }
          }
        />
      </div>
    </div>
  );
}

function TaskCard({
  task,
  highlightTone,
  isHighlighted,
  instant,
  columnKind,
  progressActive,
  progressLabels,
}: {
  task: CommandTask | InProgressTask;
  highlightTone: HighlightTone | null;
  isHighlighted: boolean;
  instant?: boolean;
  columnKind: ColumnKind;
  progressActive?: boolean;
  progressLabels: { queued: string; running: string; complete: string };
}) {
  const progress =
    columnKind === "todo"
      ? 0
      : columnKind === "done"
        ? 100
        : isInProgressTask(task)
          ? task.progress
          : 0;

  return (
    <motion.div
      key={task.id}
      initial={instant ? false : taskEnter.initial}
      animate={taskEnter.animate}
      transition={{ type: "spring", stiffness: 480, damping: 34 }}
      className={cx(
        "command-center-task-card flex h-full min-h-0 flex-col gap-1 overflow-hidden rounded-xl border p-2.5 sm:p-3",
        isHighlighted && highlightTone === "done" &&
          "is-highlighted-done border-emerald-400/50 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.18)]",
        isHighlighted && highlightTone === "progress" &&
          "is-highlighted-progress border-violet-400/40 bg-violet-500/10 ring-1 ring-violet-400/30",
        isHighlighted && highlightTone === "new" &&
          "is-highlighted-new border-teal-400/40 bg-teal-500/10",
        !isHighlighted && "border-border-subtle bg-inset",
      )}
    >
      <div className="min-h-0 shrink-0">
        <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">{task.title}</p>
        <motion.p
          key={task.status}
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx(
            "mt-0.5 line-clamp-1 text-[11px] leading-tight",
            isHighlighted && highlightTone === "done"
              ? "font-medium text-emerald-300"
              : "text-muted",
          )}
        >
          {task.status}
        </motion.p>
      </div>

      <ProgressBar
        progress={progress}
        columnKind={columnKind}
        active={progressActive}
        labels={progressLabels}
      />

      <div className="mt-auto shrink-0">
        <CategoryPill category={task.category} />
      </div>
    </motion.div>
  );
}

function DoneScrollList({
  tasks,
  highlightId,
  highlightTone,
  progressLabels,
}: {
  tasks: CommandTask[];
  highlightId: string | null;
  highlightTone: HighlightTone | null;
  progressLabels: { queued: string; running: string; complete: string };
}) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const newestId = tasks[0]?.id;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [newestId]);

  return (
    <ul
      ref={scrollRef}
      className={cx(
        KANBAN_LIST_HEIGHT_CLASS,
        "flex flex-col gap-2 overflow-x-hidden overflow-y-auto overscroll-contain pr-1.5",
      )}
    >
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className={cx("shrink-0 overflow-hidden", KANBAN_SLOT_HEIGHT_CLASS)}
          >
            <TaskCard
              task={task}
              highlightTone={highlightTone}
              isHighlighted={highlightId === task.id}
              columnKind="done"
              progressLabels={progressLabels}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function KanbanColumn({
  title,
  count,
  tasks,
  accent,
  highlightId,
  highlightTone,
  columnKind,
  progressLabels,
  scrollable,
}: {
  title: string;
  count: number;
  tasks: (CommandTask | InProgressTask)[];
  accent: string;
  highlightId: string | null;
  highlightTone: HighlightTone | null;
  columnKind: ColumnKind;
  progressLabels: { queued: string; running: string; complete: string };
  scrollable?: boolean;
}) {
  const slots = Array.from({ length: KANBAN_SLOT_COUNT }, (_, i) => tasks[i] ?? null);

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</h4>
        <motion.span
          key={count}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className={cx(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
            accent,
          )}
        >
          {count}
        </motion.span>
      </div>

      {scrollable ? (
        <DoneScrollList
          tasks={tasks as CommandTask[]}
          highlightId={highlightId}
          highlightTone={highlightTone}
          progressLabels={progressLabels}
        />
      ) : (
        <ul className={cx("flex shrink-0 flex-col gap-2 overflow-hidden", KANBAN_LIST_HEIGHT_CLASS)}>
          {slots.map((task, slotIndex) => (
            <li
              key={`${title}-slot-${slotIndex}`}
              className={cx("shrink-0 overflow-hidden", KANBAN_SLOT_HEIGHT_CLASS)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {task ? (
                  <TaskCard
                    task={task}
                    highlightTone={highlightTone}
                    isHighlighted={highlightId === task.id}
                    columnKind={columnKind}
                    progressLabels={progressLabels}
                    progressActive={
                      columnKind === "inProgress" &&
                      slotIndex === 0 &&
                      isInProgressTask(task) &&
                      task.progress < 100
                    }
                  />
                ) : (
                  <div
                    className="command-center-empty-slot h-full rounded-xl border border-dashed border-border-subtle bg-surface-raised"
                    aria-hidden
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CommandCenterBoard() {
  const { commandCenter: t } = copy;
  const { ref, inView } = useInView({ rootMargin: "160px 0px" });
  const live = useCommandCenterLive(inView);
  const [activeView, setActiveView] = useState<CommandCenterViewId>("overview");
  const viewHeader = getViewHeader(activeView);

  const progressLabels = {
    queued: t.progressQueued,
    running: t.progressRunning,
    complete: t.progressComplete,
  };

  const activitySlots = Array.from(
    { length: ACTIVITY_SLOT_COUNT },
    (_, i) => live.activity[i] ?? null,
  );

  return (
    <div ref={ref}>
      <GlassCard className="command-center-board overflow-hidden p-0">
      <div className="flex min-h-[32rem]">
        <CommandCenterSidebar activeId={activeView} onSelect={setActiveView} />

        <div className="flex min-w-0 flex-1 flex-col">
          <CommandCenterBoardChrome
            placement="header"
            title={viewHeader.title}
            subtitle={viewHeader.subtitle}
            activeView={activeView}
            stats={live.stats}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="min-h-0 flex-1"
            >
              {activeView === "overview" ? (
                <div className="grid min-h-0 h-full gap-0 lg:grid-cols-[1fr_minmax(0,220px)]">
                  <div className="border-b border-border-subtle p-4 sm:p-5 lg:border-b-0 lg:border-r">
                    <div className="flex flex-col gap-4 md:flex-row md:gap-3">
                      <KanbanColumn
                        title={t.columns.todo}
                        count={live.todo.length}
                        tasks={live.todo}
                        accent="bg-fill-muted text-muted-strong"
                        highlightId={live.highlightId}
                        highlightTone={live.highlightTone}
                        columnKind="todo"
                        progressLabels={progressLabels}
                      />
                      <KanbanColumn
                        title={t.columns.inProgress}
                        count={live.inProgress.length}
                        tasks={live.inProgress}
                        accent="bg-violet-500/25 text-violet-200"
                        highlightId={live.highlightId}
                        highlightTone={live.highlightTone}
                        columnKind="inProgress"
                        progressLabels={progressLabels}
                      />
                      <KanbanColumn
                        title={t.columns.done}
                        count={live.done.length}
                        tasks={live.done}
                        accent="bg-emerald-500/25 text-emerald-200"
                        highlightId={live.highlightId}
                        highlightTone={live.highlightTone}
                        columnKind="done"
                        progressLabels={progressLabels}
                        scrollable
                      />
                    </div>
                  </div>

                  <div className="command-center-activity-panel flex flex-col bg-surface-raised p-4 sm:p-5">
                    <h4 className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">
                      {t.activityTitle}
                    </h4>
                    <ul
                      className={cx(
                        "flex shrink-0 flex-col gap-2 overflow-hidden",
                        KANBAN_LIST_HEIGHT_CLASS,
                      )}
                    >
                      {activitySlots.map((item, slotIndex) => (
                        <li
                          key={`activity-slot-${slotIndex}`}
                          className="h-[3.5rem] shrink-0 overflow-hidden"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {item ? (
                              <motion.div
                                key={item.id}
                                initial={activityEnter.initial}
                                animate={activityEnter.animate}
                                transition={{ duration: 0.22 }}
                                className={cx(
                                  "command-center-activity-item flex h-full flex-col justify-center rounded-lg border px-3 py-2",
                                  item.time === "Just now"
                                    ? "is-just-now border-emerald-500/25 bg-emerald-500/[0.06]"
                                    : "border-border-subtle bg-surface-raised",
                                )}
                              >
                                <p className="line-clamp-1 text-[11px] leading-snug text-muted-strong">
                                  {item.message}
                                </p>
                                <p
                                  className={cx(
                                    "mt-0.5 text-[10px]",
                                    item.time === "Just now"
                                      ? "font-medium text-emerald-400/90"
                                      : "text-muted",
                                  )}
                                >
                                  {item.time}
                                </p>
                              </motion.div>
                            ) : (
                              <div
                                className="command-center-empty-slot h-full rounded-lg border border-dashed border-border-subtle bg-transparent"
                                aria-hidden
                              />
                            )}
                          </AnimatePresence>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="command-center-panel-scroll max-h-[28rem] overflow-y-auto p-4 sm:max-h-none sm:p-5">
                  <CommandCenterPanelView view={activeView} activity={live.activity} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <CommandCenterBoardChrome
            placement="footer"
            title={viewHeader.title}
            subtitle={viewHeader.subtitle}
            activeView={activeView}
            stats={live.stats}
          />
        </div>
      </div>
      </GlassCard>
    </div>
  );
}
