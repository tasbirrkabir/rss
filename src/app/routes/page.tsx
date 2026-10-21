import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { RoutesExplorer } from "@/components/routes/routes-explorer";
import { RoutesOwnBand } from "@/components/routes/routes-own-band";
import { RIDE_ROUTES, findRoute } from "@/data/ride-routes";

export const metadata: Metadata = {
  title: "Ride Routes — Rides Worth Taking | Demo Scooty Rental",
  description:
    "Four suggested scooty routes through Sreemangal — tea garden loops, Lawachara forest roads, the Madhabpur lake run and wetland sunsets. Sourced distances, honest timings; the real plan is confirmed personally when you book.",
};

type RoutesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Resolve the preselected route: /book contract (?route=) or ?dest= links. */
function resolveInitialRouteId(
  searchParams: Record<string, string | string[] | undefined>,
): string | undefined {
  const routeParam = findRoute(firstParam(searchParams.route));
  if (routeParam) return routeParam.id;

  const destParam = firstParam(searchParams.dest);
  if (destParam) {
    const match = RIDE_ROUTES.find((r) =>
      r.relatedDestinations.includes(destParam),
    );
    if (match) return match.id;
  }
  return undefined;
}

/**
 * /routes — the route library. Sticky selector + one real Leaflet map bound
 * to the active route (real OSRM road geometry with an honest schematic
 * fallback), then the full library as premium editorial entries, closed by
 * the band-ink booking CTA and the ROUTE_METRICS_NOTE footnote.
 */
export default async function RoutesPage({ searchParams }: RoutesPageProps) {
  const params = await searchParams;
  const initialRouteId = resolveInitialRouteId(params);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="ROUTE LIBRARY"
          title={
            <>
              RIDES WORTH
              <br />
              TAKING.
            </>
          }
          intro="Four rides built for a scooty and Sreemangal's back roads — short, scenic and easy to adapt. Distances quote published sources; timings are estimates confirmed when you book."
          meta={["4 ROUTES", "VERIFIED WAYPOINTS", "APPROX. TIMING"]}
        />

        <RoutesExplorer initialRouteId={initialRouteId} />

        <RoutesOwnBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
