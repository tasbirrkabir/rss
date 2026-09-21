/**
 * Central site configuration for Red Scooty Sreemangal.
 *
 * Sources (PRD section 3 / 50):
 * - Phone + location: screenshot-confirmed Facebook page + Google Maps listing.
 * - Email: screenshot value normalized ("redsc ootysreemangal@gmail.com" -> below).
 * - WhatsApp number: NOT owner-confirmed. Derived from the public phone number
 *   as a demo placeholder — must be validated before production (PRD section 50).
 */

export const SITE = {
  name: "RED SCOOTY",
  fullName: "Red Scooty Sreemangal",
  tagline: "EXPLORE SREEMANGAL",
  heroHeadline: "DON'T JUST VISIT SREEMANGAL. RIDE IT.",
  heroSub: "Scooty rentals for exploring the tea gardens, forest roads, local trails and the hidden corners of Sreemangal.",

  phoneDisplay: "01897-423694",
  phoneIntl: "+8801897423694",
  telUrl: "tel:+8801897423694",
  whatsappUrl: "https://wa.me/8801897423694",
  email: "redscootysreemangal@gmail.com",

  addressLine1: "Jalalia Road, Sreemangal 3210",
  addressLine2: "Moulvibazar, Sylhet, Bangladesh",
  plusCode: "8P3M+JMQ",

  facebook: "https://www.facebook.com/redscootysmg/",
  instagram: "https://www.instagram.com/redscootysmg/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Red+Scooty+Sreemangal+Jalalia+Road",

  // Honest, screenshot-sourced stats (PRD section 3.1). Never inflate.
  stats: {
    followers: "3.1K+",
    posts: "108",
    category: "Bike rental / Scooty rental",
  },

  locationStrip: "JALALIA ROAD · SREEMANGAL, BD",

  bookingUrl: "/book",
} as const;

/** Primary desktop navigation (brief: EXPLORE / SCOOTIES / ROUTES / HOW IT WORKS). */
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

export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=";

export function mapsQueryUrl(query: string): string {
  return MAPS_DIRECTIONS_URL + encodeURIComponent(query);
}

/** Pre-filled WhatsApp handoff after a booking request (PRD section 23). */
export function whatsappMessageUrl(text: string): string {
  return `https://wa.me/8801897423694?text=${encodeURIComponent(text)}`;
}
