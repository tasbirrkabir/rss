import { ArrowRight } from "lucide-react";

import { BookRideButton } from "@/components/site/book-button";
import { Reveal } from "@/components/site/reveal";

/** About strip (PRD section 22) - no unverified founder history. */
export function About() {
  return (
    <section aria-labelledby="about-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="label-micro text-brand">ABOUT RED SCOOTY</p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
            >
              BUILT FOR THE WAY PEOPLE{" "}
              <span className="text-brand">DISCOVER SREEMANGAL.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
              Red Scooty exists to make moving around Sreemangal simpler, more
              flexible and more enjoyable. Tea gardens, forest roads, lakeside
              runs - the scooty is just the way you get to all of it. Start
              from Jalalia Road, point at the hills, and go.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-4">
            <div className="border-2 border-ink bg-cream p-6 shadow-hard">
              <p className="font-display text-3xl leading-tight tracking-wide text-ink">
                SREEMANGAL IS NOT A PLACE TO RUSH THROUGH.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                It is a place to explore - your way.
              </p>
              <BookRideButton
                source="about"
                className="mt-6 h-14 w-full rounded-none border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream transition-all hover:bg-brand hover:shadow-hard-red"
              >
                START YOUR RIDE{" "}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </BookRideButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
