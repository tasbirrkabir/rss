/**
 * Demo fleet data (PRD sections 17 / 37).
 *
 * Rules:
 * - Only "Mini Scooty" is publicly indexed for Red Scooty. The second card is a
 *   generic "Standard Scooty" category, not an invented model.
 * - No prices are shown because no rate is owner-confirmed. Cards show
 *   "৳ — / DAY" per the brief: placeholder pricing until the real rate exists.
 * - `available` is intentionally NOT used (PRD: real data only, no fake inventory).
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
    name: "MINI SCOOTY",
    category: "LIGHT & EASY",
    transmission: "Automatic",
    priceLabel: "৳ — / DAY",
    image: "/images/scooter-02.webp",
    imageAlt: "Compact red mini scooty parked against a plain cream background",
    features: ["Automatic", "Easy ride", "Perfect for tea garden lanes"],
  },
  {
    id: "standard-scooty",
    name: "STANDARD SCOOTY",
    category: "THE ALL-DAY RIDE",
    transmission: "Automatic",
    priceLabel: "৳ — / DAY",
    image: "/images/scooter-standard.webp",
    imageAlt: "Red automatic scooty photographed from the front three-quarter angle",
    features: ["Automatic", "Comfortable on longer routes", "Town to Lawachara and back"],
  },
];

export const FLEET_NOTE =
  "Final fleet list, models and rates are confirmed directly with Red Scooty before launch. Ask us about multi-day rates and hotel pickup.";
