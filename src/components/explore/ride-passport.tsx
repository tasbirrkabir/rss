"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Stamp,
} from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import { DemoBadge } from "@/components/site/demo-badge";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rs-passport-v1";
const CHANGE_EVENT = "rs-passport-change";

const PASSPORT_ITEMS = DESTINATIONS.filter((d) => d.passport);

const EMPTY_STAMPS: string[] = [];

/** Parse + sanitize the stored stamp slugs (array of destination slugs). */
function parseStoredSlugs(raw: string | null): string[] {
  if (!raw) return EMPTY_STAMPS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_STAMPS;
    const slugs = parsed.filter(
      (s): s is string =>
        typeof s === "string" && PASSPORT_ITEMS.some((p) => p.slug === s),
    );
    return slugs;
  } catch {
    return EMPTY_STAMPS;
  }
}

function writeStoredSlugs(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Private mode / storage full — passport still works for this session.
  }
}

/**
 * Passport state shared between the card stamp buttons and the passport
 * panel via localStorage + a window event (no context coupling needed).
 * useSyncExternalStore keeps SSR and the first client render in agreement
 * (server snapshot = empty) without setState-in-effect.
 */
function subscribeToPassport(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

// getSnapshot must return a stable reference between renders or React will
// re-render forever - cache the parsed value against the raw string.
let snapshotCache: { raw: string | null; value: string[] } = {
  raw: null,
  value: EMPTY_STAMPS,
};

function getPassportSnapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== snapshotCache.raw) {
    snapshotCache = { raw, value: parseStoredSlugs(raw) };
  }
  return snapshotCache.value;
}

function getPassportServerSnapshot(): string[] {
  return EMPTY_STAMPS;
}

function usePassportStamps() {
  const stamps = useSyncExternalStore(
    subscribeToPassport,
    getPassportSnapshot,
    getPassportServerSnapshot,
  );

  const toggle = useCallback((slug: string) => {
    let current: string[];
    try {
      current = parseStoredSlugs(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      current = EMPTY_STAMPS;
    }
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    writeStoredSlugs(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const reset = useCallback(() => {
    writeStoredSlugs([]);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { stamps, toggle, reset };
}

/** "COLLECT STAMP" toggle rendered inside a passport destination card. */
export function PassportStampButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const { stamps, toggle } = usePassportStamps();
  const stamped = stamps.includes(slug);

  return (
    <button
      type="button"
      aria-pressed={stamped}
      aria-label={
        stamped
          ? `Remove the ${name} passport stamp`
          : `Collect the ${name} passport stamp`
      }
      onClick={() => toggle(slug)}
      className={cn(
        "label-micro inline-flex min-h-11 items-center gap-2 border-2 px-4 py-2.5 transition-all duration-200 active:translate-y-0",
        stamped
          ? "-rotate-2 border-brand bg-brand text-white shadow-hard-red-sm"
          : "border-dashed border-ink bg-paper text-ink hover:-translate-y-0.5 hover:shadow-hard-sm",
      )}
    >
      {stamped ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Stamp className="h-4 w-4" aria-hidden="true" />
      )}
      {stamped ? "STAMPED" : "COLLECT STAMP"}
    </button>
  );
}

/** Shared progress note so screen readers announce stamp updates. */
function PassportProgress({ stamps }: { stamps: string[] }) {
  return (
    <p aria-live="polite" className="label-micro text-ink">
      {stamps.length} / {PASSPORT_ITEMS.length} STAMPS
    </p>
  );
}

function PassportSlots({ stamps }: { stamps: string[] }) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

  return (
    <ul className="grid grid-cols-2 gap-3">
      {PASSPORT_ITEMS.map((item, i) => {
        const filled = stamps.includes(item.slug);
        return (
          <li
            key={item.slug}
            className={cn(
              "flex min-h-20 flex-col items-center justify-center gap-1.5 border-2 px-2 py-3 text-center transition-transform duration-200",
              filled
                ? cn(
                    "border-brand bg-cream text-brand shadow-hard-red-sm",
                    rotations[i % rotations.length],
                  )
                : "border-dashed border-steel text-steel",
            )}
          >
            <span className="font-display text-xl leading-tight tracking-wide">
              {item.name}
            </span>
            {filled ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <span className="label-micro text-steel">RIDE TO COLLECT</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PassportBody({
  stamps,
  onReset,
}: {
  stamps: string[];
  onReset: () => void;
}) {
  const complete = stamps.length === PASSPORT_ITEMS.length;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink pb-3">
        <p className="label-micro text-brand">PROGRESS</p>
        <PassportProgress stamps={stamps} />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden="true">
        {PASSPORT_ITEMS.map((item) => (
          <span
            key={item.slug}
            className={cn(
              "h-1.5",
              stamps.includes(item.slug) ? "bg-brand" : "bg-ink/15",
            )}
          />
        ))}
      </div>

      <div className="mt-4">
        <PassportSlots stamps={stamps} />
      </div>

      {complete ? (
        <div className="mt-4 border-2 border-brand bg-brand p-4 text-white shadow-hard">
          <p className="font-display text-3xl leading-none tracking-wide">
            PASSPORT COMPLETE.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Show this screen at pickup — demo fun, real perks to be confirmed.
          </p>
          <DemoBadge className="mt-3 border-white/70 text-white">
            DEMO FUN
          </DemoBadge>
        </div>
      ) : (
        <p className="label-micro mt-4 leading-relaxed text-steel">
          TAP &ldquo;COLLECT STAMP&rdquo; ON THE FOUR ICON DESTINATIONS AS YOU
          RIDE.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        aria-label="Reset ride passport stamps"
        className="label-micro mt-4 inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-2 text-ink transition-all hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-y-0"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        RESET
      </button>

      <p className="label-micro mt-3 leading-relaxed text-steel">
        PROGRESS IS SAVED ON THIS DEVICE ONLY.
      </p>
    </div>
  );
}

function PassportHeading() {
  return (
    <div>
      <p className="label-micro text-brand">RIDE PASSPORT</p>
      <h2 className="mt-1 font-display text-3xl leading-[0.95] tracking-wide text-ink xl:text-4xl">
        YOUR SREEMANGAL RIDE PASSPORT
      </h2>
    </div>
  );
}

/**
 * The Ride Passport panel.
 * - xl and up: sticky sidebar (place inside the passport grid column).
 * - below xl: fixed, collapsible bottom bar that expands into a sheet,
 *   offset to clear the fixed mobile CTA bar.
 */
export function RidePassport() {
  const { stamps, reset } = usePassportStamps();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: sticky sidebar panel */}
      <aside
        aria-label="Your Sreemangal ride passport"
        className="hidden xl:sticky xl:top-24 xl:block"
      >
        <div className="border-2 border-ink bg-paper p-6 shadow-hard-lg">
          <PassportHeading />
          <div className="mt-5">
            <PassportBody stamps={stamps} onReset={reset} />
          </div>
        </div>
      </aside>

      {/* Mobile / tablet: collapsible fixed bottom bar */}
      <div className="fixed inset-x-3 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] z-40 md:bottom-4 xl:hidden">
        {open ? (
          <div className="scrollbar-brutal mb-2 max-h-[62vh] overflow-y-auto border-2 border-ink bg-paper p-5 shadow-hard-lg">
            <PassportHeading />
            <div className="mt-4">
              <PassportBody stamps={stamps} onReset={reset} />
            </div>
          </div>
        ) : null}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close ride passport" : "Open ride passport"}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-12 w-full items-center justify-between gap-3 border-2 border-ink bg-ink px-4 py-3 text-cream shadow-hard transition-colors hover:bg-ink-soft"
        >
          <span className="flex items-center gap-2">
            <Stamp className="h-4 w-4 text-brand" aria-hidden="true" />
            <span className="font-display text-2xl leading-none tracking-wider">
              RIDE PASSPORT
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="label-micro text-brand">
              {stamps.length} / {PASSPORT_ITEMS.length} STAMPS
            </span>
            {open ? (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
        </button>
      </div>
    </>
  );
}
