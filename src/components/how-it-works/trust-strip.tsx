import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

const TRUST_ITEMS: string[] = [
  "BOOKING BY REQUEST",
  "CONFIRMED PERSONALLY",
  "NO ONLINE PAYMENT REQUIRED",
];

/**
 * /how-it-works — trust strip on ink: one quiet hairline panel with the
 * three process guarantees, plus the honest small print
 * (deposit/documents/delivery = confirmed personally).
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Booking guarantees"
      className="band-ink py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid border border-cream/15 md:grid-cols-3 md:divide-x md:divide-cream/15">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item}
                className="flex items-center justify-center gap-3 px-6 py-8 text-center transition-colors hover:bg-cream/5"
              >
                <span className="label-micro text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl leading-tight tracking-wide sm:text-3xl">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="label-micro mt-8 flex flex-wrap items-center gap-3 text-cream/60">
            DEPOSIT, DOCUMENTS AND DELIVERY DETAILS ARE CONFIRMED PERSONALLY
            WITH RED SCOOTY.
            <DemoBadge>DETAILS TO BE CONFIRMED</DemoBadge>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
