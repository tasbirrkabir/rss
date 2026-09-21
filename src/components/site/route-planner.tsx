"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  planRoute,
  type Duration,
  type Interest,
} from "@/data/route-planner";
import { track } from "@/lib/analytics";
import { useBookingStore } from "@/lib/booking-store";
import { Reveal } from "@/components/site/reveal";

const DURATIONS: Duration[] = ["HALF DAY", "FULL DAY"];
const INTERESTS: Interest[] = ["TEA", "FOREST", "LAKE", "PHOTOS"];

/** Route planner (PRD section 19) - "BUILD YOUR DAY" demo interaction. */
export function RoutePlanner() {
  const [duration, setDuration] = useState<Duration>("FULL DAY");
  const [interests, setInterests] = useState<Interest[]>(["TEA", "PHOTOS"]);
  const [submitted, setSubmitted] = useState(false);
  const openBooking = useBookingStore((s) => s.openBooking);

  const route = useMemo(() => planRoute(duration, interests), [duration, interests]);

  const toggleInterest = (i: Interest) => {
    setSubmitted(false);
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  const generate = () => {
    setSubmitted(true);
    track("start_booking", { source: "route_planner", duration, interests });
  };

  const bookThisRoute = () => {
    track("click_booking", { source: "route_planner" });
    openBooking({
      presetMessage: `Hi Red Scooty! I want to ride this route: ${route.stops
        .map((s) => s.stop)
        .join(" -> ")}. (${duration.toLowerCase()})`,
    });
  };

  return (
    <section
      id="build-your-day"
      aria-labelledby="planner-heading"
      className="border-y-2 border-ink bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">TRIP PLANNER</p>
          <h2
            id="planner-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            BUILD YOUR DAY.
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Two taps and you have a sample route. Ride it as-is or mix it up -
            we&apos;ll confirm the details when you book.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <Reveal>
            <div className="border-2 border-ink bg-paper p-6 shadow-hard">
              <fieldset>
                <legend className="label-micro text-steel">01 · HOW LONG</legend>
                <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Duration">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={duration === d}
                      onClick={() => {
                        setDuration(d);
                        setSubmitted(false);
                      }}
                      className={`h-14 border-2 border-ink font-display text-2xl tracking-wider transition-all ${
                        duration === d
                          ? "bg-brand text-white shadow-hard-sm"
                          : "bg-cream text-ink hover:bg-cream hover:shadow-hard-sm"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className="label-micro text-steel">
                  02 · WHAT DO YOU WANT TO SEE
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {INTERESTS.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleInterest(i)}
                        className={`h-12 border-2 border-ink px-5 font-display text-xl tracking-wider transition-all ${
                          active
                            ? "bg-ink text-cream shadow-hard-sm"
                            : "bg-cream text-ink hover:bg-cream hover:shadow-hard-sm"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={generate}
                  className="h-14 flex-1 rounded-none border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream shadow-hard transition-all hover:-translate-y-0.5 hover:bg-brand hover:shadow-hard-red"
                >
                  GENERATE MY ROUTE <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDuration("FULL DAY");
                    setInterests(["TEA", "PHOTOS"]);
                    setSubmitted(false);
                  }}
                  className="h-14 rounded-none border-2 border-ink bg-cream px-4 text-ink hover:bg-cream hover:text-brand"
                  aria-label="Reset planner selections"
                >
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.1}>
            <div
              className="flex h-full flex-col border-2 border-ink bg-ink p-6 text-cream shadow-hard-red"
              aria-live="polite"
            >
              {!submitted ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <ArrowDown className="h-8 w-8 text-brand" aria-hidden="true" />
                  <p className="mt-6 max-w-xs font-display text-3xl leading-tight tracking-wide text-cream/80">
                    PICK YOUR DAY AND HIT GENERATE.
                  </p>
                  <p className="label-micro mt-3 text-cream/50">
                    SAMPLE ROUTE · SAMPLE TIMING · RIDE IT YOUR WAY
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-4xl tracking-wide text-brand">
                    {route.title}
                  </h3>
                  <ol className="mt-6 flex-1 space-y-0">
                    {route.stops.map((s, i) => (
                      <li key={`${s.stop}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
                        {/* connector */}
                        {i < route.stops.length - 1 ? (
                          <span
                            className="absolute left-[7px] top-5 h-full w-0.5 bg-cream/25"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={`mt-1.5 h-3.5 w-3.5 shrink-0 border-2 border-cream ${
                            i === route.stops.length - 1 ? "bg-brand" : "bg-cream"
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="label-micro text-brand">{s.time}</p>
                          <p className="font-display text-2xl leading-tight tracking-wide">
                            {s.stop}
                          </p>
                          <p className="mt-0.5 text-sm text-cream/70">{s.note}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 border-t-2 border-cream/25 pt-6">
                    <p className="font-display text-3xl tracking-wide">
                      NEED A SCOOTY FOR THIS ROUTE?
                    </p>
                    <Button
                      onClick={bookThisRoute}
                      className="mt-4 h-14 w-full rounded-none border-2 border-cream bg-brand font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard"
                    >
                      BOOK A RIDE <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
