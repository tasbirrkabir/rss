"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Footprints, TriangleAlert } from "lucide-react";

import { DESTINATIONS, RIDE_METRICS_NOTE } from "@/data/destinations";
import { Reveal } from "@/components/site/reveal";
import { LazySreemangalMap } from "@/components/map/lazy-map";
import { MapFootnote } from "@/components/map/map-footnote";

const DEFAULT_SLUG = "tea-gardens";

/**
 * Home map section — a REAL interactive OpenStreetMap of the Sreemangal area
 * with verified markers, synced to an editorial info panel.
 * "ONE SCOOTY. ENDLESS ROUTES."
 */
export function MapSection() {
  const [selected, setSelected] = useState<string>(DEFAULT_SLUG);
  const dest = DESTINATIONS.find((d) => d.slug === selected) ?? DESTINATIONS[0];

  return (
    <section
      id="routes"
      aria-labelledby="map-heading"
      className="rule-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE MAP</p>
          <h2 id="map-heading" className="display-1 mt-2 max-w-3xl text-ink">
            ONE SCOOTY.{" "}
            <span className="text-brand">ENDLESS ROUTES.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            Real roads, real distances. Tap a marker to see the ride — then
            come pick the scooty.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Real map panel */}
          <Reveal variant="mask" className="lg:col-span-7">
            <div className="relative h-[400px] overflow-hidden img-frame sm:h-[460px] lg:h-[540px]">
              <LazySreemangalMap
                selected={selected}
                onSelect={(slug) => setSelected(slug)}
              />
              <p className="label-micro absolute bottom-3 left-3 z-[500] bg-ink px-2.5 py-1.5 text-cream">
                SREEMANGAL · REAL MAP DATA
              </p>
            </div>
            <div className="mt-3">
              <MapFootnote />
            </div>
          </Reveal>

          {/* Info card */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div
              aria-live="polite"
              className="card-soft flex h-full flex-col p-6 sm:p-8"
            >
              {/* Destination quick-switch */}
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Destinations">
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

              <p className="label-micro mt-7 text-brand">{dest.type}</p>
              <h3 className="display-2 mt-1 text-ink">{dest.name}</h3>

              <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">DISTANCE</dt>
                  <dd className="font-display text-xl tracking-wide text-ink">
                    {dest.distanceLabel ?? "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">EST. RIDE TIME</dt>
                  <dd className="font-display text-xl tracking-wide text-ink">
                    {dest.access === "trek" ? "—" : dest.rideTimeLabel ?? "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">ROUTE CHARACTER</dt>
                  <dd className="text-right font-display text-xl tracking-wide text-ink">
                    {dest.routeType ?? "—"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 border-t border-ink/10 pt-5">
                <p className="label-micro text-steel">WHY GO</p>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {dest.whyGo ?? "—"}
                </p>
                {dest.roadNote ? (
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-steel">
                    {dest.access === "trek" ? (
                      <Footprints
                        className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
                        aria-hidden="true"
                      />
                    ) : dest.access === "ride-rough" ? (
                      <TriangleAlert
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                    ) : null}
                    {dest.roadNote}
                  </p>
                ) : null}
              </div>

              <div className="mt-auto pt-8">
                <Link href="/routes" className="btn-base btn-primary w-full">
                  SEE THE ROUTES
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className="label-micro mt-4 leading-relaxed text-steel">
                  {RIDE_METRICS_NOTE}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
