"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, type NavItem } from "@/data/nav";
import { useSiteConfig } from "@/components/site/site-config-provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function itemIsActive(item: NavItem, pathname: string) {
  const matches = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return matches(item.href) || (item.children ?? []).some((c) => matches(c.href));
}

/** One desktop nav item — plain link, or a hover/click dropdown. */
function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  // Derived open state: "open at pathname X". Navigating to another route
  // automatically closes the menu — no effect/setState needed.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const closeTimer = useRef<number | null>(null);
  const active = itemIsActive(item, pathname);
  const hasChildren = !!item.children?.length;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "link-underline label-micro transition-colors hover:text-brand",
          active ? "text-brand" : "text-ink",
        )}
      >
        {item.label}
      </Link>
    );
  }

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenAt(pathname);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenAt(null), 140);
  };
  const toggle = () =>
    setOpenAt((v) => (v === pathname ? null : pathname));

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpenAt(null);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={toggle}
        onFocus={openNow}
        className={cn(
          "label-micro flex items-center gap-1 py-2 transition-colors hover:text-brand",
          active || open ? "text-brand" : "text-ink",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="border border-ink/10 bg-cream shadow-lift">
          <span
            aria-hidden="true"
            className="block h-0.5 w-full bg-brand"
          />
          <ul className="py-2">
            {item.children!.map((child) => {
              // Only plain-path children (no #hash / ?query) can be "active";
              // deep links would otherwise all highlight on their parent page.
              const basePath = child.href.split("#")[0].split("?")[0];
              const childActive =
                !child.href.includes("#") &&
                !child.href.includes("?") &&
                (basePath === "/"
                  ? pathname === "/"
                  : pathname.startsWith(basePath));
              return (
                <li key={child.label + child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpenAt(null)}
                    className={cn(
                      "group flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-ink/5",
                      childActive ? "text-brand" : "text-ink",
                    )}
                  >
                    <span className="flex items-center justify-between font-display text-base tracking-wide">
                      {child.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>
                    {child.description ? (
                      <span className="text-xs leading-snug text-steel">
                        {child.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { config, whatsappUrl: wa } = useSiteConfig();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Demo Scooty Rental — home"
        >
          <Image
            src="/logo/mark.png"
            alt=""
            width={368}
            height={516}
            priority
            className="h-9 w-auto transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-3xl tracking-wide text-ink transition-colors group-hover:text-brand">
              DEMO SCOOTY
            </span>
            <span className="label-micro mt-0.5 text-steel">
              DEMO RENTAL / BANGLADESH
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <NavDropdown key={item.label} item={item} pathname={pathname} />
          ))}
          <Button
            asChild
            onClick={() => track("click_booking", { source: "header" })}
            className="group h-11 rounded-none bg-ink px-5 font-display text-lg tracking-wider text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:shadow-[0_10px_24px_rgba(245,34,45,0.28)]"
          >
            <Link href="/book">
              BOOK A RIDE
              <ArrowRight
                className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
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
                className="h-11 w-11 rounded-none border border-ink/20 bg-cream text-ink hover:bg-cream hover:text-brand"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-l border-ink/10 bg-cream p-0"
            >
              <SheetHeader className="border-b border-ink/10 p-5 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <Image
                    src="/logo/mark.png"
                    alt=""
                    width={368}
                    height={516}
                    className="h-8 w-auto"
                  />
                  <span className="font-display text-3xl tracking-wide">
                    DEMO SCOOTY
                  </span>
                </SheetTitle>
                <p className="label-micro mt-1 text-steel">
                  DEMO RENTAL / BANGLADESH
                </p>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="max-h-[calc(100vh-11rem)] overflow-y-auto p-5"
              >
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="border-b border-ink/10 py-2 last:border-b-0">
                    {item.children?.length ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={openGroup === item.label}
                          aria-controls={`nav-group-${item.label}`}
                          onClick={() =>
                            setOpenGroup((v) => (v === item.label ? null : item.label))
                          }
                          className={cn(
                            "flex w-full items-center justify-between py-1.5 font-display text-2xl tracking-wide transition-colors hover:text-brand",
                            itemIsActive(item, pathname) ? "text-brand" : "text-ink",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            className={cn(
                              "h-5 w-5 text-steel transition-transform duration-200",
                              openGroup === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <div
                          id={`nav-group-${item.label}`}
                          aria-hidden={openGroup !== item.label}
                          inert={openGroup !== item.label}
                          className={cn(
                            "grid transition-all duration-200 ease-out",
                            openGroup === item.label
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <ul className="ml-1 mt-1 overflow-hidden border-l-2 border-ink/10 pl-4">
                            {item.children.map((child) => (
                              <li key={child.label + child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block py-2 text-sm tracking-wide text-ink transition-colors hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "block py-1.5 font-display text-2xl tracking-wide transition-colors hover:text-brand",
                          isActive(item.href) ? "text-brand" : "text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Button
                  asChild
                  onClick={() => {
                    setMenuOpen(false);
                    track("click_booking", { source: "mobile_menu" });
                  }}
                  className="mt-6 h-14 w-full rounded-none bg-brand font-display text-2xl tracking-wider text-white hover:bg-ink"
                >
                  <Link href="/book">BOOK A RIDE</Link>
                </Button>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    onClick={() => {
                      setMenuOpen(false);
                      track("click_call", { source: "mobile_menu" });
                    }}
                    className="h-12 rounded-none border border-ink/20 bg-cream text-ink hover:bg-cream hover:text-brand"
                  >
                    <a href={config.telUrl} aria-label={`Call ${config.phoneDisplay}`}>
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
                    className="h-12 rounded-none border border-ink/20 bg-cream text-ink hover:bg-cream hover:text-brand"
                  >
                    <a
                      href={wa(
                        "Hi Demo Scooty! I want to ask about renting a demo scooty in Sreemangal.",
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
