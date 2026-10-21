import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ExploreMapSection } from "@/components/explore/explore-map-section";
import { DestinationEntry } from "@/components/explore/destination-entry";
import { RidePassport } from "@/components/explore/ride-passport";
import { ExploreCtaBand } from "@/components/explore/explore-cta-band";
import { MapFootnote } from "@/components/map/map-footnote";
import { DESTINATIONS, RIDE_METRICS_NOTE } from "@/data/destinations";

export const metadata: Metadata = {
  title:
    "Explore Sreemangal — Real Map, Tea Gardens, Lawachara & More | Demo Scooty Rental",
  description:
    "Seven places around Sreemangal on a real OpenStreetMap with verified coordinates — tea gardens, Lawachara, Madhabpur Lake, Baikka Beel and more — with honest access notes, suggested routes and the Ride Passport stamp game.",
};

/**
 * Tourist attraction index for structured data — each entry carries its
 * VERIFIED GeoCoordinates (OSM / Wikipedia sources, see destinations.ts).
 */
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Places to ride in Sreemangal",
  itemListElement: DESTINATIONS.map((d, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TouristAttraction",
      name: d.name,
      description: d.description,
      geo: {
        "@type": "GeoCoordinates",
        latitude: d.geo.lat,
        longitude: d.geo.lng,
      },
    },
  })),
};

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="EXPLORE SREEMANGAL"
          title={
            <>
              WHERE WILL
              <br />
              YOU RIDE?
            </>
          }
          intro="Tea gardens. Forest trails. Lakes. Quiet roads. Sreemangal is small — the rides between the places are the trip. Seven stops, one base, zero boring roads."
          meta={["7 DESTINATIONS", "VERIFIED COORDINATES", "RIDE PASSPORT READY"]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />

        {/* The real map + synced destination panel */}
        <ExploreMapSection />

        {/* Editorial destination rows */}
        <section
          aria-labelledby="destinations-heading"
          className="rule-soft bg-paper py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">THE DESTINATIONS</p>
              <h2
                id="destinations-heading"
                className="display-1 mt-2 max-w-3xl text-ink"
              >
                SEVEN STOPS. <span className="text-brand">ONE BASE.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                Distances come from published sources; ride times are demo
                estimates — the real numbers are confirmed when you book. One
                stop isn&apos;t rideable at all, and we say so.
              </p>
            </Reveal>

            <div className="mt-14 md:mt-20">
              {DESTINATIONS.map((d, index) => (
                <DestinationEntry key={d.slug} d={d} index={index} />
              ))}
            </div>

            <p role="note" className="label-micro max-w-3xl leading-relaxed text-steel">
              {RIDE_METRICS_NOTE}
            </p>
          </div>
        </section>

        {/* Ride passport — the stamp game */}
        <RidePassport />

        {/* Soft booking handoff */}
        <ExploreCtaBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
