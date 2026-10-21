import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { SITE } from "@/data/site";

type StepLink =
  | { kind: "internal"; href: string; label: string }
  | { kind: "maps"; href: string; label: string };

type Step = {
  n: string;
  title: string;
  headline: string;
  body: string;
  link?: StepLink;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "CHOOSE",
    headline: "Choose your scooter.",
    body: "Mini scooty for the garden lanes, standard for longer days — or send the request without a preference and let Demo Scooty match the ride to your plan.",
  },
  {
    n: "02",
    title: "BOOK",
    headline: "Send your preferred date and duration.",
    body: "The request takes under a minute — no payment, no account. Demo Scooty replies personally to confirm availability and price.",
  },
  {
    n: "03",
    title: "PICK UP",
    headline: "Collect your ride from Demo Scooty.",
    body: "The shop sits on Demo Road in Sreemangal. Need a different pickup spot? Say so in your request.",
    link: {
      kind: "maps",
      href: SITE.mapsUrl,
      label: "OPEN IN GOOGLE MAPS",
    },
  },
  {
    n: "04",
    title: "RIDE",
    headline: "Explore Sreemangal your way.",
    body: "Tea gardens, forest roads, wetland sunsets — mix the stops that fit your day and let the ride do the rest.",
    link: {
      kind: "internal",
      href: "/explore",
      label: "SEE DESTINATIONS",
    },
  },
  {
    n: "05",
    title: "RETURN",
    headline: "Bring the scooter back at the agreed time.",
    body: "Running late or changing plans? Message Demo Scooty and sort it out — communication beats a clock, every time.",
  },
];

/**
 * /how-it-works — five full-height numbered editorial steps, alternating
 * alignment over quiet alternating surfaces, separated by hairlines.
 * Giant display numbers in brand red; hairline buttons via btn-outline.
 */
export function ProcessSteps() {
  return (
    <div aria-label="The five steps">
      {STEPS.map((s, i) => {
        const flip = i % 2 === 1;
        const bg = i % 2 === 0 ? "bg-paper" : "bg-cream";
        return (
          <section
            key={s.n}
            aria-label={`Step ${s.n}: ${s.title}`}
            className={`${bg} ${i > 0 ? "rule-soft" : ""}`}
          >
            <div
              className={`mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:gap-12 md:py-24 ${
                flip ? "md:flex-row-reverse" : ""
              }`}
            >
              <Reveal>
                <span
                  aria-hidden="true"
                  className="display-hero block text-brand"
                >
                  {s.n}
                </span>
              </Reveal>

              <Reveal
                delay={0.08}
                className={`max-w-md ${flip ? "md:text-right" : ""}`}
              >
                <p className="label-micro text-steel">STEP {s.n} — {s.title}</p>
                <h2 className="display-1 mt-2 text-ink">{s.headline}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {s.body}
                </p>
                {s.link ? (
                  s.link.kind === "maps" ? (
                    <TrackedLink
                      event="get_directions"
                      source={`how-it-works:step-${s.n}`}
                      href={s.link.href}
                      external
                      ariaLabel="Open the Demo Scooty location in Google Maps"
                      className="btn-base btn-outline group mt-6"
                    >
                      {s.link.label}
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </TrackedLink>
                  ) : (
                    <Link
                      href={s.link.href}
                      className="btn-base btn-outline group mt-6"
                    >
                      {s.link.label}
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  )
                ) : null}
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
