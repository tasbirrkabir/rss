import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * POST /api/bookings — receives booking requests from the demo site
 * (PRD section 28: Booking Request API -> Database, status starts at NEW).
 * No payment, no availability claims — this is an enquiry pipeline only.
 */

const phoneRegex = /^[+]?[0-9][0-9\s-]{8,15}$/;

const bookingSchema = z.object({
  rideDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date."),
  duration: z.enum(["HALF_DAY", "FULL_DAY"], {
    message: "Please choose a duration.",
  }),
  vehicleId: z.enum(["mini-scooty", "standard-scooty"]).nullish(),
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number."),
  pickupPreference: z.enum(["shop", "hotel", "unsure"]).nullish(),
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

  // Guard: ride date cannot be in the past (client also enforces this).
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

  try {
    const booking = await db.bookingRequest.create({
      data: {
        rideDate: data.rideDate,
        duration: data.duration,
        vehicleId: data.vehicleId ?? null,
        name: data.name,
        phone: data.phone,
        pickupPreference: data.pickupPreference ?? null,
        message: data.message ?? null,
      },
    });

    return NextResponse.json(
      { ok: true, id: booking.id, status: booking.status },
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
