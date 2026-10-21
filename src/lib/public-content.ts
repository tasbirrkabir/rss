/**
 * Client-safe public content types + static launch fallbacks.
 *
 * Used by BOTH server loaders (src/lib/cms.ts) and client components
 * (site-config-provider.tsx). Keep this file free of server-only imports.
 */

export type PublicSiteConfig = {
  phoneDisplay: string;
  phoneIntl: string;
  telUrl: string;
  whatsappNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  plusCode: string;
  facebook: string;
  youtube: { id: string; watchUrl: string; embedUrl: string };
  mapsUrl: string;
  coords: { lat: number; lng: number };
};

export type PublicHomeContent = {
  heroKicker: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  heroSub: string;
  heroImage: string;
  heroImageAlt: string;
  bookingNote: string;
  locationStrip: string;
  slogans: string[];
  followers: string;
  posts: string;
};

import { SITE } from "@/data/site";

export const staticSiteConfig: PublicSiteConfig = {
  phoneDisplay: SITE.phoneDisplay,
  phoneIntl: SITE.phoneIntl,
  telUrl: SITE.telUrl,
  whatsappNumber: "8801700000000",
  email: SITE.email,
  addressLine1: SITE.addressLine1,
  addressLine2: SITE.addressLine2,
  plusCode: SITE.plusCode,
  facebook: SITE.facebook,
  youtube: {
    id: SITE.youtube.id,
    watchUrl: SITE.youtube.watchUrl,
    embedUrl: SITE.youtube.embedUrl,
  },
  mapsUrl: SITE.mapsUrl,
  coords: { ...SITE.coords },
};

export const staticHomeContent: PublicHomeContent = {
  heroKicker: "THE WAY YOU EXPLORE SREEMANGAL",
  heroLine1: "DON'T JUST VISIT",
  heroLine2: "SREEMANGAL.",
  heroLine3: "RIDE IT.",
  heroSub: SITE.heroSub,
  heroImage: "/images/hero-scooty.webp",
  heroImageAlt:
    "Demo scooty parked on a quiet road winding through the green tea gardens of Sreemangal",
  bookingNote: "BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO PAYMENT ONLINE",
  locationStrip: SITE.locationStrip,
  slogans: [...SITE.slogans],
  followers: SITE.stats.followers,
  posts: SITE.stats.posts,
};

export function whatsappUrl(number: string, text: string): string {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
}
