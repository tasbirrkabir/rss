"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "HERO" },
  { id: "the-ride", label: "THE RIDE" },
  { id: "routes", label: "ROUTES" },
  { id: "the-story", label: "THE STORY" },
  { id: "your-turn", label: "YOUR TURN" },
] as const;

/**
 * Fixed reading aids, lg+ only:
 * - Right rail: "01 / 05" current section + thin scroll-progress line.
 * - Left vertical brand text: RIDE / EXPLORE / DISCOVER.
 * Both are pointer-events-none, sit below the header (z-50) but above content.
 */
export function ScrollRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const doc = document.documentElement;
      const max = doc.scrollHeight - viewport;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

      const threshold = viewport * 0.4;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = i;
        }
      });
      setActive(current);
    };

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const total = SECTIONS.length;

  return (
    <>
      {/* Right progress rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        <div className="relative h-40 w-0.5 bg-ink/15">
          <span
            className="absolute top-0 left-0 w-full bg-brand"
            style={{ height: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="text-right">
          <p className="font-display text-2xl leading-none tracking-wider text-ink">
            {String(active + 1).padStart(2, "0")}
            <span className="text-steel"> / {String(total).padStart(2, "0")}</span>
          </p>
          <p className="label-micro mt-1 text-steel">{SECTIONS[active].label}</p>
        </div>
      </div>

      {/* Left vertical brand text */}
      <p
        aria-hidden="true"
        className="label-micro pointer-events-none fixed top-1/2 left-3 z-30 hidden -translate-y-1/2 text-steel lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        RIDE — EXPLORE — DISCOVER
      </p>
    </>
  );
}
