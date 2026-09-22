/**
 * Seed the CMS tables with the verified static content the site launched
 * with. Run: bun prisma/seed.ts
 *
 * - Owner + demo admin accounts (bcrypt hashed).
 * - SiteConfig / HomeContent singletons from src/data/site.ts values.
 * - The two real scooties from src/data/vehicles.ts.
 * Idempotent: upserts everything, never duplicates.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  // ---- Users -------------------------------------------------------------
  const ownerPass = await bcrypt.hash("RedScooty2025!", 12);
  const adminPass = await bcrypt.hash("Admin2025!", 12);

  await db.user.upsert({
    where: { email: "owner@redscooty.com" },
    update: {},
    create: {
      email: "owner@redscooty.com",
      name: "Radiyan Hossen",
      passwordHash: ownerPass,
      role: "OWNER",
      active: true,
    },
  });

  await db.user.upsert({
    where: { email: "admin@redscooty.com" },
    update: {},
    create: {
      email: "admin@redscooty.com",
      name: "Demo Admin",
      passwordHash: adminPass,
      role: "ADMIN",
      active: true,
    },
  });

  // ---- Site config (verified contact facts) --------------------------------
  await db.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      phoneDisplay: "01897-423694",
      phoneIntl: "+8801897423694",
      whatsappNumber: "8801897423694",
      email: "redscootysreemangal@gmail.com",
      addressLine1: "Jalalia Road, Sreemangal 3210",
      addressLine2: "Moulvibazar, Sylhet, Bangladesh",
      plusCode: "8P3M+JMQ",
      facebookUrl: "https://www.facebook.com/redscootysmg/",
      youtubeId: "vk0oyKnZVPs",
      mapsUrl: "https://maps.app.goo.gl/ZE53GmbXSVHsUJQJ7",
      lat: 24.3040891,
      lng: 91.7342349,
    },
  });

  // ---- Home content ---------------------------------------------------------
  await db.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroKicker: "THE WAY YOU EXPLORE SREEMANGAL",
      heroLine1: "DON'T JUST VISIT",
      heroLine2: "SREEMANGAL.",
      heroLine3: "RIDE IT.",
      heroSub:
        "Scooty rentals for exploring the tea gardens, forest roads, local trails and the hidden corners of Sreemangal.",
      heroImage: "/images/hero-scooty.webp",
      heroImageAlt:
        "Red scooty parked on a quiet road winding through the green tea gardens of Sreemangal",
      bookingNote:
        "BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO PAYMENT ONLINE",
      locationStrip: "JALALIA ROAD · SREEMANGAL, BD",
      slogans: [
        "NO TENSION · NO FUEL COST · FULL FREEDOM",
        "ECO-FRIENDLY · AFFORDABLE · FUN",
        "RIDE SMART, RIDE GREEN",
        "EXPLORE SREEMANGAL THE RED SCOOTY WAY",
      ].join("\n"),
      followers: "3.1K+",
      posts: "108",
    },
  });

  // ---- Scooties (the two real machines) -------------------------------------
  await db.scooty.upsert({
    where: { slug: "mini-scooty" },
    update: {},
    create: {
      slug: "mini-scooty",
      name: "MINI SCOOTY",
      category: "LIGHT & EASY",
      tagline: "Compact, light and effortless on the tea-garden lanes.",
      description:
        "The easiest way to move around Sreemangal. Light automatic scooty, friendly for first-time riders, perfect for garden lanes and town roads.",
      priceLabel: "৳ — / DAY",
      priceNote: "Rate confirmed personally on request — never guessed.",
      features: JSON.stringify([
        "Automatic",
        "Easy ride",
        "Perfect for tea garden lanes",
      ]),
      image: "/images/scooter-02.webp",
      imageAlt:
        "Compact red mini scooty parked against a plain cream background",
      badge: "",
      active: true,
      sortOrder: 1,
    },
  });

  await db.scooty.upsert({
    where: { slug: "standard-scooty" },
    update: {},
    create: {
      slug: "standard-scooty",
      name: "STANDARD SCOOTY",
      category: "THE ALL-DAY RIDE",
      tagline: "Comfortable on longer routes — town to Lawachara and back.",
      description:
        "A comfortable automatic scooty for the longer runs: the lake road, the forest edge, or a full slow loop around town.",
      priceLabel: "৳ — / DAY",
      priceNote: "Rate confirmed personally on request — never guessed.",
      features: JSON.stringify([
        "Automatic",
        "Comfortable on longer routes",
        "Town to Lawachara and back",
      ]),
      image: "/images/scooter-standard.webp",
      imageAlt:
        "Red automatic scooty photographed from the front three-quarter angle",
      badge: "",
      active: true,
      sortOrder: 2,
    },
  });

  await db.activityLog.create({
    data: {
      actor: "system",
      action: "SEED",
      detail: "Database seeded with launch content",
    },
  });

  console.log("Seed complete: users, site config, home content, 2 scooties.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
