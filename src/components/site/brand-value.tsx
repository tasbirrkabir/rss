import { Eye, MapPin, Zap } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const BENEFITS = [
  {
    n: "01",
    icon: Eye,
    title: "FREEDOM",
    body: "Explore on your own schedule. Take the scenic route - it is usually better.",
  },
  {
    n: "02",
    icon: Zap,
    title: "EASY RENTAL",
    body: "A simple request, a personal confirmation. Clear information before you ride.",
  },
  {
    n: "03",
    icon: MapPin,
    title: "LOCAL ACCESS",
    body: "Start from Sreemangal and go beyond the obvious. We point you the right way.",
  },
];

/** Brand value section (PRD section 16) - "YOUR RIDE. YOUR ROUTE." */
export function BrandValue() {
  return (
    <section aria-labelledby="brand-value-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">WHY RED SCOOTY</p>
          <h2
            id="brand-value-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            YOUR RIDE. <span className="text-outline">YOUR ROUTE.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.n}
              delay={i * 0.08}
              className={i === 1 ? "md:translate-y-6" : undefined}
            >
              <article className="h-full border-2 border-ink bg-paper p-6 shadow-hard">
                <div className="flex items-start justify-between">
                  <b.icon
                    className="h-8 w-8 text-brand"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <span className="font-display text-4xl text-steel">{b.n}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl tracking-wide text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
