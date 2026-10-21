import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  FileText,
  MessageCircle,
  NotebookPen,
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
import { RideStatus } from "@/components/book/ride-status";
import { BookingForm } from "@/components/book/booking-form";
import { getPublicScooties, getSiteConfig } from "@/lib/cms";
import { whatsappUrl } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Book a Scooty — Request Your Ride | Demo Scooty Rental",
  description:
    "Request a scooty for your Sreemangal ride - pick a date, duration and pickup point. Demo Scooty confirms personally. No online payment, no account needed.",
};

const GOOD_TO_KNOW: {
  icon: LucideIcon;
  title: string;
  text: string;
  demo?: boolean;
}[] = [
  {
    icon: NotebookPen,
    title: "BOOKING BY REQUEST",
    text: "No account, no prepayment. Send the form and we reply personally with availability and the rate.",
  },
  {
    icon: CheckCircle2,
    title: "CONFIRMED PERSONALLY",
    text: "A human checks every request - nothing is automated and nothing is promised before we reply.",
  },
  {
    icon: Banknote,
    title: "NO ONLINE PAYMENT",
    text: "You pay in person when you collect the scooty. Nothing is charged online.",
  },
  {
    icon: FileText,
    title: "DEPOSIT & DOCUMENTS",
    text: "Details to be confirmed.",
    demo: true,
  },
];

const HELPFUL_LINKS: { label: string; href: string }[] = [
  { label: "RENTAL GUIDE", href: "/rental-guide" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "CONTACT", href: "/contact" },
];

export default async function BookPage() {
  const [scooties, config] = await Promise.all([getPublicScooties(), getSiteConfig()]);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="BOOK A RIDE"
          title={
            <>
              LET&apos;S GET
              <br />
              YOU MOVING.
            </>
          }
          intro="Send your date and duration. Demo Scooty confirms personally - no payment online, no account needed."
        />

        <RideStatus />

        <section
          aria-labelledby="booking-heading"
          className="py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Form column */}
              <div className="lg:col-span-8">
                <Reveal>
                  <h2
                    id="booking-heading"
                    className="display-1 text-ink"
                  >
                    SEND A REQUEST.
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                    Two minutes now saves a day of guessing. We reply with
                    availability, the rate and pickup details - usually fastest
                    on WhatsApp.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="card-soft mt-8 overflow-hidden">
                    <div className="bg-ink px-6 py-3">
                      <p className="label-micro text-cream">
                        BOOKING REQUEST · NO PAYMENT ONLINE
                      </p>
                    </div>
                    <Suspense fallback={null}>
                      <BookingForm vehicles={scooties} />
                    </Suspense>
                  </div>
                </Reveal>

                <p className="label-micro mt-4 text-center text-steel">
                  BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO ONLINE PAYMENT
                  REQUIRED
                </p>
              </div>

              {/* Right rail */}
              <aside
                aria-label="Good to know and direct contact"
                className="space-y-8 lg:col-span-4"
              >
                <Reveal>
                  <div className="card-soft p-6 sm:p-8">
                    <p className="label-micro text-brand">GOOD TO KNOW</p>
                    <h3 className="display-3 mt-2 text-ink">
                      HOW BOOKING WORKS.
                    </h3>
                    <ul className="mt-6 space-y-5">
                      {GOOD_TO_KNOW.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.title} className="flex gap-3">
                            <Icon
                              className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                              aria-hidden="true"
                            />
                            <div>
                              <p className="font-display text-xl tracking-wide text-ink">
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                                {item.text} {item.demo ? <DemoBadge /> : null}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-7 border-t border-ink/10 pt-5">
                      <p className="label-micro text-steel">KEEP READING</p>
                      <nav
                        aria-label="Helpful pages"
                        className="mt-3 space-y-2"
                      >
                        {HELPFUL_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group flex min-h-11 items-center justify-between border border-ink/15 bg-paper px-4 py-2.5 font-display text-lg tracking-wide text-ink transition-all hover:border-ink/40 hover:bg-cream"
                          >
                            {link.label}
                            <ArrowRight
                              className="h-5 w-5 text-brand transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="band-ink p-6 sm:p-8">
                    <p className="label-micro text-cream/60">PREFER TO TALK?</p>
                    <h3 className="display-3 mt-2 text-cream">
                      CALL OR MESSAGE US DIRECTLY.
                    </h3>
                    <p className="mt-2 text-sm text-cream/80">
                      Skip the form - quick questions get quick answers.
                    </p>
                    <div className="mt-6 space-y-3">
                      <TrackedLink
                        event="click_call"
                        source="book_rail"
                        href={config.telUrl}
                        className="btn-base btn-cream w-full"
                      >
                        <Phone className="h-5 w-5" aria-hidden="true" />
                        CALL {config.phoneDisplay}
                      </TrackedLink>
                      <TrackedLink
                        event="click_whatsapp"
                        source="book_rail"
                        href={whatsappUrl(config.whatsappNumber, 
                          "Hi Demo Scooty! I have a question about renting a demo scooty in Sreemangal.",
                        )}
                        external
                        className="btn-base btn-red w-full"
                      >
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        WHATSAPP US
                      </TrackedLink>
                    </div>
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
