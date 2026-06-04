import { CommandCenterBoard } from "@/components/sections/CommandCenterBoard";
import { copy } from "@/lib/copy";

export function CommandCenterSection() {
  const { commandCenter: t } = copy;

  return (
    <section
      id="demo"
      className="scroll-mt-20 border-t border-white/10 bg-[#0a0a12] py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-white/55 sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,420px)] w-[min(100%,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <CommandCenterBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
