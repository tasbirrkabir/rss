import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

/**
 * /rental-guide — closing CTA band: booking request + contact page.
 */
export function GuideCtaBand() {
  return (
    <section aria-label="Booking and contact" className="bg-ink py-16 text-cream md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-8 border-2 border-cream/20 p-6 sm:p-8">
              <div>
                <p className="label-micro text-brand">CLEAR ON EVERYTHING?</p>
                <h2 className="mt-2 font-display text-4xl leading-tight tracking-wide sm:text-5xl">
                  READY TO RIDE.
                </h2>
                <p className="mt-3 max-w-md text-cream/70">
                  Send your date, duration and preferred scooty — the request
                  takes under a minute.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex h-14 items-center justify-center border-2 border-brand bg-brand px-6 font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard-red active:translate-y-0"
              >
                START YOUR REQUEST
                <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-8 border-2 border-cream/20 p-6 sm:p-8">
              <div>
                <p className="label-micro text-steel">STILL DECIDING?</p>
                <h2 className="mt-2 font-display text-4xl leading-tight tracking-wide sm:text-5xl">
                  ASK US FIRST.
                </h2>
                <p className="mt-3 max-w-md text-cream/70">
                  Questions about routes, helmets or pickup — reach out and
                  get a straight answer.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center border-2 border-cream bg-transparent px-6 font-display text-2xl tracking-wider text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                GO TO CONTACT
                <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
