import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import { mapsQueryUrl } from "@/data/site";
import { BookRideButton } from "@/components/site/book-button";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

/** Explore section (PRD section 18) - the signature destination layer. */
export function Explore() {
  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">DESTINATIONS</p>
          <h2
            id="explore-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            WHERE WILL YOU RIDE?
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Tea gardens. Forest trails. Lakes. Quiet roads. Sreemangal is small
            - the rides between places are the trip.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.07}>
              <article className="group flex h-full flex-col border-2 border-ink bg-paper shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-lg">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 border-2 border-ink bg-cream px-2 py-1 font-display text-xl leading-none text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.distanceLabel ? (
                    <span className="label-micro absolute right-3 top-3 bg-ink px-2 py-1 text-cream">
                      {d.distanceLabel}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="label-micro text-brand">{d.type}</p>
                  <h3 className="mt-1 font-display text-4xl tracking-wide text-ink">
                    {d.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {d.description}
                  </p>

                  <p className="label-micro mt-4 text-steel">
                    GOOD FOR · {d.goodFor.join(" · ")}
                  </p>

                  <TrackedLink
                    event="get_directions"
                    source={`explore:${d.slug}`}
                    href={mapsQueryUrl(d.mapQuery)}
                    external
                    className="label-micro mt-4 inline-flex items-center gap-1 text-ink underline-offset-4 hover:text-brand hover:underline"
                    ariaLabel={`Get directions to ${d.name} on Google Maps`}
                  >
                    GET DIRECTIONS{" "}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Conversion tile */}
          <Reveal delay={0.14}>
            <div className="flex h-full flex-col items-start justify-center border-2 border-ink bg-brand p-6 text-white shadow-hard">
              <p className="label-micro text-white/85">DON&apos;T OVERTHINK IT</p>
              <h3 className="mt-2 font-display text-5xl leading-[0.95]">
                PICK ONE.
                <br />
                RIDE IT.
              </h3>
              <p className="mt-3 text-sm text-white/85">
                Not sure where to start? Tell us your date and we&apos;ll help
                you plan the route.
              </p>
              <BookRideButton
                source="explore:tile"
                className="mt-6 h-14 w-full rounded-none border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream transition-all hover:bg-white hover:text-ink hover:shadow-hard-red"
              >
                BOOK A RIDE{" "}
                <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </BookRideButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
