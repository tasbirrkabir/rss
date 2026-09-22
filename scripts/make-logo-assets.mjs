/**
 * Red Scooty — brand asset generator.
 *
 * Input:  upload/pasted_image_1790039498565.png (owner-supplied logo, 1188x1188)
 * Output:
 *   public/logo/mark.png          transparent red scooter mark
 *   public/logo/mark-white.png    white scooter mark (dark surfaces)
 *   public/logo/logo-full.png     full lockup, transparent bg
 *   src/app/icon.png              256x256 favicon (file convention)
 *   src/app/favicon.ico           multi-size ICO (16/32/48)
 *   src/app/apple-icon.png        180x180, brand red bg + white mark
 *   src/app/opengraph-image.png   1200x630 social card
 *
 * White -> alpha conversion: alpha is derived from "redness"
 * ((255-g)+(255-b)) so anti-aliased edges keep a smooth falloff
 * instead of a hard white halo.
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC = "upload/pasted_image_1790039498565.png";
const PUBLIC_LOGO = "public/logo";
const APP_DIR = "src/app";

const BRAND_RED = { r: 245, g: 34, b: 45 }; // #F5222D
const CREAM = { r: 245, g: 243, b: 238 }; // #F5F3EE
const INK = { r: 17, g: 17, b: 17 }; // #111111

mkdirSync(PUBLIC_LOGO, { recursive: true });
mkdirSync(APP_DIR, { recursive: true });

/**
 * Raw RGB/RGBA buffer -> white removed (alpha from redness), normalized
 * to pure brand red. Returns a 4-channel RGBA buffer.
 */
function whitenessToAlpha(data, width, height, channels) {
  const out = Buffer.alloc(width * height * 4);
  const stride = channels;
  for (let i = 0; i < width * height; i++) {
    const r = data[i * stride];
    const g = data[i * stride + 1];
    const b = data[i * stride + 2];
    // 0 for white, ~430 for pure brand red.
    const redness = (255 - g) + (255 - b);
    const alpha = Math.max(0, Math.min(255, Math.round(redness * 0.75)));
    out[i * 4] = BRAND_RED.r;
    out[i * 4 + 1] = BRAND_RED.g;
    out[i * 4 + 2] = BRAND_RED.b;
    out[i * 4 + 3] = alpha;
  }
  return out;
}

/** Recolor an RGBA image to pure white, preserving alpha (raw pass). */
async function markToWhite(pngBuf) {
  const { data, info } = await sharp(pngBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < info.width * info.height; i++) {
    data[i * 4] = 255;
    data[i * 4 + 1] = 255;
    data[i * 4 + 2] = 255;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

async function extractMark() {
  // Scooter mark region within the 1188x1188 master (calibrated visually).
  const crop = { left: 88, top: 336, width: 368, height: 516 };
  // Erase intruding wordmark/box slivers (original-image coordinates).
  const erases = [
    { left: 415, top: 415, width: 41, height: 285 }, // "R" of RED
    { left: 405, top: 735, width: 51, height: 117 }, // EXPLORE box corner
  ];

  let img = sharp(SRC).extract(crop);
  const composites = erases.map((e) => ({
    input: {
      create: {
        width: e.width,
        height: e.height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    },
    left: e.left - crop.left,
    top: e.top - crop.top,
  }));
  img = img.composite(composites);

  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const rgba = whitenessToAlpha(data, info.width, info.height, info.channels);
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
}

async function extractFullLogo() {
  // Manual alpha-bbox trim (sharp's trim+raw produced stride corruption):
  // 1) white -> alpha on the full master, 2) scan RGBA for the content
  // bounding box, 3) extract that region from the RGBA buffer.
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const rgba = whitenessToAlpha(data, w, h, info.channels);

  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (rgba[(y * w + x) * 4 + 3] > 24) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const trimmed = Buffer.alloc(bw * bh * 4);
  for (let y = 0; y < bh; y++) {
    rgba.copy(
      trimmed,
      y * bw * 4,
      ((minY + y) * w + minX) * 4,
      ((minY + y) * w + minX + bw) * 4,
    );
  }
  return sharp(trimmed, { raw: { width: bw, height: bh, channels: 4 } });
}

/** Minimal PNG-in-ICO packer (valid for 16/32/48 sizes in all modern browsers). */
function buildIco(entries) {
  const count = entries.length;
  const headerSize = 6 + 16 * count;
  const total = entries.reduce((acc, [png]) => acc + png.length, headerSize);
  const buf = Buffer.alloc(total);
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type: icon
  buf.writeUInt16LE(count, 4);
  let offset = headerSize;
  entries.forEach((entry, i) => {
    const e = 6 + 16 * i;
    const [png, size] = entry;
    const dim = size >= 256 ? 0 : size; // 0 means 256
    buf.writeUInt8(dim, e);
    buf.writeUInt8(dim, e + 1);
    buf.writeUInt8(0, e + 2); // palette
    buf.writeUInt8(0, e + 3); // reserved
    buf.writeUInt16LE(1, e + 4); // planes
    buf.writeUInt16LE(32, e + 6); // bpp
    buf.writeUInt32LE(png.length, e + 8);
    buf.writeUInt32LE(offset, e + 12);
    png.copy(buf, offset);
    offset += png.length;
  });
  return buf;
}

async function main() {
  /* 1. Transparent red mark (trimmed, hi-res). */
  const mark = await extractMark();
  await mark.clone().png().toFile(path.join(PUBLIC_LOGO, "mark.png"));
  const markBuf = await mark.clone().png().toBuffer();

  /* 2. White mark for dark surfaces. */
  await sharp(await markToWhite(markBuf))
    .png()
    .toFile(path.join(PUBLIC_LOGO, "mark-white.png"));

  /* 3. Full lockup, transparent. */
  await extractFullLogo().then((l) => l.png().toFile(path.join(PUBLIC_LOGO, "logo-full.png")));

  /* 4. App icon 256x256 — mark centered on transparent. */
  const iconBuf = await sharp(markBuf)
    .resize(208, 208, { fit: "inside" })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 256, height: 256, channels: 4, background: { ...BRAND_RED, alpha: 0 } },
  })
    .composite([{ input: iconBuf, left: 24, top: 24 }])
    .png()
    .toFile(path.join(APP_DIR, "icon.png"));

  /* 5. favicon.ico (served statically from public/) with 16/32/48 PNGs. */
  const icoSizes = [16, 32, 48];
  const icoEntries = await Promise.all(
    icoSizes.map((s) =>
      sharp(markBuf)
        .resize(s, s, { fit: "inside", kernel: "lanczos3" })
        .png()
        .toBuffer()
        .then((buf) => [buf, s]),
    ),
  );
  writeFileSync(path.join("public", "favicon.ico"), buildIco(icoEntries));

  /* 6. Apple touch icon 180x180 — brand red bg + white mark. */
  const appleMark = await sharp(await markToWhite(markBuf))
    .resize(126, 126, { fit: "inside" })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 180, height: 180, channels: 4, background: { ...BRAND_RED, alpha: 1 } },
  })
    .composite([{ input: appleMark, left: 27, top: 27 }])
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));

  /* 7. Social card 1200x630 — cream, real logo lockup, red base bar. */
  const fullLockup = await sharp(path.join(PUBLIC_LOGO, "logo-full.png"))
    .resize(880, 880, { fit: "inside" })
    .png()
    .toBuffer();
  const lockupMeta = await sharp(fullLockup).metadata();
  const ogSvg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#F5F3EE"/>
      <rect x="0" y="0" width="1200" height="10" fill="#F5222D"/>
      <rect x="0" y="614" width="1200" height="16" fill="#F5222D"/>
      <text x="600" y="596" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="#555555" letter-spacing="4">SCOOTY RENTALS · JALALIA ROAD, SREEMANGAL 3210</text>
    </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: { ...CREAM, alpha: 1 } } })
    .composite([
      { input: ogSvg, left: 0, top: 0 },
      { input: fullLockup, left: Math.round((1200 - lockupMeta.width) / 2), top: Math.round((600 - lockupMeta.height) / 2) },
    ])
    .png()
    .toFile(path.join(APP_DIR, "opengraph-image.png"));

  console.log("logo assets generated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
