import { RIDE_METRICS_NOTE } from "@/data/destinations";

/**
 * Small print used under every map panel.
 *
 * Lives in its own (server-safe) module on purpose: sreemangal-map.tsx
 * statically imports Leaflet, which throws on `window` when its module graph
 * is evaluated during server rendering. Footnotes must be importable from
 * SSR'd client components without pulling Leaflet into the server bundle.
 */
export function MapFootnote() {
  return (
    <p className="label-micro leading-relaxed text-steel">
      REAL MAP DATA © OPENSTREETMAP CONTRIBUTORS · {RIDE_METRICS_NOTE}
    </p>
  );
}
