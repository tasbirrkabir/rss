import { CalendarCheck, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { SITE, whatsappMessageUrl } from "@/data/site";
import { BookingForm } from "@/components/site/booking-form";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

const TRUST_POINTS = [
  {
    icon: CalendarCheck,
    text: "Pick your date and ride - we reply personally to confirm availability.",
  },
  {
    icon: ShieldCheck,
    text: "No online payment. Price, deposit and documents are confirmed directly.",
  },
  {
    icon: MessageCircle,
    text: "In a hurry? Send the request and continue on WhatsApp in one tap.",
  },
];

/** Booking section (PRD sections 23 / 48) - "READY TO RIDE?" */
export function BookingSection() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="border-y-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="label-micro text-brand">BOOKING</p>
            <h2
              id="booking-heading"
              className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9]"
            >
              READY TO RIDE?
            </h2>
            <p className="mt-4 max-w-md text-cream/80">
              Choose your date. Tell us what you need. We&apos;ll take it from
              there.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {TRUST_POINTS.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <t.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-cream/85">{t.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <TrackedLink
                event="click_call"
                source="booking_section"
                href={SITE.telUrl}
                className="inline-flex h-14 flex-1 items-center justify-center gap-2 border-2 border-cream bg-transparent px-6 font-display text-2xl tracking-wider text-cream transition-all hover:bg-cream hover:text-ink"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                CALL NOW
              </TrackedLink>
              <TrackedLink
                event="click_whatsapp"
                source="booking_section"
                href={whatsappMessageUrl(
                  "Hi Red Scooty! I have a question about renting a scooty in Sreemangal.",
                )}
                external
                className="inline-flex h-14 flex-1 items-center justify-center gap-2 border-2 border-cream bg-transparent px-6 font-display text-2xl tracking-wider text-cream transition-all hover:bg-cream hover:text-ink"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WHATSAPP US
              </TrackedLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="border-2 border-ink bg-paper text-ink shadow-hard-red">
            <div className="border-b-2 border-ink bg-brand px-6 py-3">
              <p className="font-display text-2xl tracking-wide text-white">
                REQUEST MY RIDE
              </p>
            </div>
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
