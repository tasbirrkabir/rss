"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { DESTINATIONS, HQ_GEO } from "@/data/destinations";
import { SITE } from "@/data/site";

/**
 * Real geographic map (OpenStreetMap tiles via React Leaflet).
 * - HQ marker at the verified business listing position (plus code 8P3M+JMQ).
 * - Destination markers only at VERIFIED coordinates (OSM/Wikipedia sources).
 * - Tile provider is configurable via NEXT_PUBLIC_MAP_TILE_URL so the
 *   public OSM infrastructure can be swapped for a dedicated provider later.
 */
const TILE_URL =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ??
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

const hqIcon = L.divIcon({
  className: "smg-marker",
  html: '<span class="smg-marker-pin smg-marker-pin--hq"></span>',
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  popupAnchor: [0, -14],
});

function destIcon(access: string, selected: boolean) {
  const cls =
    access === "trek"
      ? "smg-marker-pin smg-marker-pin--trek"
      : selected
        ? "smg-marker-pin smg-marker-pin--hq"
        : "smg-marker-pin";
  return L.divIcon({
    className: "smg-marker",
    html: `<span class="${cls}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });
}

/** Flies to the selected destination and opens its popup. */
function MapController({
  selected,
  markerRefs,
}: {
  selected: string | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;
    const dest = DESTINATIONS.find((d) => d.slug === selected);
    if (!dest) return;
    const marker = markerRefs.current[selected];
    const targetZoom = Math.max(map.getZoom(), 12);
    map.flyTo([dest.geo.lat, dest.geo.lng], targetZoom, { duration: 0.7 });
    if (marker) {
      window.setTimeout(() => marker.openPopup(), 380);
    }
  }, [selected, map, markerRefs]);

  return null;
}

export type SreemangalMapProps = {
  selected: string | null;
  onSelect: (slug: string) => void;
};

export default function SreemangalMap({ selected, onSelect }: SreemangalMapProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  const bounds = L.latLngBounds([
    [HQ_GEO.lat, HQ_GEO.lng],
    ...DESTINATIONS.map((d) => [d.geo.lat, d.geo.lng] as [number, number]),
  ]);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [36, 36] }}
      scrollWheelZoom={false}
      className="h-full w-full"
      attributionControl
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <MapController selected={selected} markerRefs={markerRefs} />

      {/* HQ — verified business location */}
      <Marker position={[HQ_GEO.lat, HQ_GEO.lng]} icon={hqIcon}>
        <Popup className="smg-popup">
          <div className="p-3">
            <p className="label-micro text-brand">START HERE</p>
            <p className="mt-1 font-display text-xl leading-tight tracking-wide text-ink">
              RED SCOOTY SREEMANGAL
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {SITE.addressLine1} · Plus code {SITE.plusCode}
            </p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-bold tracking-wide text-brand hover:underline"
            >
              GET DIRECTIONS →
            </a>
          </div>
        </Popup>
      </Marker>

      {/* Destinations — verified coordinates only */}
      {DESTINATIONS.map((d) => (
        <Marker
          key={d.slug}
          position={[d.geo.lat, d.geo.lng]}
          icon={destIcon(d.access, d.slug === selected)}
          ref={(m) => {
            markerRefs.current[d.slug] = m;
          }}
          eventHandlers={{ click: () => onSelect(d.slug) }}
        >
          <Popup className="smg-popup">
            <div className="p-3">
              <p className="label-micro text-brand">{d.type}</p>
              <p className="mt-1 font-display text-xl leading-tight tracking-wide text-ink">
                {d.name}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                {d.description.length > 96
                  ? `${d.description.slice(0, 96)}…`
                  : d.description}
              </p>
              <dl className="mt-2 space-y-1 border-t border-ink/10 pt-2 text-xs">
                {d.distanceLabel ? (
                  <div className="flex justify-between gap-2">
                    <dt className="text-steel">DISTANCE</dt>
                    <dd className="font-bold text-ink">{d.distanceLabel}</dd>
                  </div>
                ) : null}
                {d.rideTimeLabel && d.access !== "trek" ? (
                  <div className="flex justify-between gap-2">
                    <dt className="text-steel">RIDE TIME</dt>
                    <dd className="font-bold text-ink">
                      {d.rideTimeLabel}{" "}
                      <span className="font-normal text-steel">(DEMO)</span>
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-ink/10 pt-2">
                <a
                  href={`/routes?dest=${d.slug}`}
                  className="text-xs font-bold tracking-wide text-ink hover:text-brand"
                >
                  EXPLORE ROUTE →
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-wide text-brand hover:underline"
                >
                  DIRECTIONS
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
