import {
  HandCoins,
  IdCard,
  ScrollText,
  ShieldCheck,
  Undo2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

type GuideSection = {
  n: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  points: string[];
};

/**
 * Framing only — no rental policy is invented. Every card phrased as
 * "what to expect" and closed with a demo badge.
 */
const SECTIONS: GuideSection[] = [
  {
    n: "01",
    title: "REQUIREMENTS",
    icon: IdCard,
    intro: "The basics you bring to the table.",
    points: [
      "A valid driving licence — bring it on pickup day",
      "A refundable deposit expectation — set when your booking is confirmed",
      "Basic scooty confidence — tea-garden roads are beginner-friendly",
    ],
  },
  {
    n: "02",
    title: "RENTAL RULES",
    icon: ScrollText,
    intro: "Few rules, clearly agreed.",
    points: [
      "Fair use of the scooty for the hours you book",
      "A return time agreed at pickup — and kept",
      "Anything unusual? Ask before the ride, not after",
    ],
  },
  {
    n: "03",
    title: "DEPOSIT",
    icon: HandCoins,
    intro: "How the deposit conversation goes.",
    points: [
      "A refundable deposit is expected — the amount is only confirmed after booking",
      "Returned when the scooty comes back the way it left",
      "Nothing is paid online — everything settles in person",
    ],
  },
  {
    n: "04",
    title: "SAFETY",
    icon: ShieldCheck,
    intro: "Ride like the roads are new to you.",
    points: [
      "Helmet expected on every ride — ask about sizes when booking",
      "Tea-garden lanes are gentle; the forest highway is busier",
      "Weather turns fast — check the sky before long routes",
      "Save Red Scooty's number before you set off",
    ],
  },
  {
    n: "05",
    title: "DAMAGE POLICY",
    icon: Wrench,
    intro: "Honest in, honest out.",
    points: [
      "Report anything that happens — small or not",
      "Damage is assessed together at return, in person",
      "Expect a fair conversation — not a surprise",
    ],
  },
  {
    n: "06",
    title: "RETURN POLICY",
    icon: Undo2,
    intro: "Ending the ride the easy way.",
    points: [
      "Agree the return time at pickup",
      "Running late? Message before the clock runs out",
      "Hand back what you left with — keys, helmet, the scooty",
    ],
  },
];

/**
 * /rental-guide — six numbered bordered cards (sm:grid-cols-2), each with a
 * lucide icon, "what to expect" bullets and a DEMO badge. No invented policy.
 */
export function GuideSections() {
  return (
    <section
      aria-labelledby="guide-sections-heading"
      className="bg-cream py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">THE GUIDE</p>
          <h2
            id="guide-sections-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            SIX THINGS. <span className="text-outline">NO FINE PRINT.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
            Everything below is what to expect — the exact details are
            confirmed personally when your booking is confirmed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={(i % 2) * 0.08} className="h-full">
                <article
                  aria-labelledby={`guide-${s.n}-title`}
                  className="flex h-full flex-col border-2 border-ink bg-paper p-6 shadow-hard sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-brand text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl leading-none text-outline"
                    >
                      {s.n}
                    </span>
                  </div>
                  <h3
                    id={`guide-${s.n}-title`}
                    className="mt-5 font-display text-3xl tracking-wide text-ink sm:text-4xl"
                  >
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-steel">{s.intro}</p>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                      >
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 bg-brand"
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t-2 border-dashed border-steel/40 pt-4">
                    <DemoBadge>DETAILS TO BE CONFIRMED</DemoBadge>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
