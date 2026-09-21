import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * Cross-link band for /scooties: routes, rental guide, and the booking CTA.
 */
export function ScootiesCrossLinks() {
  return (
    <section
      aria-label="Related pages and booking"
      className="bg-ink py-16 text-cream"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/routes"
              className="group flex flex-col justify-between border-2 border-cream/20 p-6 transition-all hover:-translate-y-0.5 hover:border-brand"
            >
              <p className="label-micro text-steel transition-colors group-hover:text-cream/80">
                NEXT
              </p>
              <p className="mt-8 font-display text-3xl leading-tight tracking-wide sm:text-4xl">
                PLANNING A ROUTE?
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-xl tracking-wider text-brand">
                GO TO ROUTES
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/rental-guide"
              className="group flex flex-col justify-between border-2 border-cream/20 p-6 transition-all hover:-translate-y-0.5 hover:border-brand"
            >
              <p className="label-micro text-steel transition-colors group-hover:text-cream/80">
                BEFORE YOU RIDE
              </p>
              <p className="mt-8 font-display text-3xl leading-tight tracking-wide sm:text-4xl">
                READ THE RENTAL GUIDE
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-xl tracking-wider text-brand">
                GO TO GUIDE
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/book"
              className="group flex flex-col justify-between border-2 border-brand bg-brand p-6 text-white transition-all hover:-translate-y-0.5 hover:shadow-hard"
            >
              <p className="label-micro text-white/80">YOUR MOVE</p>
              <p className="mt-8 font-display text-3xl leading-tight tracking-wide sm:text-4xl">
                READY TO RIDE?
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-xl tracking-wider">
                BOOK YOUR SCOOTY
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
