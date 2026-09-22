import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * /how-it-works — closing CTA band pointing to /book.
 * Matches the final-cta exemplar: ink band, display headline, btn-red.
 */
export function HowCtaBand() {
  return (
    <section
      aria-labelledby="how-cta-heading"
      className="band-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">YOUR MOVE</p>
          <h2
            id="how-cta-heading"
            className="display-1 mt-3 text-cream"
          >
            START WITH STEP 01.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/70">
            Send the request — choose your scooter, pick a date, done. Red
            Scooty handles the rest personally.
          </p>
          <Link
            href="/book"
            className="btn-base btn-red group mt-10 h-16 px-10 text-2xl"
          >
            GO TO BOOKING
            <ArrowRight
              className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
