"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { RIDE_MOODS } from "@/data/ride-moods";
import { SITE, whatsappMessageUrl } from "@/data/site";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/site/reveal";

/**
 * Build Your Ride - pick a mood, get a sample ride plan.
 * Honesty rule: EST. TIME and DISTANCE render the "—" placeholders from the
 * data file deliberately; real numbers are confirmed when booking.
 */
export function BuildYourRide() {
  const [moodId, setMoodId] = useState<string | null>(null);
  const mood = RIDE_MOODS.find((m) => m.id === moodId);

  const selectMood = (id: string) => {
    setMoodId(id);
    track("start_booking", { source: "build_your_ride", mood: id });
  };

  return (
    <section
      id="build-your-ride"
      aria-labelledby="mood-heading"
      className="border-y-2 border-ink bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Heading + mood buttons */}
          <div>
            <Reveal>
              <p className="label-micro text-brand">TRIP MOOD</p>
              <h2
                id="mood-heading"
                className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
              >
                WHAT KIND
                <br />
                OF RIDE
                <br />
                <span className="text-outline">DO YOU WANT?</span>
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">
                Tap a mood - we&apos;ll sketch a sample route for it. Ride it
                as-is or mix it up; we confirm the details when you book.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                role="radiogroup"
                aria-label="Choose a ride mood"
                className="mt-8 flex flex-wrap gap-3"
              >
                {RIDE_MOODS.map((m) => {
                  const isSel = m.id === moodId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={isSel}
                      onClick={() => selectMood(m.id)}
                      className={`min-h-12 border-2 border-ink px-5 py-2 font-display text-xl tracking-wider transition-all ${
                        isSel
                          ? "bg-brand text-white shadow-hard-sm"
                          : "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-hard-sm"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Result panel */}
          <Reveal delay={0.15}>
            <div
              className="flex h-full flex-col border-2 border-ink bg-ink p-6 text-cream shadow-hard-red"
              aria-live="polite"
            >
              {!mood ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <ArrowDown className="h-8 w-8 text-brand" aria-hidden="true" />
                  <p className="mt-6 max-w-xs font-display text-3xl leading-tight tracking-wide text-cream/80">
                    PICK A MOOD AND WE&apos;LL SKETCH THE RIDE.
                  </p>
                  <p className="label-micro mt-3 text-cream/50">
                    SAMPLE ROUTE · RIDE IT YOUR WAY
                  </p>
                </div>
              ) : (
                <>
                  <p className="label-micro text-brand">{mood.tagline}</p>
                  <h3 className="mt-2 font-display text-4xl tracking-wide text-cream">
                    {mood.planTitle}
                  </h3>

                  <ol className="mt-6 flex-1 space-y-0">
                    {mood.stops.map((s, i) => (
                      <li
                        key={`${mood.id}-${s.label}-${i}`}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        {i < mood.stops.length - 1 ? (
                          <span
                            className="absolute top-5 left-[7px] h-full w-0.5 bg-cream/25"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={`mt-1.5 h-3.5 w-3.5 shrink-0 border-2 border-cream ${
                            i === mood.stops.length - 1 ? "bg-brand" : "bg-cream"
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-display text-2xl leading-tight tracking-wide">
                            {s.label}
                          </p>
                          <p className="mt-0.5 text-sm text-cream/70">{s.note}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t-2 border-cream/25 pt-6">
                    <div>
                      <p className="label-micro text-cream/60">EST. TIME</p>
                      <p className="font-display text-3xl tracking-wide text-cream">
                        {mood.estTime}
                      </p>
                    </div>
                    <div>
                      <p className="label-micro text-cream/60">DISTANCE</p>
                      <p className="font-display text-3xl tracking-wide text-cream">
                        {mood.distance}
                      </p>
                    </div>
                    <p className="label-micro col-span-2 leading-relaxed text-cream/50">
                      EXACT TIMING AND DISTANCE ARE CONFIRMED WITH YOU WHEN YOU
                      BOOK.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      href={`/book?mood=${mood.bookQuery}`}
                      onClick={() => track("click_booking", { source: "build_your_ride" })}
                      className="flex h-14 w-full items-center justify-center border-2 border-cream bg-brand font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard"
                    >
                      BOOK THIS ROUTE{" "}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                    <a
                      href={whatsappMessageUrl(
                        `Hi Red Scooty! I'm interested in the "${mood.label}" ride in Sreemangal. Can you tell me more?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-full items-center justify-center border-2 border-cream/60 font-display text-xl tracking-wider text-cream transition-colors hover:border-brand hover:text-brand"
                    >
                      ASK ABOUT IT ON WHATSAPP
                    </a>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="label-micro mt-8 text-steel">
            BASED IN TOWN · {SITE.locationStrip} · RIDE TIMES ARE ESTIMATES
          </p>
        </Reveal>
      </div>
    </section>
  );
}
