/**
 * Destination data for the Explore page, home map and ride passport.
 *
 * Safety rule: no route is advertised as scooty-appropriate beyond public
 * road access. Distances use "approx." and are sourced from the PRD research
 * (Lawachara ~8 km, Madhabpur Lake ~20 km from town per cited travel guides).
 * Ride times are DEMO approximations — real numbers are confirmed on request.
 *
 * `coords` are positions on the stylized SVG map (0–100 space). The map is
 * explicitly labelled "NOT TO SCALE" in the UI — it is an editorial diagram,
 * not a geographic reference.
 */

export type Destination = {
  slug: string;
  name: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
  distanceLabel?: string;
  rideTimeLabel?: string;
  routeType?: string;
  whyGo?: string;
  goodFor: string[];
  mapQuery: string;
  coords: { x: number; y: number };
  /** Destinations that collect a Ride Passport stamp (the four icons). */
  passport?: boolean;
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "tea-gardens",
    name: "TEA GARDENS",
    type: "ICONIC SREEMANGAL",
    description:
      "Rows of emerald tea bushes rolling over low hills around town - the reason Sreemangal is called the tea capital of Bangladesh.",
    image: "/images/dest-tea-gardens.png",
    imageAlt: "Rolling green tea garden rows under morning mist in Sreemangal",
    distanceLabel: "AROUND TOWN",
    rideTimeLabel: "APPROX. 5–15 MIN",
    routeType: "GARDEN ROADS",
    whyGo: "The postcard view is a moving one. Green, all the way.",
    goodFor: ["MORNINGS", "PHOTOS"],
    mapQuery: "Sreemangal Tea Gardens",
    coords: { x: 36, y: 42 },
    passport: true,
  },
  {
    slug: "lawachara",
    name: "LAWACHARA",
    type: "NATIONAL PARK",
    description:
      "A dense evergreen rainforest with shaded trails, hanging vines and the famous hoolock gibbons. The classic Sreemangal ride.",
    image: "/images/dest-lawachara.png",
    imageAlt: "Sunlit rainforest trail inside Lawachara National Park",
    distanceLabel: "APPROX. 8 KM",
    rideTimeLabel: "APPROX. 20–30 MIN",
    routeType: "FOREST ROAD",
    whyGo: "One of the region's most recognizable natural landscapes.",
    goodFor: ["FOREST", "WILDLIFE"],
    mapQuery: "Lawachara National Park",
    coords: { x: 66, y: 24 },
    passport: true,
  },
  {
    slug: "madhabpur-lake",
    name: "MADHABPUR LAKE",
    type: "LAKE & HILLS",
    description:
      "A calm lake folded between tea-covered hills. The ride out there is every bit as good as the destination itself.",
    image: "/images/dest-madhabpur.png",
    imageAlt: "Madhabpur Lake reflecting the surrounding green tea hills",
    distanceLabel: "APPROX. 20 KM",
    rideTimeLabel: "APPROX. 40–55 MIN",
    routeType: "HILLY RURAL ROAD",
    whyGo: "The long scenic run - water and hills at the end of it.",
    goodFor: ["AFTERNOON", "PHOTOS"],
    mapQuery: "Madhabpur Lake",
    coords: { x: 24, y: 18 },
    passport: true,
  },
  {
    slug: "baikka-beel",
    name: "BAIKKA BEEL",
    type: "WETLAND",
    description:
      "A quiet wetland at sunrise - still water, water lilies and birds in wide open sky. Worth an early start.",
    image: "/images/dest-baikka.png",
    imageAlt: "Baikka Beel wetland at sunrise with water lilies and birds",
    distanceLabel: "NEAR SREEMANGAL",
    rideTimeLabel: "APPROX. 30–40 MIN",
    routeType: "WETLAND ROAD",
    whyGo: "Golden hour over still water. Bring a camera, leave early.",
    goodFor: ["SUNRISE", "BIRDS"],
    mapQuery: "Baikka Beel Sreemangal",
    coords: { x: 76, y: 66 },
    passport: true,
  },
  {
    slug: "hidden-roads",
    name: "HIDDEN ROADS",
    type: "LOCAL SECRET",
    description:
      "The quiet village roads between the gardens. No queues, no noise - just green, all the way.",
    image: "/images/dest-hidden-roads.png",
    imageAlt: "Quiet rural road curving through greenery near Sreemangal",
    distanceLabel: "WE'LL POINT THE WAY",
    rideTimeLabel: "WHENEVER",
    routeType: "VILLAGE ROADS",
    whyGo: "No plan. No queues. Just the quiet roads between the gardens.",
    goodFor: ["FREEDOM", "REELS"],
    mapQuery: "Sreemangal",
    coords: { x: 58, y: 78 },
  },
  {
    slug: "ham-ham",
    name: "HAM HAM FALLS",
    type: "THE WILD ONE",
    description:
      "A jungle waterfall deep in the green. The ride gets you close - the last stretch is a walk, not a ride.",
    image: "/images/dest-hamham.png",
    imageAlt: "Waterfall cascading through dense green jungle in Bangladesh",
    distanceLabel: "FARTHEST OUT",
    rideTimeLabel: "APPROX. 60–75 MIN + TREK",
    routeType: "JUNGLE ROAD, PARTLY",
    whyGo: "The wildest destination on the map - and the sweatiest reward.",
    goodFor: ["ADVENTURE", "MONSOON"],
    mapQuery: "Ham Ham Waterfall",
    coords: { x: 84, y: 86 },
  },
  {
    slug: "sreemangal-town",
    name: "SREEMANGAL TOWN",
    type: "BASE CAMP",
    description:
      "Bazaars, rickshaw chaos, tea stalls and the famous seven-layer tea. Where every ride starts and ends.",
    image: "/images/dest-town.png",
    imageAlt: "Busy street in Sreemangal town with rickshaws and market stalls",
    distanceLabel: "0 KM — YOU'RE HERE",
    rideTimeLabel: "YOU'RE ALREADY RIDING IT",
    routeType: "TOWN STREETS",
    whyGo: "Seven-layer tea, market energy and the starting point of it all.",
    goodFor: ["FOOD", "TEA"],
    mapQuery: "Sreemangal Town",
    coords: { x: 52, y: 60 },
  },
];

export const PASSPORT_SLUGS = DESTINATIONS.filter((d) => d.passport).map(
  (d) => d.slug,
);

/** Footnote shown wherever approximate ride metrics appear. */
export const RIDE_METRICS_NOTE =
  "RIDE TIMES ARE DEMO ESTIMATES · REAL NUMBERS CONFIRMED WHEN YOU BOOK · MAP NOT TO SCALE";
