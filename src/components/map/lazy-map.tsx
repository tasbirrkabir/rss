"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

/**
 * Lazy map wrapper — Leaflet + OpenStreetMap tiles load client-side only,
 * after layout, keeping first paint fast (brief §24: map lazy loading).
 */
const SreemangalMap = dynamic(() => import("./sreemangal-map"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-[#e8e4da]"
    >
      <div className="flex items-center gap-2 text-steel">
        <MapPin className="h-4 w-4 animate-pulse" />
        <span className="label-micro">LOADING MAP…</span>
      </div>
    </div>
  ),
});

export function LazySreemangalMap({
  selected,
  onSelect,
}: {
  selected?: string | null;
  onSelect?: (slug: string) => void;
}) {
  return <SreemangalMap selected={selected} onSelect={onSelect} />;
}
