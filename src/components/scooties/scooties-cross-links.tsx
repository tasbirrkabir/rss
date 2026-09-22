import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";

type CrossLink = {
  kicker: string;
  title: string;
  cta: string;
  href: string;
};

const LINKS: CrossLink[] = [
  {
    kicker: "NEXT",
    title: "PLANNING A ROUTE?",
    cta: "GO TO ROUTES",
    href: "/routes",
  },
  {
    kicker: "BEFORE YOU RIDE",
    title: "READ THE RENTAL GUIDE",
    cta: "GO TO GUIDE",
    href: "/rental-guide",
  },
];

/**
 * Cross-link band for /scooties: routes, rental guide, and the booking CTA.
 */
export function ScootiesCrossLinks() {
  return (
    <section
      aria-label="Related pages and booking"
      className="band-ink py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex flex-col justify-between border border-cream/15 p-6 transition-colors duration-200 hover:border-brand/70"
              >
                <p className="label-micro text-cream/50">{l.kicker}</p>
                <p className="mt-8 font-display text-3xl leading-tight tracking-wide text-cream sm:text-4xl">
                  {l.title}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-xl tracking-wider text-brand">
                  {l.cta}
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}

            <TrackedLink
              event="click_booking"
              source="scooties:cross_link"
              href="/book"
              className="group flex flex-col justify-between border border-brand bg-brand p-6 text-white transition-colors duration-200 hover:border-cream hover:bg-ink"
            >
              <p className="label-micro text-white/80">YOUR MOVE</p>
              <p className="mt-8 font-display text-3xl leading-tight tracking-wide sm:text-4xl">
                READY TO RIDE?
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-xl tracking-wider">
                BOOK YOUR SCOOTY
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
