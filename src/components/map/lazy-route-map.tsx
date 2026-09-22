"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

import type { RideRoute } from "@/data/ride-routes";

/**
 * Lazy route map wrapper — Leaflet + OSRM routing load client-side only,
 * after layout, keeping first paint fast.
 */
const RouteMap = dynamic(() => import("./route-map"), {
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

export function LazyRouteMap({ route }: { route: RideRoute }) {
  return <RouteMap route={route} />;
}
