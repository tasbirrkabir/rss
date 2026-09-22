import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity, requireRole } from "@/lib/admin-auth";

const phoneRegex = /^[+]?[0-9][0-9\s-]{5,15}$/;

const settingsSchema = z.object({
  phoneDisplay: z.string().trim().regex(phoneRegex, "Enter a valid phone number.").max(20),
  phoneIntl: z.string().trim().regex(phoneRegex, "Enter a valid international phone.").max(20),
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{6,15}$/, "Digits only, with country code (e.g. 8801897…)."),
  email: z.string().trim().email("Enter a valid email."),
  addressLine1: z.string().trim().max(120),
  addressLine2: z.string().trim().max(120),
  plusCode: z.string().trim().max(30),
  facebookUrl: z.string().trim().url("Enter a full URL.").max(200),
  youtubeId: z.string().trim().max(30),
  mapsUrl: z.string().trim().url("Enter a full URL.").max(300),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

/** GET /api/admin/settings — current site config. */
export async function GET() {
  const { denied } = await requireRole();
  if (denied) return denied;

  const row = await db.siteConfig.findUnique({ where: { id: 1 } });
  return NextResponse.json({ ok: true, settings: row });
}

/** PATCH /api/admin/settings — update contact details etc. */
export async function PATCH(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
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

  const saved = await db.siteConfig.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: { id: 1, ...parsed.data },
  });

  await logActivity(user.email, "SETTINGS_UPDATE", "Contact details updated");
  return NextResponse.json({ ok: true, settings: saved });
}
