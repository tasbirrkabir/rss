import { Eye, MapPin, Zap } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const BENEFITS = [
  {
    n: "01",
    icon: Eye,
    title: "FREEDOM",
    body: "Explore on your own schedule. Take the scenic route — it is usually better.",
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
 * Home brand intro — the editorial statement section.
 * Giant claim -> editorial body -> full-bleed red rule -> benefit minis.
 */
export function BrandIntro() {
  return (
    <section aria-labelledby="brand-intro-heading" className="pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="brand-intro-heading"
            className="max-w-4xl font-display text-[clamp(44px,6.5vw,100px)] leading-[0.92] text-ink"
          >
            SREEMANGAL IS BETTER{" "}
            <span className="text-steel/45">FROM A</span>{" "}
            <span className="text-brand">SEAT.</span>
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

      {/* Full-bleed red rule — the one loud brand gesture in this section */}
      <div className="mt-14 h-1.5 w-full bg-brand md:mt-20" aria-hidden="true" />

      {/* Benefit minis — quiet editorial cards */}
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-12 sm:px-6 md:pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.n} delay={i * 0.08}>
              <article className="group flex h-full items-start gap-4 border-b border-ink/10 bg-transparent p-4 transition-colors hover:border-brand/50">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 bg-paper transition-colors group-hover:border-brand/40">
                  <b.icon
                    className="h-5 w-5 text-brand"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="flex items-baseline gap-2">
                    <span className="label-micro text-steel">{b.n}</span>
                    <span className="font-display text-2xl leading-none tracking-wide text-ink">
                      {b.title}
                    </span>
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
