/**
 * Seed the CMS tables with demo content.
 * Run: bun prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  // ---- Users -------------------------------------------------------------
  const ownerPass = await bcrypt.hash("DemoPass2025!", 12);
  const adminPass = await bcrypt.hash("DemoAdmin2025!", 12);

  await db.user.upsert({
    where: { email: "owner@demoscooty.com" },
    update: {
      name: "Demo Owner",
      passwordHash: ownerPass,
      role: "OWNER",
      active: true,
    },
    create: {
      email: "owner@demoscooty.com",
      name: "Demo Owner",
      passwordHash: ownerPass,
      role: "OWNER",
      active: true,
    },
  });

  await db.user.upsert({
    where: { email: "admin@demoscooty.com" },
    update: {
      name: "Demo Admin",
      passwordHash: adminPass,
      role: "ADMIN",
      active: true,
    },
    create: {
      email: "admin@demoscooty.com",
      name: "Demo Admin",
      passwordHash: adminPass,
      role: "ADMIN",
      active: true,
    },
  });

  // ---- Site config ---------------------------------------------------------
  await db.siteConfig.upsert({
    where: { id: 1 },
    update: {
      phoneDisplay: "01700-000000",
      phoneIntl: "+8801700000000",
      whatsappNumber: "8801700000000",
      email: "demo@example.com",
      addressLine1: "Demo Road, Sreemangal 3210",
      addressLine2: "Demo District, Sylhet, Bangladesh",
      plusCode: "8P3M+DEMO",
      facebookUrl: "https://www.facebook.com/demo",
      youtubeId: "demo-tour",
      mapsUrl: "https://maps.google.com/?q=Sreemangal+Bangladesh",
      lat: 24.3040891,
      lng: 91.7342349,
    },
    create: {
      id: 1,
      phoneDisplay: "01700-000000",
      phoneIntl: "+8801700000000",
      whatsappNumber: "8801700000000",
      email: "demo@example.com",
      addressLine1: "Demo Road, Sreemangal 3210",
      addressLine2: "Demo District, Sylhet, Bangladesh",
      plusCode: "8P3M+DEMO",
      facebookUrl: "https://www.facebook.com/demo",
      youtubeId: "demo-tour",
      mapsUrl: "https://maps.google.com/?q=Sreemangal+Bangladesh",
      lat: 24.3040891,
      lng: 91.7342349,
    },
  });

  // ---- Home content ---------------------------------------------------------
  await db.homeContent.upsert({
    where: { id: 1 },
    update: {
      heroKicker: "THE WAY YOU EXPLORE SREEMANGAL",
      heroLine1: "DON'T JUST VISIT",
      heroLine2: "SREEMANGAL.",
      heroLine3: "RIDE IT.",
      heroSub:
        "Demo scooty rentals for exploring the tea gardens, forest roads, local trails and the hidden corners of Sreemangal.",
      heroImage: "/images/hero-scooty.webp",
      heroImageAlt:
        "Demo scooty parked on a quiet road winding through the green tea gardens of Sreemangal",
      bookingNote:
        "BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO PAYMENT ONLINE",
      locationStrip: "DEMO ROAD · SREEMANGAL, BD",
      slogans: [
        "NO TENSION · NO FUEL COST · FULL FREEDOM",
        "ECO-FRIENDLY · AFFORDABLE · FUN",
        "RIDE SMART, RIDE GREEN",
        "EXPLORE SREEMANGAL THE DEMO WAY",
      ].join("\n"),
      followers: "3.5K+",
      posts: "100+",
    },
    create: {
      id: 1,
      heroKicker: "THE WAY YOU EXPLORE SREEMANGAL",
      heroLine1: "DON'T JUST VISIT",
      heroLine2: "SREEMANGAL.",
      heroLine3: "RIDE IT.",
      heroSub:
        "Demo scooty rentals for exploring the tea gardens, forest roads, local trails and the hidden corners of Sreemangal.",
      heroImage: "/images/hero-scooty.webp",
      heroImageAlt:
        "Demo scooty parked on a quiet road winding through the green tea gardens of Sreemangal",
      bookingNote:
        "BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO PAYMENT ONLINE",
      locationStrip: "DEMO ROAD · SREEMANGAL, BD",
      slogans: [
        "NO TENSION · NO FUEL COST · FULL FREEDOM",
        "ECO-FRIENDLY · AFFORDABLE · FUN",
        "RIDE SMART, RIDE GREEN",
        "EXPLORE SREEMANGAL THE DEMO WAY",
      ].join("\n"),
      followers: "3.5K+",
      posts: "100+",
    },
  });

  // ---- Scooties -------------------------------------------------------------
  await db.scooty.upsert({
    where: { slug: "mini-scooty" },
    update: {
      name: "DEMO MINI SCOOTY",
      category: "LIGHT & EASY",
      tagline: "Compact, light and effortless on the tea-garden lanes.",
      description:
        "The easiest way to move around Sreemangal. Light automatic scooty, friendly for first-time riders, perfect for garden lanes and town roads.",
      image: "/images/scooter-02.webp",
      imageAlt: "Compact demo mini scooty placeholder",
    },
    create: {
      slug: "mini-scooty",
      name: "DEMO MINI SCOOTY",
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
      imageAlt: "Compact demo mini scooty placeholder",
      badge: "",
      active: true,
      sortOrder: 1,
    },
  });

  await db.scooty.upsert({
    where: { slug: "standard-scooty" },
    update: {
      name: "DEMO STANDARD SCOOTY",
      category: "THE ALL-DAY RIDE",
      tagline: "Comfortable on longer routes — town to Lawachara and back.",
      description:
        "A comfortable automatic scooty for the longer runs: the lake road, the forest edge, or a full slow loop around town.",
      image: "/images/scooter-standard.webp",
      imageAlt: "Demo standard automatic scooty placeholder",
    },
    create: {
      slug: "standard-scooty",
      name: "DEMO STANDARD SCOOTY",
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
      imageAlt: "Demo standard automatic scooty placeholder",
      badge: "",
      active: true,
      sortOrder: 2,
    },
  });

  await db.activityLog.create({
    data: {
      actor: "system",
      action: "SEED",
      detail: "Database seeded with demo content",
    },
  });

  console.log("Seed complete: demo users, site config, home content, 2 demo scooties.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
