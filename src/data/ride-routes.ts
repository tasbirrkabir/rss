/**
 * "RIDES WORTH TAKING" - the route library (brief section 07).
 *
 * Honesty rule: durations are approximate demo labels, no distances are
 * claimed, and every card points out that real numbers are confirmed on
 * request. Nothing here is presented as an owner-verified itinerary.
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
  /** Slugs in DESTINATIONS for internal cross-linking. */
  relatedDestinations: string[];
};

export const RIDE_ROUTES: RideRoute[] = [
  {
    id: "tea-garden-loop",
    slug: "tea-garden-loop",
    title: "THE TEA GARDEN LOOP",
    tags: ["EASY", "SCENIC", "HALF DAY"],
    durationLabel: "HALF DAY (APPROX.)",
    character: "Easy riding on gentle roads - the classic first ride.",
    highlights: [
      "Endless tea rows",
      "Seven-layer tea stop",
      "Estate side roads",
    ],
    startTime: "EARLY MORNING",
    image: "/images/dest-tea-gardens.png",
    imageAlt: "Red scooty beside rolling green tea garden rows near Sreemangal",
    description:
      "The ride that explains Sreemangal. Out through the garden roads, stop when the light looks good, drink tea when your hands are free. Short, gentle and impossible to get wrong.",
    stops: [
      "PICK UP ON JALALIA ROAD",
      "GARDEN ROADS LOOP",
      "SEVEN-LAYER TEA STOP",
      "BACK TO TOWN",
    ],
    relatedDestinations: ["tea-gardens", "sreemangal-town"],
  },
  {
    id: "forest-escape",
    slug: "forest-escape",
    title: "THE FOREST ESCAPE",
    tags: ["ADVENTURE", "NATURE"],
    durationLabel: "MOST OF A DAY (APPROX.)",
    character: "Shaded roads and deep green - for riders who like quiet.",
    highlights: [
      "Shaded forest highway",
      "Lawachara edge trails",
      "Gibbon territory - bring patience",
    ],
    startTime: "MORNING",
    image: "/images/dest-lawachara.png",
    imageAlt: "Sunlit rainforest trail inside Lawachara National Park",
    description:
      "Leave the gardens behind and ride into the region's most recognizable landscape. The forest highway does the work; Lawachara does the rest. Walk the last part - the forest floor is better on foot.",
    stops: [
      "PICK UP ON JALALIA ROAD",
      "FOREST HIGHWAY",
      "LAWACHARA ENTRANCE + WALK",
      "VILLAGE ROAD RETURN",
    ],
    relatedDestinations: ["lawachara", "hidden-roads"],
  },
  {
    id: "slow-sreemangal-ride",
    slug: "slow-sreemangal-ride",
    title: "THE SLOW SREEMANGAL RIDE",
    tags: ["RELAXED", "PHOTOGRAPHY"],
    durationLabel: "AFTERNOON TO SUNSET (APPROX.)",
    character: "No schedule, no summit - just the good light.",
    highlights: [
      "Village lanes",
      "Baikka Beel golden hour",
      "Tea stall conversations",
    ],
    startTime: "AFTERNOON",
    image: "/images/rider-road.png",
    imageAlt: "Rider on a red scooty following a quiet road through green plantations",
    description:
      "The anti-itinerary. Drift through village roads, stop for every good shadow, and aim the last leg at the wetland for golden hour. The ride is the destination - the photos are the receipt.",
    stops: [
      "PICK UP ON JALALIA ROAD",
      "VILLAGE LANES",
      "BAIKKA BEEL FOR SUNSET",
      "BACK AFTER DARK",
    ],
    relatedDestinations: ["baikka-beel", "hidden-roads"],
  },
];

export const ROUTE_METRICS_NOTE =
  "DURATIONS ARE DEMO ESTIMATES · DISTANCES SHOWN AS — UNTIL VERIFIED · WE CONFIRM THE REAL NUMBERS WHEN YOU BOOK";

export function findRoute(id: string | null | undefined): RideRoute | undefined {
  return RIDE_ROUTES.find((r) => r.id === id);
}
