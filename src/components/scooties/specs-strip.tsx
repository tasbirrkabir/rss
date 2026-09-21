import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

/**
 * Honest spec strip for /scooties.
 * Only transmission is confirmed (fleet data); everything else is labelled
 * as unknown instead of invented.
 */
export function SpecsStrip() {
  return (
    <section
      aria-labelledby="specs-heading"
      className="bg-cream py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">SPECS, HONESTLY</p>
          <h2
            id="specs-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            WHAT WE KNOW.{" "}
            <span className="text-outline">WHAT WE DON&apos;T.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-1 border-2 border-ink bg-paper shadow-hard sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b-2 border-ink p-6 sm:border-r-2 lg:border-b-0">
              <p className="label-micro text-steel">TRANSMISSION</p>
              <p className="mt-2 font-display text-3xl tracking-wide text-ink">
                AUTOMATIC
              </p>
              <p className="label-micro mt-2 text-leaf">CONFIRMED</p>
            </div>

            <div className="border-b-2 border-ink p-6 sm:border-b-0">
              <p className="label-micro text-steel">ENGINE</p>
              <p className="mt-2 font-display text-3xl tracking-wide text-ink">
                TO BE CONFIRMED
              </p>
              <DemoBadge className="mt-2">DETAILS UNKNOWN</DemoBadge>
            </div>

            <div className="border-b-2 border-ink p-6 sm:border-b-0 sm:border-r-2">
              <p className="label-micro text-steel">STORAGE</p>
              <p className="mt-2 font-display text-3xl tracking-wide text-ink">
                TO BE CONFIRMED
              </p>
              <DemoBadge className="mt-2">DETAILS UNKNOWN</DemoBadge>
            </div>

            <div className="p-6">
              <p className="label-micro text-steel">HELMETS</p>
              <p className="mt-2 font-display text-3xl tracking-wide text-ink">
                ASK ON BOOKING
              </p>
              <p className="label-micro mt-2 text-steel">
                AVAILABILITY CONFIRMED WHEN YOU BOOK
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="label-micro mt-6 max-w-3xl text-steel">
            ENGINE, STORAGE AND FULL SPEC SHEETS ARE CONFIRMED WITH RED SCOOTY
            BEFORE LAUNCH. TRANSMISSION COMES FROM THE FLEET DATA ALREADY ON
            FILE.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
