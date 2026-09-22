"use client";

import Link from "next/link";
import { Bike, MessageCircle, Phone } from "lucide-react";

import { SITE, whatsappMessageUrl } from "@/data/site";
import { track } from "@/lib/analytics";

/**
 * Persistent mobile bottom bar:
 * CALL | WHATSAPP | BOOK - 48px+ tap targets, safe-area aware.
 * Solid surfaces, hairline dividers, quiet lift above the page.
 * BOOK navigates to the dedicated booking page.
 */
export function MobileCtaBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 bg-paper shadow-lift md:hidden"
    >
      <a
        href={SITE.telUrl}
        onClick={() => track("click_call", { source: "mobile_bar" })}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 py-1 text-ink transition-colors hover:text-brand active:text-brand"
        aria-label={`Call ${SITE.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span className="label-micro">CALL</span>
      </a>
      <a
        href={whatsappMessageUrl(
          "Hi Red Scooty! I want to rent a scooty in Sreemangal.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("click_whatsapp", { source: "mobile_bar" })}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 py-1 text-ink transition-colors hover:text-brand active:text-brand"
        aria-label="Message Red Scooty on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="label-micro">WHATSAPP</span>
      </a>
      <Link
        href={SITE.bookingUrl}
        onClick={() => track("click_booking", { source: "mobile_bar" })}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-brand py-1 text-white transition-colors active:bg-ink"
        aria-label="Book a scooty"
      >
        <Bike className="h-5 w-5" aria-hidden="true" />
        <span className="label-micro">BOOK</span>
      </Link>
    </nav>
  );
}
