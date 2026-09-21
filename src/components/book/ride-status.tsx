"use client";

import { useEffect, useState } from "react";

import { DemoBadge } from "@/components/site/demo-badge";

type RidesStatusPayload = {
  demo: boolean;
  label: string;
  ridesToday: string;
  scootiesReady: string;
  note: string;
};

type LoadState = "loading" | "ok" | "error";

const LOADING_NOTE = "Checking the board...";
const FALLBACK_NOTE =
  "Live status is unavailable right now - real availability is confirmed personally when you request a ride.";

/**
 * LIVE RIDE STATUS strip for /book (brief: extraordinary feature #3).
 * Numbers come from GET /api/rides-status and are demo-labelled by contract:
 * the badge must always be rendered next to them. On fetch failure the
 * numbers are hidden and only the note + badge remain.
 */
export function RideStatus() {
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<RidesStatusPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rides-status")
      .then(async (res) => {
        if (!res.ok) throw new Error("rides-status request failed");
        return (await res.json()) as RidesStatusPayload;
      })
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setState("ok");
      })
      .catch(() => {
        if (cancelled) return;
        setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const note =
    state === "error"
      ? FALLBACK_NOTE
      : state === "ok" && data
        ? data.note
        : LOADING_NOTE;

  return (
    <section
      aria-label="Live ride status (demo data)"
      className="border-b-2 border-ink bg-paper"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        <p className="label-micro flex items-center gap-3 text-brand">
          <span className="h-0.5 w-10 bg-brand" aria-hidden="true" />
          LIVE RIDE STATUS
        </p>
        <div aria-live="polite" className="mt-5 grid gap-4 sm:grid-cols-2">
          <StatusBlock
            label="RIDES TODAY"
            state={state}
            value={data?.ridesToday ?? "—"}
            note={note}
          />
          <StatusBlock
            label="SCOOTIES READY"
            state={state}
            value={data?.scootiesReady ?? "—"}
            note={note}
          />
        </div>
      </div>
    </section>
  );
}

function StatusBlock({
  label,
  state,
  value,
  note,
}: {
  label: string;
  state: LoadState;
  value: string;
  note: string;
}) {
  return (
    <div className="border-2 border-ink bg-cream p-5 shadow-hard-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="label-micro text-steel">{label}</p>
        <DemoBadge>DEMO DATA</DemoBadge>
      </div>
      {state === "error" ? null : (
        <p className="mt-1 font-display text-6xl leading-none tracking-wide text-ink md:text-7xl">
          {state === "loading" ? "—" : value}
        </p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-steel">{note}</p>
    </div>
  );
}
