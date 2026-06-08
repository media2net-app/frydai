"use client";

import { motion } from "framer-motion";
import { FrydaiMark } from "@/components/brand/FrydaiLogo";
import { VIKTOR_LANDING } from "@/lib/viktor-landing-data";
import { ViktorConnectorScrollVisual } from "@/components/viktor/ViktorConnectorScrollVisual";

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

function ValueCardVisual({ type }: { type: string }) {
  if (type === "chat-pdf") {
    return (
      <div className="viktor-value-visual viktor-value-visual--chat">
        <div className="viktor-mini-chat">
          <div className="viktor-mini-chat-row">
            <span className="viktor-mini-avatar" />
            <div className="viktor-mini-bubble viktor-mini-bubble--user">
              <span className="text-[10px] font-semibold">You</span>
              <p className="mt-1 text-[11px] leading-snug opacity-80">Scrape competitors and ship the report</p>
            </div>
          </div>
          <div className="viktor-mini-chat-row viktor-mini-chat-row--operator">
            <div className="viktor-mini-glass">
              <div className="flex items-center gap-1.5">
                <FrydaiMark variant="purple" className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold">Frydai</span>
                <span className="viktor-mini-app-badge">APP</span>
              </div>
              <p className="mt-2 text-[11px] leading-snug">Done. 47 competitors scraped. Full intel inside.</p>
              <div className="viktor-mini-pdf-pill mt-2">
                <span aria-hidden>📎</span>
                <span>ZenBlend_competitor_intel.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "floating-logos") {
    return (
      <div className="viktor-value-visual viktor-value-visual--connectors">
        <ViktorConnectorScrollVisual />
      </div>
    );
  }

  return (
    <div className="viktor-value-visual viktor-value-visual--chat">
      <div className="viktor-mini-chat">
        <div className="viktor-mini-chat-row">
          <span className="viktor-mini-avatar viktor-mini-avatar--alt" />
          <div className="viktor-mini-bubble viktor-mini-bubble--user">
            <span className="text-[10px] font-semibold">Steven</span>
            <p className="mt-1 text-[11px] leading-snug opacity-80">Remember our brand voice for hooks</p>
          </div>
        </div>
        <div className="viktor-mini-chat-row viktor-mini-chat-row--operator">
          <div className="viktor-mini-glass viktor-mini-glass--sm">
            <p className="text-[11px] leading-snug">Saved. I&apos;ll apply it to every creative run.</p>
          </div>
        </div>
        <div className="viktor-mini-chat-row viktor-mini-chat-row--operator">
          <div className="viktor-mini-glass viktor-mini-glass--sm">
            <p className="text-[11px] leading-snug">Updated guardrails for discount caps too.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ViktorValueCardsSection() {
  const { valueCards } = VIKTOR_LANDING;

  return (
    <section className="viktor-value-section px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3 md:items-stretch">
        {valueCards.map((card, index) => (
          <motion.article
            key={card.id}
            className="viktor-value-card h-full"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: CARD_EASE }}
          >
            <ValueCardVisual type={card.visual} />
            <div className="viktor-value-card-body">
              <h3 className="viktor-value-card-title">{card.title}</h3>
              <p className="viktor-value-card-desc mt-3">{card.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
