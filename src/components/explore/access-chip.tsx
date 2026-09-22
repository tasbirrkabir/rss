import { Bike, Footprints, TriangleAlert } from "lucide-react";

import type { Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";

/**
 * Server-safe shared access vocabulary for /explore (map panel, editorial
 * rows, legend). Lives OUTSIDE the client map-section module so plain
 * helpers can be called from server components too.
 */

const ACCESS_META: Record<
  Destination["access"],
  { label: string; chipClass: string; Icon: typeof Bike }
> = {
  ride: {
    label: "SCOOTY-FRIENDLY",
    chipClass: "border-leaf/30 bg-leaf/10 text-leaf",
    Icon: Bike,
  },
  "ride-rough": {
    label: "ROUGH LAST STRETCH",
    chipClass: "border-brand/30 bg-brand/10 text-brand",
    Icon: TriangleAlert,
  },
  trek: {
    label: "JEEP + TREK ONLY",
    chipClass: "border-ink/25 bg-ink text-cream",
    Icon: Footprints,
  },
};

/**
 * Access chip for a destination — "SCOOTY-FRIENDLY" / "ROUGH LAST STRETCH" /
 * "JEEP + TREK ONLY". Informational (non-interactive) by design.
 */
export function AccessChip({
  access,
  className,
}: {
  access: Destination["access"];
  className?: string;
}) {
  const { label, chipClass, Icon } = ACCESS_META[access];
  return (
    <span
      className={cn(
        "label-micro inline-flex items-center gap-1.5 border px-2.5 py-1",
        chipClass,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * Normalized one-line label for a destination's verified-coordinate source
 * (full source string stays in the data file and surfaces via title attr).
 */
export function geoSourceLabel(geoSource: string): string {
  if (geoSource.startsWith("OSM")) return "COORDS VIA OPENSTREETMAP";
  if (geoSource.startsWith("Wikipedia")) return "COORDS VIA WIKIPEDIA";
  if (geoSource.includes("Wikidata")) return "COORDS VIA WIKIDATA";
  return "COORDS VERIFIED";
}
