import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export const SESSION_COOKIE = "rs_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export type AdminRole = "OWNER" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

// ---------- Passwords ----------

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ---------- Sessions ----------

export async function createSession(userId: string): Promise<string> {
  const token =
    globalThis.crypto.randomUUID().replace(/-/g, "") +
    globalThis.crypto.randomUUID().replace(/-/g, "");
  await db.session.create({
    data: {
      id: token,
      userId,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  });
  return token;
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
    // The sandbox preview is served over plain http through the gateway —
    // forcing `secure` would silently drop the cookie there.
    secure: false,
  };
}

/** Reads the session cookie and resolves the active user, or null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const session = await db.session.findUnique({
      where: { id: token },
      include: { user: true },
    });
    if (!session) return null;

    if (session.expiresAt.getTime() < Date.now()) {
      await db.session.delete({ where: { id: token } }).catch(() => {});
      return null;
    }
    if (!session.user.active) return null;

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role === "OWNER" ? "OWNER" : "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { id: token } });
  }
}

// ---------- Route guards (API) ----------

type Guard =
  | { user: SessionUser; denied: null }
  | { user: null; denied: NextResponse };

/** 401 unless a valid session exists; 403 unless the role matches. */
export async function requireRole(
  ...roles: AdminRole[]
): Promise<Guard> {
  const user = await getSessionUser();
  if (!user) {
    return {
      user: null,
      denied: NextResponse.json(
        { ok: false, error: "Unauthorized. Please sign in." },
        { status: 401 },
      ),
    };
  }
  if (roles.length > 0 && !roles.includes(user.role)) {
    return {
      user: null,
      denied: NextResponse.json(
        { ok: false, error: "Forbidden. Owner access required." },
        { status: 403 },
      ),
    };
  }
  return { user, denied: null };
}

// ---------- Activity log ----------

export async function logActivity(
  actor: string,
  action: string,
  detail = "",
): Promise<void> {
  try {
    await db.activityLog.create({ data: { actor, action, detail } });
  } catch {
    // Logging must never break the request.
  }
}
