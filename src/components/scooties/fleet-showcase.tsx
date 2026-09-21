import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { whatsappMessageUrl } from "@/data/site";
import { VEHICLES } from "@/data/vehicles";

/**
 * Fleet showcase for /scooties — rebuilt fresh on the ink background.
 * Two real vehicles + one honest dashed "more models" tile. No invented
 * third model, no invented prices (data file carries "৳ — / DAY").
 */
export function FleetShowcase() {
  return (
    <section
      aria-labelledby="fleet-showcase-heading"
      className="border-b-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE LINE-UP</p>
          <h2
            id="fleet-showcase-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9]"
          >
            TWO RIDES.
            <br />
            <span className="text-outline-cream">ZERO GEARS.</span>
          </h2>
          <p className="mt-4 max-w-xl text-cream/80">
            Every scooty below is automatic, checked and handed over in person
            on Jalalia Road.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {VEHICLES.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col border-2 border-ink bg-paper text-ink shadow-hard-red">
                <div className="flex items-baseline justify-between gap-2 border-b-2 border-ink px-5 py-3">
                  <span className="font-display text-xl tracking-wider text-brand">
                    RED SCOOTY {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-micro text-steel">{v.category}</span>
                </div>

                <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink bg-cream">
                  <Image
                    src={v.image}
                    alt={v.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-4xl tracking-wide">
                    {v.name}
                  </h3>
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label={`${v.name} features`}
                  >
                    {v.features.map((f) => (
                      <li
                        key={f}
                        className="label-micro border border-ink px-2 py-1 text-ink"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-2 border-ink bg-brand px-4 py-3">
                    <p className="label-micro text-white/90">PER DAY</p>
                    <p className="font-display text-2xl leading-tight tracking-wide text-white">
                      {v.priceLabel}
                    </p>
                  </div>
                  <p className="label-micro mt-2 text-steel">
                    RATE CONFIRMED ON BOOKING — NO ONLINE PAYMENT.
                  </p>

                  <Link
                    href={`/book?vehicle=${v.id}`}
                    className="mt-4 flex h-14 items-center justify-center border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-hard-red active:translate-y-0"
                  >
                    BOOK THIS RIDE
                    <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>

                  <TrackedLink
                    event="click_whatsapp"
                    source={`scooties:ask:${v.id}`}
                    href={whatsappMessageUrl(
                      `Hi Red Scooty! I would like to ask about the ${v.name}.`,
                    )}
                    external
                    ariaLabel={`Ask on WhatsApp about the ${v.name}`}
                    className="mt-2 flex h-12 items-center justify-center border-2 border-ink bg-transparent font-display text-xl tracking-wider text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    ASK ABOUT THIS SCOOTY
                  </TrackedLink>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Honest filler tile: fleet size and models are not invented */}
          <Reveal delay={0.16} className="h-full">
            <article className="flex h-full min-h-72 flex-col items-start justify-between border-2 border-dashed border-cream/40 p-6">
              <div>
                <Plus className="h-10 w-10 text-brand" aria-hidden="true" />
                <h3 className="mt-6 font-display text-4xl leading-tight tracking-wide">
                  MORE MODELS
                  <br />
                  ON REQUEST.
                </h3>
                <p className="mt-3 text-sm text-cream/70">
                  Fleet size and models are confirmed directly with Red Scooty.
                  Ask about multi-day rates, helmets and hotel pickup.
                </p>
              </div>
              <TrackedLink
                event="click_whatsapp"
                source="scooties:more-models"
                href={whatsappMessageUrl(
                  "Hi Red Scooty! Could you tell me which scooty models you have available?",
                )}
                external
                ariaLabel="Ask which scooty models are available"
                className="mt-6 flex h-12 w-full items-center justify-center border-2 border-cream bg-transparent font-display text-xl tracking-wider text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                ASK WHAT IS AVAILABLE
              </TrackedLink>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
