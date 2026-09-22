import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * /rental-guide — closing CTA band: booking request + contact page.
 * Ink band with hairline panels; btn-red / btn-cream per the exemplar language.
 */
export function GuideCtaBand() {
  return (
    <section
      aria-label="Booking and contact"
      className="band-ink py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-8 border border-cream/15 p-6 transition-colors hover:border-cream/30 sm:p-8">
              <div>
                <p className="label-micro text-brand">CLEAR ON EVERYTHING?</p>
                <h2 className="display-2 mt-2 text-cream">READY TO RIDE.</h2>
                <p className="mt-3 max-w-md text-cream/70">
                  Send your date, duration and preferred scooty — the request
                  takes under a minute.
                </p>
              </div>
              <Link href="/book" className="btn-base btn-red group w-fit">
                START YOUR REQUEST
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-8 border border-cream/15 p-6 transition-colors hover:border-cream/30 sm:p-8">
              <div>
                <p className="label-micro text-cream/50">STILL DECIDING?</p>
                <h2 className="display-2 mt-2 text-cream">ASK US FIRST.</h2>
                <p className="mt-3 max-w-md text-cream/70">
                  Questions about routes, helmets or pickup — reach out and
                  get a straight answer.
                </p>
              </div>
              <Link href="/contact" className="btn-base btn-cream group w-fit">
                GO TO CONTACT
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
