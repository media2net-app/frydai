"use client";

import Image from "next/image";
import { cx } from "@/lib/cx";
import { copy } from "@/lib/copy";
import { FRYDAI_CREATIVES } from "@/lib/creatives-data";

const CREATIVES_PER_HALF = [...FRYDAI_CREATIVES, ...FRYDAI_CREATIVES];
const MARQUEE_TRACK = [...CREATIVES_PER_HALF, ...CREATIVES_PER_HALF];

function CreativeCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">
      <div className="relative aspect-[3/4] w-[168px] sm:w-[200px] md:w-[220px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 168px, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          quality={80}
          draggable={false}
        />
      </div>
    </div>
  );
}

export function CreativesSection() {
  const { creatives: t } = copy;

  return (
    <section
      id="creatives"
      className="scroll-mt-20 border-t border-white/10 bg-[#0a0a12] py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-200 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-base text-white/55 sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a12] to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a12] to-transparent sm:w-24"
            aria-hidden
          />

          <div className="overflow-hidden">
            <div
              className={cx(
                "creatives-marquee-track flex w-max gap-4 will-change-transform sm:gap-5",
                "animate-creatives-marquee hover:[animation-play-state:paused]",
              )}
            >
              {MARQUEE_TRACK.map((creative, index) => (
                <div
                  key={`${creative.id}-${index}`}
                  aria-hidden={index >= CREATIVES_PER_HALF.length}
                >
                  <CreativeCard src={creative.src} alt={creative.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
