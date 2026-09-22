/**
 * Navigation structure — desktop dropdowns + mobile sheet groups.
 *
 * Deep links:
 * - /explore#<slug>      → destination entry anchors (see destination-entry.tsx)
 * - /routes?route=<id>   → routes explorer preselects the route
 */
import { DESTINATIONS } from "@/data/destinations";
import { RIDE_ROUTES } from "@/data/ride-routes";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/** Desktop + mobile navigation. Items with children render a dropdown. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "SCOOTIES",
    href: "/scooties",
  },
  {
    label: "EXPLORE",
    href: "/explore",
    children: [
      {
        label: "ALL DESTINATIONS",
        href: "/explore",
        description: "The real map, verified pins",
      },
      ...DESTINATIONS.map((d) => ({
        label: d.name,
        href: `/explore#${d.slug}`,
        description: d.type,
      })),
    ],
  },
  {
    label: "ROUTES",
    href: "/routes",
    children: [
      {
        label: "ALL ROUTES",
        href: "/routes",
        description: "Pick your pace",
      },
      ...RIDE_ROUTES.map((r) => ({
        label: r.title,
        href: `/routes?route=${r.id}`,
        description: r.character,
      })),
    ],
  },
  {
    label: "HOW IT WORKS",
    href: "/how-it-works",
  },
  {
    label: "COMPANY",
    href: "/about",
    children: [
      {
        label: "ABOUT",
        href: "/about",
        description: "The story & the owner",
      },
      {
        label: "JOURNAL",
        href: "/journal",
        description: "Field notes from Sreemangal",
      },
      {
        label: "RENTAL GUIDE",
        href: "/rental-guide",
        description: "Docs, rules & road tips",
      },
      {
        label: "CONTACT",
        href: "/contact",
        description: "Call, WhatsApp or visit",
      },
    ],
  },
];

/** Legal pages — footer only. */
export const LEGAL_LINKS: NavChild[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
