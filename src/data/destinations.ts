/**
 * Destination data for the Explore page, home map and ride passport.
 *
 * GEOGRAPHIC INTEGRITY RULE (revision brief §7/§8):
 * - All lat/lng below are VERIFIED from public geographic sources
 *   (OpenStreetMap objects, Wikipedia/Wikidata). Sources noted per entry.
 * - Road distances quote published travel sources where available; anything
 *   derived or estimated is labelled DEMO DATA in the UI.
 * - Ride times are approximations only — always surfaced with a DEMO DATA tag.
 * - Ham Ham is NOT scooty-accessible (jeep + guided trek) and is never
 *   presented as a ride destination.
 */

export type Destination = {
  slug: string;
  name: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Published road distance (source noted) or a demo estimate. */
  distanceLabel?: string;
  /** Where the distance figure comes from (shown as tiny metadata). */
  distanceSource?: string;
  /** Rough scooty ride time — surfaced with a DEMO DATA tag. */
  rideTimeLabel?: string;
  routeType?: string;
  whyGo?: string;
  goodFor: string[];
  /** Google Maps search query for "Get directions". */
  mapQuery: string;
  /** VERIFIED geographic coordinates. */
  geo: { lat: number; lng: number };
  /** Source of the coordinates (UI-facing shorthand). */
  geoSource: string;
  /** Road note for riders (paved vs rough etc). */
  roadNote?: string;
  /** Scooty access: "ride" (fine) | "ride-rough" (partial) | "trek" (not by scooty) */
  access: "ride" | "ride-rough" | "trek";
  /** Optional passport stamp destination. */
  passport?: boolean;
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "tea-gardens",
    name: "TEA GARDENS",
    type: "ICONIC SREEMANGAL",
    description:
      "Rows of emerald tea bushes rolling over low hills around town — the reason Sreemangal is called the tea capital of Bangladesh.",
    image: "/images/dest-tea-gardens.webp",
    imageAlt: "Rolling green tea garden rows under morning mist in Sreemangal",
    distanceLabel: "≈3–4 KM",
    distanceSource: "derived from Tea Museum stretch on the garden road (DEMO DATA)",
    rideTimeLabel: "≈10 MIN",
    routeType: "GARDEN ROADS · PAVED",
    whyGo: "The postcard view is a moving one. Green, all the way.",
    goodFor: ["MORNINGS", "PHOTOS"],
    mapQuery: "Sreemangal Tea Gardens",
    geo: { lat: 24.29996, lng: 91.759987 },
    geoSource: "OSM Tea Museum way 34580584 / viewpoint node 13360929201",
    roadNote: "Flat paved garden road (Sreemangal–Bhanugach Rd). Scooty-ideal.",
    access: "ride",
    passport: true,
  },
  {
    slug: "lawachara",
    name: "LAWACHARA",
    type: "NATIONAL PARK",
    description:
      "A dense evergreen rainforest with shaded trails, hanging vines and the famous hoolock gibbons. The classic Sreemangal ride.",
    image: "/images/dest-lawachara.webp",
    imageAlt: "Sunlit rainforest trail inside Lawachara National Park",
    distanceLabel: "7–8 KM",
    distanceSource: "Wikipedia ('8 km') + traveller reports ('7 km')",
    rideTimeLabel: "≈20–25 MIN",
    routeType: "FOREST ROAD · PAVED",
    whyGo: "One of the region's most recognizable natural landscapes.",
    goodFor: ["FOREST", "WILDLIFE"],
    mapQuery: "Lawachara National Park",
    geo: { lat: 24.325016, lng: 91.787181 },
    geoSource: "OSM main gate node 401422104; park centroid per Wikipedia",
    roadNote: "Paved Sreemangal–Bhanugach Road to the main gate; walking trails inside.",
    access: "ride",
    passport: true,
  },
  {
    slug: "madhabpur-lake",
    name: "MADHABPUR LAKE",
    type: "LAKE & HILLS",
    description:
      "A calm lake folded between tea-covered hills in Kamalganj. The ride out there is every bit as good as the destination itself.",
    image: "/images/dest-madhabpur.webp",
    imageAlt: "Madhabpur Lake reflecting the surrounding green tea hills",
    distanceLabel: "≈16 KM",
    distanceSource: "beautifulbangladesh.gov.bd (official)",
    rideTimeLabel: "≈35–45 MIN",
    routeType: "HILLY RURAL ROAD",
    whyGo: "The long scenic run — water and hills at the end of it.",
    goodFor: ["AFTERNOON", "PHOTOS"],
    mapQuery: "Madhabpur Lake Kamalganj",
    geo: { lat: 24.2812, lng: 91.8181 },
    geoSource: "Wikipedia Madhobpur Lake (24°16′52″N 91°49′05″E)",
    roadNote: "Tea-garden roads from Sreemangal; can be muddy after rain. Best in dry season.",
    access: "ride",
    passport: true,
  },
  {
    slug: "baikka-beel",
    name: "BAIKKA BEEL",
    type: "WETLAND",
    description:
      "A quiet wetland sanctuary at sunrise — still water, water lilies and birds in wide open sky. Worth an early start.",
    image: "/images/dest-baikka.webp",
    imageAlt: "Baikka Beel wetland at sunrise with water lilies and birds",
    distanceLabel: "≈17–20 KM",
    distanceSource: "travel-guide published figures (orientecotourism, touristplacesbd)",
    rideTimeLabel: "≈40 MIN",
    routeType: "WETLAND ROAD · PARTLY ROUGH",
    whyGo: "Golden hour over still water. Bring a camera, leave early.",
    goodFor: ["SUNRISE", "BIRDS"],
    mapQuery: "Baikka Beel Sreemangal",
    geo: { lat: 24.351474, lng: 91.705516 },
    geoSource: "OSM Baikka Beel Visitor Centre node 10146518044",
    roadNote:
      "Paved Sreemangal–Moulvibazar road, then a rougher country road to the sanctuary — rideable, expect the last stretch to be uneven.",
    access: "ride-rough",
    passport: true,
  },
  {
    slug: "hidden-roads",
    name: "HIDDEN ROADS",
    type: "LOCAL SECRET",
    description:
      "The quiet village roads between the gardens. No queues, no noise — just green, all the way. Ask us which turn to take.",
    image: "/images/dest-hidden-roads.webp",
    imageAlt: "Quiet rural road curving through greenery near Sreemangal",
    distanceLabel: "—",
    rideTimeLabel: "—",
    routeType: "VILLAGE ROADS",
    whyGo: "No plan. No queues. Just the quiet roads between the gardens.",
    goodFor: ["FREEDOM", "REELS"],
    mapQuery: "Sreemangal",
    geo: { lat: 24.308333, lng: 91.733333 },
    geoSource: "Sreemangal settlement point per Wikidata Q4526619 (area reference)",
    roadNote: "A web of paved and unpaved village lanes — we'll point you at the good ones.",
    access: "ride",
  },
  {
    slug: "ham-ham",
    name: "HAM HAM FALLS",
    type: "JEEP + TREK — NOT A RIDE",
    description:
      "A jungle waterfall deep in the Rajkandi Reserve Forest. The scooty gets you part of the way — the last leg is a jeep track plus a 2–3 hour guided trek.",
    image: "/images/dest-hamham.webp",
    imageAlt: "Waterfall cascading through dense green jungle in Bangladesh",
    distanceLabel: "≈32 KM + TREK",
    distanceSource: "distancesfrom.com road estimate + beautifulbangladesh.gov.bd trek notes",
    rideTimeLabel: "—",
    routeType: "NOT SCOOTY-ACCESSIBLE",
    whyGo: "The wildest destination on the map — for trekkers, not riders.",
    goodFor: ["ADVENTURE", "MONSOON"],
    mapQuery: "Ham Ham Waterfall",
    geo: { lat: 24.167972, lng: 91.912528 },
    geoSource: "Wikipedia Hum Hum Waterfall",
    roadNote:
      "Jeep/CNG to the Kalabanpara trailhead, then a guided jungle trek. Not suitable for scooties — plan a full day.",
    access: "trek",
  },
  {
    slug: "sreemangal-town",
    name: "SREEMANGAL TOWN",
    type: "BASE CAMP",
    description:
      "Bazaars, rickshaw chaos, tea stalls and the famous seven-layer tea. Where every ride starts and ends.",
    image: "/images/dest-town.webp",
    imageAlt: "Busy street in Sreemangal town with rickshaws and market stalls",
    distanceLabel: "0 KM — YOU'RE HERE",
    rideTimeLabel: "—",
    routeType: "TOWN STREETS",
    whyGo: "Seven-layer tea, market energy and the starting point of it all.",
    goodFor: ["FOOD", "TEA"],
    mapQuery: "Sreemangal Railway Station",
    geo: { lat: 24.306587, lng: 91.734756 },
    geoSource: "OSM Sreemangal Railway Station way 1545698095",
    roadNote: "Paved town roads; the station area is the usual pickup anchor.",
    access: "ride",
  },
];

export const PASSPORT_SLUGS = DESTINATIONS.filter((d) => d.passport).map(
  (d) => d.slug,
);

/** Footnote shown wherever approximate ride metrics appear. */
export const RIDE_METRICS_NOTE =
  "DISTANCES FROM PUBLISHED SOURCES · RIDE TIMES ARE DEMO ESTIMATES — CONFIRMED WHEN YOU BOOK";

/** HQ coordinates (verified against plus code 8P3M+JMQ). */
export const HQ_GEO = { lat: 24.3040891, lng: 91.7342349 };
