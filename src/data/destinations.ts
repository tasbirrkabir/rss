/**
 * Destination data for the Explore section (PRD sections 18 / 37).
 *
 * Safety rule: no route is advertised as scooty-appropriate beyond public
 * road access. Distances use "approx." and are sourced from the PRD research
 * (Lawachara ~8 km, Madhabpur Lake ~20 km from town per cited travel guides).
 */

export type Destination = {
  slug: string;
  name: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
  distanceLabel?: string;
  goodFor: string[];
  mapQuery: string;
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
    goodFor: ["MORNINGS", "PHOTOS"],
    mapQuery: "Sreemangal Tea Gardens",
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
    goodFor: ["FOREST", "WILDLIFE"],
    mapQuery: "Lawachara National Park",
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
    goodFor: ["AFTERNOON", "PHOTOS"],
    mapQuery: "Madhabpur Lake",
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
    goodFor: ["SUNRISE", "BIRDS"],
    mapQuery: "Baikka Beel Sreemangal",
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
    goodFor: ["FREEDOM", "REELS"],
    mapQuery: "Sreemangal",
  },
];
