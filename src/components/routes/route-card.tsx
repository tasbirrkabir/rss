import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, FlagTriangleRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import type { RideRoute } from "@/data/ride-routes";

type RouteCardProps = {
  route: RideRoute;
  index: number;
};

/**
 * Large editorial route card for /routes.
 * Desktop: md:grid-cols-12 with image col-span-7, alternating sides.
 * All timing stays demo-labelled; CTAs link to /book?route= and /explore.
 */
export function RouteCard({ route, index }: RouteCardProps) {
  const flip = index % 2 === 1;
  const tilt = index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1";

  return (
    <article
      aria-labelledby={`route-${route.slug}-title`}
      className="border-2 border-ink bg-cream p-4 shadow-hard sm:p-6 md:p-8"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <Reveal className="h-full">
            <figure
              className={`relative h-full overflow-hidden border-2 border-ink bg-paper shadow-hard ${tilt}`}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <Image
                  src={route.image}
                  alt={route.imageAlt}
                  fill
                  sizes="(min-width: 768px) 58vw, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute left-0 top-0 border-2 border-ink bg-brand px-3 py-1 font-display text-xl tracking-wider text-white">
                ROUTE {String(index + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {route.tags.map((t) => (
                <span
                  key={t}
                  className="label-micro border-2 border-ink bg-paper px-2 py-1 text-ink"
                >
                  {t}
                </span>
              ))}
              <span className="label-micro inline-flex items-center gap-1.5 border-2 border-ink bg-brand px-2 py-1 text-white">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {route.durationLabel}
              </span>
            </div>

            <h2
              id={`route-${route.slug}-title`}
              className="mt-4 font-display text-[clamp(40px,5vw,64px)] leading-[0.95] text-ink"
            >
              {route.title}
            </h2>
            <p className="mt-3 text-base font-medium text-ink-soft">
              {route.character}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-steel">
              {route.description}
            </p>

            <ul className="mt-5 space-y-2" aria-label="Highlights">
              {route.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-sm font-medium text-ink"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 bg-brand"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>

            <p className="label-micro mt-5 inline-flex items-center gap-2 border border-dashed border-steel px-2 py-1 text-steel">
              <FlagTriangleRight className="h-3.5 w-3.5" aria-hidden="true" />
              SUGGESTED START: {route.startTime}
            </p>

            <ol
              className="mt-5 ml-1 space-y-0 border-l-2 border-ink/15"
              aria-label="Route stops"
            >
              {route.stops.map((stop, si) => (
                <li key={stop} className="relative flex items-center gap-3 py-1.5 pl-6">
                  <span
                    className="absolute -left-[7px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 border-2 border-ink bg-brand"
                    aria-hidden="true"
                  />
                  <span className="label-micro text-steel">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium tracking-wide text-ink">
                    {stop}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/book?route=${route.slug}`}
                className="flex h-12 flex-1 items-center justify-center border-2 border-ink bg-brand font-display text-xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard-red active:translate-y-0"
              >
                BOOK THIS RIDE
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/explore"
                className="flex h-12 flex-1 items-center justify-center border-2 border-ink bg-paper font-display text-xl tracking-wider text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                SEE DESTINATIONS
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
