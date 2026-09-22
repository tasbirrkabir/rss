import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Footprints,
  TriangleAlert,
} from "lucide-react";

import type { Destination } from "@/data/destinations";
import { RIDE_ROUTES, type RideRoute } from "@/data/ride-routes";
import { mapsQueryUrl } from "@/data/site";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { DemoBadge } from "@/components/site/demo-badge";
import {
  AccessChip,
  geoSourceLabel,
} from "@/components/explore/access-chip";
import { PassportStampButton } from "@/components/explore/ride-passport";
import { cn } from "@/lib/utils";

type DestinationEntryProps = {
  d: Destination;
  index: number;
};

/** Routes from the /routes library that include each destination. */
const ROUTES_BY_DESTINATION: ReadonlyMap<string, RideRoute[]> = (() => {
  const map = new Map<string, RideRoute[]>();
  for (const route of RIDE_ROUTES) {
    for (const slug of route.relatedDestinations) {
      const list = map.get(slug);
      if (list) {
        list.push(route);
      } else {
        map.set(slug, [route]);
      }
    }
  }
  return map;
})();

const ROAD_NOTE_ICON: Record<Destination["access"], typeof Bike> = {
  ride: Bike,
  "ride-rough": TriangleAlert,
  trek: Footprints,
};

const ROAD_NOTE_ICON_CLASS: Record<Destination["access"], string> = {
  ride: "text-leaf",
  "ride-rough": "text-brand",
  trek: "text-leaf",
};

/**
 * Premium editorial destination row for /explore.
 * Alternating image/text, generous whitespace, mask-reveal imagery with a
 * subtle hover zoom. Ham Ham (access "trek") renders as a deliberately
 * quieter card — it is NOT a scooty destination and never shows a ride time.
 */
export function DestinationEntry({ d, index }: DestinationEntryProps) {
  const number = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  // dest-hamham is the one portrait asset (864x1152); everything else is 1344x768.
  const portrait = d.slug === "ham-ham";
  const isTrek = d.access === "trek";
  const relatedRoutes = ROUTES_BY_DESTINATION.get(d.slug) ?? [];
  const RoadNoteIcon = ROAD_NOTE_ICON[d.access];

  return (
    <article
      id={d.slug}
      aria-labelledby={`dest-${d.slug}-title`}
      className="rule-soft scroll-mt-24 py-16 md:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Image column */}
        <Reveal
          variant="mask"
          className={cn(
            portrait ? "lg:col-span-5" : "lg:col-span-7",
            flip && "lg:order-2",
          )}
        >
          <figure className="group img-frame relative overflow-hidden">
            <div
              className={cn(
                "relative",
                portrait ? "aspect-[3/4]" : "aspect-[7/4]",
              )}
            >
              <Image
                src={d.image}
                alt={d.imageAlt}
                fill
                sizes={
                  portrait
                    ? "(min-width: 1024px) 38vw, 92vw"
                    : "(min-width: 1024px) 55vw, 92vw"
                }
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            {d.routeType ? (
              <figcaption className="label-micro absolute bottom-0 left-0 bg-ink px-2.5 py-1.5 text-cream">
                {d.routeType}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>

        {/* Text column */}
        <div
          className={cn(
            portrait ? "lg:col-span-7" : "lg:col-span-5",
            flip ? "lg:order-1" : "lg:order-2",
          )}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="label-micro text-steel">N&deg;{number}</p>
            <AccessChip access={d.access} />
          </div>

          <p
            className={cn(
              "label-micro mt-5",
              isTrek ? "text-steel" : "text-brand",
            )}
          >
            {d.type}
          </p>
          <h3 id={`dest-${d.slug}-title`} className="display-2 mt-1.5 text-ink">
            {d.name}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            {d.description}
          </p>

          {d.whyGo ? (
            <p
              className={cn(
                "mt-6 max-w-md border-l-2 pl-4 font-display text-2xl leading-tight tracking-wide md:text-3xl",
                isTrek
                  ? "border-ink/20 text-steel"
                  : "border-brand/70 text-ink",
              )}
            >
              &ldquo;{d.whyGo}&rdquo;
            </p>
          ) : null}

          <dl className="mt-7 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
            <div>
              <dt className="label-micro text-steel">DISTANCE</dt>
              <dd className="mt-1 font-display text-xl tracking-wide text-ink">
                {d.distanceLabel ?? "—"}
              </dd>
            </div>
            {isTrek ? (
              <div>
                <dt className="label-micro text-steel">RIDE TIME</dt>
                <dd className="mt-1 font-display text-xl tracking-wide text-steel">
                  — <span className="label-micro text-steel">NOT BY SCOOTY</span>
                </dd>
              </div>
            ) : (
              <div>
                <dt className="label-micro text-steel">RIDE TIME</dt>
                <dd className="mt-1 font-display text-xl tracking-wide text-ink">
                  {d.rideTimeLabel ?? "—"}
                  {d.rideTimeLabel ? (
                    <span className="ml-2 inline-flex align-middle">
                      <DemoBadge>DEMO</DemoBadge>
                    </span>
                  ) : null}
                </dd>
              </div>
            )}
          </dl>

          <p className="label-micro mt-3 text-steel" title={d.geoSource}>
            {geoSourceLabel(d.geoSource)}
          </p>

          {d.roadNote ? (
            <p className="mt-5 flex max-w-md items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
              <RoadNoteIcon
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  ROAD_NOTE_ICON_CLASS[d.access],
                )}
                aria-hidden="true"
              />
              <span>
                <span className="label-micro mr-1.5 text-steel">ROAD NOTE</span>
                {d.roadNote}
              </span>
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="label-micro mr-1 text-steel">GOOD FOR</span>
            {d.goodFor.map((g) => (
              <span
                key={g}
                className="label-micro border border-ink/15 px-2.5 py-1 text-ink"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              event="get_directions"
              source={`explore:${d.slug}`}
              href={mapsQueryUrl(d.mapQuery)}
              external
              ariaLabel={`Get directions to ${d.name} on Google Maps`}
              className="btn-base btn-primary group"
            >
              GET DIRECTIONS
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </TrackedLink>
            <Link href="/routes" className="btn-base btn-outline group">
              SEE ROUTES
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <Link
            href="/book"
            className="link-underline mt-5 inline-flex items-center gap-2 font-display text-xl tracking-wider text-ink transition-colors hover:text-brand"
          >
            {isTrek
              ? "BOOK A SCOOTY FOR YOUR OTHER RIDES"
              : "BOOK A SCOOTY FOR THIS RIDE"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {relatedRoutes.length > 0 ? (
            <p className="label-micro mt-5 max-w-md leading-loose text-steel">
              PAIRED ROUTES:{" "}
              {relatedRoutes.map((route, i) => (
                <Fragment key={route.slug}>
                  {i > 0 ? <span aria-hidden="true"> · </span> : null}
                  <Link
                    href={`/routes?dest=${d.slug}`}
                    className="link-underline text-ink transition-colors hover:text-brand"
                  >
                    {route.title}
                  </Link>
                </Fragment>
              ))}
            </p>
          ) : null}

          {d.passport ? (
            <div className="mt-6">
              <PassportStampButton slug={d.slug} name={d.name} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
