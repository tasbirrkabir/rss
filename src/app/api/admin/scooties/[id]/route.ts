import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity, requireRole } from "@/lib/admin-auth";

const patchSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  category: z.string().trim().max(60).optional(),
  tagline: z.string().trim().max(140).optional(),
  description: z.string().trim().max(600).optional(),
  priceLabel: z.string().trim().max(40).optional(),
  priceNote: z.string().trim().max(160).optional(),
  features: z.array(z.string().trim().max(60)).max(8).optional(),
  image: z.string().trim().max(300).optional(),
  imageAlt: z.string().trim().max(200).optional(),
  badge: z.string().trim().max(30).optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
});

type Params = { params: Promise<{ id: string }> };

/** PATCH /api/admin/scooties/[id] — partial update. */
export async function PATCH(request: Request, { params }: Params) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input.",
      },
      { status: 400 },
    );
  }

  const existing = await db.scooty.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Scooty not found." }, { status: 404 });
  }

  const { features, ...rest } = parsed.data;
  const updated = await db.scooty.update({
    where: { id },
    data: {
      ...rest,
      ...(features ? { features: JSON.stringify(features) } : {}),
    },
  });

  await logActivity(user.email, "SCOOTY_UPDATE", `Updated scooty "${updated.name}"`);
  return NextResponse.json({ ok: true, scooty: updated });
}

/** DELETE /api/admin/scooties/[id] */
export async function DELETE(_request: Request, { params }: Params) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  const { id } = await params;
  const existing = await db.scooty.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Scooty not found." }, { status: 404 });
  }

  await db.scooty.delete({ where: { id } });
  await logActivity(user.email, "SCOOTY_DELETE", `Removed scooty "${existing.name}"`);
  return NextResponse.json({ ok: true });
}
