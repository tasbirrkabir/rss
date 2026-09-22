import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { hashPassword, logActivity, requireRole } from "@/lib/admin-auth";

/** GET /api/admin/users — OWNER only. */
export async function GET() {
  const { denied } = await requireRole("OWNER");
  if (denied) return denied;

  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      active: true,
      createdAt: true,
      lastLoginAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ ok: true, users });
}

const createSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(60),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["OWNER", "ADMIN"]).default("ADMIN"),
});

/** POST /api/admin/users — create a user (OWNER only). */
export async function POST(request: Request) {
  const { user, denied } = await requireRole("OWNER");
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input.",
      },
      { status: 400 },
    );
  }

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) {
    return NextResponse.json(
      { ok: false, error: "A user with that email already exists." },
      { status: 409 },
    );
  }

  const created = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      role: parsed.data.role,
      active: true,
    },
  });

  await logActivity(
    user.email,
    "USER_CREATE",
    `Created ${created.role.toLowerCase()} ${created.email}`,
  );
  return NextResponse.json(
    {
      ok: true,
      user: {
        id: created.id,
        email: created.email,
        name: created.name,
        role: created.role,
        active: created.active,
      },
    },
    { status: 201 },
  );
}
