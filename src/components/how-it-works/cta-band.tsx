import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * /how-it-works — closing CTA band pointing to /book.
 */
export function HowCtaBand() {
  return (
    <section aria-labelledby="how-cta-heading" className="bg-brand py-20 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="label-micro text-white/80">YOUR MOVE</p>
          <h2
            id="how-cta-heading"
            className="mt-2 font-display text-[clamp(52px,8vw,110px)] leading-[0.9]"
          >
            START WITH STEP 01.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Send the request — choose your scooter, pick a date, done. Red
            Scooty handles the rest personally.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex h-16 items-center justify-center border-2 border-ink bg-ink px-10 font-display text-2xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0"
          >
            GO TO BOOKING
            <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
