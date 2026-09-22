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
import { Reveal } from "@/components/site/reveal";
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
        "label-micro inline-flex min-h-11 items-center gap-2 border px-4 py-2.5 transition-all duration-200 active:translate-y-px",
        stamped
          ? "-rotate-1 border-leaf bg-leaf text-cream"
          : "border-dashed border-ink/40 bg-paper text-ink hover:border-ink hover:bg-cream",
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
  const rotations = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.75deg]"];

  return (
    <ul className="grid grid-cols-2 gap-3">
      {PASSPORT_ITEMS.map((item, i) => {
        const filled = stamps.includes(item.slug);
        return (
          <li
            key={item.slug}
            className={cn(
              "flex min-h-20 flex-col items-center justify-center gap-1.5 border px-2 py-3 text-center transition-all duration-200",
              filled
                ? cn(
                    "border-leaf/40 bg-leaf/10 text-leaf",
                    rotations[i % rotations.length],
                  )
                : "border-dashed border-ink/25 text-steel",
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
      <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
        <p className="label-micro text-brand">PROGRESS</p>
        <PassportProgress stamps={stamps} />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden="true">
        {PASSPORT_ITEMS.map((item) => (
          <span
            key={item.slug}
            className={cn(
              "h-1",
              stamps.includes(item.slug) ? "bg-leaf" : "bg-ink/10",
            )}
          />
        ))}
      </div>

      <div className="mt-5">
        <PassportSlots stamps={stamps} />
      </div>

      {complete ? (
        <div className="mt-5 bg-ink p-5 text-cream">
          <p className="display-3 text-cream">PASSPORT COMPLETE.</p>
          <p className="mt-2 text-sm leading-relaxed text-cream/80">
            Show this screen at pickup — demo fun, real perks to be confirmed.
          </p>
          <DemoBadge className="mt-3 border-cream/50 text-cream/80">
            DEMO FUN
          </DemoBadge>
        </div>
      ) : (
        <p className="label-micro mt-5 leading-relaxed text-steel">
          TAP &ldquo;COLLECT STAMP&rdquo; ON THE FOUR ICON DESTINATIONS AS YOU
          RIDE.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        aria-label="Reset ride passport stamps"
        className="label-micro mt-5 inline-flex min-h-11 items-center gap-1.5 border border-ink/20 bg-paper px-4 py-2.5 text-ink transition-colors hover:border-ink hover:bg-cream active:translate-y-px"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        RESET
      </button>

      <p className="label-micro mt-4 leading-relaxed text-steel">
        PROGRESS IS SAVED ON THIS DEVICE ONLY.
      </p>
    </div>
  );
}

function PassportHeading() {
  return (
    <div>
      <p className="label-micro text-brand">RIDE PASSPORT</p>
      <h2 className="display-3 mt-1.5 text-ink">
        YOUR SREEMANGAL RIDE PASSPORT
      </h2>
    </div>
  );
}

/**
 * The Ride Passport — a full-width editorial band on /explore.
 * Left: how the stamp game works. Right: the card-soft passport panel.
 * Below lg a collapsible fixed quick-bar keeps the passport reachable
 * while scrolling the destination rows (offset to clear the mobile CTA bar).
 */
export function RidePassport() {
  const { stamps, reset } = usePassportStamps();
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="passport"
        aria-labelledby="passport-heading"
        className="rule-soft bg-cream py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
          {/* Copy column */}
          <Reveal className="lg:col-span-5">
            <p className="label-micro text-brand">THE STAMP GAME</p>
            <h2
              id="passport-heading"
              className="display-1 mt-2 text-ink"
            >
              COLLECT
              <br />
              EVERY <span className="text-brand">STAMP.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              Four icon destinations, one scooty. Collect a stamp at each stop,
              fill the passport, show us at pickup — real perks are still being
              dreamed up, the fun is already real.
            </p>

            <ol className="mt-8 max-w-md">
              <li className="flex items-baseline gap-4 border-t border-ink/10 py-3.5">
                <span className="label-micro text-leaf">01</span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  Ride there — the map up top shows every verified stop.
                </span>
              </li>
              <li className="flex items-baseline gap-4 border-t border-ink/10 py-3.5">
                <span className="label-micro text-leaf">02</span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  Tap &ldquo;COLLECT STAMP&rdquo; on the destination card.
                </span>
              </li>
              <li className="flex items-baseline gap-4 border-y border-ink/10 py-3.5">
                <span className="label-micro text-leaf">03</span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  Show the passport at pickup and collect a knowing nod.
                </span>
              </li>
            </ol>

            <p className="label-micro mt-6 max-w-md leading-relaxed text-steel">
              NO ACCOUNT · NO TRACKING · PROGRESS STAYS ON THIS DEVICE.
            </p>
          </Reveal>

          {/* Passport panel */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="card-soft relative h-full p-6 sm:p-8">
              <p className="sticker absolute -top-3.5 right-6 bg-leaf px-3 py-1.5">
                <span className="label-micro text-cream">STAMP GAME</span>
              </p>
              <p className="label-micro text-brand">YOUR RIDE PASSPORT</p>
              <div className="mt-4">
                <PassportBody stamps={stamps} onReset={reset} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile / tablet: collapsible fixed quick-bar */}
      <div className="fixed inset-x-3 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] z-40 md:bottom-4 lg:hidden">
        {open ? (
          <div className="card-soft scrollbar-brutal mb-2 max-h-[62vh] overflow-y-auto p-5">
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
          className="flex min-h-12 w-full items-center justify-between gap-3 border border-ink bg-ink px-4 py-3 text-cream shadow-lift transition-colors hover:bg-ink-soft"
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
