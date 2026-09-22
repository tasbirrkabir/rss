"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { VEHICLES } from "@/data/vehicles";
import { Reveal } from "@/components/site/reveal";

const CARD_TAGS = ["AUTOMATIC", "EASY TO RIDE", "TOURIST FRIENDLY"] as const;

/**
 * Scooty showcase — horizontal snap gallery of the fleet on an ink band.
 * Desktop hover: image zooms subtly, a red spec panel slides over the
 * card bottom. Mobile: swipe the same scroll container.
 */
export function ScootyShowcase() {
  return (
    <section
      id="the-ride"
      aria-labelledby="showcase-heading"
      className="band-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE FLEET</p>
          <h2
            id="showcase-heading"
            className="display-1 mt-2 text-cream"
          >
            PICK <span className="text-brand">YOUR RIDE.</span>
          </h2>
          <p className="mt-4 max-w-xl text-cream/70">
            Two machines, one job: get you out into the green. Swipe or hover a
            card to see what it&apos;s about.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scroll gallery — full bleed */}
      <div className="mt-12 overflow-x-auto pb-4">
        <ul className="scrollbar-brutal flex w-max snap-x snap-mandatory gap-6 px-4 pb-1 sm:px-6">
          {VEHICLES.map((v, i) => (
            <li
              key={v.id}
              className="w-[320px] shrink-0 snap-start sm:w-[380px]"
            >
              <Reveal delay={i * 0.08} y={20}>
                <article className="group overflow-hidden bg-cream text-ink transition-transform duration-300 lg:group-hover:-translate-y-1.5">
                  {/* Index + tags */}
                  <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3">
                    <p className="label-micro text-brand">
                      RED SCOOTY {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="label-micro hidden text-steel sm:block">
                      {CARD_TAGS.join(" · ")}
                    </p>
                  </div>

                  {/* Image + sliding spec panel */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.imageAlt}
                      width={864}
                      height={1152}
                      sizes="(min-width: 640px) 380px, 320px"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                    />
                    {/* Red spec panel: static on mobile, slides in on desktop hover/focus */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-0 border-t border-ink/10 bg-brand/95 p-4 backdrop-blur-[2px] transition-transform duration-300 ease-out lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0">
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
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-white/80"
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
                  <div className="flex items-baseline justify-between border-b border-ink/10 bg-paper px-4 py-4">
                    <p className="label-micro text-steel">RENTAL RATE</p>
                    <p className="font-display text-2xl leading-none tracking-wide text-ink">
                      {v.priceLabel}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/scooties"
                    className="group/link flex h-13 items-center justify-between px-4 py-3.5 font-display text-xl tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
                  >
                    VIEW SCOOTY
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-200 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
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
                className="group flex h-full flex-col justify-between border border-dashed border-cream/40 p-6 transition-colors hover:border-brand hover:bg-brand/10"
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
                  SEE ALL SCOOTIES
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </p>
              </Link>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
