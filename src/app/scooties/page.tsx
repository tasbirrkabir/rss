import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { FleetShowcase } from "@/components/scooties/fleet-showcase";
import { SpecsStrip } from "@/components/scooties/specs-strip";
import { IncludedAsk } from "@/components/scooties/included-ask";
import { ScootiesCrossLinks } from "@/components/scooties/scooties-cross-links";
import { getPublicScooties } from "@/lib/cms";
import { FLEET_NOTE } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Scooties — The Demo Scooty Fleet | Demo Scooty Rental",
  description:
    "Automatic scooties built for Sreemangal's tea-garden lanes and forest roads — light, easy and handed over in person. Rates, models and specs are confirmed on request, never guessed.",
};

/**
 * /scooties — the fleet page. Premium product-catalog feel: large hero image
 * per scooty, refined hairline spec rows, honest pricing and availability.
 * Two real vehicles from the data layer plus an honest "more models on
 * request" tile. No invented third model, no prices.
 */
export default async function ScootiesPage() {
  const scooties = await getPublicScooties();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="THE FLEET"
          title={
            <>
              PICK
              <br />
              YOUR RIDE.
            </>
          }
          intro="Automatic scooties sized for Sreemangal — tea-garden lanes, forest roads and everything in between. Rates and full specs are confirmed directly with Demo Scooty; ask when you book."
          meta={["AUTOMATIC", "TOURIST FRIENDLY", "CONFIRM AVAILABILITY"]}
        />
        <FleetShowcase vehicles={scooties} />
        <SpecsStrip />
        <IncludedAsk />
        <ScootiesCrossLinks />
        <div className="rule-soft bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <p className="label-micro max-w-4xl leading-relaxed text-steel">
              {FLEET_NOTE.toUpperCase()}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
