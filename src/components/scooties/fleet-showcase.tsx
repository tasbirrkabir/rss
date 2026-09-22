"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { useSiteConfig } from "@/components/site/site-config-provider";
import type { ScootyRecord } from "@/lib/cms";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Fleet showcase for /scooties — premium product-catalog entries.
 * Large portrait hero image per scooty (mask reveal, whisper-quiet hover
 * zoom), display type, and key characteristics as refined spec rows with
 * hairline separators.
 *
 * Honesty rules kept intact:
 * - priceLabel placeholders ("৳ — / DAY") are rendered exactly as stored.
 * - Availability is only ever "CONFIRM AVAILABILITY" — no fake in-stock.
 * - The Aug 2025 ৳2/minute promo is stated as clearly historical.
 */
export function FleetShowcase({ vehicles }: { vehicles: ScootyRecord[] }) {
  const { whatsappUrl: wa } = useSiteConfig();
  return (
    <section
      aria-labelledby="fleet-showcase-heading"
      className="bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE LINE-UP</p>
          <h2
            id="fleet-showcase-heading"
            className="display-1 mt-2 max-w-3xl text-ink"
          >
            TWO RIDES. <span className="text-brand">ZERO GEARS.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            Every scooty below is automatic, checked and handed over in person
            on Jalalia Road. Rates are confirmed on request — never guessed.
          </p>
        </Reveal>

        <div className="mt-4">
          {vehicles.map((v, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={v.id}
                aria-labelledby={`vehicle-${v.id}-title`}
                className={cn("rule-soft py-14 md:py-16", i === 0 && "border-t-0")}
              >
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
                  {/* Hero image */}
                  <Reveal
                    variant="mask"
                    className={cn("md:col-span-6", flip ? "md:order-2" : "md:order-1")}
                  >
                    <div className="group relative">
                      <div className="img-frame relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={v.image}
                          alt={v.imageAlt}
                          fill
                          sizes="(min-width: 768px) 48vw, 92vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      {i === 0 ? (
                        <p className="sticker absolute -right-2 top-5 rotate-2 bg-brand px-3 py-1.5 sm:-right-3">
                          <span className="font-display text-lg tracking-wider text-white">
                            NO GEARS · NO TENSION
                          </span>
                        </p>
                      ) : null}
                      <p className="label-micro mt-3 text-steel">
                        {v.name} · {v.category}
                      </p>
                    </div>
                  </Reveal>

                  {/* Catalog details */}
                  <div
                    className={cn(
                      "md:col-span-6",
                      flip ? "md:order-1" : "md:order-2",
                    )}
                  >
                    <Reveal delay={0.08}>
                      <p className="label-micro text-brand">
                        RED SCOOTY {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3
                        id={`vehicle-${v.id}-title`}
                        className="display-2 mt-2 text-ink"
                      >
                        {v.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-leaf">
                        {v.category}
                      </p>
                    </Reveal>

                    {/* Spec rows — hairline separators, no boxed grid */}
                    <Reveal delay={0.14}>
                      <dl className="mt-7 border-t border-ink/10">
                        <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                          <dt className="label-micro text-steel">
                            TRANSMISSION
                          </dt>
                          <dd className="text-right">
                            <span className="font-display text-xl tracking-wide text-ink">
                              {v.transmission ?? "—"}
                            </span>
                            <span className="label-micro ml-2 text-leaf">
                              CONFIRMED
                            </span>
                          </dd>
                        </div>
                        <div className="flex items-start justify-between gap-4 border-b border-ink/10 py-3.5">
                          <dt className="label-micro shrink-0 pt-1 text-steel">
                            RIDES LIKE
                          </dt>
                          <dd className="text-right">
                            <ul className="space-y-1.5">
                              {v.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-center justify-end gap-2 text-sm font-medium text-ink"
                                >
                                  {f}
                                  <span
                                    className="h-1 w-1 shrink-0 rounded-full bg-brand"
                                    aria-hidden="true"
                                  />
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                          <dt className="label-micro text-steel">
                            AVAILABILITY
                          </dt>
                          <dd className="font-display text-xl tracking-wide text-ink">
                            CONFIRM AVAILABILITY
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-4 py-3.5">
                          <dt className="label-micro text-steel">DAY RATE</dt>
                          <dd className="text-right">
                            <span className="font-display text-2xl tracking-wide text-ink">
                              {v.priceLabel}
                            </span>
                            <span className="label-micro mt-0.5 block text-steel">
                              PRICING AVAILABLE ON REQUEST
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </Reveal>

                    {/* CTAs */}
                    <Reveal delay={0.2}>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                          href={`/book?vehicle=${v.id}`}
                          onClick={() =>
                            track("click_booking", { source: `scooties:${v.id}` })
                          }
                          className="btn-base btn-primary group"
                        >
                          BOOK THIS SCOOTY
                          <ArrowRight
                            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                        <TrackedLink
                          event="click_whatsapp"
                          source={`scooties:confirm:${v.id}`}
                          href={wa(
                            `Hi Red Scooty! I would like to confirm availability of the ${v.name}.`,
                          )}
                          external
                          ariaLabel={`Confirm availability of the ${v.name} on WhatsApp`}
                          className="btn-base btn-outline group"
                        >
                          <MessageCircle
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                          CONFIRM AVAILABILITY
                        </TrackedLink>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Historical promo — stated as history, never as a current rate */}
        <Reveal delay={0.05}>
          <p className="label-micro rule-soft mt-2 pt-5 leading-relaxed text-steel">
            HISTORICAL PROMO (AUG 2025) WAS ৳2/MINUTE — CURRENT RATES ON
            REQUEST. NO PAYMENT ONLINE; EVERYTHING IS CONFIRMED PERSONALLY.
          </p>
        </Reveal>

        {/* Honest "more models" tile — fleet size and models are not invented */}
        <Reveal delay={0.08}>
          <div className="mt-10 border border-dashed border-ink/25 p-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <Plus className="h-8 w-8 text-brand" aria-hidden="true" />
                <h3 className="display-2 mt-4 text-ink">
                  MORE MODELS ON REQUEST.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  Final fleet list, models and rates are confirmed directly with
                  Red Scooty. Ask about multi-day rates, helmets and hotel
                  pickup.
                </p>
              </div>
              <TrackedLink
                event="click_whatsapp"
                source="scooties:more-models"
                href={wa(
                  "Hi Red Scooty! Could you tell me which scooty models you have available?",
                )}
                external
                ariaLabel="Ask which scooty models are available"
                className="btn-base btn-outline group shrink-0"
              >
                ASK WHAT IS AVAILABLE
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
