"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DESTINATIONS, RIDE_METRICS_NOTE } from "@/data/destinations";
import { Reveal } from "@/components/site/reveal";

const DEFAULT_SLUG = "lawachara";

/**
 * Home map section - stylized, hand-drawn-feel SVG map of Sreemangal with
 * clickable destination pins (coords from the data layer, % positions).
 * Explicitly labelled "NOT TO SCALE" — it is an editorial diagram.
 */
export function MapSection() {
  const [selected, setSelected] = useState<string>(DEFAULT_SLUG);
  const dest = DESTINATIONS.find((d) => d.slug === selected) ?? DESTINATIONS[1];

  return (
    <section
      id="routes"
      aria-labelledby="map-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE MAP</p>
          <h2
            id="map-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            ONE SCOOTY.
            <br />
            <span className="text-outline">ENDLESS ROUTES.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Stylized map panel */}
          <Reveal className="lg:col-span-7">
            <div className="relative border-2 border-ink bg-cream shadow-hard">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                {/* Tea area blobs */}
                <path
                  d="M18 22 Q30 14 42 20 Q50 26 44 34 Q34 42 24 38 Q14 32 18 22 Z"
                  fill="#1f4d2e"
                  fillOpacity="0.14"
                  stroke="#111111"
                  strokeWidth="1"
                  strokeDasharray="2 1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M46 32 Q58 24 68 30 Q74 36 68 44 Q58 50 50 46 Q42 40 46 32 Z"
                  fill="#1f4d2e"
                  fillOpacity="0.14"
                  stroke="#111111"
                  strokeWidth="1"
                  strokeDasharray="2 1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M10 48 Q22 42 30 48 Q36 54 30 62 Q20 68 14 62 Q6 56 10 48 Z"
                  fill="#1f4d2e"
                  fillOpacity="0.1"
                  stroke="#111111"
                  strokeWidth="1"
                  strokeDasharray="2 1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M62 56 Q74 50 82 56 Q88 62 82 70 Q72 76 66 70 Q58 64 62 56 Z"
                  fill="#1f4d2e"
                  fillOpacity="0.1"
                  stroke="#111111"
                  strokeWidth="1"
                  strokeDasharray="2 1.5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Dashed ride routes out of town */}
                <path
                  d="M52 60 Q56 40 66 24"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M52 60 Q38 44 24 18"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M52 60 Q66 70 76 66"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M52 60 Q70 78 84 86"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M52 60 Q44 50 36 42"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Destination pins */}
              <div className="relative aspect-square w-full sm:aspect-[5/4]">
                {DESTINATIONS.map((d) => {
                  const isSel = d.slug === selected;
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      aria-pressed={isSel}
                      aria-label={`${d.name} — show ride info`}
                      onClick={() => setSelected(d.slug)}
                      className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                        d.coords.x > 62 ? "ml-[-8px]" : ""
                      }`}
                      style={{ left: `${d.coords.x}%`, top: `${d.coords.y}%` }}
                    >
                      <span
                        className={`h-3.5 w-3.5 border-2 border-ink transition-colors ${
                          isSel ? "bg-ink" : "bg-brand"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`label-micro absolute whitespace-nowrap border-2 border-ink px-1.5 py-1 ${
                          d.coords.x > 62
                            ? "right-full top-1/2 mr-1 -translate-y-1/2"
                            : "left-full top-1/2 ml-1 -translate-y-1/2"
                        } ${
                          isSel
                            ? "bg-ink text-cream"
                            : "bg-cream text-ink shadow-hard-sm"
                        }`}
                      >
                        {d.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="label-micro absolute right-3 bottom-3 border-2 border-ink bg-paper px-2 py-1.5 text-steel">
                STYLIZED MAP — NOT TO SCALE
              </p>
            </div>
          </Reveal>

          {/* Info card */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div
              aria-live="polite"
              className="flex h-full flex-col border-2 border-ink bg-paper p-6 shadow-hard"
            >
              <p className="label-micro text-brand">DESTINATION</p>
              <h3 className="mt-2 font-display text-5xl leading-none tracking-wide text-ink">
                {dest.name}
              </h3>
              <p className="label-micro mt-2 text-steel">{dest.type}</p>

              <dl className="mt-6 space-y-3 border-t-2 border-ink pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">DISTANCE</dt>
                  <dd className="font-display text-xl tracking-wide text-ink">
                    {dest.distanceLabel ?? "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">EST. RIDE TIME</dt>
                  <dd className="font-display text-xl tracking-wide text-ink">
                    {dest.rideTimeLabel ?? "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="label-micro text-steel">TYPE OF ROUTE</dt>
                  <dd className="font-display text-xl tracking-wide text-ink">
                    {dest.routeType ?? "—"}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t-2 border-ink pt-6">
                <p className="label-micro text-steel">WHY GO</p>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  {dest.whyGo ?? "—"}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/routes"
                  className="flex h-14 w-full items-center justify-between border-2 border-ink bg-ink px-6 font-display text-2xl tracking-wider text-cream shadow-hard transition-all hover:-translate-y-0.5 hover:bg-brand hover:shadow-hard-red"
                >
                  SEE THE ROUTES{" "}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
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
