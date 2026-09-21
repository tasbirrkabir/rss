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
] as const;

/**
 * Home brand intro - the editorial statement section.
 * Giant claim -> two-column editorial body -> full-bleed red rule -> benefit minis.
 */
export function BrandIntro() {
  return (
    <section aria-labelledby="brand-intro-heading" className="pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="brand-intro-heading"
            className="font-display text-[clamp(48px,7.5vw,110px)] leading-[0.9] text-ink"
          >
            SREEMANGAL
            <br />
            <span className="text-outline">IS BETTER</span>
            <br />
            FROM A <span className="text-brand">SEAT.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-6">
            <p className="label-micro text-steel md:col-span-4">
              WHY RIDE — NOT RIDE ALONG
            </p>
            <div className="md:col-span-8">
              <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">
                Tea gardens look different when you&apos;re moving through them.
                Forest roads feel different when you choose the route. And
                Sreemangal feels different when you aren&apos;t waiting for the
                next ride.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Giant full-bleed red rule */}
      <div className="mt-14 h-2 w-full bg-brand md:mt-20 md:h-3" aria-hidden="true" />

      {/* Benefit minis - compact row */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-4 sm:px-6 md:pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.n} delay={i * 0.08}>
              <article className="flex h-full items-start gap-4 border-2 border-ink bg-paper p-4 shadow-hard-sm">
                <b.icon
                  className="mt-0.5 h-6 w-6 shrink-0 text-brand"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-2xl leading-none tracking-wide text-ink">
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
