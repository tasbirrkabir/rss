import type { Metadata } from "next";
import {
  Clock,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { QuickMessageForm } from "@/components/contact/quick-message-form";
import { SITE, mapsQueryUrl, whatsappMessageUrl } from "@/data/site";
import type { AnalyticsEvent } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Contact — Talk to a Human | Red Scooty Sreemangal",
  description:
    "Call, WhatsApp, Facebook, email or visit Red Scooty in Sreemangal. Every booking is confirmed by a person - no bots, no booking engine.",
};

type MethodCardProps = {
  icon: LucideIcon;
  label: string;
  detail: string;
  note: string;
  href?: string;
  event?: AnalyticsEvent;
  external?: boolean;
  demo?: boolean;
};

function MethodCard({
  icon: Icon,
  label,
  detail,
  note,
  href,
  event,
  external = false,
  demo = false,
}: MethodCardProps) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <Icon className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
        {demo ? <DemoBadge /> : null}
      </div>
      <p className="label-micro mt-5 text-steel">{label}</p>
      <p className="mt-1 break-words font-display text-2xl leading-tight tracking-wide text-ink">
        {detail}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{note}</p>
    </>
  );
  const cardClass =
    "flex h-full flex-col border-2 border-ink bg-paper p-6 shadow-hard-sm transition-all hover:-translate-y-1 hover:shadow-hard";

  if (href && event) {
    return (
      <TrackedLink
        event={event}
        source="contact_page"
        href={href}
        external={external}
        className={cardClass}
      >
        {inner}
      </TrackedLink>
    );
  }
  if (href) {
    return (
      <a href={href} className={cardClass}>
        {inner}
      </a>
    );
  }
  return <div className={cardClass}>{inner}</div>;
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="CONTACT"
          title={
            <>
              TALK TO
              <br />
              A HUMAN.
            </>
          }
          intro="Every booking is confirmed by a person, not a bot. Call, message or drop by the shop on Jalalia Road - pick whichever is easiest for you."
        />

        {/* Contact method cards */}
        <section
          aria-labelledby="methods-heading"
          className="py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">DIRECT LINES</p>
              <h2
                id="methods-heading"
                className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
              >
                HOW TO REACH US.
              </h2>
              <p className="mt-4 max-w-2xl text-base text-ink-soft">
                Six ways in - all of them end with a real person reading your
                message. WhatsApp is usually fastest.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <MethodCard
                icon={Phone}
                label="CALL"
                detail={SITE.phoneDisplay}
                note="Direct line - quick questions get quick answers."
                href={SITE.telUrl}
                event="click_call"
              />
              <MethodCard
                icon={MessageCircle}
                label="WHATSAPP"
                detail={SITE.phoneDisplay}
                note="Message any time - we reply personally between rides."
                href={whatsappMessageUrl(
                  "Hi Red Scooty! I'd like to ask about renting a scooty in Sreemangal.",
                )}
                event="click_whatsapp"
                external
                demo
              />
              <MethodCard
                icon={Facebook}
                label="FACEBOOK"
                detail="Red Scooty Sreemangal"
                note="Fastest reply - message the page and we'll get back to you."
                href={SITE.facebook}
                event="click_facebook"
                external
              />
              <MethodCard
                icon={Mail}
                label="EMAIL"
                detail={SITE.email}
                note="For bookings and general questions - we read everything."
                href={`mailto:${SITE.email}`}
              />
              <MethodCard
                icon={MapPin}
                label="GOOGLE MAPS"
                detail="GET DIRECTIONS"
                note="Find us on Jalalia Road - the tea capital is easy to navigate."
                href={SITE.mapsUrl}
                event="get_directions"
                external
              />
              <MethodCard
                icon={Clock}
                label="HOURS"
                detail="MESSAGE ANY TIME"
                note="Opening hours to be confirmed - message us and we'll sort pickup times together."
                demo
              />
            </div>
          </div>
        </section>

        {/* Address + stylized map panel */}
        <section
          aria-labelledby="find-us-heading"
          className="border-t-2 border-ink py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">FIND THE SHOP</p>
              <h2
                id="find-us-heading"
                className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
              >
                COME SAY HI.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col justify-between gap-8 border-2 border-ink bg-paper p-6 shadow-hard sm:p-8">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="mt-1 h-6 w-6 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="label-micro text-steel">ADDRESS</p>
                      <p className="mt-1 font-display text-2xl leading-tight tracking-wide text-ink">
                        {SITE.addressLine1}
                      </p>
                      <p className="text-sm text-ink-soft">
                        {SITE.addressLine2}
                      </p>
                      <p className="label-micro mt-2 text-steel">
                        PLUS CODE · {SITE.plusCode}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    Drop by to see the scooties in person - or send a request
                    first and we&apos;ll have everything ready when you arrive.
                  </p>
                </div>
              </Reveal>

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
                    <p className="label-micro text-cream/70">
                      GOOGLE MAPS · PLUS CODE
                    </p>
                    <p className="mt-2 font-display text-6xl leading-none tracking-wide text-cream sm:text-7xl">
                      {SITE.plusCode}
                    </p>
                    <p className="mt-3 max-w-xs text-sm text-cream/85">
                      Jalalia Road, Sreemangal - the tea capital of Bangladesh.
                      Easy to find, easy to start.
                    </p>
                  </div>
                  <div className="relative mt-10">
                    <TrackedLink
                      event="get_directions"
                      source="contact_map"
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

        {/* Quick message form */}
        <section
          aria-labelledby="quick-message-heading"
          className="border-t-2 border-ink bg-cream py-14 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="label-micro text-brand">QUICK MESSAGE</p>
                <h2
                  id="quick-message-heading"
                  className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] text-ink"
                >
                  SEND A NOTE.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                  Name, phone, one line about what you need - that&apos;s the
                  whole form. It lands in the same inbox as every booking
                  request, and a person replies.
                </p>
                <p className="label-micro mt-6 text-steel">
                  NO ACCOUNT · NO PAYMENT · NO AUTOREPLIES
                </p>
              </Reveal>
              <div className="lg:col-span-7">
                <QuickMessageForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
