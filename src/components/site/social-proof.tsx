import Image from "next/image";
import { Facebook, Instagram, MapPin, ShieldCheck } from "lucide-react";

import { SITE } from "@/data/site";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

/**
 * Social proof (PRD section 21) - "RIDERS HAVE BEEN HERE."
 * Honesty rule: only screenshot-sourced numbers. No invented reviews,
 * ratings or quotes. Customer media replaces demo imagery after owner approval.
 */
export function SocialProof() {
  return (
    <section
      id="riders"
      aria-labelledby="proof-heading"
      className="border-y-2 border-ink bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="-rotate-1 border-2 border-ink bg-paper shadow-hard-lg">
                <Image
                  src="/images/rider-road.png"
                  alt="Rider on a red scooty following a quiet road through Sreemangal's tea plantations"
                  width={1344}
                  height={768}
                  sizes="(min-width: 1024px) 48vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-4 rotate-2 border-2 border-ink bg-ink px-4 py-3 shadow-hard-red">
                <p className="label-micro text-cream">FOLLOW THE RIDES</p>
                <p className="font-display text-2xl leading-none text-brand">
                  @REDSCOOTYSMG
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="label-micro text-brand">SOCIAL PROOF</p>
              <h2
                id="proof-heading"
                className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
              >
                RIDERS HAVE
                <br />
                BEEN HERE.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                <div className="border-2 border-ink bg-paper p-4 shadow-hard-sm">
                  <dt className="label-micro text-steel">FACEBOOK</dt>
                  <dd className="mt-1 font-display text-4xl leading-none text-ink">
                    {SITE.stats.followers}
                  </dd>
                  <dd className="label-micro mt-1 text-brand">FOLLOWERS</dd>
                </div>
                <div className="border-2 border-ink bg-paper p-4 shadow-hard-sm">
                  <dt className="label-micro text-steel">PAGE</dt>
                  <dd className="mt-1 font-display text-4xl leading-none text-ink">
                    {SITE.stats.posts}
                  </dd>
                  <dd className="label-micro mt-1 text-brand">POSTS</dd>
                </div>
                <div className="border-2 border-ink bg-paper p-4 shadow-hard-sm">
                  <dt className="label-micro text-steel">BASE</dt>
                  <dd className="mt-1 font-display text-4xl leading-none text-ink">
                    SMG
                  </dd>
                  <dd className="label-micro mt-1 text-brand">JALALIA ROAD</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  event="click_facebook"
                  source="social_proof"
                  href={SITE.facebook}
                  external
                  className="inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink px-6 font-display text-2xl tracking-wider text-cream shadow-hard transition-all hover:-translate-y-0.5 hover:bg-brand hover:shadow-hard-red"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                  SEE THE PAGE
                </TrackedLink>
                <TrackedLink
                  event="get_directions"
                  source="social_proof"
                  href={SITE.mapsUrl}
                  external
                  className="inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-cream px-6 font-display text-2xl tracking-wider text-ink shadow-hard-sm transition-all hover:-translate-y-0.5 hover:text-brand hover:shadow-hard"
                >
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  FIND US ON GOOGLE
                </TrackedLink>
                <TrackedLink
                  event="click_instagram"
                  source="social_proof"
                  href={SITE.instagram}
                  external
                  className="inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-cream px-6 font-display text-2xl tracking-wider text-ink shadow-hard-sm transition-all hover:-translate-y-0.5 hover:text-brand hover:shadow-hard"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Instagram</span>REELS
                </TrackedLink>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 flex items-start gap-2 text-sm text-steel">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                Demo imagery shown. Real rider photos and Google reviews are
                added with the owner&apos;s approval before launch.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
