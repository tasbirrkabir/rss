import Image from "next/image";
import { ArrowDown, ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { BookRideButton } from "@/components/site/book-button";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

export function Hero() {
  return (
    <section id="top" aria-label="Hero" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-12 pt-10 sm:px-6 md:pt-14 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-brand" aria-hidden="true" />
              <p className="label-micro text-brand">SCOOTY RENTAL — SREEMANGAL</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-[clamp(64px,10vw,150px)] leading-[0.88] tracking-tight text-ink">
              DON&apos;T JUST VISIT
              <br />
              SREEMANGAL.
              <br />
              <span className="text-brand">RIDE IT.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">
              {SITE.heroSub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookRideButton
                source="hero"
                className="h-14 rounded-none border-2 border-ink bg-ink px-8 font-display text-2xl tracking-wider text-cream shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand hover:shadow-hard-red"
              >
                BOOK A SCOOTY{" "}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </BookRideButton>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-none border-2 border-ink bg-transparent px-6 font-display text-2xl tracking-wider text-ink shadow-hard-sm transition-all hover:bg-cream hover:text-brand hover:shadow-hard"
              >
                <a href="#explore">
                  EXPLORE SREEMANGAL{" "}
                  <ArrowDown className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="label-micro mt-8 text-steel">
              BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO PAYMENT ONLINE
            </p>
          </Reveal>
        </div>

        {/* Framed image */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15} y={32}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="rotate-[1.5deg] border-2 border-ink bg-paper shadow-hard-lg">
                <Image
                  src="/images/hero-scooty.png"
                  alt="Red scooty parked on a quiet road winding through the green tea gardens of Sreemangal"
                  width={864}
                  height={1152}
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-2 -rotate-2 border-2 border-ink bg-brand px-3 py-2 shadow-hard-sm sm:-left-5">
                <p className="font-display text-xl tracking-wider text-white">
                  EXPLORE SREEMANGAL
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Micro-location strip */}
      <div className="border-y-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y-2 divide-ink px-4 sm:px-6 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
          <p className="label-micro flex items-center justify-center gap-2 py-3 text-ink">
            {SITE.locationStrip}
          </p>
          <TrackedLink
            event="click_call"
            source="hero_strip"
            href={SITE.telUrl}
            className="label-micro flex items-center justify-center gap-2 py-3 text-ink transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            CALL {SITE.phoneDisplay}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
