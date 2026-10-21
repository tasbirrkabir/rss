"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import {
  DESTINATIONS,
  RIDE_METRICS_NOTE,
} from "@/data/destinations";
import { SITE, mapsQueryUrl } from "@/data/site";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { DemoBadge } from "@/components/site/demo-badge";
import { AccessChip, geoSourceLabel } from "@/components/explore/access-chip";
import { LazySreemangalMap } from "@/components/map/lazy-map";

/**
 * Map footnote — identical copy to MapFootnote in
 * "@/components/map/sreemangal-map" (same RIDE_METRICS_NOTE source).
 * Kept local on purpose: that module also exports the Leaflet map and is
 * marked client-only via the ssr:false dynamic import, so a second route
 * importing it (statically or via a server client-reference) pulls Leaflet
 * into shared SSR chunks and crashes rendering ("window is not defined").
 */
function ExploreMapFootnote() {
  return (
    <p className="label-micro leading-relaxed text-steel">
      REAL MAP DATA © OPENSTREETMAP CONTRIBUTORS · {RIDE_METRICS_NOTE}
    </p>
  );
}

/**
 * Explore map section — the defining feature of /explore.
 * A real interactive OpenStreetMap (Leaflet) with verified markers,
 * synced to an editorial card-soft detail panel. Adapts the home
 * map-section pattern with an empty state + access legend.
 */
export function ExploreMapSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const dest = DESTINATIONS.find((d) => d.slug === selected) ?? null;

  return (
    <section
      id="map"
      aria-labelledby="explore-map-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE REAL MAP</p>
          <h2
            id="explore-map-heading"
            className="display-1 mt-2 max-w-3xl text-ink"
          >
            EVERY PIN. <span className="text-brand">VERIFIED.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Real OpenStreetMap tiles. Coordinates cross-checked against OSM and
            Wikipedia — no invented pins. Tap a marker to see the ride.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="label-micro mr-1 text-steel">ACCESS KEY</span>
            <AccessChip access="ride" />
            <AccessChip access="ride-rough" />
            <AccessChip access="trek" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Real map panel */}
          <Reveal variant="mask" className="lg:col-span-7">
            <div className="img-frame relative h-[340px] min-h-[340px] overflow-hidden sm:h-[420px] lg:h-[560px]">
              <LazySreemangalMap
                selected={selected}
                onSelect={(slug) => setSelected(slug)}
              />
              <p className="label-micro absolute bottom-3 left-3 z-[500] bg-ink px-2.5 py-1.5 text-cream">
                SREEMANGAL · REAL MAP DATA
              </p>
            </div>
            <div className="mt-3">
              <ExploreMapFootnote />
            </div>
          </Reveal>

          {/* Synced detail panel */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div
              aria-live="polite"
              className="card-soft flex h-full flex-col p-6 sm:p-8"
            >
              {/* Quick switch — the keyboard-friendly way to reach every marker */}
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Destinations"
              >
                {DESTINATIONS.map((d) => (
                  <button
                    key={d.slug}
                    type="button"
                    role="tab"
                    aria-selected={d.slug === selected}
                    onClick={() => setSelected(d.slug)}
                    className={`label-micro border px-2.5 py-1.5 transition-all ${
                      d.slug === selected
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/15 bg-transparent text-ink hover:border-ink/40"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>

              {dest ? (
                <>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <p className="label-micro text-brand">{dest.type}</p>
                    <AccessChip access={dest.access} />
                  </div>
                  <h3 className="display-2 mt-1.5 text-ink">{dest.name}</h3>

                  <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-ink/10 pt-5">
                    <div>
                      <dt className="label-micro text-steel">DISTANCE</dt>
                      <dd className="mt-1 font-display text-xl tracking-wide text-ink">
                        {dest.distanceLabel ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-micro text-steel">RIDE TIME</dt>
                      <dd className="mt-1 font-display text-xl tracking-wide text-ink">
                        {dest.access === "trek"
                          ? "—"
                          : (dest.rideTimeLabel ?? "—")}
                        {dest.rideTimeLabel && dest.access !== "trek" ? (
                          <span className="ml-2 inline-flex align-middle">
                            <DemoBadge>DEMO</DemoBadge>
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  </dl>

                  <p
                    className="label-micro mt-3 text-steel"
                    title={dest.geoSource}
                  >
                    {geoSourceLabel(dest.geoSource)}
                  </p>

                  {dest.roadNote ? (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {dest.roadNote}
                    </p>
                  ) : null}

                  {dest.whyGo ? (
                    <p className="mt-4 border-l-2 border-brand/60 pl-3 font-display text-xl leading-tight tracking-wide text-ink">
                      &ldquo;{dest.whyGo}&rdquo;
                    </p>
                  ) : null}

                  <div className="mt-auto flex flex-col gap-2.5 pt-7 sm:flex-row">
                    <TrackedLink
                      event="get_directions"
                      source={`explore_map:${dest.slug}`}
                      href={mapsQueryUrl(dest.mapQuery)}
                      external
                      ariaLabel={`Get directions to ${dest.name} on Google Maps`}
                      className="btn-base btn-primary group flex-1"
                    >
                      GET DIRECTIONS
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </TrackedLink>
                    <Link
                      href="/routes"
                      className="btn-base btn-outline group flex-1"
                    >
                      SEE ROUTES
                      <ArrowRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                /* Empty state — before a marker is picked */
                <div className="flex flex-1 flex-col justify-center py-6">
                  <p className="display-2 text-ink">
                    TAP A MARKER.
                    <br />
                    <span className="text-brand">OR PICK A STOP.</span>
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                    Seven stops around Sreemangal and our base on Demo Road.
                    Distances come from published sources; ride times are demo
                    estimates until you book.
                  </p>
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <p className="label-micro flex items-center gap-2 text-ink">
                      <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                      START HERE — DEMO SCOOTY HQ
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel">
                      {SITE.addressLine1} · Plus code {SITE.plusCode}
                    </p>
                    <TrackedLink
                      event="get_directions"
                      source="explore_map:hq"
                      href={SITE.mapsUrl}
                      external
                      ariaLabel="Get directions to Demo Scooty on Google Maps"
                      className="label-micro link-underline mt-3 inline-flex items-center gap-1.5 text-brand"
                    >
                      OPEN IN GOOGLE MAPS
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </TrackedLink>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
