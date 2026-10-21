"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { DESTINATIONS, HQ_GEO } from "@/data/destinations";
import type { RideRoute } from "@/data/ride-routes";
import { SITE } from "@/data/site";
import { FallbackTileLayer } from "@/components/map/fallback-tile-layer";
import { cn } from "@/lib/utils";

/**
 * Interactive ROUTE map for /routes — one Leaflet map bound to the active
 * route (selection state lives on the page).
 *
 * Geometry integrity (revision brief §3/§9):
 * - Waypoints are the VERIFIED coordinates from ride-routes.ts (first = HQ).
 * - The map ATTEMPTS real road geometry from the public OSRM demo server,
 *   combining all waypoints into one request. Results are cached in a
 *   module-level Map (an external store) so switching routes never refetches.
 * - If OSRM is unavailable (error or 4s timeout), the map falls back to
 *   straight dashed lines BETWEEN waypoints — and the label says so.
 *   A schematic line is never presented as a navigation route.
 * - Tiles self-heal across providers — see fallback-tile-layer.tsx.
 */

const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const OSRM_TIMEOUT_MS = 4000;

type LatLng = [number, number];

/* ============================================================
   Geometry store — module-level cache + pub/sub, consumed via
   useSyncExternalStore (no setState-in-effect cascades).
   ============================================================ */

/**
 * Geometry store state. Discriminated so narrowing is explicit:
 * "pending" = OSRM request not resolved yet, "resolved" = real geometry
 * or null when OSRM failed (honest fallback).
 */
type GeometryState =
  | { kind: "pending" }
  | { kind: "resolved"; geometry: LatLng[] | null };

/** route.id -> resolved real-road geometry, or null when OSRM failed. */
const geometryCache = new Map<string, GeometryState>();

/** Shared stable snapshot for "not resolved yet" (must be reference-stable). */
const PENDING: GeometryState = { kind: "pending" };

const geometryListeners = new Set<() => void>();

function subscribeGeometry(listener: () => void): () => void {
  geometryListeners.add(listener);
  return () => {
    geometryListeners.delete(listener);
  };
}

function notifyGeometry(): void {
  for (const listener of geometryListeners) listener();
}

async function fetchRoadGeometry(route: RideRoute): Promise<void> {
  if (geometryCache.has(route.id)) return;

  const coords = route.waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `${OSRM_URL}/${coords}?overview=full&geometries=geojson`;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), OSRM_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`OSRM responded ${res.status}`);
    const data = (await res.json()) as {
      code?: string;
      routes?: Array<{ geometry?: { coordinates?: Array<[number, number]> } }>;
    };
    const line = data.routes?.[0]?.geometry?.coordinates;
    if (data.code !== "Ok" || !line || line.length < 2) {
      throw new Error("OSRM returned no usable geometry");
    }
    // GeoJSON is [lng, lat]; Leaflet wants [lat, lng].
    const latlngs: LatLng[] = line.map(([lng, lat]) => [lat, lng]);
    geometryCache.set(route.id, { kind: "resolved", geometry: latlngs });
  } catch {
    // Honest fallback: remember the failure so we never refetch-loop.
    geometryCache.set(route.id, { kind: "resolved", geometry: null });
  } finally {
    window.clearTimeout(timer);
    notifyGeometry();
  }
}

/** Cache- and in-flight-deduplicated request wrapper. */
const inFlight = new Map<string, Promise<void>>();

function requestRoadGeometry(route: RideRoute): Promise<void> {
  if (geometryCache.has(route.id)) return Promise.resolve();
  const existing = inFlight.get(route.id);
  if (existing) return existing;
  const promise = fetchRoadGeometry(route).finally(() =>
    inFlight.delete(route.id),
  );
  inFlight.set(route.id, promise);
  return promise;
}

/* ============================================================
   Map pieces
   ============================================================ */

/** Reverse lookup: verified waypoint -> destination display name (data-driven). */
const destinationByGeo = new Map<string, { name: string; type: string }>();
for (const d of DESTINATIONS) {
  destinationByGeo.set(`${d.geo.lat},${d.geo.lng}`, {
    name: d.name,
    type: d.type,
  });
}

function waypointIcon(isHq: boolean, index: number) {
  const size = isHq ? 26 : 20;
  const anchor = size / 2;
  const label = isHq ? "HQ" : String(index + 1);
  const fontSize = isHq ? 8.5 : 10;
  return L.divIcon({
    className: "smg-marker",
    html: `<span class="smg-marker-pin${isHq ? " smg-marker-pin--hq" : ""}" style="font:700 ${fontSize}px/1 var(--font-dm-sans),sans-serif;color:${isHq ? "#f4f1ea" : "#ffffff"};">${label}</span>`,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor],
    popupAnchor: [0, -anchor - 2],
  });
}

type GeometryStatus = "loading" | "real" | "schematic";

const STATUS_LABELS: Record<GeometryStatus, string> = {
  loading: "FINDING ROAD GEOMETRY…",
  real: "REAL ROAD GEOMETRY VIA OSRM · OSM DATA",
  schematic: "SCHEMATIC WAYPOINT LINE — NOT A NAVIGATION ROUTE",
};

/** Re-measures the map when its container resizes (mobile-safe). */
function SizeKeeper() {
  const map = useMap();

  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);

  return null;
}

/** Flies to the active route's waypoint bounds whenever the selection changes. */
function RouteFlyController({ route }: { route: RideRoute }) {
  const map = useMap();
  const firstRun = useRef(true);

  useEffect(() => {
    const bounds = L.latLngBounds(
      route.waypoints.map(([lat, lng]) => [lat, lng] as LatLng),
    );
    if (firstRun.current) {
      // Initial fit — no animation on first paint.
      firstRun.current = false;
      map.fitBounds(bounds, { padding: [42, 42] });
      return;
    }
    map.flyToBounds(bounds, { padding: [42, 42], duration: 0.8 });
  }, [route, map]);

  return null;
}

export type RouteMapProps = {
  route: RideRoute;
};

export default function RouteMap({ route }: RouteMapProps) {
  // Resolved geometry lives in the external module cache; subscribing keeps
  // the map in sync without local setState effects.
  const resolved = useSyncExternalStore(
    subscribeGeometry,
    () => geometryCache.get(route.id) ?? PENDING,
    () => PENDING,
  );

  const status: GeometryStatus =
    resolved.kind === "pending"
      ? "loading"
      : resolved.geometry === null
        ? "schematic"
        : "real";

  const realGeometry: LatLng[] | null =
    resolved.kind === "resolved" ? resolved.geometry : null;

  // Trigger the (cache-aware) OSRM request; the result lands in the store.
  useEffect(() => {
    void requestRoadGeometry(route);
  }, [route]);

  const initialBounds = useMemo(
    () =>
      L.latLngBounds(route.waypoints.map(([lat, lng]) => [lat, lng] as LatLng)),
    [route],
  );

  return (
    <div className="relative h-full w-full">
      <MapContainer
        bounds={initialBounds}
        boundsOptions={{ padding: [42, 42] }}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl
      >
        <FallbackTileLayer />
        <SizeKeeper />
        <RouteFlyController route={route} />

        {/* Route line: real road geometry, or honest dashed schematic.
            Distinct keys force a fresh Leaflet layer per state — otherwise
            Leaflet's setStyle keeps the stale dashArray when switching. */}
        {realGeometry ? (
          <Polyline
            key={`real-${route.id}`}
            positions={realGeometry}
            pathOptions={{ color: "#f5222d", weight: 3.5, opacity: 0.9 }}
          />
        ) : (
          <Polyline
            key={`schematic-${route.id}`}
            positions={route.waypoints}
            pathOptions={{
              color: "#111111",
              weight: 2.5,
              opacity: 0.85,
              dashArray: "6 8",
            }}
          />
        )}

        {/* Waypoint markers — numbered pins, HQ styled */}
        {route.waypoints.map(([lat, lng], i) => {
          const isHq = lat === HQ_GEO.lat && lng === HQ_GEO.lng;
          const dest = destinationByGeo.get(`${lat},${lng}`);
          return (
            <Marker
              key={`${route.id}-${i}-${lat},${lng}`}
              position={[lat, lng]}
              icon={waypointIcon(isHq, i)}
              zIndexOffset={isHq ? 400 : 0}
            >
              <Popup className="smg-popup">
                <div className="p-3">
                  {isHq ? (
                    <>
                      <p className="label-micro text-brand">
                        WAYPOINT {String(i + 1).padStart(2, "0")} · START /
                        FINISH
                      </p>
                      <p className="mt-1 font-display text-xl leading-tight tracking-wide text-ink">
                        DEMO SCOOTY HQ
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        {SITE.addressLine1} · Plus code {SITE.plusCode}
                      </p>
                    </>
                  ) : dest ? (
                    <>
                      <p className="label-micro text-brand">{dest.type}</p>
                      <p className="mt-1 font-display text-xl leading-tight tracking-wide text-ink">
                        {dest.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        WAYPOINT {String(i + 1).padStart(2, "0")} ON{" "}
                        {route.title}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="label-micro text-brand">
                        WAYPOINT {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-display text-xl leading-tight tracking-wide text-ink">
                        {route.title}
                      </p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Geometry honesty label — always visible over the map */}
      <p
        aria-live="polite"
        className={cn(
          "label-micro absolute bottom-3 left-3 z-[500] max-w-[calc(100%-24px)] px-2.5 py-1.5 leading-relaxed sm:max-w-sm",
          status === "schematic" ? "bg-brand text-white" : "bg-ink text-cream",
        )}
      >
        {STATUS_LABELS[status]}
      </p>
    </div>
  );
}
