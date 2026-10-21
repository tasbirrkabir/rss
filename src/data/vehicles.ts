/**
 * Demo fleet data.
 */

export type Vehicle = {
  id: string;
  name: string;
  category: string;
  transmission?: string;
  seats?: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
  features: string[];
};

export const VEHICLES: Vehicle[] = [
  {
    id: "mini-scooty",
    name: "DEMO MINI SCOOTY",
    category: "LIGHT & EASY",
    transmission: "Automatic",
    priceLabel: "৳ — / DAY",
    image: "/images/scooter-02.webp",
    imageAlt: "Compact demo mini scooty placeholder",
    features: ["Automatic", "Easy ride", "Perfect for tea garden lanes"],
  },
  {
    id: "standard-scooty",
    name: "DEMO STANDARD SCOOTY",
    category: "THE ALL-DAY RIDE",
    transmission: "Automatic",
    priceLabel: "৳ — / DAY",
    image: "/images/scooter-standard.webp",
    imageAlt: "Demo standard automatic scooty placeholder",
    features: ["Automatic", "Comfortable on longer routes", "Town to Lawachara and back"],
  },
];

export const FLEET_NOTE =
  "Demo fleet showcase: models and rates shown for demonstration purposes. Contact Demo Scooty for inquiries.";
