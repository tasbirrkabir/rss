import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { SITE, whatsappMessageUrl } from "@/data/site";
import { Reveal } from "@/components/site/reveal";

/**
 * Final home CTA band - the "YOUR TURN" moment (rail section 05).
 */
export function FinalCta() {
  return (
    <section
      id="your-turn"
      aria-labelledby="final-cta-heading"
      className="bg-ink py-20 text-cream md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">NO FORMS TO STUDY</p>
          <h2
            id="final-cta-heading"
            className="mt-3 font-display text-[clamp(64px,11vw,170px)] leading-[0.88] tracking-tight text-cream"
          >
            READY?
            <br />
            <span className="text-brand">LET&apos;S GO.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book"
              className="inline-flex h-16 items-center justify-center border-2 border-cream bg-brand px-10 font-display text-3xl tracking-wider text-white shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-red active:translate-x-0 active:translate-y-0 active:shadow-hard-sm"
            >
              BOOK A SCOOTY{" "}
              <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
            </Link>
            <a
              href={SITE.telUrl}
              className="inline-flex h-16 items-center justify-center border-2 border-cream bg-transparent px-8 font-display text-3xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-ink"
            >
              <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm text-cream/70">
            Prefer chat?{" "}
            <a
              href={whatsappMessageUrl(
                "Hi Red Scooty! I'd like to book a scooty in Sreemangal.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand underline decoration-2 underline-offset-4 hover:text-cream"
            >
              Message us on WhatsApp
            </a>{" "}
            — we confirm every request personally.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
