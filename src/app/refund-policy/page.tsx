import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Demo Scooty Rental",
  description:
    "How cancellations, delays and deposits work for scooty rentals at Demo Scooty. No hidden fees, no fine print games.",
  alternates: { canonical: "/refund-policy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "HOW PAYMENT WORKS",
    body: [
      "There is no online payment on this site. A booking request is exactly that — a request. We confirm it personally by phone or WhatsApp, and you pay when you pick up the scooty (or when it is delivered to you).",
      "Because payment happens in person at ride time, most money questions simply never come up. The sections below cover the cases that can.",
    ],
  },
  {
    heading: "CANCELLING YOUR BOOKING",
    body: [
      "Plans change — we get it, the weather in the tea gardens changes too.",
    ],
    bullets: [
      "Cancel by phone or WhatsApp before your pickup time and you owe nothing.",
      "No-show without notice may be asked to confirm future bookings with a phone call first — that is all.",
      "If WE cancel (weather, mechanical issue, anything on our side), you owe nothing and we will gladly help you reschedule or suggest another day.",
    ],
  },
  {
    heading: "DURING THE RENTAL",
    body: [
      "If the scooty has a mechanical fault that is not from misuse, call us. We will bring a replacement or adjust the charge fairly — you will never pay full rate for a scooty you could not ride.",
      "Cutting a rental short: you are charged for the time you actually had the scooty, per the rate confirmed at booking. Returning early because of rain? Talk to us — we are reasonable people from a small town, not a call center.",
    ],
  },
  {
    heading: "SECURITY HOLD / DOCUMENTS",
    body: [
      "A national ID / NID (or passport) copy and a small security deposit may be required at pickup, as confirmed in your booking message. The deposit is returned in full at handover when the scooty comes back in the condition it left — fuel level as agreed, no new damage.",
      "Anything else (traffic fines, damage beyond wear) is settled transparently, with you present, at return.",
    ],
  },
  {
    heading: "THE ONE-LINE VERSION",
    body: [
      "Nothing is charged online. Cancel with notice and you pay nothing. Ride safe, return the scooty as you got it, and every taka of your deposit goes back in your pocket.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      kicker="LEGAL"
      title={
        <>
          REFUNDS,
          <br />
          NO <span className="text-brand">GAMES.</span>
        </>
      }
      intro="No online payment exists on this site, so refunds are simple: you pay in person, you cancel in person (a phone call counts), and fair is fair."
      updated="SEPTEMBER 2025"
      sections={SECTIONS}
      footnote="This site is in a pre-launch stage. Final deposit amounts and rental rates are confirmed personally at booking time — this page describes how the rules work, not the prices. Prices are always confirmed by phone or WhatsApp before you commit."
    />
  );
}
