import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { FleetShowcase } from "@/components/scooties/fleet-showcase";
import { SpecsStrip } from "@/components/scooties/specs-strip";
import { IncludedAsk } from "@/components/scooties/included-ask";
import { ScootiesCrossLinks } from "@/components/scooties/scooties-cross-links";
import { FLEET_NOTE } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Scooties — The Red Scooty Fleet | Red Scooty Sreemangal",
  description:
    "Automatic scooties built for Sreemangal's tea-garden lanes and forest roads — light, easy and handed over in person. Rates, models and specs are confirmed on request, never guessed.",
};

/**
 * /scooties — the fleet page. Two real vehicles from the data layer plus an
 * honest "more models on request" tile. No invented third model, no prices.
 */
export default function ScootiesPage() {
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
          intro="Automatic scooties sized for Sreemangal — tea-garden lanes, forest roads and everything in between. Rates and full specs are confirmed directly with Red Scooty; ask when you book."
          meta={["AUTOMATIC", "TOURIST FRIENDLY", "BOOK BY REQUEST"]}
        />
        <FleetShowcase />
        <SpecsStrip />
        <IncludedAsk />
        <ScootiesCrossLinks />
        <div className="bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <p className="label-micro text-steel">{FLEET_NOTE.toUpperCase()}</p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
