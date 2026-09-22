"use client";

import { useSiteConfig } from "@/components/site/site-config-provider";

function MarqueeRun({ slogans }: { slogans: string[] }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {slogans.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-xl tracking-[0.12em]">
            {item}
          </span>
          <span className="text-brand" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Micro-branding marquee — slogans managed from the admin panel, on a quiet
 * ink band (PRD sections 15 / 39).
 */
export function MarqueeStrip() {
  const { home } = useSiteConfig();
  return (
    <div className="overflow-hidden bg-ink py-3.5 text-cream">
      <div className="flex w-max animate-marquee">
        <MarqueeRun slogans={home.slogans} />
        <MarqueeRun slogans={home.slogans} />
      </div>
    </div>
  );
}
