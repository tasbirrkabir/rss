import { NextResponse } from "next/server";

import { requireRole } from "@/lib/admin-auth";

/** GET /api/admin/me — current session identity (used by the admin shell). */
export async function GET() {
  const { user, denied } = await requireRole();
  if (denied) return denied;
  return NextResponse.json({ ok: true, user });
}
