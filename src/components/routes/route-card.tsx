"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, FlagTriangleRight, MapPin } from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import type { RideRoute } from "@/data/ride-routes";
import { Reveal } from "@/components/site/reveal";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type RouteCardProps = {
  route: RideRoute;
  index: number;
  /** Provided on /routes — shows a "show on map" control wired to page state. */
  onSelect?: (routeId: string) => void;
  selected?: boolean;
};

/**
 * Vertical stops mini-itinerary — hairline connectors, quiet numbered dots.
 * Shared between the route library entries and the map detail panel.
 */
export function RouteStops({ stops }: { stops: string[] }) {
  return (
    <ol aria-label="Route stops">
      {stops.map((stop, si) => (
        <li key={stop} className="relative flex gap-4 pb-5 last:pb-0">
          {si < stops.length - 1 ? (
            <span
              className="absolute left-[5px] top-4 h-full w-px bg-ink/15"
              aria-hidden="true"
            />
          ) : null}
          <span
            className="mt-1 h-[11px] w-[11px] shrink-0 rounded-full border border-ink/30 bg-paper"
            aria-hidden="true"
          />
          <div>
            <p className="label-micro text-steel">
              STOP {String(si + 1).padStart(2, "0")}
            </p>
            <p className="text-sm font-medium leading-snug tracking-wide text-ink">
              {stop}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Premium editorial route entry for /routes — a stacked card-soft composition
 * with alternating image side on desktop. Distance quotes verified published
 * figures with the source surfaced; timings stay approximate-labelled.
 */
export function RouteCard({ route, index, onSelect, selected }: RouteCardProps) {
  const flip = index % 2 === 1;

  const relatedNames = route.relatedDestinations
    .map((slug) => DESTINATIONS.find((d) => d.slug === slug)?.name)
    .filter((n): n is string => Boolean(n));

  const showOnMap = () => {
    if (!onSelect) return;
    onSelect(route.id);
  };

  return (
    <article
      aria-labelledby={`route-${route.slug}-title`}
      className={cn(
        "card-soft overflow-hidden",
        selected && "border-brand/60",
      )}
    >
      <div className="grid md:grid-cols-12">
        {/* Image */}
        <Reveal
          variant="mask"
          className={cn("md:col-span-6", flip ? "md:order-2" : "md:order-1")}
        >
          <figure className="group relative h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[7/4] md:aspect-auto md:h-full md:min-h-[420px]">
              <Image
                src={route.image}
                alt={route.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 92vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="label-micro absolute bottom-3 left-3 bg-ink px-2.5 py-1.5 text-cream">
              ROUTE {String(index + 1).padStart(2, "0")} · {route.durationLabel}
            </figcaption>
          </figure>
        </Reveal>

        {/* Editorial detail */}
        <div
          className={cn(
            "flex flex-col p-6 sm:p-8 md:col-span-6 lg:p-10",
            flip ? "md:order-1" : "md:order-2",
          )}
        >
          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-center gap-2">
              {route.tags.map((t) => (
                <span
                  key={t}
                  className="label-micro border border-ink/20 px-2.5 py-1.5 text-ink"
                >
                  {t}
                </span>
              ))}
              <span className="label-micro inline-flex items-center gap-1.5 border border-ink bg-ink px-2.5 py-1.5 text-cream">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {route.durationLabel}
              </span>
            </div>

            <h3
              id={`route-${route.slug}-title`}
              className="display-2 mt-4 text-ink"
            >
              {route.title}
            </h3>
            <p className="mt-2 text-lg font-medium leading-snug text-ink">
              {route.character}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              {route.description}
            </p>
          </Reveal>

          {/* Verified metrics — hairline rows with sourced distance */}
          <Reveal delay={0.1}>
            <dl className="mt-6 border-t border-ink/10">
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                <dt className="label-micro text-steel">DISTANCE</dt>
                <dd className="text-right">
                  <span className="font-display text-xl tracking-wide text-ink">
                    {route.distanceLabel}
                  </span>
                  <span className="label-micro mt-0.5 block text-steel">
                    SOURCE: {route.distanceSource}
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                <dt className="label-micro text-steel">SUGGESTED START</dt>
                <dd className="label-micro inline-flex items-center gap-1.5 text-ink">
                  <FlagTriangleRight className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {route.startTime}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Stops as vertical mini-itinerary */}
          <Reveal delay={0.14} className="mt-6">
            <RouteStops stops={route.stops} />
          </Reveal>

          {/* Related destinations */}
          {relatedNames.length ? (
            <Reveal delay={0.16}>
              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="label-micro text-steel">PAIRS WITH</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {relatedNames.map((name) => (
                    <Link
                      key={name}
                      href="/explore"
                      className="label-micro border border-ink/20 px-2.5 py-1.5 text-ink transition-colors hover:border-ink hover:bg-cream"
                    >
                      {name} →
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* CTAs */}
          <Reveal delay={0.18} className="mt-auto">
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/book?route=${route.id}`}
                onClick={() =>
                  track("click_booking", { source: `routes:${route.id}` })
                }
                className="btn-base btn-primary group"
              >
                BOOK THIS RIDE
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/explore" className="btn-base btn-outline group">
                SEE DESTINATIONS
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
            {onSelect ? (
              <button
                type="button"
                onClick={showOnMap}
                aria-pressed={selected}
                className="label-micro mt-4 inline-flex min-h-11 items-center gap-2 text-steel transition-colors hover:text-brand"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {selected ? "ON THE MAP ABOVE" : "SHOW THIS ROUTE ON THE MAP"}
              </button>
            ) : null}
          </Reveal>
        </div>
      </div>
    </article>
  );
}
