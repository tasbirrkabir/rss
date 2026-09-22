/**
 * Navigation structure — desktop dropdowns + mobile sheet accordion.
 *
 * Only links to real, separate pages live here. In-page anchors
 * (/explore#slug, /routes?route=id) are reachable from the pages
 * themselves, not from the nav.
 */

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
  },
  {
    label: "ROUTES",
    href: "/routes",
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
