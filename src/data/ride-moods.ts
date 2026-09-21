/**
 * "BUILD YOUR RIDE" mood data (brief section 05 - the trip planner).
 * Five mood presets; each maps to a sample ride plan.
 *
 * Honesty rule: EST. TIME and DISTANCE stay "—" until real metrics are
 * owner-confirmed. The UI renders the dash placeholders deliberately.
 */

export type MoodStop = {
  label: string;
  note: string;
};

export type RideMood = {
  id: string;
  label: string;
  tagline: string;
  planTitle: string;
  stops: MoodStop[];
  estTime: string;
  distance: string;
  /** Query string appended to /book for prefill. */
  bookQuery: string;
};

export const RIDE_MOODS: RideMood[] = [
  {
    id: "tea-chill",
    label: "TEA & CHILL",
    tagline: "Slow rows, seven layers, zero rush.",
    planTitle: "YOUR TEA & CHILL RIDE",
    stops: [
      { label: "TEA ESTATE", note: "First light over the rows. Ride slow here." },
      { label: "TOWN TEA STOP", note: "The famous seven-layer tea. Earned." },
      { label: "SCENIC ROAD", note: "The long green way back - no hurry." },
      { label: "SUNSET STOP", note: "Pick your hill. Watch the light go." },
    ],
    estTime: "—",
    distance: "—",
    bookQuery: "tea-chill",
  },
  {
    id: "forest-adventure",
    label: "FOREST & ADVENTURE",
    tagline: "Shaded highways and gibbon country.",
    planTitle: "YOUR FOREST & ADVENTURE RIDE",
    stops: [
      { label: "STATION START", note: "Air in the tyres, plan in the head." },
      { label: "FOREST HIGHWAY", note: "The shaded run out of town." },
      { label: "LAWACHARA EDGE", note: "Park at the entrance. Walk in." },
      { label: "VILLAGE ROAD RETURN", note: "The quiet way home." },
    ],
    estTime: "—",
    distance: "—",
    bookQuery: "forest-adventure",
  },
  {
    id: "photo-day",
    label: "PHOTO DAY",
    tagline: "Chasing light between the rows.",
    planTitle: "YOUR PHOTO DAY RIDE",
    stops: [
      { label: "GOLDEN HOUR START", note: "Out before the heat and the crowd." },
      { label: "TEA ROWS", note: "Leading lines for days." },
      { label: "LAKE VIEWPOINT", note: "Water, hills, horizon." },
      { label: "VILLAGE PORTRAITS", note: "Ask first. Smile always." },
    ],
    estTime: "—",
    distance: "—",
    bookQuery: "photo-day",
  },
  {
    id: "slow-explorer",
    label: "SLOW EXPLORER",
    tagline: "No destination. All detour.",
    planTitle: "YOUR SLOW EXPLORER RIDE",
    stops: [
      { label: "OLD TOWN", note: "Start where the rickshaws wake up." },
      { label: "BAZAAR LANES", note: "Market energy, one gear up." },
      { label: "TEA STALL CIRCUIT", note: "One cup per stop. Rule of the day." },
      { label: "RIVERSIDE FINISH", note: "End where it's quiet." },
    ],
    estTime: "—",
    distance: "—",
    bookQuery: "slow-explorer",
  },
  {
    id: "half-day-escape",
    label: "HALF DAY ESCAPE",
    tagline: "In and out before the afternoon.",
    planTitle: "YOUR HALF DAY ESCAPE",
    stops: [
      { label: "MORNING START", note: "Collect the scooty, beat the traffic." },
      { label: "MADHABPUR DIRECTION", note: "The long scenic road, shortened." },
      { label: "LUNCH STOP", note: "Rice, river fish, lemon tea." },
      { label: "BACK BY AFTERNOON", note: "Drop the scooty, keep the stories." },
    ],
    estTime: "—",
    distance: "—",
    bookQuery: "half-day-escape",
  },
];

export function findMood(id: string | null | undefined): RideMood | undefined {
  return RIDE_MOODS.find((m) => m.id === id);
}
