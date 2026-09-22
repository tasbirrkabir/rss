import { SITE } from "@/data/site";

function MarqueeRun() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {SITE.slogans.map((item, i) => (
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
 * Micro-branding marquee — the verified slogans from the business's
 * public Facebook posts, on a quiet ink band (PRD sections 15 / 39).
 */
export function MarqueeStrip() {
  return (
    <div className="overflow-hidden bg-ink py-3.5 text-cream">
      <div className="flex w-max animate-marquee">
        <MarqueeRun />
        <MarqueeRun />
      </div>
    </div>
  );
}
