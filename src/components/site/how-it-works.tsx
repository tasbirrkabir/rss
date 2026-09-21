import { Reveal } from "@/components/site/reveal";

const STEPS = [
  {
    n: "01",
    title: "CHOOSE",
    body: "Pick your ride and preferred date. Not sure which one? Choose no preference.",
  },
  {
    n: "02",
    title: "REQUEST",
    body: "Send your booking details. It takes under a minute - no payment, no account.",
  },
  {
    n: "03",
    title: "CONFIRM",
    body: "Red Scooty contacts you to confirm availability, price and requirements.",
  },
  {
    n: "04",
    title: "RIDE",
    body: "Collect your scooty on Jalalia Road and go explore Sreemangal.",
  },
];

/** How it works (PRD section 20). */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">SIMPLE PROCESS</p>
          <h2
            id="how-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            HOW RENTAL <span className="text-outline">WORKS.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <article className="relative h-full border-2 border-ink bg-paper p-6 shadow-hard">
                <span
                  className="font-display text-7xl leading-none text-brand"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-3xl tracking-wide text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="label-micro mt-8 text-steel">
            FINAL STEP DETAILS (DELIVERY, DOCUMENTS, DEPOSIT) ARE CONFIRMED WITH
            RED SCOOTY BEFORE LAUNCH.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
