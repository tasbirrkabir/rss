"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useSiteConfig } from "@/components/site/site-config-provider";
import { track } from "@/lib/analytics";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

/**
 * Home hero — headline, intro and image are all managed from /admin/home.
 * Cinematic composition: oversized display type against a single dominant
 * image, quiet parallax, one strong CTA and one exploration CTA.
 */
export function Hero() {
  const { home, config } = useSiteConfig();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 36]);

  return (
    <section id="top" aria-label="Hero" className="relative overflow-hidden">
      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-20"
      >
        {/* Copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-brand" aria-hidden="true" />
              <p className="label-micro text-brand">
                {home.heroKicker}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-hero mt-5 text-ink">
              {home.heroLine1}
              <br />
              {home.heroLine2}
              <br />
              <span className="text-brand">{home.heroLine3}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {home.heroSub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/book"
                onClick={() => track("start_booking", { source: "hero" })}
                className="btn-base btn-primary group"
              >
                BOOK A SCOOTY
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/explore" className="btn-base btn-outline group">
                EXPLORE SREEMANGAL
                <ArrowDown
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="label-micro mt-9 text-steel">
              {home.bookingNote}
            </p>
          </Reveal>
        </motion.div>

        {/* Dominant visual */}
        <motion.div style={{ y: imageY }} className="lg:col-span-5">
          <Reveal delay={0.15} y={32} variant="mask">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden img-frame">
                <Image
                  src={home.heroImage}
                  alt={home.heroImageAlt}
                  width={864}
                  height={1152}
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Quiet editorial caption — verified listing coordinates */}
              <figcaption className="label-micro mt-3 flex items-center justify-between gap-4 text-steel">
                <span>24.3041° N · 91.7342° E</span>
                <span className="hidden sm:inline">JALALIA ROAD, SREEMANGAL</span>
              </figcaption>
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* Micro-location strip */}
      <div className="rule-soft bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-ink/10 px-4 sm:px-6 md:grid-cols-2 md:divide-x md:divide-y-0">
          <p className="label-micro flex items-center justify-center gap-2 py-3.5 text-ink">
            {home.locationStrip}
          </p>
          <TrackedLink
            event="click_call"
            source="hero_strip"
            href={config.telUrl}
            className="label-micro flex items-center justify-center gap-2 py-3.5 text-ink transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            CALL {config.phoneDisplay}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
