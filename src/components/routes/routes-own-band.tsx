import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * Bottom band for /routes — custom routes welcome, planned on request.
 */
export function RoutesOwnBand() {
  return (
    <section
      aria-labelledby="own-route-heading"
      className="border-t-2 border-ink bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="label-micro text-brand">YOUR PLAN, OUR ROADS</p>
              <h2
                id="own-route-heading"
                className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9]"
              >
                PREFER YOUR <span className="text-outline-cream">OWN ROUTE?</span>
              </h2>
              <p className="mt-4 max-w-xl text-cream/80">
                Tell us how much day you have and what you want to see — tea
                gardens, forest, water, or nowhere in particular. We help plan
                a route on request and confirm it personally before you ride.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link
                href="/book"
                className="flex h-16 items-center justify-center border-2 border-brand bg-brand px-8 font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard-red active:translate-y-0"
              >
                START YOUR REQUEST
                <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="label-micro mt-4 max-w-xs text-cream/60">
                NO PAYMENT, NO ACCOUNT — THE ROUTE IS PLANNED WITH YOU WHEN YOUR
                REQUEST IS CONFIRMED.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
