import { Facebook, Instagram, Mail, Phone } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { TrackedLink } from "@/components/site/tracked-link";

/** Footer - sticks to viewport bottom via flex layout (min-h-screen + flex-1 main). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-6xl leading-none tracking-wide">
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
              <TrackedLink
                event="click_instagram"
                source="footer"
                href={SITE.instagram}
                external
                ariaLabel="Red Scooty on Instagram"
                className="inline-flex h-12 w-12 items-center justify-center border-2 border-cream text-cream transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <p className="label-micro text-cream/50">SITE</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-display text-2xl tracking-wide text-cream transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="font-display text-2xl tracking-wide text-brand transition-colors hover:text-cream"
                >
                  BOOK A RIDE
                </a>
              </li>
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
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 break-all hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="text-cream/70">
                {SITE.addressLine1}, {SITE.addressLine2}
              </li>
            </ul>
            <p className="label-micro mt-6 text-cream/40">
              {SITE.locationStrip}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t-2 border-cream/20 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
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
