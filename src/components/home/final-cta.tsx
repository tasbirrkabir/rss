import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { SITE, whatsappMessageUrl } from "@/data/site";
import { Reveal } from "@/components/site/reveal";

/**
 * Final home CTA band — the "YOUR TURN" moment.
 */
export function FinalCta() {
  return (
    <section
      id="your-turn"
      aria-labelledby="final-cta-heading"
      className="band-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">NO FORMS TO STUDY</p>
          <h2
            id="final-cta-heading"
            className="mt-3 font-display text-[clamp(56px,9vw,140px)] leading-[0.9] text-cream"
          >
            READY?
            <br />
            <span className="text-brand">LET&apos;S GO.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/book" className="btn-base btn-red group h-16 px-10 text-2xl sm:text-3xl">
              BOOK A SCOOTY
              <ArrowRight
                className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={SITE.telUrl}
              className="btn-base btn-cream h-16 px-8 text-2xl sm:text-3xl"
            >
              <Phone className="mr-1 h-5 w-5" aria-hidden="true" />
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
              className="link-underline font-bold text-brand"
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
