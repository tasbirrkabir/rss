import "server-only";

import { cache } from "react";

import { db } from "@/lib/db";
import { VEHICLES } from "@/data/vehicles";
import {
  staticHomeContent,
  staticSiteConfig,
  type PublicHomeContent,
  type PublicSiteConfig,
} from "@/lib/public-content";

/**
 * Server-side CMS content loaders.
 *
 * Every getter returns content merged over the static launch defaults, so
 * the public site renders correctly even if the database is empty or
 * unavailable. Admin edits land in the DB and flow out through here.
 * Client-safe types/fallbacks live in public-content.ts.
 */

export type ScootyRecord = {
  id: string;
  name: string;
  category: string;
  transmission?: string;
  seats?: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
  features: string[];
  tagline: string;
  description: string;
  priceNote: string;
  badge: string;
  active: boolean;
  sortOrder: number;
};

// ---------- site config ----------

export const getSiteConfig = cache(async (): Promise<PublicSiteConfig> => {
  try {
    const row = await db.siteConfig.findUnique({ where: { id: 1 } });
    if (!row) return staticSiteConfig;
    return {
      phoneDisplay: row.phoneDisplay,
      phoneIntl: row.phoneIntl,
      telUrl: `tel:${row.phoneIntl}`,
      whatsappNumber: row.whatsappNumber,
      email: row.email,
      addressLine1: row.addressLine1,
      addressLine2: row.addressLine2,
      plusCode: row.plusCode,
      facebook: row.facebookUrl,
      youtube: {
        id: row.youtubeId,
        watchUrl: `https://youtu.be/${row.youtubeId}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${row.youtubeId}`,
      },
      mapsUrl: row.mapsUrl,
      coords: { lat: row.lat, lng: row.lng },
    };
  } catch {
    return staticSiteConfig;
  }
});

// ---------- home content ----------

export const getHomeContent = cache(async (): Promise<PublicHomeContent> => {
  try {
    const row = await db.homeContent.findUnique({ where: { id: 1 } });
    if (!row) return staticHomeContent;
    return {
      heroKicker: row.heroKicker,
      heroLine1: row.heroLine1,
      heroLine2: row.heroLine2,
      heroLine3: row.heroLine3,
      heroSub: row.heroSub,
      heroImage: row.heroImage,
      heroImageAlt: row.heroImageAlt,
      bookingNote: row.bookingNote,
      locationStrip: row.locationStrip,
      slogans: row.slogans
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      followers: row.followers,
      posts: row.posts,
    };
  } catch {
    return staticHomeContent;
  }
});

// ---------- scooties ----------

function fallbackScooties(): ScootyRecord[] {
  return VEHICLES.map((v) => ({
    ...v,
    tagline: "",
    description: "",
    priceNote: "",
    badge: "",
    active: true,
    sortOrder: 0,
  }));
}

function rowToScooty(row: {
  slug: string;
  name: string;
  category: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  features: string;
  tagline: string;
  description: string;
  priceNote: string;
  badge: string;
  active: boolean;
  sortOrder: number;
}): ScootyRecord {
  let features: string[] = [];
  try {
    const parsed: unknown = JSON.parse(row.features);
    if (Array.isArray(parsed)) {
      features = parsed.filter((f): f is string => typeof f === "string");
    }
  } catch {
    features = [];
  }
  return {
    id: row.slug,
    name: row.name,
    category: row.category,
    priceLabel: row.priceLabel,
    image: row.image,
    imageAlt: row.imageAlt,
    features,
    tagline: row.tagline,
    description: row.description,
    priceNote: row.priceNote,
    badge: row.badge,
    active: row.active,
    sortOrder: row.sortOrder,
  };
}

/** Active scooties for the public site (falls back to static launch data). */
export const getPublicScooties = cache(async (): Promise<ScootyRecord[]> => {
  try {
    const rows = await db.scooty.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return fallbackScooties();
    return rows.map(rowToScooty);
  } catch {
    return fallbackScooties();
  }
});

/** Every scooty row — admin editor. */
export async function getAllScooties(): Promise<ScootyRecord[]> {
  const rows = await db.scooty.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return rows.map(rowToScooty);
}
