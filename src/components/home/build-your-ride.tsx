"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { RIDE_MOODS } from "@/data/ride-moods";
import { useSiteConfig } from "@/components/site/site-config-provider";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/site/reveal";

/**
 * Build Your Ride — pick a mood, get a sample ride plan.
 * Honesty rule: EST. TIME and DISTANCE render the "—" placeholders from the
 * data file deliberately; real numbers are confirmed when booking.
 */
export function BuildYourRide() {
  const { home, whatsappUrl: wa } = useSiteConfig();
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
      className="rule-soft bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Heading + mood buttons */}
          <div>
            <Reveal>
              <p className="label-micro text-brand">TRIP MOOD</p>
              <h2 id="mood-heading" className="display-1 mt-2 text-ink">
                WHAT KIND
                <br />
                OF RIDE
                <br />
                <span className="text-brand">DO YOU WANT?</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                Tap a mood — we&apos;ll sketch a sample route for it. Ride it
                as-is or mix it up; we confirm the details when you book.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                role="radiogroup"
                aria-label="Choose a ride mood"
                className="mt-8 flex flex-wrap gap-2.5"
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
                      className={`min-h-11 border px-5 py-2 font-display text-lg tracking-wider transition-all duration-200 ${
                        isSel
                          ? "border-brand bg-brand text-white shadow-[0_8px_20px_rgba(245,34,45,0.25)]"
                          : "border-ink/20 bg-paper text-ink hover:-translate-y-0.5 hover:border-ink"
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
          <Reveal delay={0.15} variant="scale">
            <div
              className="band-ink flex h-full flex-col p-6 sm:p-8"
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
                  <h3 className="display-2 mt-2 text-cream">{mood.planTitle}</h3>

                  <ol className="mt-6 flex-1 space-y-0">
                    {mood.stops.map((s, i) => (
                      <li
                        key={`${mood.id}-${s.label}-${i}`}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        {i < mood.stops.length - 1 ? (
                          <span
                            className="absolute top-5 left-[7px] h-full w-px bg-cream/20"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={`mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-cream transition-colors ${
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

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-cream/15 pt-6">
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
                      onClick={() =>
                        track("click_booking", { source: "build_your_ride" })
                      }
                      className="btn-base btn-red group w-full"
                    >
                      BOOK THIS ROUTE
                      <ArrowRight
                        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                    <a
                      href={wa(
                        `Hi Red Scooty! I'm interested in the "${mood.label}" ride in Sreemangal. Can you tell me more?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-full items-center justify-center border border-cream/40 font-display text-lg tracking-wider text-cream transition-colors hover:border-brand hover:text-brand"
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
            BASED IN TOWN · {home.locationStrip} · RIDE TIMES ARE DEMO ESTIMATES
          </p>
        </Reveal>
      </div>
    </section>
  );
}
