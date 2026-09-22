import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Facebook, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";

import { LEGAL_LINKS } from "@/data/nav";
import { SITE, whatsappMessageUrl } from "@/data/site";
import { TrackedLink } from "@/components/site/tracked-link";

/** Page-level links only — no in-page anchors in the footer. */
const PAGE_LINKS = [
  { label: "Scooties", href: "/scooties" },
  { label: "Explore Sreemangal", href: "/explore" },
  { label: "Ride Routes", href: "/routes" },
  { label: "How It Works", href: "/how-it-works" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Rental Guide", href: "/rental-guide" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Ride", href: "/book" },
];

/** Footer - sticks to viewport bottom via flex layout (min-h-screen + flex-1 main). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-ink pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Giant statement */}
        <div className="border-b border-cream/15 py-12 md:py-16">
          <p className="label-micro text-brand">UNTIL THEN</p>
          <p className="mt-3 font-display text-[clamp(56px,10vw,140px)] leading-[0.9] tracking-wide">
            SEE YOU
            <br />
            ON THE <span className="text-brand">ROAD.</span>
          </p>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-4">
            <p className="flex items-center gap-3">
              <Image
                src="/logo/mark-white.png"
                alt=""
                width={368}
                height={516}
                className="h-8 w-auto"
              />
              <span className="font-display text-5xl leading-none tracking-wide">
                RED SCOOTY
              </span>
            </p>
            <p className="label-micro mt-2 text-brand">
              THE WAY YOU EXPLORE SREEMANGAL
            </p>
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              Scooty rentals based on Jalalia Road, Sreemangal. Request a ride,
              get a personal confirmation, and go see the tea gardens your way.
            </p>
            <div className="mt-6 flex gap-3">
              <TrackedLink
                event="click_facebook"
                source="footer"
                href={SITE.facebook}
                external
                ariaLabel="Red Scooty on Facebook"
                className="inline-flex h-12 w-12 items-center justify-center border border-cream/40 text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                event="click_youtube"
                source="footer"
                href={SITE.youtube.watchUrl}
                external
                ariaLabel="Featured Sreemangal tour video on YouTube"
                className="inline-flex h-12 w-12 items-center justify-center border border-cream/40 text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                event="get_directions"
                source="footer"
                href={SITE.mapsUrl}
                external
                ariaLabel="Red Scooty Sreemangal on Google Maps"
                className="inline-flex h-12 w-12 items-center justify-center border border-cream/40 text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-cream/85">
              <li>
                <TrackedLink
                  event="click_call"
                  source="footer"
                  href={SITE.telUrl}
                  className="inline-flex items-center gap-2 hover:text-brand"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  event="click_whatsapp"
                  source="footer"
                  href={whatsappMessageUrl(
                    "Hi Red Scooty! I want to rent a scooty in Sreemangal.",
                  )}
                  external
                  className="inline-flex items-center gap-2 hover:text-brand"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WHATSAPP US
                </TrackedLink>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 break-all hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="text-cream/70">
                <TrackedLink
                  event="get_directions"
                  source="footer_address"
                  href={SITE.mapsUrl}
                  external
                  className="hover:text-brand"
                >
                  {SITE.addressLine1}
                  <br />
                  {SITE.addressLine2}
                </TrackedLink>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <nav aria-label="Pages" className="md:col-span-3">
            <p className="label-micro text-cream/50">PAGES</p>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-display text-xl tracking-wide text-cream transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="md:col-span-2">
            <p className="label-micro text-cream/50">COMPANY</p>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`font-display text-xl tracking-wide transition-colors hover:text-brand ${
                      l.href === "/book" ? "text-brand" : "text-cream"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="md:col-span-3">
            <p className="label-micro text-cream/50">LEGAL</p>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-cream/15 pt-4 text-xs leading-relaxed text-cream/50">
              Booking requests are confirmed personally by phone or WhatsApp.
              No online payment is collected on this site.
            </p>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/15 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.fullName}. All rides confirmed personally.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="label-micro">DEVELOPED BY</span>
            <a
              href="https://tasbirkabir.me"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-cream transition-colors hover:text-brand"
            >
              <span className="border-b border-cream/40 pb-0.5 transition-colors group-hover:border-brand">
                Tasbir Kabir
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </p>
          <p className="label-micro">
            CONCEPT DEMO · FINAL CONTENT PENDING OWNER VALIDATION
          </p>
        </div>
      </div>
    </footer>
  );
}
