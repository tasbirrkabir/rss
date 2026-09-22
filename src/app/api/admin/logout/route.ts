import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  destroySession,
  getSessionUser,
  logActivity,
} from "@/lib/admin-auth";

export async function POST() {
  const user = await getSessionUser();
  await destroySession();
  if (user) await logActivity(user.email, "LOGOUT", "Signed out");

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
