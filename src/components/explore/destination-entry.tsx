import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { Destination } from "@/data/destinations";
import { mapsQueryUrl } from "@/data/site";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { PassportStampButton } from "@/components/explore/ride-passport";
import { cn } from "@/lib/utils";

type DestinationEntryProps = {
  d: Destination;
  index: number;
};

/**
 * Giant editorial destination composition for /explore.
 * Alternating full-width layout: image left/right, oversized index number,
 * rotated frame with hard shadow. Mobile stays strictly vertical and simple.
 */
export function DestinationEntry({ d, index }: DestinationEntryProps) {
  const number = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  // dest-hamham.png is the one portrait asset (864x1152); everything else is 1344x768.
  const portrait = d.slug === "ham-ham";

  const imageSpan = portrait ? "md:col-span-5" : "md:col-span-7";
  const textSpan = portrait ? "md:col-span-7" : "md:col-span-5";

  return (
    <article className="py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
        {/* Image column */}
        <Reveal
          className={cn(
            "relative",
            imageSpan,
            flip ? "md:order-2" : "md:order-1",
            !flip && "md:-mr-4 lg:-mr-8",
            flip && "md:-ml-4 lg:-ml-8",
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-7 left-0 z-10 font-display text-[clamp(64px,8vw,140px)] leading-none text-outline md:-left-6 md:-top-12"
          >
            {number}
          </span>
          <figure
            className={cn(
              "relative border-2 border-ink bg-paper shadow-hard-lg",
              flip ? "md:rotate-[1.25deg]" : "md:rotate-[-1.25deg]",
            )}
          >
            <div
              className={cn(
                "relative",
                portrait ? "aspect-[3/4]" : "aspect-[7/4]",
              )}
            >
              <Image
                src={d.image}
                alt={d.imageAlt}
                fill
                sizes={
                  portrait
                    ? "(min-width: 1280px) 27vw, (min-width: 768px) 38vw, 92vw"
                    : "(min-width: 1280px) 37vw, (min-width: 768px) 54vw, 92vw"
                }
                className="object-cover"
              />
            </div>
            {d.routeType ? (
              <figcaption className="label-micro absolute bottom-0 left-0 bg-ink px-2.5 py-1.5 text-cream">
                {d.routeType}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>

        {/* Text column */}
        <div
          className={cn(
            "relative",
            textSpan,
            flip ? "md:order-1" : "md:order-2",
          )}
        >
          <p className="label-micro text-brand">{d.type}</p>
          <h3 className="mt-2 font-display text-[clamp(40px,4.5vw,72px)] leading-[0.95] tracking-wide text-ink">
            {d.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
            {d.description}
          </p>

          <p className="label-micro mt-5 text-steel">
            {d.goodFor.join(" / ")}
          </p>

          {(d.distanceLabel || d.rideTimeLabel) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {d.distanceLabel ? (
                <span className="label-micro border-2 border-ink bg-paper px-2.5 py-1.5 text-ink">
                  {d.distanceLabel}
                </span>
              ) : null}
              {d.rideTimeLabel ? (
                <span className="label-micro border-2 border-ink bg-ink px-2.5 py-1.5 text-cream">
                  {d.rideTimeLabel}
                </span>
              ) : null}
            </div>
          )}

          {d.whyGo ? (
            <blockquote className="mt-6 border-l-4 border-brand pl-4">
              <p className="font-display text-2xl leading-tight tracking-wide text-ink md:text-3xl">
                &ldquo;{d.whyGo}&rdquo;
              </p>
            </blockquote>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedLink
              event="get_directions"
              source={`explore:${d.slug}`}
              href={mapsQueryUrl(d.mapQuery)}
              external
              ariaLabel={`Get directions to ${d.name} on Google Maps`}
              className="inline-flex h-12 items-center gap-2 border-2 border-ink bg-ink px-5 font-display text-xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-hard-red-sm active:translate-y-0"
            >
              GET DIRECTIONS
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <Link
              href="/book"
              className="inline-flex h-12 items-center gap-2 border-2 border-ink bg-paper px-5 font-display text-xl tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0"
            >
              RIDE IT
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {d.passport ? (
            <div className="mt-5">
              <PassportStampButton slug={d.slug} name={d.name} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
