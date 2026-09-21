import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { DestinationEntry } from "@/components/explore/destination-entry";
import { RidePassport } from "@/components/explore/ride-passport";
import { DESTINATIONS, RIDE_METRICS_NOTE } from "@/data/destinations";

export const metadata: Metadata = {
  title:
    "Explore Sreemangal — Tea Gardens, Lawachara, Lakes | Red Scooty Sreemangal",
  description:
    "Seven places worth riding in Sreemangal: the tea gardens, Lawachara rainforest, Madhabpur Lake, Baikka Beel and more — with honest ride notes and the Ride Passport stamp game.",
};

/** Tourist attraction index for structured data (ItemList of destinations). */
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Places to ride in Sreemangal",
  itemListElement: DESTINATIONS.map((d, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: d.name,
    description: d.description,
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
          meta={["7 DESTINATIONS", "RIDE PASSPORT READY"]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />

        <section aria-labelledby="destinations-heading" className="bg-cream">
          <h2 id="destinations-heading" className="sr-only">
            Destinations to ride in Sreemangal
          </h2>

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid xl:grid-cols-12 xl:gap-10">
              {/* Destination list */}
              <div className="xl:col-span-8">
                {DESTINATIONS.map((d, index) => (
                  <DestinationEntry key={d.slug} d={d} index={index} />
                ))}
              </div>

              {/* Sticky Ride Passport column (fixed bottom bar below xl) */}
              <div className="xl:col-span-4">
                <RidePassport />
              </div>
            </div>
          </div>
        </section>

        <p
          className="label-micro border-t-2 border-ink bg-cream px-4 py-4 text-center leading-relaxed text-steel sm:px-6"
          role="note"
        >
          {RIDE_METRICS_NOTE}
        </p>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
