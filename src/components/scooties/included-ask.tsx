import { CheckCircle2, MessageCircle } from "lucide-react";

import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

const INCLUDED: string[] = [
  "An automatic scooty suited to Sreemangal's roads",
  "A checked, cleaned ride handed over in person",
  "Pickup at the shop on Demo Road",
  "Demo Scooty's number for the road — call or WhatsApp",
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
      className="rule-soft bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE HONEST VERSION</p>
          <h2
            id="included-ask-heading"
            className="display-1 mt-2 max-w-3xl text-ink"
          >
            WHAT YOU GET. <span className="text-brand">WHAT YOU ASK.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Included */}
          <Reveal className="h-full">
            <div className="card-soft flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-leaf" aria-hidden="true" />
                <p className="label-micro text-leaf">INCLUDED, ALWAYS</p>
              </div>
              <h3 className="display-2 mt-3 text-ink">WHAT IS INCLUDED</h3>
              <ul className="mt-6">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-ink/10 py-4 text-ink-soft first:border-t-0"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-leaf"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Ask */}
          <Reveal delay={0.08} className="h-full">
            <div
              className="band-ink flex h-full flex-col p-6 sm:p-8"
              aria-labelledby="ask-when-you-book-title"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <p className="label-micro text-brand">ON REQUEST</p>
              </div>
              <h3 id="ask-when-you-book-title" className="display-2 mt-3">
                ASK WHEN YOU BOOK
              </h3>
              <ul className="mt-6">
                {ASK.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-cream/15 py-4 text-cream/80 first:border-t-0"
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
          <p className="label-micro mt-8 flex flex-wrap items-center gap-3 leading-relaxed text-steel">
            NOTHING HERE IS A FIXED POLICY — EVERY DETAIL IS CONFIRMED
            PERSONALLY WHEN YOUR BOOKING IS CONFIRMED.
            <DemoBadge>TO BE CONFIRMED</DemoBadge>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
