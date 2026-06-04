"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cx } from "@/lib/cx";

const VISUAL_AREA = "flex h-full min-h-[11rem] w-full flex-col";

function ConnectVisual({ active }: { active: boolean }) {
  const nodes = [
    { id: "shopify", label: "Shopify", letter: "S", letterClass: "text-[#96bf48]" },
    { id: "meta", label: "Meta Ads", letter: "M", letterClass: "text-[#6eb0ff]" },
    {
      id: "telegram",
      label: "Telegram",
      icon: "/platforms/telegram.svg",
    },
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
            {node.icon ? (
              <Image src={node.icon} alt="" width={28} height={28} className="object-contain" />
            ) : (
              <span
                className={cx(
                  "text-lg font-bold leading-none",
                  "letterClass" in node ? node.letterClass : "",
                )}
              >
                {node.letter}
              </span>
            )}
            <span className="text-[9px] font-medium text-white/50">{node.label}</span>
          </motion.div>
        ))}
      </div>
      {active && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[9px] font-medium text-emerald-400/90"
        >
          Connected
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
          className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
        >
          <span className="text-[10px] text-white/65">{rule}</span>
          <span
            className={cx(
              "relative h-4 w-7 shrink-0 rounded-full transition-colors",
              i < 3 ? "bg-violet-500/60" : "bg-white/15",
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
      <div className="w-full rounded-xl border border-white/10 bg-[#0d1117]/80 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/30 text-[10px] font-bold text-violet-200">
            F
          </span>
          <div>
            <p className="text-[10px] font-semibold text-white/80">Frydai</p>
            <p className="text-[9px] text-white/40">operator · just now</p>
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
          className="text-[11px] leading-snug text-white/75"
        >
          {active ? messages[index] : messages[0]}
        </motion.p>
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
          <span className="text-[9px] text-violet-300/90">📄</span>
          <span className="truncate text-[9px] text-white/45">weekly_intel.pdf</span>
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
      return <ConnectVisual active={active} />;
    case 1:
      return <ConfigureVisual active={active} />;
    case 2:
      return <OperateVisual active={active} />;
    default:
      return null;
  }
}
