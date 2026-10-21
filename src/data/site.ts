/**
 * Central site configuration for Demo Scooty Rental.
 *
 * All contact information, branding, owner details and media
 * are configured for demonstration purposes.
 */

export const SITE = {
  name: "DEMO SCOOTY",
  fullName: "Demo Scooty Rental",
  tagline: "EXPLORE SREEMANGAL",
  heroHeadline: "DON'T JUST VISIT SREEMANGAL. RIDE IT.",
  heroSub: "Demo scooty rentals for exploring the tea gardens, forest roads, local trails and the hidden corners of Sreemangal.",

  phoneDisplay: "01700-000000",
  phoneIntl: "+8801700000000",
  telUrl: "tel:+8801700000000",
  whatsappUrl: "https://wa.me/8801700000000",
  email: "demo@example.com",

  addressLine1: "Demo Road, Sreemangal 3210",
  addressLine2: "Demo District, Sylhet, Bangladesh",
  plusCode: "8P3M+DEMO",

  facebook: "https://www.facebook.com/demo",
  mapsUrl: "https://maps.google.com/?q=Sreemangal+Bangladesh",

  coords: {
    lat: 24.3040891,
    lng: 91.7342349,
  },

  slogans: [
    "NO TENSION · NO FUEL COST · FULL FREEDOM",
    "ECO-FRIENDLY · AFFORDABLE · FUN",
    "RIDE SMART, RIDE GREEN",
    "EXPLORE SREEMANGAL THE DEMO WAY",
  ],

  owner: {
    name: "DEMO OWNER",
    role: "DEMO FOUNDER & OWNER",
    photo: "/images/demo-owner.jpg",
    photoAlt: "Demo Owner portrait placeholder",
  },

  youtube: {
    id: "demo-tour",
    watchUrl: "https://youtu.be/demo",
    embedUrl: "https://www.youtube-nocookie.com/embed/demo",
    title: "Demo Scooty Tour | Sreemangal Tour",
    titleEn: "Demo Tour — Scooty Rental Sreemangal",
    poster: "/images/video-sreemangal-tour.jpg",
  },

  stats: {
    followers: "3.5K+",
    posts: "100+",
    category: "Demo Scooty Rental",
  },

  locationStrip: "DEMO ROAD · SREEMANGAL, BD",

  bookingUrl: "/book",
} as const;

/** Primary desktop navigation. */
export const NAV_LINKS = [
  { label: "EXPLORE", href: "/explore" },
  { label: "SCOOTIES", href: "/scooties" },
  { label: "ROUTES", href: "/routes" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
] as const;

/** Every page — mobile menu, footer sitemap, 404 recovery. */
export const ALL_PAGES = [
  { label: "HOME", href: "/" },
  { label: "SCOOTIES", href: "/scooties" },
  { label: "EXPLORE SREEMANGAL", href: "/explore" },
  { label: "RIDE ROUTES", href: "/routes" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "RENTAL GUIDE", href: "/rental-guide" },
  { label: "BOOK A RIDE", href: "/book" },
  { label: "ABOUT", href: "/about" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/contact" },
] as const;

/** Directions endpoint for Google Maps deep links. */
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=";

export function mapsQueryUrl(query: string): string {
  return MAPS_DIRECTIONS_URL + encodeURIComponent(query);
}

/** Pre-filled WhatsApp handoff after a booking request. */
export function whatsappMessageUrl(text: string): string {
  return `https://wa.me/8801700000000?text=${encodeURIComponent(text)}`;
}
