import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { RouteCard } from "@/components/routes/route-card";
import { RoutesOwnBand } from "@/components/routes/routes-own-band";
import { RIDE_ROUTES, ROUTE_METRICS_NOTE } from "@/data/ride-routes";

export const metadata: Metadata = {
  title: "Ride Routes — Rides Worth Taking | Red Scooty Sreemangal",
  description:
    "Three suggested scooty routes through Sreemangal — tea garden loops, Lawachara forest roads and wetland sunsets. Approximate demo timing; the real plan is confirmed personally when you book.",
};

/**
 * /routes — the route library. Three editorial route cards from RIDE_ROUTES,
 * alternating image/text on desktop, honest metrics footnotes, custom-route
 * band at the bottom.
 */
export default function RoutesPage() {
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
          intro="Three rides built for a scooty and Sreemangal's back roads — short, scenic and easy to adapt. Timings are approximate demo estimates; the real plan is confirmed when you book."
          meta={["DEMO ROUTES", "APPROX. TIMING", "CONFIRMED ON REQUEST"]}
        />

        <section
          aria-label="Route library"
          className="bg-paper py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6">
            {RIDE_ROUTES.map((route, i) => (
              <RouteCard key={route.slug} route={route} index={i} />
            ))}

            <p className="label-micro max-w-3xl text-steel">
              {ROUTE_METRICS_NOTE}
            </p>
          </div>
        </section>

        <RoutesOwnBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
