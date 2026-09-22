import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity, requireRole } from "@/lib/admin-auth";

const homeSchema = z.object({
  heroKicker: z.string().trim().min(2).max(80),
  heroLine1: z.string().trim().min(1).max(60),
  heroLine2: z.string().trim().min(1).max(60),
  heroLine3: z.string().trim().min(1).max(60),
  heroSub: z.string().trim().min(10).max(300),
  heroImage: z.string().trim().max(300),
  heroImageAlt: z.string().trim().max(200),
  bookingNote: z.string().trim().max(120),
  locationStrip: z.string().trim().max(80),
  slogans: z.string().max(600), // newline-separated
  followers: z.string().trim().max(20),
  posts: z.string().trim().max(20),
});

/** GET /api/admin/home — current home content. */
export async function GET() {
  const { denied } = await requireRole();
  if (denied) return denied;

  const row = await db.homeContent.findUnique({ where: { id: 1 } });
  return NextResponse.json({ ok: true, home: row });
}

/** PATCH /api/admin/home — update home page content. */
export async function PATCH(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = homeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid input.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const saved = await db.homeContent.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: { id: 1, ...parsed.data },
  });

  await logActivity(user.email, "HOME_UPDATE", "Home page content updated");
  return NextResponse.json({ ok: true, home: saved });
}
