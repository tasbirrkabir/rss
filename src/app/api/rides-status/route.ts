import { NextResponse } from "next/server";

/**
 * GET /api/rides-status — "LIVE RIDE STATUS" strip (brief: extraordinary
 * feature #3). There is no real-time inventory system, so this endpoint
 * returns clearly-labelled DEMO data. The UI must always render the
 * demo label next to the numbers.
 */
export async function GET() {
  return NextResponse.json({
    demo: true,
    label: "DEMO DATA",
    ridesToday: "09",
    scootiesReady: "3+",
    note: "Live status is a demo feature. Real availability is confirmed personally when you request a ride.",
  });
}
