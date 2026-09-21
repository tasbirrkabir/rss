import { CheckCircle2, MessageCircle } from "lucide-react";

import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

const INCLUDED: string[] = [
  "An automatic scooty suited to Sreemangal's roads",
  "A checked, cleaned ride handed over in person",
  "Pickup at the shop on Jalalia Road",
  "Red Scooty's number for the road — call or WhatsApp",
];

const ASK: string[] = [
  "The current daily rate and multi-day options",
  "Helmet availability and sizes",
  "How fuel works at handover and return",
  "Hotel, station or shop pickup",
  "Which documents to bring with you",
];

/**
 * Two-column editorial block for /scooties — kept generic on purpose:
 * no rental policy is invented, everything points to confirmation on booking.
 */
export function IncludedAsk() {
  return (
    <section
      aria-labelledby="included-ask-heading"
      className="border-b-2 border-ink bg-cream py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE HONEST VERSION</p>
          <h2
            id="included-ask-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            WHAT YOU GET.
            <br />
            <span className="text-outline">WHAT YOU ASK.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full border-2 border-ink bg-paper p-6 shadow-hard sm:p-8">
              <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
                WHAT IS INCLUDED
              </h3>
              <ul className="mt-6 space-y-4">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink-soft"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="h-full border-2 border-ink bg-ink p-6 text-cream shadow-hard sm:p-8">
              <h3 className="font-display text-3xl tracking-wide sm:text-4xl">
                ASK WHEN YOU BOOK
              </h3>
              <ul className="mt-6 space-y-4">
                {ASK.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-cream/80"
                  >
                    <MessageCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <p className="label-micro mt-8 flex flex-wrap items-center gap-3 text-steel">
            NOTHING HERE IS A FIXED POLICY — EVERY DETAIL IS CONFIRMED
            PERSONALLY WHEN YOUR BOOKING IS CONFIRMED.
            <DemoBadge>TO BE CONFIRMED</DemoBadge>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
