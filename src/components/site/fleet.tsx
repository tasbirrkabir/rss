import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FLEET_NOTE, VEHICLES } from "@/data/vehicles";
import { BookRideButton } from "@/components/site/book-button";
import { Reveal } from "@/components/site/reveal";

/** Fleet section (PRD section 17) - "PICK YOUR RIDE." on ink background. */
export function Fleet() {
  return (
    <section
      id="fleet"
      aria-labelledby="fleet-heading"
      className="border-y-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE FLEET</p>
          <h2
            id="fleet-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9]"
          >
            PICK YOUR RIDE.
          </h2>
          <p className="mt-4 max-w-xl text-cream/80">
            Your next Sreemangal route starts here. Every ride is checked,
            cleaned and handed over personally.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {VEHICLES.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <article className="flex h-full flex-col border-2 border-ink bg-paper text-ink shadow-hard-red">
                <div className="flex items-baseline justify-between border-b-2 border-ink px-5 py-3">
                  <span className="font-display text-2xl text-brand">
                    {String(i + 1).padStart(2, "0")}
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
                  <h3 className="font-display text-4xl tracking-wide">{v.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Features">
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

                  <BookRideButton
                    source={`fleet:${v.id}`}
                    vehicleId={v.id}
                    className="mt-4 h-14 w-full rounded-none border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream transition-all hover:bg-brand hover:shadow-hard-red"
                  >
                    BOOK THIS RIDE <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </BookRideButton>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Honest filler tile: no invented third model */}
          <Reveal delay={0.16}>
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
              <BookRideButton
                source="fleet:more"
                presetMessage="Hi Red Scooty! Could you tell me which scooty models you have available?"
                className="mt-6 h-12 w-full rounded-none border-2 border-cream bg-transparent font-display text-xl tracking-wider text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                ASK ABOUT MODELS
              </BookRideButton>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="label-micro mt-10 max-w-3xl text-cream/60">
            {FLEET_NOTE.toUpperCase()}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
