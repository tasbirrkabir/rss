import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | Demo Scooty Rental",
  description:
    "The terms of renting a scooty from Demo Scooty Rental: who can ride, what is expected, and what you agree to. Plain language, no tricks.",
  alternates: { canonical: "/terms-of-service" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "WHAT A BOOKING REQUEST MEANS",
    body: [
      "Submitting the booking form is a request, not a confirmed reservation. A booking exists when WE confirm it to you personally — by phone or WhatsApp. If we cannot reach you, we cannot hold a scooty.",
      "Rates, duration, pickup point and deposit are all confirmed in that same conversation. The only prices that exist are the ones confirmed there.",
    ],
  },
  {
    heading: "WHO CAN RENT",
    body: [
      "You rent a scooty from us when you:",
    ],
    bullets: [
      "Hold a valid driving licence accepted for two-wheelers in Bangladesh.",
      "Are old enough to hold that licence — no exceptions, no “my brother will ride it”.",
      "Leave a valid ID document and the agreed deposit at pickup.",
      "Agree that only the rider(s) named at booking will ride the scooty.",
    ],
  },
  {
    heading: "YOUR RIDE, YOUR RESPONSIBILITY",
    body: [
      "The scooty is yours to enjoy and yours to look after. You agree to ride within the law of Bangladesh: helmets on, licence on you, no riding under the influence, no passenger overload, no routes a scooty plainly cannot take (Ham Ham Falls is a trek — we will happily point you to the jeep stand).",
      "Traffic fines issued during your rental are yours. Damage beyond normal wear is settled at return, transparently, with you present.",
    ],
  },
  {
    heading: "THIS WEBSITE",
    body: [
      "We work hard to keep the information here honest: real coordinates, published distances, and anything estimated carries a DEMO DATA tag. Ride times and availability shown here are indicators, not promises — the confirmation call is where the plan becomes real.",
      "External links (maps, videos, WhatsApp) lead to services we do not control. This website itself is provided as-is, and we keep it honest because that is how we would want to read it.",
    ],
  },
  {
    heading: "IF SOMETHING GOES WRONG",
    body: [
      "Call us first. Nearly everything — a late return, a flat tyre, a changed plan — can be settled with a short, honest phone call. That is how business works on Demo Road, and this site does not change that.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      kicker="LEGAL"
      title={
        <>
          TERMS OF
          <br />
          THE <span className="text-brand">ROAD.</span>
        </>
      }
      intro="Rent a scooty from us and both sides keep it simple: a confirmed booking, a licensed rider, a lawful ride, and an honest return."
      updated="SEPTEMBER 2025"
      sections={SECTIONS}
      footnote="This site is in a pre-launch stage. These terms describe the rental relationship; the exact rates and deposit for your ride are confirmed personally at booking time."
    />
  );
}
