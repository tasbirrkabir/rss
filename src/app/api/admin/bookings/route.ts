import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity, requireRole } from "@/lib/admin-auth";

const STATUSES = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

/** GET /api/admin/bookings — all booking requests + contact messages. */
export async function GET() {
  const { denied } = await requireRole();
  if (denied) return denied;

  const rows = await db.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, bookings: rows });
}

const bulkSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(200),
  status: z.enum(STATUSES),
});

/** PATCH /api/admin/bookings — bulk status update { ids, status }. */
export async function PATCH(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = bulkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
  }

  const { ids, status } = parsed.data;
  const result = await db.bookingRequest.updateMany({
    where: { id: { in: ids } },
    data: { status },
  });

  await logActivity(
    user.email,
    "BOOKING_STATUS",
    `Set ${result.count} request(s) to ${status}`,
  );
  return NextResponse.json({ ok: true, count: result.count });
}

/** DELETE /api/admin/bookings?id=... — remove a request. */
export async function DELETE(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const existing = await db.bookingRequest.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  await db.bookingRequest.delete({ where: { id } });
  await logActivity(
    user.email,
    "BOOKING_DELETE",
    `Deleted request from ${existing.name}`,
  );
  return NextResponse.json({ ok: true });
}
