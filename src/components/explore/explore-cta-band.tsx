"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { whatsappMessageUrl } from "@/data/site";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/site/reveal";

/**
 * Explore closing band — soft handoff from the map and destinations
 * to the booking page (internal, tracked) or a WhatsApp chat.
 */
export function ExploreCtaBand() {
  return (
    <section
      aria-labelledby="explore-cta-heading"
      className="band-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">PICKED YOUR STOPS?</p>
          <h2
            id="explore-cta-heading"
            className="display-1 mt-3 text-cream"
          >
            THEN ALL YOU NEED
            <br />
            IS THE <span className="text-brand">SCOOTY.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">
            Book by request — we confirm every ride personally. No payment
            online, no forms to study.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/book"
              onClick={() =>
                track("click_booking", { source: "explore_cta_band" })
              }
              className="btn-base btn-red group"
            >
              BOOK A SCOOTY
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href={whatsappMessageUrl(
                "Hi Demo Scooty! I've been exploring the map on your site — I'd like to plan a ride in Sreemangal.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("click_whatsapp", { source: "explore_cta_band" })
              }
              className="link-underline inline-flex items-center gap-2 font-display text-2xl tracking-wider text-cream transition-colors hover:text-brand"
            >
              PLAN IT ON WHATSAPP
            </a>
          </div>
          <p className="label-micro mt-6 text-cream/50">
            PICKUP ON DEMO ROAD · CONFIRMED PERSONALLY · DEMO ESTIMATES
            UNTIL YOU BOOK
          </p>
        </Reveal>
      </div>
    </section>
  );
}
