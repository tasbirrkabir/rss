import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { hashPassword, logActivity, requireRole } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  role: z.enum(["OWNER", "ADMIN"]).optional(),
  active: z.boolean().optional(),
  password: z.string().min(8, "Password must be at least 8 characters.").optional(),
});

/**
 * PATCH /api/admin/users/[id] — OWNER only.
 * Safety rules: cannot deactivate/demote yourself, and cannot demote or
 * deactivate the last active owner.
 */
export async function PATCH(request: Request, { params }: Params) {
  const { user, denied } = await requireRole("OWNER");
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
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const target = await db.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
  }

  const demoting =
    parsed.data.role === "ADMIN" && target.role === "OWNER" ? true : false;
  const deactivating =
    parsed.data.active === false && target.active ? true : false;

  if ((demoting || deactivating) && target.id === user.id) {
    return NextResponse.json(
      { ok: false, error: "You cannot demote or deactivate your own account." },
      { status: 400 },
    );
  }

  if (demoting || deactivating) {
    const activeOwners = await db.user.count({
      where: { role: "OWNER", active: true, NOT: { id: target.id } },
    });
    if (target.role === "OWNER" && activeOwners === 0) {
      return NextResponse.json(
        { ok: false, error: "At least one active owner must remain." },
        { status: 400 },
      );
    }
  }

  const { password, ...rest } = parsed.data;
  const updated = await db.user.update({
    where: { id },
    data: {
      ...rest,
      ...(password ? { passwordHash: await hashPassword(password) } : {}),
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      active: true,
      lastLoginAt: true,
    },
  });

  // Deactivated users lose their sessions immediately.
  if (deactivating) {
    await db.session.deleteMany({ where: { userId: id } });
  }

  await logActivity(
    user.email,
    "USER_UPDATE",
    `Updated ${updated.email}${password ? " (password reset)" : ""}`,
  );
  return NextResponse.json({ ok: true, user: updated });
}

/** DELETE /api/admin/users/[id] — OWNER only, cannot delete self or last owner. */
export async function DELETE(_request: Request, { params }: Params) {
  const { user, denied } = await requireRole("OWNER");
  if (denied) return denied;

  const { id } = await params;

  if (id === user.id) {
    return NextResponse.json(
      { ok: false, error: "You cannot delete your own account." },
      { status: 400 },
    );
  }

  const target = await db.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
  }

  if (target.role === "OWNER") {
    const otherOwners = await db.user.count({
      where: { role: "OWNER", active: true, NOT: { id } },
    });
    if (otherOwners === 0) {
      return NextResponse.json(
        { ok: false, error: "At least one active owner must remain." },
        { status: 400 },
      );
    }
  }

  await db.user.delete({ where: { id } });
  await logActivity(user.email, "USER_DELETE", `Deleted ${target.email}`);
  return NextResponse.json({ ok: true });
}
