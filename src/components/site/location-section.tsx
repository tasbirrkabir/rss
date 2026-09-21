import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { SITE, mapsQueryUrl } from "@/data/site";
import { TrackedLink } from "@/components/site/tracked-link";
import { Reveal } from "@/components/site/reveal";

/** Location + contact (PRD sections 14 / 48) - "FIND RED SCOOTY." */
export function LocationSection() {
  return (
    <section
      id="contact"
      aria-labelledby="location-heading"
      className="border-t-2 border-ink py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-micro text-brand">LOCATION &amp; CONTACT</p>
          <h2
            id="location-heading"
            className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-ink"
          >
            FIND RED SCOOTY.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact card */}
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 border-2 border-ink bg-paper p-6 shadow-hard sm:p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="label-micro text-steel">ADDRESS</p>
                    <p className="mt-1 font-display text-2xl leading-tight tracking-wide text-ink">
                      {SITE.addressLine1}
                    </p>
                    <p className="text-sm text-ink-soft">{SITE.addressLine2}</p>
                    <p className="label-micro mt-2 text-steel">
                      PLUS CODE · {SITE.plusCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="label-micro text-steel">PHONE</p>
                    <TrackedLink
                      event="click_call"
                      source="contact_section"
                      href={SITE.telUrl}
                      className="mt-1 block font-display text-3xl tracking-wide text-ink underline-offset-4 hover:text-brand hover:underline"
                    >
                      {SITE.phoneDisplay}
                    </TrackedLink>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="label-micro text-steel">EMAIL</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 block break-all text-sm font-semibold text-ink underline-offset-4 hover:text-brand hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="label-micro text-steel">HOURS</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      Message us any time - every booking is confirmed
                      personally. Opening hours are finalized with the owner
                      before launch.
                    </p>
                  </div>
                </div>
              </div>

              <TrackedLink
                event="get_directions"
                source="contact_section"
                href={SITE.mapsUrl}
                external
                className="inline-flex h-14 items-center justify-center gap-2 border-2 border-ink bg-ink font-display text-2xl tracking-wider text-cream shadow-hard-sm transition-all hover:bg-brand hover:shadow-hard-red"
              >
                <Navigation className="h-5 w-5" aria-hidden="true" />
                GET DIRECTIONS
              </TrackedLink>
            </div>
          </Reveal>

          {/* Stylized map card */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full min-h-80 flex-col justify-between overflow-hidden border-2 border-ink bg-leaf p-6 text-cream shadow-hard sm:p-8">
              {/* decorative tea rows */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-35deg, transparent 0 38px, #f4f1ea 38px 40px)",
                }}
              />
              <div className="relative">
                <p className="label-micro text-cream/70">GOOGLE MAPS · PLUS CODE</p>
                <p className="mt-2 font-display text-6xl leading-none tracking-wide text-cream sm:text-7xl">
                  8P3M+JMQ
                </p>
                <p className="mt-3 max-w-xs text-sm text-cream/85">
                  Jalalia Road, Sreemangal - the tea capital of Bangladesh.
                  Easy to find, easy to start.
                </p>
              </div>
              <div className="relative mt-10">
                <TrackedLink
                  event="get_directions"
                  source="map_card"
                  href={mapsQueryUrl("Red Scooty Sreemangal Jalalia Road")}
                  external
                  className="inline-flex h-14 w-full items-center justify-center gap-2 border-2 border-cream bg-brand font-display text-2xl tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-hard"
                >
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  OPEN IN GOOGLE MAPS
                </TrackedLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
