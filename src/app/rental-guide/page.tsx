import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { GuideSections } from "@/components/rental-guide/guide-sections";
import { GuideCtaBand } from "@/components/rental-guide/guide-cta-band";

export const metadata: Metadata = {
  title: "Rental Guide — Before You Ride | Red Scooty Sreemangal",
  description:
    "What to expect before you ride with Red Scooty Sreemangal — requirements, rental rules, deposit, safety, damage and return. Framing only; every detail is confirmed personally at booking.",
};

/**
 * FAQ JSON-LD grounded strictly in known process facts:
 * request -> personal confirmation, no online payment, licence + deposit
 * confirmed personally, pickup on Jalalia Road, rates confirmed on request.
 */
const FAQ = [
  {
    q: "How does booking work?",
    a: "You send a request with your preferred date, duration and scooty. Red Scooty confirms personally — availability, price and requirements — before anything is fixed. No payment and no account are needed to send the request.",
  },
  {
    q: "Is there online payment?",
    a: "No. Booking is by request and confirmed personally. Payment and the deposit are settled in person, not online.",
  },
  {
    q: "What do I need to rent a scooty?",
    a: "Bring a valid driving licence. A refundable deposit is expected — the exact amount is confirmed personally when your booking is confirmed.",
  },
  {
    q: "Where do I pick up the scooter?",
    a: "At the Red Scooty shop on Jalalia Road, Sreemangal. If you need a different pickup arrangement, mention it in your booking request and it will be discussed with you.",
  },
  {
    q: "When do I find out the price?",
    a: "Rates are confirmed on request. Scooty cards show a placeholder rate until owner-confirmed pricing is set — your real quote arrives with the personal confirmation of your booking.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * /rental-guide — honest expectations guide + FAQ structured data + CTA band.
 */
export default function RentalGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="BEFORE YOU RIDE"
          title={
            <>
              KNOW BEFORE
              <br />
              YOU GO.
            </>
          }
          intro="Requirements, rules, deposit, safety, damage and return — what to expect when you rent from Red Scooty. The exact details are confirmed personally at booking; nothing here is a fixed policy."
        />
        <GuideSections />
        <GuideCtaBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
