import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Demo Scooty Rental",
  description:
    "What information Demo Scooty collects through this website, why it is collected, and how it is used. Written in plain language.",
  alternates: { canonical: "/privacy-policy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "WHO WE ARE",
    body: [
      "Demo Scooty Rental is a scooty rental service based on Demo Road, Sreemangal 3210, Moulvibazar, Sylhet, Bangladesh. This policy covers the website you are on and the booking request form it contains.",
      "If you have any question about anything below, call or message us first. We would rather explain it in person than hide behind fine print.",
    ],
  },
  {
    heading: "WHAT WE COLLECT",
    body: [
      "We only collect what we need to confirm a ride with you personally:",
    ],
    bullets: [
      "Booking request form: your name, phone number, preferred ride date, duration, number of riders, route preference and any message you write.",
      "Contact choices: if you tap Call, WhatsApp, or Email, the message you send travels through that platform (your phone network, WhatsApp, or your email provider) under their own terms.",
      "Usage events: button taps (calls, bookings, directions) are recorded as simple anonymous events in your own browser session. This site loads no third-party advertising or tracking scripts.",
    ],
  },
  {
    heading: "WHAT WE DO WITH IT",
    body: [
      "Your booking details are used for one thing: to confirm your scooty, your pickup point and your ride plan. That means calling or messaging you on the number you gave us.",
      "We do not sell, rent or trade your information. We do not put you on marketing lists. Your booking message is kept only as long as needed to arrange your ride and settle any damage or delay questions afterwards.",
    ],
  },
  {
    heading: "COOKIES & LOCAL STORAGE",
    body: [
      "This site stores two small things in your browser: a session flag so the intro animation does not repeat on every page, and your Ride Passport stamps (a fun feature that remembers which destinations you have marked). Both stay on your device. Clearing your browser storage removes them completely.",
    ],
  },
  {
    heading: "THIRD-PARTY SERVICES",
    body: [
      "When you tap a map, directions or video link, you leave this site and open a service we do not control — Google Maps, YouTube or WhatsApp. Those services have their own privacy policies, and what happens there is between you and them.",
    ],
  },
  {
    heading: "YOUR CHOICES",
    body: [
      "You can request a booking without giving anything beyond a working phone number. You can ask us to correct or delete your booking record any time — call the number on this site and it will be handled by a person, the same day.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      kicker="LEGAL"
      title={
        <>
          PRIVACY,
          <br />
          PLAIN &amp; <span className="text-brand">SIMPLE.</span>
        </>
      }
      intro="The short version: we ask for a name and a phone number so we can confirm your ride. That is the whole deal — here are the details."
      updated="SEPTEMBER 2025"
      sections={SECTIONS}
      footnote="This site is in a pre-launch stage. Operational details may be adjusted before going live; the principles above — collect little, use it only for your ride, never sell it — will not change."
    />
  );
}
