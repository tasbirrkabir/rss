/**
 * Generates the additional photography for the multi-page expansion.
 * Run: bun scripts/gen-images-mp.ts
 * Skips files that already exist, retries failed jobs 3x.
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT = "public/images";

const STYLE =
  "editorial travel photography, cinematic natural light, rich color, high quality, detailed, no text, no watermark";

const JOBS: Array<{ file: string; size: string; prompt: string }> = [
  {
    file: "dest-town.png",
    size: "1344x768",
    prompt: `Bustling small Bangladesh town street in Sreemangal, colorful cycle rickshaws, market stalls, old brick buildings, warm late afternoon light, street life energy, ${STYLE}`,
  },
  {
    file: "dest-hamham.png",
    size: "864x1152",
    prompt: `Hidden waterfall cascading through dense green jungle forest in Bangladesh, tall tropical trees, mossy dark rocks, misty atmosphere, sense of adventure, ${STYLE}`,
  },
  {
    file: "story-freedom.png",
    size: "1344x768",
    prompt: `Rider on a red scooter on an open rural road at golden sunset, wide green tea plantation vista opening up ahead, feeling of freedom and adventure, warm golden light, ${STYLE}`,
  },
  {
    file: "story-road.png",
    size: "1344x768",
    prompt: `Long straight quiet rural road lined with tall shade trees, red scooter riding away from camera into the green distance, Bangladesh countryside, cinematic depth, ${STYLE}`,
  },
  {
    file: "journal-one-day.png",
    size: "1344x768",
    prompt: `Tea garden workers plucking tea leaves into woven baskets at sunrise, endless rows of emerald tea bushes, soft morning mist, Sreemangal Bangladesh, ${STYLE}`,
  },
  {
    file: "journal-tea-break.png",
    size: "1024x1024",
    prompt: `Traditional seven layer tea served in tall glasses on a rustic wooden cafe table, distinct colorful layers from dark to light, warm cozy tea stall light, Bangladesh, ${STYLE}`,
  },
  {
    file: "journal-cng.png",
    size: "1344x768",
    prompt: `Red scooter parked beside a green CNG auto rickshaw on a small Bangladesh town street, two kinds of transport side by side, daylight, quiet street, ${STYLE}`,
  },
  {
    file: "about-shop.png",
    size: "1344x768",
    prompt: `Row of clean red scooters parked in a line outside a small scooter rental shop in a small Bangladesh town, daylight, independent small business character, ${STYLE}`,
  },
  {
    file: "journal-guide.png",
    size: "1440x720",
    prompt: `Wide panoramic view of the Sreemangal landscape, rolling green tea hills, palm trees, a distant lake, late afternoon golden light, Bangladesh, ${STYLE}`,
  },
];

async function main() {
  const zai = await ZAI.create();
  let ok = 0;
  let fail = 0;

  for (const job of JOBS) {
    const out = path.join(OUT, job.file);
    if (fs.existsSync(out)) {
      console.log("SKIP (exists):", job.file);
      ok++;
      continue;
    }
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: job.prompt,
          size: job.size,
        });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("empty response");
        fs.writeFileSync(out, Buffer.from(b64, "base64"));
        console.log("OK:", job.file);
        ok++;
        done = true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`FAIL(${attempt}):`, job.file, msg);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (!done) fail++;
  }

  console.log(`ALL DONE: ${ok} ok, ${fail} failed`);
}

main();
