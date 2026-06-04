"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cx } from "@/lib/cx";
import { copy } from "@/lib/copy";

const CHANNELS = [
  { id: "telegram", label: "Telegram", icon: "/platforms/telegram.svg" },
  { id: "line", label: "LINE" },
  { id: "whatsapp", label: "WhatsApp", icon: "/platforms/whatsapp.svg" },
] as const;

type ChatMessage = {
  id: string;
  role: "user" | "operator";
  text: string;
  attachment?: string;
};

const CHAT_THREADS: ChatMessage[][] = [
  [
    {
      id: "1",
      role: "user",
      text: "Run competitor scan for our greens category tonight.",
    },
    {
      id: "2",
      role: "operator",
      text: "Scheduled. I'll ship angles + pricing changes by 07:00.",
      attachment: "competitor_intel.pdf",
    },
  ],
  [
    {
      id: "3",
      role: "user",
      text: "Pause any ad set below 1.5 ROAS and draft 3 new hooks.",
    },
    {
      id: "4",
      role: "operator",
      text: "Done. 2 campaigns paused. Hook variants ready for approval.",
    },
  ],
  [
    {
      id: "5",
      role: "user",
      text: "Update the listicle hero to match the new UGC angle.",
    },
    {
      id: "6",
      role: "operator",
      text: "Landing page synced. Preview link attached — approve when ready.",
      attachment: "lp_preview_link",
    },
  ],
];

function ChannelPill({
  label,
  icon,
  active,
}: {
  label: string;
  icon?: string;
  active: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-violet-500/40 bg-violet-500/15 text-violet-100"
          : "border-border-subtle bg-inset text-muted",
      )}
    >
      {icon ? (
        <Image src={icon} alt="" width={14} height={14} className="object-contain" />
      ) : null}
      {label}
    </span>
  );
}

function OperatorChatMock() {
  const { talkToOperator: t, hero } = copy;
  const [threadIndex, setThreadIndex] = useState(0);
  const [activeChannel, setActiveChannel] = useState(0);
  const thread = CHAT_THREADS[threadIndex % CHAT_THREADS.length];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setThreadIndex((i) => (i + 1) % CHAT_THREADS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActiveChannel((i) => (i + 1) % CHANNELS.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border-subtle bg-inset px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-xs font-bold text-foreground">
            F
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{hero.telegramSender}</p>
            <p className="text-[10px] text-emerald-400">{t.chatStatus}</p>
          </div>
        </div>
        <span className="text-[10px] text-muted">{t.chatVia}</span>
      </div>

      <div className="space-y-3 px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={threadIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {thread.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-violet-600/80 px-3 py-2 text-sm text-white">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border-subtle bg-fill-subtle px-3 py-2">
                    <p className="text-sm leading-relaxed text-muted-strong">{msg.text}</p>
                    {msg.attachment ? (
                      <div className="mt-2 flex items-center gap-2 rounded-lg border border-border-subtle bg-fill-subtle px-2.5 py-1.5">
                        <span aria-hidden>📄</span>
                        <span className="truncate text-xs text-violet-200/90">
                          {msg.attachment}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-3 py-2.5">
          <span className="text-xs text-muted">{t.chatPlaceholder}</span>
          <span className="ml-auto text-[10px] text-muted">{t.chatHint}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border-subtle px-4 py-3">
        {CHANNELS.map((ch, i) => (
          <ChannelPill
            key={ch.id}
            label={ch.label}
            icon={"icon" in ch ? ch.icon : undefined}
            active={activeChannel === i}
          />
        ))}
      </div>
    </GlassCard>
  );
}

export function TalkToOperatorSection() {
  const { talkToOperator: t } = copy;

  return (
    <section
      id="talk-to-operator"
      className="scroll-mt-20 border-t border-border-subtle bg-surface py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t.titlePrefix}{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-200 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{t.subtitle}</p>

            <ul className="mt-8 space-y-3">
              {t.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-muted-strong sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] text-violet-300">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {t.channelsLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHANNELS.map((ch) => (
                  <ChannelPill
                    key={ch.id}
                    label={ch.label}
                    icon={"icon" in ch ? ch.icon : undefined}
                    active={ch.id === "telegram"}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-violet-600/15 blur-3xl"
              aria-hidden
            />
            <OperatorChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}
