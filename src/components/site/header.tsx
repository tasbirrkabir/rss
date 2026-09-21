"use client";

import { useState } from "react";
import { Menu, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NAV_LINKS,
  SITE,
  whatsappMessageUrl,
} from "@/data/site";
import { track } from "@/lib/analytics";
import { useBookingStore } from "@/lib/booking-store";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openBooking = useBookingStore((s) => s.openBooking);

  const handleBook = () => {
    track("click_booking", { source: "header" });
    openBooking();
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex flex-col leading-none"
          aria-label="Red Scooty Sreemangal - back to top"
        >
          <span className="font-display text-3xl tracking-wide text-ink transition-colors group-hover:text-brand">
            RED SCOOTY
          </span>
          <span className="label-micro mt-0.5 text-steel">
            SREEMANGAL / BANGLADESH
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-micro text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={handleBook}
            className="h-11 rounded-none border-2 border-ink bg-ink px-5 font-display text-lg tracking-wider text-cream shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-brand hover:shadow-hard-red-sm"
          >
            BOOK A RIDE
          </Button>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="h-11 w-11 rounded-none border-2 border-ink bg-cream text-ink shadow-hard-sm hover:bg-cream hover:text-brand"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-l-2 border-ink bg-cream p-0"
            >
              <SheetHeader className="border-b-2 border-ink p-5 text-left">
                <SheetTitle className="font-display text-3xl tracking-wide">
                  RED SCOOTY
                </SheetTitle>
                <p className="label-micro mt-1 text-steel">
                  SREEMANGAL / BANGLADESH
                </p>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col p-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      // Close the sheet first, then scroll - the sheet's
                      // scroll-lock release cancels in-flight smooth scrolls.
                      setTimeout(() => {
                        document
                          .querySelector(link.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 350);
                    }}
                    className="border-b border-ink/20 py-4 font-display text-4xl tracking-wide text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    handleBook();
                  }}
                  className="mt-6 h-14 rounded-none border-2 border-ink bg-brand font-display text-2xl tracking-wider text-white shadow-hard hover:bg-ink"
                >
                  BOOK A RIDE
                </Button>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    onClick={() => {
                      setMenuOpen(false);
                      track("click_call", { source: "mobile_menu" });
                    }}
                    className="h-12 rounded-none border-2 border-ink bg-cream text-ink hover:bg-cream hover:text-brand"
                  >
                    <a href={SITE.telUrl} aria-label={`Call ${SITE.phoneDisplay}`}>
                      <Phone className="mr-2 h-4 w-4" /> CALL
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    onClick={() => {
                      setMenuOpen(false);
                      track("click_whatsapp", { source: "mobile_menu" });
                    }}
                    className="h-12 rounded-none border-2 border-ink bg-cream text-ink hover:bg-cream hover:text-brand"
                  >
                    <a
                      href={whatsappMessageUrl(
                        "Hi Red Scooty! I want to ask about renting a scooty in Sreemangal.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> WHATSAPP
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
