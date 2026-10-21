/**
 * "RIDES WORTH TAKING" — the route library.
 *
 * Geographic integrity (revision brief §9):
 * - Waypoint coordinates are the SAME verified points used on the map
 *   (OSM/Wikipedia sources — see destinations.ts).
 * - Distances quote published figures; anything estimated is labelled
 *   DEMO DATA. Durations are approximate demo labels.
 * - Nothing here is presented as an official owner-verified itinerary.
 * - Route lines drawn from these waypoints are schematic unless real
 *   road geometry is fetched (the map component attempts OSRM and
 *   falls back to clearly-labelled straight lines).
 */

export type RideRoute = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  durationLabel: string;
  character: string;
  highlights: string[];
  startTime: string;
  image: string;
  imageAlt: string;
  description: string;
  stops: string[];
  /** Verified waypoint coordinates [lat, lng] — first point is HQ. */
  waypoints: [number, number][];
  /** Published/estimated road distance, one-way where noted. */
  distanceLabel: string;
  distanceSource: string;
  /** Slugs in DESTINATIONS for internal cross-linking. */
  relatedDestinations: string[];
};

/** Verified HQ position (plus code 8P3M+JMQ). */
const HQ: [number, number] = [24.3040891, 91.7342349];

/** Verified destination points (see destinations.ts for sources). */
const TEA_VIEW: [number, number] = [24.29996, 91.759987];
const LAWACHARA_GATE: [number, number] = [24.325016, 91.787181];
const MADHABPUR: [number, number] = [24.2812, 91.8181];
const BAIKKA: [number, number] = [24.351474, 91.705516];

export const RIDE_ROUTES: RideRoute[] = [
  {
    id: "tea-garden-loop",
    slug: "tea-garden-loop",
    title: "THE TEA GARDEN LOOP",
    tags: ["EASY", "SCENIC", "HALF DAY"],
    durationLabel: "HALF DAY (APPROX.)",
    character: "Easy riding on gentle roads — the classic first ride.",
    highlights: [
      "Endless tea rows",
      "Seven-layer tea stop",
      "Estate side roads",
    ],
    startTime: "EARLY MORNING",
    image: "/images/dest-tea-gardens.webp",
    imageAlt: "Demo scooty beside rolling green tea garden rows near Sreemangal",
    description:
      "The ride that explains Sreemangal. Out through the garden roads, stop when the light looks good, drink tea when your hands are free. Short, gentle and impossible to get wrong.",
    stops: [
      "PICK UP ON DEMO ROAD",
      "GARDEN ROADS LOOP (TEA MUSEUM STRETCH)",
      "SEVEN-LAYER TEA STOP",
      "BACK TO TOWN",
    ],
    waypoints: [HQ, TEA_VIEW, HQ],
    distanceLabel: "≈8 KM ROUND TRIP",
    distanceSource: "derived from the garden-road stretch — DEMO DATA",
    relatedDestinations: ["tea-gardens", "sreemangal-town"],
  },
  {
    id: "forest-escape",
    slug: "forest-escape",
    title: "THE FOREST ESCAPE",
    tags: ["ADVENTURE", "NATURE"],
    durationLabel: "MOST OF A DAY (APPROX.)",
    character: "Shaded roads and deep green — for riders who like quiet.",
    highlights: [
      "Shaded forest highway",
      "Lawachara main-gate trails",
      "Gibbon territory — bring patience",
    ],
    startTime: "MORNING",
    image: "/images/dest-lawachara.webp",
    imageAlt: "Sunlit rainforest trail inside Lawachara National Park",
    description:
      "Leave the gardens behind and ride the paved Sreemangal–Bhanugach road into the region's most recognizable landscape. Park at the main gate and walk the forest floor — it's better on foot.",
    stops: [
      "PICK UP ON DEMO ROAD",
      "FOREST HIGHWAY (PAVED, 7–8 KM)",
      "LAWACHARA MAIN GATE + WALK",
      "VILLAGE ROAD RETURN",
    ],
    waypoints: [HQ, TEA_VIEW, LAWACHARA_GATE, HQ],
    distanceLabel: "7–8 KM EACH WAY",
    distanceSource: "Wikipedia ('8 km') + traveller reports ('7 km')",
    relatedDestinations: ["lawachara", "hidden-roads"],
  },
  {
    id: "lake-run",
    slug: "lake-run",
    title: "THE LAKE RUN",
    tags: ["SCENIC", "PHOTOGRAPHY"],
    durationLabel: "MOST OF A DAY (APPROX.)",
    character: "The long scenic run — tea roads all the way out to the water.",
    highlights: [
      "Hilly tea-estate roads",
      "Madhabpur Lake between the hills",
      "Dry-season best",
    ],
    startTime: "MORNING",
    image: "/images/dest-madhabpur.webp",
    imageAlt: "Madhabpur Lake reflecting the surrounding green tea hills",
    description:
      "Point the scooty at Kamalganj and let the estate roads roll. Madhabpur Lake sits in its bowl of tea hills about 16 km out — the ride there is every bit as good as the lake. Roads can be muddy after rain; best in the dry season.",
    stops: [
      "PICK UP ON DEMO ROAD",
      "GARDEN ROAD OUT OF TOWN",
      "MADHABPUR LAKE (+ TEA ESTATE)",
      "RETURN BY THE SAME SCENIC ROAD",
    ],
    waypoints: [HQ, TEA_VIEW, MADHABPUR, HQ],
    distanceLabel: "≈16 KM EACH WAY",
    distanceSource: "beautifulbangladesh.gov.bd (official)",
    relatedDestinations: ["madhabpur-lake", "tea-gardens"],
  },
  {
    id: "slow-sreemangal-ride",
    slug: "slow-sreemangal-ride",
    title: "THE SLOW SREEMANGAL RIDE",
    tags: ["RELAXED", "SUNSET"],
    durationLabel: "AFTERNOON TO SUNSET (APPROX.)",
    character: "No schedule, no summit — just the good light.",
    highlights: [
      "Village lanes",
      "Baikka Beel golden hour",
      "Tea stall conversations",
    ],
    startTime: "AFTERNOON",
    image: "/images/rider-road.webp",
    imageAlt: "Rider on a demo scooty following a quiet road through green plantations",
    description:
      "The anti-itinerary. Drift through village roads, stop for every good shadow, and aim the last leg at the wetland for golden hour. The last stretch to Baikka is a rougher country road — take it easy. The ride is the destination; the photos are the receipt.",
    stops: [
      "PICK UP ON DEMO ROAD",
      "VILLAGE LANES",
      "BAIKKA BEEL FOR SUNSET (ROUGH LAST STRETCH)",
      "BACK AFTER DARK",
    ],
    waypoints: [HQ, BAIKKA, HQ],
    distanceLabel: "≈17–20 KM EACH WAY",
    distanceSource: "travel-guide published figures",
    relatedDestinations: ["baikka-beel", "hidden-roads"],
  },
];

export const ROUTE_METRICS_NOTE =
  "DISTANCES FROM PUBLISHED SOURCES OR MARKED DEMO DATA · DURATIONS ARE ESTIMATES · REAL NUMBERS CONFIRMED WHEN YOU BOOK";

export function findRoute(id: string | null | undefined): RideRoute | undefined {
  return RIDE_ROUTES.find((r) => r.id === id);
}
