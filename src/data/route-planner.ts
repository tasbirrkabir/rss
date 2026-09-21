/**
 * Route planner generator (PRD section 19 - "BUILD YOUR DAY").
 * Deterministic: same duration + interests always produce the same sample route.
 */

export type RouteStop = {
  time: string;
  stop: string;
  note: string;
};

export type PlannedRoute = {
  title: string;
  stops: RouteStop[];
};

export type Duration = "HALF DAY" | "FULL DAY";
export type Interest = "TEA" | "FOREST" | "LAKE" | "PHOTOS";

type PoolStop = {
  key: string;
  stop: string;
  note: string;
  tags: Interest[];
  fixed?: number; // position pin (e.g. lunch always mid-route)
};

const POOL: PoolStop[] = [
  {
    key: "tea-gardens",
    stop: "TEA GARDENS",
    note: "First light over the rows. Ride slow, drink seven-layer tea after.",
    tags: ["TEA", "PHOTOS"],
  },
  {
    key: "lawachara",
    stop: "LAWACHARA",
    note: "Shaded forest trail. Park at the entrance and walk in.",
    tags: ["FOREST", "PHOTOS"],
  },
  {
    key: "hidden-roads-lunch",
    stop: "LUNCH / LOCAL STOP",
    note: "Rice, river fish, and lemon tea somewhere local.",
    tags: [],
    fixed: 1, // always second half of the day
  },
  {
    key: "madhabpur",
    stop: "MADHABPUR LAKE",
    note: "The long scenic run. Water and hills at the end of it.",
    tags: ["LAKE", "PHOTOS"],
  },
  {
    key: "baikka",
    stop: "BAIKKA BEEL",
    note: "Golden-hour wetland. Bring a camera, leave early.",
    tags: ["LAKE", "PHOTOS"],
  },
  {
    key: "hidden-roads",
    stop: "HIDDEN ROADS",
    note: "No plan. Just the quiet roads between the gardens.",
    tags: ["TEA", "FOREST", "LAKE", "PHOTOS"],
  },
];

const HALF_DAY_TIMES = ["MORNING", "MIDDAY", "AFTERNOON"];
const FULL_DAY_TIMES = ["MORNING", "LATE MORNING", "MIDDAY", "AFTERNOON", "SUNSET"];

export function planRoute(duration: Duration, interests: Interest[]): PlannedRoute {
  const score = (s: PoolStop) =>
    s.tags.filter((t) => interests.includes(t)).length;

  const scored = [...POOL]
    .map((s) => ({ s, n: score(s) }))
    .sort((a, b) => b.n - a.n);

  // FULL DAY: 3 picks + inserted lunch = 4 mid stops + return = 5 time labels.
  const count = duration === "FULL DAY" ? 3 : 2;
  const picked: PoolStop[] = [];

  for (const { s } of scored) {
    if (picked.length >= count) break;
    if (s.key === "hidden-roads-lunch" && duration === "HALF DAY") continue;
    if (!picked.includes(s)) picked.push(s);
  }

  // Lunch stop always slots in after the first ride segment.
  if (duration === "FULL DAY") {
    const lunch = POOL.find((p) => p.key === "hidden-roads-lunch");
    if (lunch && !picked.includes(lunch)) {
      picked.splice(Math.min(2, picked.length), 0, lunch);
    }
  }

  const times =
    duration === "FULL DAY" ? FULL_DAY_TIMES : HALF_DAY_TIMES;

  const stops: RouteStop[] = picked.map((s, i) => ({
    time: times[Math.min(i, times.length - 2)] ?? times[i],
    stop: s.stop,
    note: s.note,
  }));

  stops.push({
    time: duration === "FULL DAY" ? times[times.length - 1] : times[times.length - 1],
    stop: "BACK TO SREEMANGAL",
    note: "Drop the scooty, tell us what you found.",
  });

  return {
    title:
      duration === "FULL DAY"
        ? "YOUR FULL DAY, SORTED."
        : "YOUR HALF DAY, SORTED.",
    stops,
  };
}
