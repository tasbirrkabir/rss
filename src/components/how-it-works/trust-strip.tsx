import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

const TRUST_ITEMS: string[] = [
  "BOOKING BY REQUEST",
  "CONFIRMED PERSONALLY",
  "NO ONLINE PAYMENT REQUIRED",
];

/**
 * /how-it-works — trust strip on ink: three bordered process guarantees,
 * plus the honest small print (deposit/documents/delivery = confirmed personally).
 */
export function TrustStrip() {
  return (
    <section aria-label="Booking guarantees" className="bg-ink py-16 text-cream md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item}
                className="flex items-center justify-center border-2 border-cream/20 px-6 py-8 text-center transition-colors hover:border-brand"
              >
                <span className="label-micro mr-3 text-brand">
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
