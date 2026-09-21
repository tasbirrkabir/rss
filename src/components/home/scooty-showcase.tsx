"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { VEHICLES } from "@/data/vehicles";
import { Reveal } from "@/components/site/reveal";

const CARD_TAGS = ["AUTOMATIC", "EASY TO RIDE", "TOURIST FRIENDLY"] as const;

/**
 * Scooty showcase - horizontal snap gallery of the fleet.
 * Desktop hover: image zooms, card lifts, a red spec panel slides over the
 * card bottom. Mobile: swipe the same scroll container.
 */
export function ScootyShowcase() {
  return (
    <section
      id="the-ride"
      aria-labelledby="showcase-heading"
      className="border-y-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE FLEET</p>
          <h2
            id="showcase-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-cream"
          >
            PICK
            <br />
            <span className="text-outline-cream">YOUR RIDE.</span>
          </h2>
          <p className="mt-4 max-w-xl text-cream/70">
            Two machines, one job: get you out into the green. Swipe or hover a
            card to see what it&apos;s about.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scroll gallery - full bleed */}
      <div className="mt-12 -mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        <ul className="scrollbar-brutal flex w-max snap-x snap-mandatory gap-6 pr-4 sm:pr-6">
          {VEHICLES.map((v, i) => (
            <li
              key={v.id}
              className="w-[340px] shrink-0 snap-start sm:w-[400px]"
            >
              <Reveal delay={i * 0.08} y={20}>
                <article className="group border-2 border-cream bg-cream text-ink shadow-hard-red transition-transform duration-300 lg:group-hover:-translate-y-1.5">
                  {/* Index + tags */}
                  <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-3">
                    <p className="label-micro text-brand">
                      RED SCOOTY {String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {CARD_TAGS.map((t) => (
                        <span
                          key={t}
                          className="label-micro border border-ink px-1.5 py-1 text-steel"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image + sliding spec panel */}
                  <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                    <Image
                      src={v.image}
                      alt={v.imageAlt}
                      width={864}
                      height={1152}
                      sizes="(min-width: 640px) 400px, 340px"
                      className="h-full w-full object-cover transition-transform duration-500 lg:group-hover:scale-105"
                    />
                    {/* Red spec panel: static on mobile, slides in on desktop hover/focus */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-0 border-t-2 border-ink bg-brand p-4 transition-transform duration-300 lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0">
                      <p className="font-display text-3xl leading-none tracking-wide text-white">
                        {v.name}
                      </p>
                      <p className="label-micro mt-1 text-white/85">{v.category}</p>
                      <ul className="mt-3 space-y-1">
                        {v.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm font-medium text-white"
                          >
                            <span
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-ink"
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <p className="label-micro mt-3 text-white/85">
                        FULL SPECIFICATIONS TO BE CONFIRMED
                      </p>
                    </div>
                  </div>

                  {/* Price block */}
                  <div className="flex items-baseline justify-between border-b-2 border-ink bg-paper px-4 py-4">
                    <p className="label-micro text-steel">RENTAL RATE</p>
                    <p className="font-display text-3xl leading-none tracking-wide text-ink">
                      {v.priceLabel}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/scooties"
                    className="flex h-14 items-center justify-between px-4 font-display text-2xl tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
                  >
                    VIEW SCOOTY{" "}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}

          {/* Honest "more models" tile */}
          <li className="flex w-[300px] shrink-0 snap-start items-stretch sm:w-[340px]">
            <Reveal delay={0.16} y={20} className="w-full">
              <Link
                href="/scooties"
                className="flex h-full flex-col justify-between border-2 border-dashed border-cream/50 p-6 transition-colors hover:border-brand hover:bg-brand/10"
              >
                <div>
                  <p className="label-micro text-brand">AND MORE</p>
                  <p className="mt-4 font-display text-4xl leading-[0.95] tracking-wide text-cream">
                    MORE MODELS
                    <br />
                    ON REQUEST.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">
                    Final fleet list, models and rates are confirmed directly
                    with Red Scooty. Ask us what&apos;s available.
                  </p>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 font-display text-2xl tracking-wider text-brand">
                  SEE ALL SCOOTIES <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </p>
              </Link>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
