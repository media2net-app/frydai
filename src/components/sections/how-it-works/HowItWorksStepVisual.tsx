"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cx } from "@/lib/cx";
import { platformLogos } from "@/lib/platform-logos";

const VISUAL_AREA = "flex h-full min-h-[11rem] w-full flex-col";

function SubscribeVisual({ active }: { active: boolean }) {
  return (
    <div className={cx(VISUAL_AREA, "items-center justify-center")}>
      <motion.div
        animate={active ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 2, repeat: active ? Infinity : 0 }}
        className="w-full max-w-[220px] rounded-xl border border-border-subtle bg-inset p-4 text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">Founding access</p>
        <p className="mt-2 text-2xl font-bold text-foreground">€149</p>
        <p className="text-[10px] text-muted">every 4 weeks · via Whop</p>
        {active && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 inline-block text-[9px] font-medium text-emerald-400/90"
          >
            EU VAT included
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

function ConnectVisual({ active }: { active: boolean }) {
  const nodes = [
    { id: "telegram", label: "Telegram", icon: platformLogos.telegram },
    { id: "openai", label: "OpenAI", icon: platformLogos.openai },
    { id: "shopify", label: "Shopify", icon: platformLogos.shopify },
  ];

  return (
    <div className={cx(VISUAL_AREA, "items-center justify-center")}>
      <div className="relative flex w-full max-w-[240px] items-center justify-between gap-3">
        <motion.div
          animate={active ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.25 }}
          transition={{ duration: 2, repeat: active ? Infinity : 0 }}
          className="absolute left-4 right-4 top-[18px] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
          aria-hidden
        />
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            animate={active && i === 1 ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 1.8, repeat: active && i === 1 ? Infinity : 0 }}
            className="relative z-[1] flex flex-col items-center gap-2"
          >
            <Image
              src={node.icon}
              alt=""
              width={28}
              height={28}
              className="object-contain"
              unoptimized
            />
            <span className="text-[9px] font-medium text-muted">{node.label}</span>
          </motion.div>
        ))}
      </div>
      {active && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[9px] font-medium text-emerald-400/90"
        >
          API keys connected
        </motion.span>
      )}
    </div>
  );
}

function ConfigureVisual({ active }: { active: boolean }) {
  const rules = ["Max discount 25%", "Pause below 1.5 ROAS", "Brand voice on", "Approve spend >$500"];

  return (
    <div className={cx(VISUAL_AREA, "justify-center gap-2 px-1")}>
      {rules.map((rule, i) => (
        <motion.div
          key={rule}
          animate={{
            opacity: active ? 1 : 0.45,
            x: active && i === 1 ? [0, 2, 0] : 0,
          }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex items-center justify-between gap-2 rounded-lg border border-border-subtle bg-inset px-2.5 py-1.5"
        >
          <span className="text-[10px] text-muted">{rule}</span>
          <span
            className={cx(
              "relative h-4 w-7 shrink-0 rounded-full transition-colors",
              i < 3 ? "bg-violet-500/60" : "bg-fill-muted",
            )}
          >
            <motion.span
              animate={{ x: i < 3 ? 12 : 2 }}
              className="absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-sm"
            />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function OperateVisual({ active }: { active: boolean }) {
  const messages = [
    "Done. 12 hook variants shipped.",
    "Competitor report attached.",
    "Meta campaign scaled +15%.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2800);
    return () => clearInterval(id);
  }, [active, messages.length]);

  return (
    <div className={cx(VISUAL_AREA, "justify-end pb-1")}>
      <div className="how-it-works-terminal w-full rounded-xl border border-border-subtle bg-inset p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/30 text-[10px] font-bold text-violet-200">
            F
          </span>
          <div>
            <p className="text-[10px] font-semibold text-muted-strong">Frydai</p>
            <p className="text-[9px] text-muted">operator · just now</p>
          </div>
          {active && (
            <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          )}
        </div>
        <motion.p
          key={active ? messages[index] : messages[0]}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] leading-snug text-muted-strong"
        >
          {active ? messages[index] : messages[0]}
        </motion.p>
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-border-subtle bg-fill-subtle px-2 py-1">
          <span className="text-[9px] text-violet-300/90">📄</span>
          <span className="truncate text-[9px] text-muted">weekly_intel.pdf</span>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksStepVisual({
  stepIndex,
  active,
}: {
  stepIndex: number;
  active: boolean;
}) {
  switch (stepIndex) {
    case 0:
      return <SubscribeVisual active={active} />;
    case 1:
      return <ConnectVisual active={active} />;
    case 2:
      return <ConfigureVisual active={active} />;
    case 3:
      return <OperateVisual active={active} />;
    default:
      return null;
  }
}
