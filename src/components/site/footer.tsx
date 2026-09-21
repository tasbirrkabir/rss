import Link from "next/link";
import { Facebook, Mail, Phone } from "lucide-react";

import { ALL_PAGES, SITE, whatsappMessageUrl } from "@/data/site";
import { TrackedLink } from "@/components/site/tracked-link";

/** Footer - sticks to viewport bottom via flex layout (min-h-screen + flex-1 main). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Giant statement */}
        <div className="border-b-2 border-cream/20 py-12 md:py-16">
          <p className="label-micro text-brand">UNTIL THEN</p>
          <p className="mt-3 font-display text-[clamp(56px,10vw,140px)] leading-[0.9] tracking-wide">
            SEE YOU
            <br />
            ON THE <span className="text-brand">ROAD.</span>
          </p>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-5xl leading-none tracking-wide">
              RED SCOOTY
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
                className="inline-flex h-12 w-12 items-center justify-center border-2 border-cream text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="label-micro text-cream/50">SITE</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {ALL_PAGES.map((l) => (
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

          <div className="md:col-span-4">
            <p className="label-micro text-cream/50">CONTACT</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/85">
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
                  <span aria-hidden="true" className="text-base leading-none">
                    ▸
                  </span>
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
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </li>
            </ul>
            <p className="label-micro mt-6 text-cream/40">
              {SITE.locationStrip}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-2 border-cream/20 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.fullName}. All rides confirmed personally.
          </p>
          <p className="label-micro">
            CONCEPT DEMO · FINAL CONTENT PENDING OWNER VALIDATION
          </p>
        </div>
      </div>
    </footer>
  );
}
