"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, FlagTriangleRight } from "lucide-react";

import { RIDE_ROUTES, type RideRoute } from "@/data/ride-routes";
import { Reveal } from "@/components/site/reveal";
import { LazyRouteMap } from "@/components/map/lazy-route-map";
import { MapFootnote } from "@/components/map/map-footnote";
import { RouteCard, RouteStops } from "@/components/routes/route-card";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type RoutesExplorerProps = {
  /** Preselected route (from /book prefill contract or ?dest= deep links). */
  initialRouteId?: string | null;
};

/**
 * The interactive core of /routes:
 * - sticky route selector (chips on mobile, sticky list on desktop)
 * - one real Leaflet map bound to the active route
 * - the selected route's editorial detail
 * - the full route library as premium editorial entries
 */
export function RoutesExplorer({ initialRouteId }: RoutesExplorerProps) {
  const initial =
    RIDE_ROUTES.find((r) => r.id === initialRouteId) ?? RIDE_ROUTES[0];
  const [selectedId, setSelectedId] = useState<string>(initial.id);

  const route: RideRoute =
    RIDE_ROUTES.find((r) => r.id === selectedId) ?? RIDE_ROUTES[0];

  const selectRoute = (id: string) => {
    setSelectedId(id);
  };

  const selectAndScrollToMap = useCallback((id: string) => {
    setSelectedId(id);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("route-map")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, []);

  const selectorButton = (
    r: RideRoute,
    i: number,
    layout: "chip" | "list",
  ) => {
    const isSelected = r.id === selectedId;
    return layout === "chip" ? (
      <button
        key={r.id}
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => selectRoute(r.id)}
        className={cn(
          "label-micro min-h-11 shrink-0 whitespace-nowrap border px-4 py-2.5 transition-all duration-200",
          isSelected
            ? "border-ink bg-ink text-cream"
            : "border-ink/20 bg-paper text-ink hover:border-ink",
        )}
      >
        {String(i + 1).padStart(2, "0")} · {r.title}
      </button>
    ) : (
      <button
        key={r.id}
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => selectRoute(r.id)}
        className={cn(
          "border p-4 text-left transition-all duration-200",
          isSelected
            ? "border-ink bg-ink text-cream"
            : "border-ink/15 bg-paper text-ink hover:border-ink/40",
        )}
      >
        <span
          className={cn(
            "label-micro",
            isSelected ? "text-brand" : "text-steel",
          )}
        >
          ROUTE {String(i + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 block font-display text-2xl leading-tight tracking-wide">
          {r.title}
        </span>
        <span
          className={cn(
            "label-micro mt-2 flex flex-wrap items-center gap-x-3 gap-y-1",
            isSelected ? "text-cream/70" : "text-steel",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {r.durationLabel}
          </span>
          <span>{r.distanceLabel}</span>
        </span>
      </button>
    );
  };

  return (
    <>
      {/* ================= ROUTE MAP + SELECTOR + DETAIL ================= */}
      <section
        id="route-map"
        aria-labelledby="route-map-heading"
        className="rule-soft bg-cream py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label-micro text-brand">THE ROUTE MAP</p>
            <h2
              id="route-map-heading"
              className="display-1 mt-2 max-w-3xl text-ink"
            >
              REAL ROADS,{" "}
              <span className="text-brand">HONEST LINES.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Pick a route and the map draws it from verified waypoints — real
              road geometry when the routing service answers, an honest
              schematic line when it doesn&apos;t.
            </p>
          </Reveal>

          {/* Mobile: horizontal chip scroller */}
          <div
            role="radiogroup"
            aria-label="Choose a route"
            className="mt-8 lg:hidden"
          >
            <div className="scrollbar-brutal -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
              {RIDE_ROUTES.map((r, i) => selectorButton(r, i, "chip"))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8">
            {/* Desktop: sticky route list */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div
                role="radiogroup"
                aria-label="Choose a route"
                className="sticky top-24 flex flex-col gap-3"
              >
                {RIDE_ROUTES.map((r, i) => selectorButton(r, i, "list"))}
                <p className="label-micro mt-2 leading-relaxed text-steel">
                  SELECTION FLIES THE MAP TO THE ROUTE&apos;S VERIFIED
                  WAYPOINTS.
                </p>
              </div>
            </aside>

            {/* Map + selected route detail */}
            <div className="lg:col-span-8">
              <Reveal variant="mask">
                <div className="img-frame relative h-[380px] overflow-hidden lg:h-[480px]">
                  <LazyRouteMap route={route} />
                </div>
              </Reveal>
              <div className="mt-3">
                <MapFootnote />
              </div>

              <Reveal delay={0.08}>
                <div
                  aria-live="polite"
                  className="card-soft mt-6 flex flex-col p-6 sm:p-8"
                >
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

                  <h3 className="display-2 mt-4 text-ink">{route.title}</h3>
                  <p className="mt-2 text-lg font-medium leading-snug text-ink">
                    {route.character}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {route.description}
                  </p>

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
                      <dt className="label-micro text-steel">
                        SUGGESTED START
                      </dt>
                      <dd className="label-micro inline-flex items-center gap-1.5 text-ink">
                        <FlagTriangleRight
                          className="h-3.5 w-3.5 text-brand"
                          aria-hidden="true"
                        />
                        {route.startTime}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="label-micro text-brand">THE SHAPE OF IT</p>
                      <ul className="mt-3 space-y-1.5" aria-label="Highlights">
                        {route.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm font-medium text-ink"
                          >
                            <span
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-brand"
                              aria-hidden="true"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="label-micro text-brand">STOPS</p>
                      <div className="mt-3">
                        <RouteStops stops={route.stops} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href={`/book?route=${route.id}`}
                      onClick={() =>
                        track("click_booking", {
                          source: `routes_map:${route.id}`,
                        })
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
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROUTE LIBRARY ================= */}
      <section
        aria-labelledby="route-library-heading"
        className="bg-paper py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label-micro text-brand">THE LIBRARY</p>
            <h2
              id="route-library-heading"
              className="display-1 mt-2 max-w-3xl text-ink"
            >
              FOUR WAYS TO <span className="text-brand">RIDE IT.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Every route in full — the roads, the stops, the sourced distances.
              Ride one as written or mix them up; the plan is confirmed with you
              when you book.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8 lg:space-y-10">
            {RIDE_ROUTES.map((r, i) => (
              <RouteCard
                key={r.id}
                route={r}
                index={i}
                onSelect={selectAndScrollToMap}
                selected={r.id === selectedId}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
