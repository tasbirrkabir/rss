# RED SCOOTY DESIGN LANGUAGE — REVISION BRIEF v2 (Task 6+)

Read this fully before editing any file. Target: 70% premium editorial / 20% controlled brutalism / 10% playful street character. The site must feel like a PREMIUM TOURISM brand — sophisticated first, brutalist second. NOT a generic SaaS site, NOT heavily brutalist.

## AUTHORITATIVE EXEMPLARS (already migrated — match these exactly)
- `src/components/home/hero.tsx` — typography, buttons, stickers, img-frame
- `src/components/home/map-section.tsx` — section rhythm, card-soft, chips
- `src/components/home/build-your-ride.tsx` — mood chips, band-ink panel
- `src/components/site/social-proof.tsx` — stats cards, CTA rows
- `src/app/globals.css` — all available utilities (READ IT)

## AVAILABLE UTILITIES (use these, do not invent new systems)
- Typography: `display-hero`, `display-1`, `display-2`, `display-3`, `label-micro`, `copy-body`
  - Replace ad-hoc `text-[clamp(48px,7vw,96px)] font-display` with `display-1` etc. Keep ONE ad-hoc clamp only if the hero truly needs it.
- Surfaces: `card-soft` (white, hairline, soft shadow — the DEFAULT card), `band-ink` (dark section), `rule-soft` (hairline top border), `img-frame` (quiet image frame)
- Buttons: `btn-base btn-primary` (ink→red hover), `btn-base btn-outline`, `btn-base btn-red`, `btn-base btn-cream`. Add `group` + `<ArrowRight className="transition-transform duration-200 group-hover:translate-x-1">` for animated arrows. `h-16 px-10 text-2xl` allowed for hero-size CTAs.
- Links: `link-underline` (animated underline) for inline text links.
- Stickers (10% playful): `sticker` class + rotate + bg-ink/bg-brand. MAX 1–2 per page.
- Shadows: `shadow-soft`, `shadow-lift`, `shadow-deep` for elevation. `shadow-hard*` ONLY for: stickers, ONE hero-adjacent accent per page, red CTA hover glow is built into btn classes (don't add hard shadows to buttons).
- Text outline: `text-outline` / `text-outline-cream` — use at most ONCE per page (or skip).

## HARD RULES
1. NO `border-2 border-ink` on cards/panels — use `card-soft`, `rule-soft`, or `border border-ink/10..15`. `border-2` only allowed on: sticker class internals, tiny chips that must punch (prefer `border` + ink/20 instead).
2. NO `shadow-hard` on cards/buttons (stickers + the ONE accent per page excepted).
3. NO new hand-drawn/geographic SVG diagrams. Maps = the Leaflet components (`@/components/map/lazy-map`, `@/components/map/sreemangal-map`).
4. Section rhythm: `py-20 md:py-28`, container `mx-auto max-w-7xl px-4 sm:px-6`. Alternating bg: default (#f4f1ea) / `bg-cream` / `band-ink` / white sections via `bg-paper`. Separate with `rule-soft` not `border-y-2`.
5. Headings hierarchy: one `display-1` per section; kickers in `label-micro text-brand`; body `text-ink-soft` with `leading-relaxed`.
6. Every interactive element: visible hover state + `focus-visible` (global ring is automatic) + `active:translate-y-px` press feel where tactile (btn-base handles this).
7. Images: always `next/image`, prefer `variant="mask"` Reveal for full-bleed/editorial images (clip-path wipe), subtle `group-hover:scale-[1.03..1.05]` zooms only. NEVER stretch/blur.
8. Motion: use `Reveal` (variants: up/mask/fade/scale, delay 0–0.2), `StaggerGroup`/`StaggerItem` for card grids. No animation longer than 0.7s. Respect existing reduced-motion patterns.
9. Mobile: no horizontal overflow, sticky `MobileCtaBar` must clear content (footer has pb-24), touch targets ≥44px, forms short.
10. HONESTY GUARDS — DO NOT REMOVE OR WEAKEN: DemoBadge on WhatsApp/demo items, "DEMO DATA" labels on ride times, `priceLabel` "CONFIRM CURRENT RATE"/"৳ — / DAY" placeholders, "Details to be confirmed" notes, RIDE_METRICS_NOTE / ROUTE_METRICS_NOTE footnotes, "NOT YET VERIFIED" sections on About. Do NOT invent prices, reviews, ratings, hours, availability, or distances.
11. Do not modify: `src/data/*` files (owner handles data), booking/contact API routes, worklog format. Do not add new npm packages.
12. Desktop nav/footer/header: already migrated — don't restructure them, only touch if a page-specific integration breaks.
13. Keep all existing aria attributes, tracked links (TrackedLink with proper event names from `src/lib/analytics.ts`), and internal cross-links (Destination → Route → Scooter → Booking).
14. Import paths: `@/components/site/reveal` exports `Reveal`, `StaggerGroup`, `StaggerItem`, `EASE_OUT`, `EASE_TACTILE`.

## COPY TONE
Confident, human, editorial. Short sentences. No "embark on an unforgettable journey" filler. Bengali accents allowed (e.g. seven-layer tea). Uppercase display only via font-display Bebas; body sentence case.
