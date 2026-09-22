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
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { TrackedLink } from "@/components/site/tracked-link";
import { QuickMessageForm } from "@/components/contact/quick-message-form";
import { LazySreemangalMap } from "@/components/map/lazy-map";
import { getSiteConfig } from "@/lib/cms";
import { whatsappUrl } from "@/lib/public-content";
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
    "card-soft flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift";

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

export default async function ContactPage() {
  const config = await getSiteConfig();
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
          className="py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">DIRECT LINES</p>
              <h2
                id="methods-heading"
                className="display-1 mt-2 text-ink"
              >
                HOW TO REACH US.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                Six ways in - all of them end with a real person reading your
                message. WhatsApp is usually fastest.
              </p>
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StaggerItem className="h-full">
                <MethodCard
                  icon={Phone}
                  label="CALL"
                  detail={config.phoneDisplay}
                  note="Direct line - quick questions get quick answers."
                  href={config.telUrl}
                  event="click_call"
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <MethodCard
                  icon={MessageCircle}
                  label="WHATSAPP"
                  detail={config.phoneDisplay}
                  note="Message any time - we reply personally between rides."
                  href={whatsappUrl(config.whatsappNumber, 
                    "Hi Red Scooty! I'd like to ask about renting a scooty in Sreemangal.",
                  )}
                  event="click_whatsapp"
                  external
                  demo
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <MethodCard
                  icon={Facebook}
                  label="FACEBOOK"
                  detail="Red Scooty Sreemangal"
                  note="Fastest reply - message the page and we'll get back to you."
                  href={config.facebook}
                  event="click_facebook"
                  external
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <MethodCard
                  icon={Mail}
                  label="EMAIL"
                  detail={config.email}
                  note="For bookings and general questions - we read everything."
                  href={`mailto:${config.email}`}
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <MethodCard
                  icon={MapPin}
                  label="GOOGLE MAPS"
                  detail="GET DIRECTIONS"
                  note="Verified listing - find us on Jalalia Road, the tea capital is easy to navigate."
                  href={config.mapsUrl}
                  event="get_directions"
                  external
                />
              </StaggerItem>
              <StaggerItem className="h-full">
                <MethodCard
                  icon={Clock}
                  label="HOURS"
                  detail="MESSAGE ANY TIME"
                  note="Opening hours to be confirmed - message us and we'll sort pickup times together."
                  demo
                />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Address + embedded map panel */}
        <section
          aria-labelledby="find-us-heading"
          className="rule-soft py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="label-micro text-brand">FIND THE SHOP</p>
              <h2
                id="find-us-heading"
                className="display-1 mt-2 text-ink"
              >
                COME SAY HI.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <Reveal className="h-full">
                <div className="card-soft flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="mt-1 h-6 w-6 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="label-micro text-steel">ADDRESS</p>
                      <p className="mt-1 font-display text-2xl leading-tight tracking-wide text-ink">
                        {config.addressLine1}
                      </p>
                      <p className="text-sm text-ink-soft">
                        {config.addressLine2}
                      </p>
                      <p className="label-micro mt-2 text-steel">
                        PLUS CODE · {config.plusCode}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    Drop by to see the scooties in person - or send a request
                    first and we&apos;ll have everything ready when you arrive.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="h-full">
                <div className="img-frame flex h-full flex-col">
                  <div className="relative h-[340px] shrink-0 overflow-hidden sm:h-[420px]">
                    <LazySreemangalMap />
                  </div>
                  <div className="flex flex-col gap-4 border-t border-ink/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                      <p className="label-micro text-steel">VERIFIED LISTING · PLUS CODE {config.plusCode}</p>
                      <p className="mt-1 text-sm text-ink-soft">
                        Jalalia Road, Sreemangal - the tea capital of Bangladesh.
                      </p>
                    </div>
                    <TrackedLink
                      event="get_directions"
                      source="contact_map"
                      href={config.mapsUrl}
                      external
                      className="btn-base btn-red group shrink-0"
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
          className="rule-soft bg-cream py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="label-micro text-brand">QUICK MESSAGE</p>
                <h2
                  id="quick-message-heading"
                  className="display-1 mt-2 text-ink"
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
