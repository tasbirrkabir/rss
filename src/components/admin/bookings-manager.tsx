"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Inbox, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type AdminBooking = {
  id: string;
  type: string;
  rideDate: string | null;
  duration: string | null;
  vehicleId: string | null;
  riders: string | null;
  routeRef: string | null;
  name: string;
  phone: string;
  pickupPreference: string | null;
  message: string | null;
  status: string;
  createdAt: string;
};

const STATUSES = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-brand/15 text-brand hover:bg-brand/15",
  CONTACTED: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  CONFIRMED: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  COMPLETED: "bg-ink/10 text-ink hover:bg-ink/10",
  CANCELLED: "bg-ink/5 text-steel hover:bg-ink/5",
};

const FILTERS = ["ALL", ...STATUSES] as const;

/** Booking requests + contact messages: filter, inspect, advance status. */
export function BookingsManager({ initial }: { initial: AdminBooking[] }) {
  const [items, setItems] = useState<AdminBooking[]>(initial);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? items : items.filter((b) => b.status === filter)),
    [items, filter],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of items) map.set(b.status, (map.get(b.status) ?? 0) + 1);
    return map;
  }, [items]);

  async function setStatus(booking: AdminBooking, status: string) {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [booking.id], status }),
    });
    if (!res.ok) {
      toast.error("Could not update status.");
      return;
    }
    setItems((list) =>
      list.map((b) => (b.id === booking.id ? { ...b, status } : b)),
    );
    toast.success(`Marked as ${status}.`);
  }

  async function remove(b: AdminBooking) {
    if (!window.confirm(`Delete the request from ${b.name}? This cannot be undone.`)) {
      return;
    }
    const res = await fetch(`/api/admin/bookings?id=${b.id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete.");
      return;
    }
    setItems((list) => list.filter((x) => x.id !== b.id));
    toast.success("Request deleted.");
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="label-micro text-brand">PIPELINE</p>
        <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">
          BOOKINGS
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-steel">
          Every request from the website lands here. Move each one through the
          pipeline: NEW → CONTACTED → CONFIRMED → COMPLETED.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "label-micro border px-3 py-2 transition-colors",
              filter === f
                ? "border-brand bg-brand text-white"
                : "border-ink/15 bg-white text-ink hover:border-ink/40",
            )}
          >
            {f}
            {f !== "ALL" && counts.get(f) ? ` · ${counts.get(f)}` : ""}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-ink/25 bg-white px-6 py-14 text-center">
          <Inbox className="h-8 w-8 text-steel" aria-hidden="true" />
          <p className="text-sm text-steel">
            {filter === "ALL"
              ? "Nothing here yet — new requests will show up automatically."
              : `No ${filter.toLowerCase()} requests right now.`}
          </p>
        </div>
      ) : (
        <div className="border border-ink/10 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="border-ink/10 hover:bg-transparent">
                <TableHead className="text-steel">FROM</TableHead>
                <TableHead className="hidden text-steel md:table-cell">RIDE</TableHead>
                <TableHead className="hidden text-steel lg:table-cell">SENT</TableHead>
                <TableHead className="text-steel">STATUS</TableHead>
                <TableHead className="text-right text-steel">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id} className="border-ink/10">
                  <TableCell className="align-top">
                    <p className="flex items-center gap-1.5 font-semibold text-ink">
                      {b.type === "MESSAGE" ? (
                        <MessageSquare className="h-3.5 w-3.5 text-steel" aria-hidden="true" />
                      ) : (
                        <CalendarCheck className="h-3.5 w-3.5 text-steel" aria-hidden="true" />
                      )}
                      {b.name}
                    </p>
                    <a
                      href={`tel:${b.phone}`}
                      className="text-xs text-steel hover:text-brand"
                    >
                      {b.phone}
                    </a>
                    {b.message ? (
                      <p className="mt-1 line-clamp-1 max-w-[240px] text-xs italic text-steel">
                        “{b.message}”
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="hidden align-top md:table-cell">
                    <p className="text-sm text-ink">
                      {b.type === "MESSAGE" ? "Contact message" : (b.rideDate ?? "—")}
                    </p>
                    <p className="label-micro mt-0.5 text-steel">
                      {[
                        b.duration?.replace("_", " "),
                        b.vehicleId,
                        b.riders ? `${b.riders} rider(s)` : null,
                        b.pickupPreference ? `pickup: ${b.pickupPreference}` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </p>
                  </TableCell>
                  <TableCell className="hidden align-top text-sm text-steel lg:table-cell">
                    {new Date(b.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="align-top">
                    <Select
                      value={b.status}
                      onValueChange={(v) => void setStatus(b, v)}
                    >
                      <SelectTrigger
                        aria-label={`Change status for ${b.name}`}
                        className="w-36 rounded-none border-ink/20 bg-paper"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right align-top">
                    <div className="flex justify-end gap-1.5">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-none border-ink/20 bg-cream px-2.5 text-xs hover:bg-cream hover:text-brand"
                          >
                            DETAILS
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-none border-ink/15 bg-cream sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="font-display text-3xl tracking-wide">
                              {b.name}
                            </DialogTitle>
                            <DialogDescription className="text-steel">
                              {b.type === "MESSAGE"
                                ? "Contact message"
                                : "Booking request"}{" "}
                              ·{" "}
                              {new Date(b.createdAt).toLocaleString("en-GB")}
                            </DialogDescription>
                          </DialogHeader>
                          <dl className="space-y-2.5 text-sm">
                            {[
                              ["Phone", b.phone],
                              ["Ride date", b.rideDate],
                              ["Duration", b.duration?.replace("_", " ")],
                              ["Scooty", b.vehicleId ?? "No preference"],
                              ["Riders", b.riders],
                              ["Route / mood", b.routeRef],
                              ["Pickup", b.pickupPreference],
                            ]
                              .filter(([, v]) => v)
                              .map(([k, v]) => (
                                <div key={k as string} className="flex justify-between gap-4 border-b border-ink/5 pb-2">
                                  <dt className="text-steel">{k}</dt>
                                  <dd className="text-right font-medium text-ink">
                                    {v as string}
                                  </dd>
                                </div>
                              ))}
                            {b.message ? (
                              <div>
                                <dt className="text-steel">Message</dt>
                                <dd className="mt-1 whitespace-pre-wrap border-l-2 border-brand bg-paper px-3 py-2 text-ink">
                                  {b.message}
                                </dd>
                              </div>
                            ) : null}
                          </dl>
                          <div className="flex gap-2">
                            <Button
                              asChild
                              className="h-10 flex-1 rounded-none bg-brand font-display tracking-wider text-white hover:bg-ink"
                            >
                              <a href={`tel:${b.phone}`}>CALL NOW</a>
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              className="h-10 flex-1 rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
                            >
                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "").replace(/^0/, "880")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                WHATSAPP
                              </a>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Delete request from ${b.name}`}
                        onClick={() => void remove(b)}
                        className="h-8 w-8 rounded-none border-ink/20 bg-cream p-0 text-brand hover:bg-cream hover:text-brand"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
