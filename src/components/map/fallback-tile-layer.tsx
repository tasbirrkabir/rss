"use client";

import { useEffect, useRef, useState } from "react";
import { TileLayer } from "react-leaflet";

import { TILE_MAX_ZOOM, TILE_PROVIDERS } from "@/components/map/tiles";

/**
 * Self-healing tile layer — mobile networks (and captive portals) sometimes
 * cannot reach a specific tile host. After a few consecutive tile errors the
 * map silently switches to the next provider in the chain instead of showing
 * a grey map. Attribution updates accordingly.
 */
export function FallbackTileLayer() {
  const [index, setIndex] = useState(0);
  const errorCount = useRef(0);
  const switching = useRef(false);

  const provider = TILE_PROVIDERS[Math.min(index, TILE_PROVIDERS.length - 1)];
  const canFallback = index < TILE_PROVIDERS.length - 1;

  // Reset counters whenever the provider changes.
  useEffect(() => {
    errorCount.current = 0;
    switching.current = false;
  }, [index]);

  return (
    <TileLayer
      key={provider.url}
      url={provider.url}
      attribution={provider.attribution}
      subdomains={provider.subdomains ?? "abc"}
      maxZoom={TILE_MAX_ZOOM}
      keepBuffer={3}
      eventHandlers={
        canFallback
          ? {
              tileerror: () => {
                if (switching.current) return;
                errorCount.current += 1;
                if (errorCount.current >= 4) {
                  switching.current = true;
                  setIndex((i) => Math.min(i + 1, TILE_PROVIDERS.length - 1));
                }
              },
            }
          : undefined
      }
    />
  );
}
