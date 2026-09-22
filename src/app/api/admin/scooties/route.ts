import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity, requireRole } from "@/lib/admin-auth";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const scootySchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only.")
    .max(60)
    .optional(),
  name: z.string().trim().min(2, "Name is required.").max(60),
  category: z.string().trim().max(60).default(""),
  tagline: z.string().trim().max(140).default(""),
  description: z.string().trim().max(600).default(""),
  priceLabel: z.string().trim().max(40).default("৳ — / DAY"),
  priceNote: z.string().trim().max(160).default(""),
  features: z.array(z.string().trim().max(60)).max(8).default([]),
  image: z.string().trim().max(300).default(""),
  imageAlt: z.string().trim().max(200).default(""),
  badge: z.string().trim().max(30).default(""),
  active: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(999).default(0),
});

/** GET /api/admin/scooties — full fleet list. */
export async function GET() {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  const rows = await db.scooty.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ ok: true, scooties: rows, actor: user.email });
}

/** POST /api/admin/scooties — create a scooty. */
export async function POST(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = scootySchema.safeParse(body);
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

  const data = parsed.data;
  const slug = data.slug && data.slug.length > 0 ? data.slug : slugify(data.name);
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Could not build a URL slug from that name." },
      { status: 400 },
    );
  }

  const exists = await db.scooty.findUnique({ where: { slug } });
  if (exists) {
    return NextResponse.json(
      { ok: false, error: `A scooty with slug "${slug}" already exists.` },
      { status: 409 },
    );
  }

  const created = await db.scooty.create({
    data: {
      slug,
      name: data.name,
      category: data.category,
      tagline: data.tagline,
      description: data.description,
      priceLabel: data.priceLabel,
      priceNote: data.priceNote,
      features: JSON.stringify(data.features),
      image: data.image,
      imageAlt: data.imageAlt,
      badge: data.badge,
      active: data.active,
      sortOrder: data.sortOrder,
    },
  });

  await logActivity(user.email, "SCOOTY_CREATE", `Added scooty "${created.name}"`);
  return NextResponse.json({ ok: true, scooty: created }, { status: 201 });
}
