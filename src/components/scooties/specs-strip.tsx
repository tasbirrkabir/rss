import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

type SpecRow = {
  label: string;
  value: string;
  status: "confirmed" | "unknown" | "ask";
  note?: string;
};

const SPEC_ROWS: SpecRow[] = [
  {
    label: "TRANSMISSION",
    value: "AUTOMATIC",
    status: "confirmed",
    note: "CONFIRMED",
  },
  { label: "ENGINE", value: "TO BE CONFIRMED", status: "unknown" },
  { label: "STORAGE", value: "TO BE CONFIRMED", status: "unknown" },
  {
    label: "HELMETS",
    value: "ASK ON BOOKING",
    status: "ask",
    note: "AVAILABILITY CONFIRMED WHEN YOU BOOK",
  },
];

/**
 * Honest spec sheet for /scooties — refined hairline rows instead of a boxed
 * grid. Only transmission is confirmed (fleet data); everything else is
 * labelled as unknown instead of invented.
 */
export function SpecsStrip() {
  return (
    <section
      aria-labelledby="specs-heading"
      className="rule-soft bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">SPECS, HONESTLY</p>
          <h2
            id="specs-heading"
            className="display-1 mt-2 max-w-3xl text-ink"
          >
            WHAT WE KNOW.{" "}
            <span className="text-outline">WHAT WE DON&apos;T.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Spec sheet — hairline rows */}
          <Reveal delay={0.08} className="lg:col-span-8">
            <dl className="border-t border-ink/10">
              {SPEC_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-ink/10 py-5 sm:grid-cols-[minmax(9rem,1fr)_2fr_auto]"
                >
                  <dt className="label-micro text-steel">{row.label}</dt>
                  <dd className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
                    {row.value}
                  </dd>
                  <dd className="col-span-2 sm:col-span-1 sm:justify-self-end">
                    {row.status === "confirmed" ? (
                      <span className="label-micro text-leaf">
                        {row.note ?? "CONFIRMED"}
                      </span>
                    ) : row.status === "ask" ? (
                      <span className="label-micro text-steel">{row.note}</span>
                    ) : (
                      <DemoBadge>DETAILS UNKNOWN</DemoBadge>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Why the gaps */}
          <Reveal delay={0.14} className="lg:col-span-4">
            <div className="card-soft h-full p-6 sm:p-8">
              <p className="label-micro text-brand">WHY THE GAPS</p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Engine, storage and full spec sheets are confirmed with Red
                Scooty before launch — the transmission line comes from the
                fleet data already on file. We&apos;d rather leave a row blank
                than fill it with fiction.
              </p>
              <p className="label-micro mt-5 leading-relaxed text-steel">
                RATES, MODELS AND AVAILABILITY ARE CONFIRMED DIRECTLY WHEN YOU
                BOOK.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
