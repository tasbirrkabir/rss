import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

import { logActivity, requireRole } from "@/lib/admin-auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
]);

/**
 * GET /api/admin/upload — list the existing image library
 * (files under /public/images and /public/uploads).
 */
export async function GET() {
  const { denied } = await requireRole();
  if (denied) return denied;

  const list = async (dir: string, prefix: string) => {
    try {
      const files = await fs.readdir(dir);
      return files
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .map((f) => `${prefix}/${f}`);
    } catch {
      return [];
    }
  };

  const images = await list(IMAGE_DIR, "/images");
  const uploads = await list(UPLOAD_DIR, "/uploads");
  uploads.reverse(); // newest uploads first

  return NextResponse.json({ ok: true, library: [...uploads, ...images] });
}

/** POST /api/admin/upload — multipart image upload -> /public/uploads. */
export async function POST(request: Request) {
  const { user, denied } = await requireRole();
  if (denied) return denied;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected a multipart form upload." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "No file received." },
      { status: 400 },
    );
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Only JPG, PNG, WebP or AVIF images are allowed." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Image is larger than 5 MB." },
      { status: 413 },
    );
  }

  const name = `${Date.now().toString(36)}-${globalThis.crypto
    .randomUUID()
    .slice(0, 8)}${ext}`;

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save the file." },
      { status: 500 },
    );
  }

  const url = `/uploads/${name}`;
  await logActivity(user.email, "UPLOAD", url);
  return NextResponse.json({ ok: true, url }, { status: 201 });
}
