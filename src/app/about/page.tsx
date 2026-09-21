import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Clock,
  Facebook,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About — We're Not Just Renting Scooties | Red Scooty Sreemangal",
  description:
    "Red Scooty exists to make Sreemangal easier to explore - independently, on two wheels, through the tea capital of Bangladesh. Confirmed personally, every time.",
};

/**
 * Qualitative growth band - deliberately date-free and claim-free
 * (honesty rules: no invented founder story, history or milestones).
 */
const TIMELINE: { label: string; text: string }[] = [
  {
    label: "STARTED",
    text: "A few scooties on Jalalia Road and one simple idea: explore Sreemangal your own way.",
  },
  {
    label: "GROWING",
    text: "More riders heard about us - travellers, tea lovers and weekend explorers.",
  },
  {
    label: "MORE RIDES",
    text: "Half-day loops, forest escapes, sunset runs - the ride ideas keep getting better.",
  },
  {
    label: "MORE EXPLORATION",
    text: "The map keeps opening up. We keep you moving through it.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="ABOUT RED SCOOTY"
          title={
            <>
              WE&apos;RE NOT JUST
              <br />
              RENTING <span className="text-brand">SCOOTIES.</span>
            </>
          }
          intro="A shop on Jalalia Road and one job: helping you explore the tea capital of Bangladesh on your own schedule."
        />

        {/* Story */}
        <section aria-labelledby="story-heading" className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <p className="label-micro text-brand">THE MISSION</p>
                <h2
                  id="story-heading"
                  className="mt-2 font-display text-[clamp(40px,5.5vw,76px)] leading-[0.95] text-ink"
                >
                  MAKING SREEMANGAL EASIER TO EXPLORE —{" "}
                  <span className="text-brand">INDEPENDENTLY.</span>
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
                  <p>
                    Sreemangal rewards the unhurried: tea rows that change
                    colour with the light, forest roads with gibbons overhead,
                    wetlands at golden hour. Buses and CNGs get you between the
                    big points - they don&apos;t let you stop when the view
                    does.
                  </p>
                  <p>
                    Red Scooty exists for that gap. A scooty turns the area
                    into your own route: start when you want, stop where you
                    like, take the small road. We keep the rental part simple
                    so the exploring part is yours.
                  </p>
                  <p>
                    No booking engines, no card details, no automated
                    confirmations. Every request is read and answered by a
                    person who knows these roads - that&apos;s the whole model.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="lg:col-span-5">
                <div className="relative pt-6">
                  <div className="rotate-2 border-2 border-ink bg-paper p-3 shadow-hard-lg transition-transform duration-300 hover:rotate-0">
                    <Image
                      src="/images/about-shop.png"
                      alt="Red scooters parked outside the Red Scooty shop on Jalalia Road, Sreemangal"
                      width={1344}
                      height={768}
                      className="h-auto w-full border-2 border-ink"
                    />
                    <p className="label-micro mt-3 flex items-center justify-between text-steel">
                      <span>THE SHOP</span>
                      <span>RED SCOOTY</span>
                    </p>
                  </div>
                  <p className="absolute -top-1 left-4 -rotate-3 border-2 border-ink bg-brand px-3 py-1.5 font-display text-lg tracking-wider text-white shadow-hard-sm">
                    JALALIA ROAD / SREEMANGAL
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Verified facts + stats */}
        <section
          aria-labelledby="facts-heading"
          className="border-t-2 border-ink py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">STRAIGHT FACTS</p>
              <h2
                id="facts-heading"
                className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
              >
                WHAT WE KNOW FOR SURE.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* Verified facts card */}
              <Reveal>
                <div className="h-full border-2 border-ink bg-paper p-6 shadow-hard sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="label-micro text-steel">CONTACT &amp; IDENTITY</p>
                    <span className="label-micro inline-flex items-center gap-1 text-ink">
                      <BadgeCheck
                        className="h-4 w-4 text-brand"
                        aria-hidden="true"
                      />
                      VERIFIED
                    </span>
                  </div>
                  <ul className="mt-6 space-y-5">
                    <li className="flex items-start gap-4">
                      <Phone
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="label-micro text-steel">PHONE</p>
                        <TrackedLink
                          event="click_call"
                          source="about_facts"
                          href={SITE.telUrl}
                          className="mt-0.5 block font-display text-2xl tracking-wide text-ink underline-offset-4 hover:text-brand hover:underline"
                        >
                          {SITE.phoneDisplay}
                        </TrackedLink>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <MapPin
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="label-micro text-steel">ADDRESS</p>
                        <p className="mt-0.5 font-display text-xl leading-tight tracking-wide text-ink">
                          {SITE.addressLine1}
                        </p>
                        <p className="text-sm text-ink-soft">
                          {SITE.addressLine2}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Facebook
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="label-micro text-steel">FACEBOOK</p>
                        <TrackedLink
                          event="click_facebook"
                          source="about_facts"
                          href={SITE.facebook}
                          external
                          className="mt-0.5 block font-display text-xl tracking-wide text-ink underline-offset-4 hover:text-brand hover:underline"
                        >
                          Red Scooty Sreemangal
                        </TrackedLink>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Bike
                        className="mt-1 h-5 w-5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="label-micro text-steel">CATEGORY</p>
                        <p className="mt-0.5 font-display text-xl tracking-wide text-ink">
                          {SITE.stats.category}
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-7 border-t-2 border-dashed border-steel/50 pt-5">
                    <p className="label-micro text-steel">NOT YET VERIFIED</p>
                    <ul className="mt-4 space-y-4">
                      <li className="flex items-start gap-4">
                        <MessageCircle
                          className="mt-1 h-5 w-5 shrink-0 text-steel"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="label-micro text-steel">
                            WHATSAPP <DemoBadge className="ml-1" />
                          </p>
                          <p className="mt-0.5 text-sm text-ink-soft">
                            Same number as the phone line - to be confirmed
                            with the owner.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <Clock
                          className="mt-1 h-5 w-5 shrink-0 text-steel"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="label-micro text-steel">
                            OPENING HOURS <DemoBadge className="ml-1" />
                          </p>
                          <p className="mt-0.5 text-sm text-ink-soft">
                            Message any time - hours to be confirmed.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Stats strip */}
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-between border-2 border-ink bg-ink p-6 text-cream shadow-hard sm:p-8">
                  <div>
                    <p className="label-micro text-brand">BY THE NUMBERS</p>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-wide text-cream">
                      FROM THE FACEBOOK PAGE.
                    </h3>
                    <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div className="border-2 border-cream/30 p-4">
                        <dt className="label-micro text-cream/60">
                          FACEBOOK FOLLOWERS
                        </dt>
                        <dd className="mt-1 font-display text-4xl tracking-wide text-cream">
                          {SITE.stats.followers}
                        </dd>
                      </div>
                      <div className="border-2 border-cream/30 p-4">
                        <dt className="label-micro text-cream/60">POSTS</dt>
                        <dd className="mt-1 font-display text-4xl tracking-wide text-cream">
                          {SITE.stats.posts}
                        </dd>
                      </div>
                      <div className="border-2 border-cream/30 p-4">
                        <dt className="label-micro text-cream/60">HOME BASE</dt>
                        <dd className="mt-1 font-display text-4xl tracking-wide text-cream">
                          SMG
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <p className="label-micro mt-8 text-cream/60">
                    SCREENSHOT-SOURCED NUMBERS — NEVER INFLATED.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Timeline (qualitative, no dates) */}
        <section
          aria-labelledby="timeline-heading"
          className="border-y-2 border-ink bg-cream py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">HOW IT&apos;S GOING</p>
              <h2
                id="timeline-heading"
                className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
              >
                NO DATES. JUST DIRECTION.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-steel">
                A rough map of the journey so far - told honestly, without
                invented milestones.
              </p>
            </Reveal>

            <ol className="mt-10 flex flex-col lg:flex-row lg:items-center">
              {TIMELINE.map((step, i) => (
                <li
                  key={step.label}
                  className="flex flex-col lg:flex-1 lg:flex-row lg:items-center"
                >
                  <Reveal delay={i * 0.08} className="lg:flex-1">
                    <div className="h-full border-2 border-ink bg-paper p-5 shadow-hard-sm">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-ink font-display text-xl tracking-wide text-cream"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-2xl tracking-wide text-ink">
                          {step.label}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                  {i < TIMELINE.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className="flex justify-center py-2 lg:px-2 lg:py-0"
                    >
                      <ArrowRight className="h-6 w-6 shrink-0 text-brand" />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quote + local identity */}
        <section aria-labelledby="quote-heading" className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <figure className="border-2 border-ink bg-cream p-6 shadow-hard sm:p-10">
                <p className="label-micro text-brand">LOCAL KNOWLEDGE</p>
                <blockquote
                  id="quote-heading"
                  className="mt-3 font-display text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-wide text-ink"
                >
                  &ldquo;SREEMANGAL IS NOT A PLACE TO RUSH THROUGH.&rdquo;
                </blockquote>
                <figcaption className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                  This is the tea capital of Bangladesh. The flavour is in the
                  slowness: seven-layer tea, gardens that roll to the horizon,
                  roads where the traffic is mostly a passing cycle van. Rush
                  through and you get a photo; ride through at scooty pace and
                  you get the place.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* CTA band */}
        <section
          aria-labelledby="cta-heading"
          className="border-t-2 border-ink bg-ink py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">READY WHEN YOU ARE</p>
              <h2
                id="cta-heading"
                className="mt-3 font-display text-[clamp(48px,7.5vw,110px)] leading-[0.9] text-cream"
              >
                YOUR SCOOTY IS WAITING.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-cream/80">
                Send a request - we confirm personally. Or keep exploring
                first; the scooties aren&apos;t going anywhere.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex h-14 items-center justify-center gap-2 border-2 border-cream bg-brand px-8 font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard"
                >
                  BOOK A RIDE
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex h-14 items-center justify-center gap-2 border-2 border-cream bg-transparent px-8 font-display text-2xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-ink"
                >
                  EXPLORE SREEMANGAL
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
