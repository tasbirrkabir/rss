"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bike,
  CalendarCheck,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/admin-auth";

const NAV = [
  { label: "DASHBOARD", href: "/admin", icon: LayoutDashboard },
  { label: "SCOOTIES", href: "/admin/scooties", icon: Bike },
  { label: "HOME PAGE", href: "/admin/home", icon: ExternalLink },
  { label: "BOOKINGS", href: "/admin/bookings", icon: CalendarCheck },
  { label: "SITE SETTINGS", href: "/admin/settings", icon: Phone },
] as const;

const OWNER_NAV = [
  { label: "ACCESS", href: "/admin/users", icon: Users },
] as const;

/** Admin chrome: sidebar on desktop, top bar + sheet-ish menu on mobile. */
export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const isOwner = user.role === "OWNER";
  const links = isOwner ? [...NAV, ...OWNER_NAV] : [...NAV];

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav aria-label="Admin sections" className="space-y-1">
      {links.map(({ label, href, icon: Icon }) => {
        const active =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-sm font-medium tracking-wide transition-colors",
              active
                ? "bg-brand text-white"
                : "text-cream/75 hover:bg-cream/10 hover:text-cream",
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const UserBlock = () => (
    <div className="border-t border-cream/10 p-4">
      <p className="truncate text-sm font-semibold text-cream">{user.name}</p>
      <p className="label-micro mt-0.5 flex items-center gap-1.5 text-cream/60">
        <ShieldCheck
          className={cn("h-3 w-3", isOwner ? "text-brand" : "text-cream/50")}
          aria-hidden="true"
        />
        {user.role}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        disabled={busy}
        className="mt-3 w-full rounded-none border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        {busy ? "SIGNING OUT…" : "SIGN OUT"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-ink lg:flex">
        <div className="border-b border-cream/10 px-4 py-5">
          <Link href="/admin" className="font-display text-3xl tracking-wide text-cream">
            DEMO SCOOTY
          </Link>
          <p className="label-micro mt-1 text-brand">MANAGEMENT PANEL</p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks />
        </div>
        <UserBlock />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-ink/10 bg-ink px-4 py-3 lg:hidden">
        <div>
          <p className="font-display text-2xl leading-none tracking-wide text-cream">
            DEMO SCOOTY
          </p>
          <p className="label-micro mt-0.5 text-brand">MANAGEMENT PANEL</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle admin menu"
          className="rounded-none border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {menuOpen ? (
        <div className="fixed inset-x-0 top-[61px] z-30 border-b border-cream/10 bg-ink pb-4 shadow-lift lg:hidden">
          <NavLinks onNavigate={() => setMenuOpen(false)} />
          <UserBlock />
        </div>
      ) : null}

      {/* Content */}
      <main className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
