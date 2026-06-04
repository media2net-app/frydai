"use client";

import { useEffect, useRef, useState } from "react";
import { useOperatorOsEnabled } from "@/components/dashboard/DashboardOperatorProvider";
import {
  ACTIVITY_TEMPLATES,
  COMMAND_CENTER_ACTIVITY,
  COMMAND_CENTER_TASKS,
  DONE_STATUS,
  INCOMING_TODO_POOL,
  IN_PROGRESS_STATUS,
  MAX_ACTIVITY_ITEMS,
  MAX_COLUMN_ITEMS,
  MAX_DONE_HISTORY,
  SIMULATION_LOOP_MS,
  type ActivityItem,
  type CommandTask,
  type TaskCategory,
} from "@/lib/command-center-data";

export type BoardStats = {
  tasksToday: number;
  content: number;
  completed: number;
};

export type HighlightTone = "progress" | "done" | "new";

export type InProgressTask = CommandTask & {
  progress: number;
};

type LiveState = {
  todo: CommandTask[];
  inProgress: InProgressTask[];
  done: CommandTask[];
  activity: ActivityItem[];
  stats: BoardStats;
  highlightId: string | null;
  highlightTone: HighlightTone | null;
  loopGeneration: number;
};

/** Tick cadence — slower updates feel more like real operator runs */
const PROGRESS_INTERVAL_MS = 450;
/** Smaller steps ≈ 45–55s to finish one in-progress task */
const PROGRESS_STEP = 0.85;
/** Pause after a task ships before the next one enters Running */
const COOLDOWN_TICKS_AFTER_COMPLETE = 14;
const INITIAL_PROGRESS = [42, 24, 9] as const;

function cloneInitial(loopGeneration = 0): LiveState {
  return {
    todo: [...COMMAND_CENTER_TASKS.todo],
    inProgress: COMMAND_CENTER_TASKS.inProgress.map((task, i) => ({
      ...task,
      progress: INITIAL_PROGRESS[i] ?? 0,
    })),
    done: [...COMMAND_CENTER_TASKS.done],
    activity: [...COMMAND_CENTER_ACTIVITY],
    stats: { tasksToday: 12, content: 8, completed: 3 },
    highlightId: null,
    highlightTone: null,
    loopGeneration,
  };
}

function pickIncomingTask(index: number): CommandTask {
  const template = INCOMING_TODO_POOL[index % INCOMING_TODO_POOL.length];
  return { ...template, id: `new-${Date.now()}-${index}` };
}

function pickActivity(task: CommandTask, index: number): ActivityItem {
  const pool = ACTIVITY_TEMPLATES.filter(
    (t) => !t.forCategory || t.forCategory === task.category,
  );
  const template = pool[index % pool.length] ?? ACTIVITY_TEMPLATES[0];
  return {
    id: `act-${Date.now()}-${index}`,
    message: template.message,
    time: "Just now",
  };
}

function doneStatusFor(category: TaskCategory, index: number): string {
  return DONE_STATUS[category][index % DONE_STATUS[category].length];
}

function bumpActivityTimes(items: ActivityItem[]): ActivityItem[] {
  return items.map((a) => {
    if (a.time === "Just now") return { ...a, time: "1m ago" };
    const match = a.time.match(/^(\d+)m ago$/);
    if (match) return { ...a, time: `${Number(match[1]) + 1}m ago` };
    return a;
  });
}

function startFromTodo(s: LiveState, tick: number): LiveState {
  if (s.todo.length === 0 || s.inProgress.length >= MAX_COLUMN_ITEMS) return s;
  const front = s.inProgress[0];
  if (front && front.progress < 100) return s;

  const [next, ...restTodo] = s.todo;
  const moving: InProgressTask = {
    ...next,
    status: IN_PROGRESS_STATUS[tick % IN_PROGRESS_STATUS.length],
    progress: 0,
  };

  return {
    ...s,
    todo: restTodo,
    inProgress: [moving, ...s.inProgress].slice(0, MAX_COLUMN_ITEMS),
    highlightId: moving.id,
    highlightTone: "progress" as const,
  };
}

function completeFront(s: LiveState, tick: number, activityIndex: number, todoPoolIndex: number) {
  const [finished, ...restProgress] = s.inProgress;
  if (!finished || finished.progress < 100) return { state: s, activityIndex, todoPoolIndex };

  const completed: CommandTask = {
    ...finished,
    status: doneStatusFor(finished.category, tick),
  };
  const activityItem = pickActivity(finished, activityIndex++);
  const incoming = pickIncomingTask(todoPoolIndex++);
  const newTodo =
    s.todo.length < MAX_COLUMN_ITEMS
      ? [...s.todo, incoming]
      : [...s.todo.slice(1), incoming];

  return {
    state: {
      ...s,
      inProgress: restProgress,
      done: [completed, ...s.done].slice(0, MAX_DONE_HISTORY),
      todo: newTodo,
      activity: [activityItem, ...bumpActivityTimes(s.activity)].slice(0, MAX_ACTIVITY_ITEMS),
      stats: {
        tasksToday: s.stats.tasksToday + 1,
        content:
          finished.category === "Content" ? s.stats.content + 1 : s.stats.content,
        completed: s.stats.completed + 1,
      },
      highlightId: completed.id,
      highlightTone: "done" as const,
    },
    activityIndex,
    todoPoolIndex,
  };
}

export function useCommandCenterLive() {
  const osEnabled = useOperatorOsEnabled();
  const [state, setState] = useState<LiveState>(() => cloneInitial(0));
  const todoPoolIndex = useRef(0);
  const activityIndex = useRef(0);
  const tick = useRef(0);
  const loopGeneration = useRef(0);
  const loopStartedAt = useRef(Date.now());
  const cooldownTicks = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!osEnabled) return;

    const interval = setInterval(() => {
      if (Date.now() - loopStartedAt.current >= SIMULATION_LOOP_MS) {
        loopStartedAt.current = Date.now();
        todoPoolIndex.current = 0;
        activityIndex.current = 0;
        tick.current = 0;
        loopGeneration.current += 1;
        cooldownTicks.current = 0;
        setState(cloneInitial(loopGeneration.current));
        return;
      }

      if (cooldownTicks.current > 0) {
        cooldownTicks.current -= 1;
      }

      setState((s) => {
        let next = s;
        const front = next.inProgress[0];

        if (front && front.progress < 100) {
          const progress = Math.min(100, front.progress + PROGRESS_STEP);
          const statusIndex = Math.floor(progress / 25) % IN_PROGRESS_STATUS.length;
          next = {
            ...next,
            inProgress: [
              {
                ...front,
                progress,
                status: IN_PROGRESS_STATUS[statusIndex],
              },
              ...next.inProgress.slice(1),
            ],
            highlightId: front.id,
            highlightTone: "progress",
          };
        }

        if (next.inProgress[0]?.progress >= 100) {
          const result = completeFront(
            next,
            tick.current++,
            activityIndex.current,
            todoPoolIndex.current,
          );
          activityIndex.current = result.activityIndex;
          todoPoolIndex.current = result.todoPoolIndex;
          next = result.state;
          cooldownTicks.current = COOLDOWN_TICKS_AFTER_COMPLETE;
        }

        if (cooldownTicks.current > 0) {
          return next;
        }

        return startFromTodo(next, tick.current);
      });
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [osEnabled]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!state.highlightId) return;
    const t = setTimeout(() => {
      setState((s) => ({ ...s, highlightId: null, highlightTone: null }));
    }, 4200);
    return () => clearTimeout(t);
  }, [state.highlightId, state.highlightTone]);

  return state;
}
