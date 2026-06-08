"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { copy } from "@/lib/copy";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { IntegrationLogoMarquee } from "@/components/hero/IntegrationLogoMarquee";

function TestimonialCard({
  quote,
  author,
  role,
  metric,
  initials,
}: {
  quote: string;
  author: string;
  role: string;
  metric?: string;
  initials: string;
}) {
  return (
    <GlassCard className="testimonials-glass-card flex h-full flex-col p-5 transition-colors hover:border-violet-500/25 sm:p-6">
      <span className="text-2xl leading-none text-violet-400/50" aria-hidden>
        &ldquo;
      </span>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-strong sm:text-base">{quote}</p>

      {metric ? (
        <span className="mt-4 inline-flex w-fit rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          {metric}
        </span>
      ) : null}

      <div className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/15 text-xs font-bold text-violet-200">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{author}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export function TestimonialsSection() {
  const { testimonials: t } = copy;

  return (
    <section
      id="testimonials"
      className="testimonials-section scroll-mt-20 border-t border-border-subtle bg-surface-alt py-16 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80 sm:text-xs">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">{t.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} {...item} />
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-muted">{t.footnote}</p>

        <div className="mt-12 border-t border-border-subtle pt-10 sm:mt-14">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-muted">
            {t.integrationsTitle}
          </p>
          <IntegrationLogoMarquee className="mt-6" ariaLabel={t.integrationsTitle} />
        </div>
      </div>
    </section>
  );
}
