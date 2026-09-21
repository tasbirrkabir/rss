import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * POST /api/bookings — receives booking requests AND contact messages
 * from the multi-page site (PRD section 28: Booking Request API -> Database,
 * status starts at NEW). No payment, no availability claims — this is an
 * enquiry pipeline only.
 *
 * type=BOOKING  -> requires rideDate + duration
 * type=MESSAGE  -> free-form contact message (contact page)
 */

const phoneRegex = /^[+]?[0-9][0-9\s-]{8,15}$/;

const bookingSchema = z.object({
  type: z.enum(["BOOKING", "MESSAGE"]).default("BOOKING"),
  rideDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date.")
    .optional(),
  duration: z.enum(["HALF_DAY", "FULL_DAY", "MULTI_DAY"]).optional(),
  vehicleId: z.enum(["mini-scooty", "standard-scooty"]).nullish(),
  riders: z.string().trim().max(40, "Riders field is too long.").optional(),
  routeRef: z.string().trim().max(80).optional(),
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number."),
  pickupPreference: z
    .enum(["station", "hotel", "town", "shop", "unsure"])
    .nullish(),
  message: z.string().trim().max(500, "Message is too long.").nullish(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Booking requests must carry a date + duration; contact messages may not.
  if (data.type === "BOOKING") {
    const missing: Record<string, string[]> = {};
    if (!data.rideDate) {
      missing.rideDate = ["Please choose your ride date."];
    }
    if (!data.duration) {
      missing.duration = ["Please choose a duration."];
    }
    if (Object.keys(missing).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please complete the highlighted fields.",
          issues: missing,
        },
        { status: 400 },
      );
    }
  }

  // Guard: ride date cannot be in the past (client also enforces this).
  if (data.rideDate) {
    const today = new Date().toISOString().slice(0, 10);
    if (data.rideDate < today) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please choose today or a future date.",
          issues: { rideDate: ["Please choose today or a future date."] },
        },
        { status: 400 },
      );
    }
  }

  try {
    const booking = await db.bookingRequest.create({
      data: {
        type: data.type,
        rideDate: data.rideDate ?? null,
        duration: data.duration ?? null,
        vehicleId: data.vehicleId ?? null,
        riders: data.riders ?? null,
        routeRef: data.routeRef ?? null,
        name: data.name,
        phone: data.phone,
        pickupPreference: data.pickupPreference ?? null,
        message: data.message ?? null,
      },
    });

    return NextResponse.json(
      { ok: true, id: booking.id, status: booking.status, type: booking.type },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/bookings] failed to store booking request:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your request right now. Please call or message us on WhatsApp instead.",
      },
      { status: 500 },
    );
  }
}
