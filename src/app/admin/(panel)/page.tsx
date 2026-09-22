import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CalendarCheck,
  Inbox,
  ShieldCheck,
  Users,
} from "lucide-react";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
  href,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="group block border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lift"
    >
      <div className="flex items-center justify-between">
        <p className="label-micro text-steel">{label}</p>
        <Icon className="h-4.5 w-4.5 text-steel transition-colors group-hover:text-brand" aria-hidden="true" />
      </div>
      <p className="mt-2 font-display text-4xl leading-none text-ink">{value}</p>
      <p className="mt-1.5 text-xs text-steel">{hint}</p>
    </Link>
  );
}

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-brand/15 text-brand",
  CONTACTED: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-ink/10 text-ink",
  CANCELLED: "bg-ink/5 text-steel line-through",
};

export default async function AdminDashboardPage() {
  const user = await getSessionUser();

  const [newCount, confirmedCount, scootyCount, userCount, recent, activity] =
    await Promise.all([
      db.bookingRequest.count({ where: { status: "NEW" } }),
      db.bookingRequest.count({ where: { status: "CONFIRMED" } }),
      db.scooty.count(),
      db.user.count(),
      db.bookingRequest.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
      db.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    ]);

  return (
    <div className="space-y-8">
      <header>
        <p className="label-micro text-brand">DASHBOARD</p>
        <h1 className="mt-1 font-display text-4xl tracking-wide text-ink sm:text-5xl">
          HEY {user?.name.split(" ")[0]?.toUpperCase() ?? "THERE"}.
        </h1>
        <p className="mt-2 text-sm text-steel">
          Everything on the website — content, fleet, requests and access — is
          managed from here. No code required.
        </p>
      </header>

      <section aria-label="Overview" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="NEW REQUESTS"
          value={newCount}
          hint="Waiting for a first reply"
          href="/admin/bookings"
          icon={Inbox}
        />
        <StatCard
          label="CONFIRMED"
          value={confirmedCount}
          hint="Rides locked in"
          href="/admin/bookings"
          icon={CalendarCheck}
        />
        <StatCard
          label="SCOOTIES"
          value={scootyCount}
          hint="Fleet entries"
          href="/admin/scooties"
          icon={Bike}
        />
        <StatCard
          label="TEAM"
          value={userCount}
          hint="Owner + admin accounts"
          href={user?.role === "OWNER" ? "/admin/users" : "/admin"}
          icon={Users}
        />
      </section>

      <section aria-label="Recent requests" className="grid gap-6 lg:grid-cols-5">
        <div className="border border-ink/10 bg-white lg:col-span-3">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <h2 className="font-display text-2xl tracking-wide text-ink">
              LATEST REQUESTS
            </h2>
            <Link
              href="/admin/bookings"
              className="label-micro inline-flex items-center gap-1 text-brand hover:underline"
            >
              VIEW ALL
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-8 text-sm text-steel">
              No booking requests yet. They will appear here the moment a
              visitor sends one.
            </p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {recent.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {b.name}
                      <span className="ml-2 font-normal text-steel">
                        {b.phone}
                      </span>
                    </p>
                    <p className="label-micro mt-0.5 text-steel">
                      {b.type === "MESSAGE" ? "MESSAGE" : (b.rideDate ?? "NO DATE")}
                      {b.duration ? ` · ${b.duration.replace("_", " ")}` : ""}
                      {" · "}
                      {new Date(b.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <span
                    className={`label-micro shrink-0 px-2 py-1 ${STATUS_STYLES[b.status] ?? "bg-ink/10 text-ink"}`}
                  >
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-ink/10 bg-white lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-4">
            <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
            <h2 className="font-display text-2xl tracking-wide text-ink">
              ACTIVITY
            </h2>
          </div>
          {activity.length === 0 ? (
            <p className="px-5 py-8 text-sm text-steel">No activity yet.</p>
          ) : (
            <ul className="divide-y divide-ink/5">
              {activity.map((a) => (
                <li key={a.id} className="px-5 py-3">
                  <p className="text-sm text-ink">
                    <span className="font-semibold">{a.actor}</span>{" "}
                    <span className="text-steel">{a.detail || a.action}</span>
                  </p>
                  <p className="label-micro mt-0.5 text-steel">
                    {new Date(a.createdAt).toLocaleString("en-GB")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
