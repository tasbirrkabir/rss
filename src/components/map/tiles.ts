/**
 * Shared tile-provider configuration for all Leaflet maps.
 *
 * The list is tried IN ORDER: when tiles from the primary provider fail
 * repeatedly (blocked network, captive portal, flaky mobile ISP), the map
 * automatically switches to the next provider — see fallback-tile-layer.tsx.
 *
 * Both are raster providers with no API key. Attribution stays visible for
 * whichever one is live (an OpenStreetMap usage requirement).
 *
 * Single-provider override (unchanged contract):
 *   NEXT_PUBLIC_MAP_TILE_URL + NEXT_PUBLIC_MAP_TILE_ATTRIBUTION
 */

export type TileProvider = {
  url: string;
  attribution: string;
  subdomains?: string;
};

const OSM_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

/** Ceiling so over-zooming never serves blank tiles. */
export const TILE_MAX_ZOOM = 20;

const PROVIDERS: TileProvider[] = [
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: OSM_ATTR,
    subdomains: "abc",
  },
  {
    // OpenStreetMap Germany mirror — independent infrastructure.
    url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    attribution: `${OSM_ATTR} · <a href="https://www.openstreetmap.de" target="_blank" rel="noopener">openstreetmap.de</a>`,
  },
  {
    // HOT style (OpenStreetMap France) — independent infrastructure.
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution: `${OSM_ATTR} · <a href="https://www.hotosm.org" target="_blank" rel="noopener">HOT</a>`,
    subdomains: "abc",
  },
];

export const TILE_PROVIDERS: TileProvider[] =
  process.env.NEXT_PUBLIC_MAP_TILE_URL
    ? [
        {
          url: process.env.NEXT_PUBLIC_MAP_TILE_URL,
          attribution:
            process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ?? OSM_ATTR,
        },
        ...PROVIDERS,
      ]
    : PROVIDERS;
