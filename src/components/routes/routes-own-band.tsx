import { ArrowRight } from "lucide-react";

import { ROUTE_METRICS_NOTE } from "@/data/ride-routes";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";

/**
 * End CTA band for /routes — band-ink, booking handoff and the honest
 * ROUTE_METRICS_NOTE footnote.
 */
export function RoutesOwnBand() {
  return (
    <section
      aria-labelledby="own-route-heading"
      className="band-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-brand" aria-hidden="true" />
                <p className="label-micro text-brand">YOUR PLAN, OUR ROADS</p>
              </div>
              <h2
                id="own-route-heading"
                className="display-1 mt-3 max-w-2xl text-cream"
              >
                PREFER YOUR{" "}
                <span className="text-brand">OWN ROUTE?</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/75">
                Tell us how much day you have and what you want to see — tea
                gardens, forest, water, or nowhere in particular. We help plan
                a route on request and confirm it personally before you ride.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <TrackedLink
                event="click_booking"
                source="routes:own_band"
                href="/book"
                className="btn-base btn-red group h-16 px-10 text-2xl"
              >
                START YOUR REQUEST
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </TrackedLink>
              <p className="label-micro mt-4 max-w-xs leading-relaxed text-cream/60">
                NO PAYMENT, NO ACCOUNT — THE ROUTE IS PLANNED WITH YOU WHEN
                YOUR REQUEST IS CONFIRMED.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="label-micro mt-14 border-t border-cream/15 pt-6 leading-relaxed text-cream/50">
            {ROUTE_METRICS_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
