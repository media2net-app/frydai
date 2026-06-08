"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { FrydaiMark } from "@/components/brand/FrydaiLogo";
import { platformLogos } from "@/lib/platform-logos";

const CONNECTORS = [
  { src: platformLogos.shopify, name: "Shopify", icon: 24 },
  { src: platformLogos.notion, name: "Notion", icon: 24 },
  { src: platformLogos.hubspot, name: "HubSpot", icon: 24 },
  { src: platformLogos.meta, name: "Meta", icon: 24 },
  { src: platformLogos.googleAds, name: "Google Ads", icon: 22 },
  { src: platformLogos.stripe, name: "Stripe", icon: 20 },
  { src: platformLogos.klaviyo, name: "Klaviyo", icon: 22 },
  { src: platformLogos.telegram, name: "Telegram", icon: 24 },
] as const;

const TILE = 56;
const GAP = 32;
const STRIDE = TILE + GAP;
const PAUSE_MS = 2000;
const SLIDE_DURATION = 0.9;

const TRACK = [...CONNECTORS, ...CONNECTORS] as const;

export function ViktorConnectorScrollVisual() {
  const railRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [activeTile, setActiveTile] = useState(0);

  useMotionValueEvent(x, "change", (latest) => {
    const rail = railRef.current;
    if (!rail) return;

    const centerX = rail.offsetWidth / 2;
    const pad = centerX - TILE / 2;
    let closest = 0;
    let closestDist = Infinity;

    for (let i = 0; i < TRACK.length; i += 1) {
      const tileCenter = pad + i * STRIDE + TILE / 2 + latest;
      const dist = Math.abs(tileCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }

    setActiveTile(closest);
  });

  useEffect(() => {
    let step = 0;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;
      pauseTimer = setTimeout(runStep, PAUSE_MS);
    };

    const runStep = () => {
      if (cancelled) return;
      step += 1;
      const target = -step * STRIDE;

      animate(x, target, {
        duration: SLIDE_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (cancelled) return;
          if (step >= CONNECTORS.length) {
            step = 0;
            x.set(0);
          }
          scheduleNext();
        },
      });
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [x]);

  return (
    <div className="viktor-connector-visual" aria-hidden>
      <div ref={railRef} className="viktor-connector-rail">
        <motion.div className="viktor-connector-track" style={{ x }}>
          {TRACK.map((connector, index) => (
            <div
              key={`${connector.name}-${index}`}
              className={`viktor-connector-tile ${index === activeTile ? "viktor-connector-tile--active" : ""}`}
            >
              <Image
                src={connector.src}
                alt=""
                width={connector.icon}
                height={connector.icon}
                className="max-h-[1.375rem] max-w-[1.375rem] object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="viktor-connector-link">
        <svg className="viktor-connector-link-svg" viewBox="0 0 4 72" preserveAspectRatio="none" aria-hidden>
          <circle className="viktor-connector-link-dot-top" cx="2" cy="2.5" r="1.75" />
          <line className="viktor-connector-link-line" x1="2" y1="5" x2="2" y2="67" />
          <circle className="viktor-connector-link-dot-bottom" cx="2" cy="69.5" r="2.25" />
        </svg>
      </div>

      <div className="viktor-connector-hub">
        <FrydaiMark variant="white" className="h-7 w-7 sm:h-8 sm:w-8" />
      </div>
    </div>
  );
}
