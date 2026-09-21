const ITEMS = [
  "DON'T JUST VISIT SREEMANGAL. RIDE IT.",
  "TEA GARDENS",
  "LAWACHARA",
  "MADHABPUR LAKE",
  "BAIKKA BEEL",
  "HIDDEN ROADS",
];

function MarqueeRun() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl tracking-wider">
            {item}
          </span>
          <span className="text-brand">{"///"}</span>
        </span>
      ))}
    </div>
  );
}

/** Subtle micro-branding marquee (PRD sections 15 / 39). */
export function MarqueeStrip() {
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-ink py-3 text-cream">
      <div className="flex w-max animate-marquee">
        <MarqueeRun />
        <MarqueeRun />
      </div>
    </div>
  );
}
