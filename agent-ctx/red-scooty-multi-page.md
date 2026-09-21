# RED SCOOTY — MULTI-PAGE BUILD: SHARED CONTEXT FOR ALL AGENTS

Read this file fully before writing any code. It is the single source of truth
for the design system, the data layer and the honesty rules. Also read
`/home/z/my-project/worklog.md` (previous work) before you start.

## 1. PROJECT

- Next.js 16 App Router + TypeScript strict + Tailwind CSS 4 + shadcn/ui + Prisma/SQLite + framer-motion + zustand.
- Brand: **Red Scooty Sreemangal** — scooty rental in Sreemangal, Bangladesh ("the tea capital").
- Core idea: sell **the experience of riding through Sreemangal**, not "rent a scooter".
  Headline idea: DON'T JUST VISIT SREEMANGAL. RIDE IT.
- Style: **Mid Brutalism × Editorial Travel × Street Mobility**. Not SaaS. Not a generic travel template.
- Multi-page site: /, /scooties, /explore, /routes, /how-it-works, /rental-guide, /book, /about, /journal, /contact (+ /journal/[slug]).

## 2. DESIGN SYSTEM (already live in `src/app/globals.css` — do not redefine)

Colors (Tailwind theme tokens):
- `bg-paper` = #ffffff, `bg-cream` = #f4f1ea (main off-white), `bg-ink` = #111111
- `text-ink`, `text-ink-soft` (#2a2a2a), `text-steel` (#6f6f6f), `text-cream` (#f4f1ea)
- `bg-brand` / `text-brand` = #f5222d (RED — use strategically, ~10-15% of any screen)
- `bg-leaf` = #1f4d2e (deep green, decorative only)

Typography:
- Display: `font-display` = Bebas Neue (all headings, uppercase, tracking-wide)
- Body: `font-sans` = DM Sans (set on body automatically)
- Hero-size headings: `text-[clamp(52px,8.5vw,120px)]` or bigger; section headings `text-[clamp(48px,7vw,96px)]`

Utilities (already defined, use them):
- `shadow-hard` (4px 4px 0 #111), `shadow-hard-sm`, `shadow-hard-lg`, `shadow-hard-red`, `shadow-hard-red-sm`
- `text-outline` (2px black stroke, transparent fill — use on ink bg), `text-outline-cream`
- `label-micro` (uppercase micro label, 11px, tracking 0.12em, bold)
- `animate-marquee`, `scrollbar-brutal` (custom scrollbar for long lists), `pb-safe`

UI language:
- Borders: `border-2 border-ink` everywhere (or `border-cream/20` on dark)
- Radius: `rounded-none` (everything square)
- Hover: translate `-translate-y-0.5` + shadow shifts; buttons press with `active:` states
- Shadows are HARD OFFSET, never soft/blurry. No glassmorphism, no gradients, no rounded cards.

Motion:
- Use `<Reveal>` from `@/components/site/reveal` for scroll reveals (subtle, reduced-motion aware)
- framer-motion only where genuinely valuable (scroll story, parallax). Keep it fast (0.3-0.5s).

## 3. SHARED COMPONENTS (in `src/components/site/`)

- `header.tsx` — sticky multi-page nav (DONE, do not touch)
- `footer.tsx` — black footer w/ "SEE YOU ON THE ROAD." (DONE, do not touch)
- `mobile-cta-bar.tsx` — fixed mobile bottom bar CALL|WHATSAPP|BOOK (DONE, do not touch)
- `template.tsx` (src/app/template.tsx) — page transition (DONE, do not touch)
- `page-header.tsx` — `<PageHeader kicker title intro meta />` — REQUIRED at top of every interior page.
- `demo-badge.tsx` — `<DemoBadge>DEMO DATA</DemoBadge>` honesty marker.
- `reveal.tsx` — `<Reveal delay={0.1}>`, `<RevealItem>`
- `tracked-link.tsx` — `<TrackedLink event source href external ariaLabel>` for external/analytics links
- `book-button.tsx` — legacy booking-drawer trigger. DO NOT USE — replaced by `<Link href="/book">`.
- Available shadcn/ui in `src/components/ui/`: button, input, textarea, label, select, accordion, sheet, dialog, drawer, tabs, etc. (Use where helpful — sharp styling: `rounded-none border-2 border-ink`.)
- lucide-react icons: NOTE `Scooter` does NOT exist → use `Bike`.

## 4. DATA LAYER (`src/data/`) — import, never duplicate

- `site.ts`: `SITE` (phoneDisplay "01897-423694", telUrl, email, addressLine1/2, facebook, instagram, mapsUrl, stats, bookingUrl="/book", locationStrip), `NAV_LINKS` (desktop nav), `ALL_PAGES` (all 10), `mapsQueryUrl(q)`, `whatsappMessageUrl(text)`
- `vehicles.ts`: `VEHICLES` (mini-scooty, standard-scooty; priceLabel "৳ — / DAY"), `FLEET_NOTE`
- `destinations.ts`: `DESTINATIONS` (7: tea-gardens, lawachara, madhabpur-lake, baikka-beel, hidden-roads, ham-ham, sreemangal-town). Fields incl. `rideTimeLabel`, `routeType`, `whyGo`, `coords {x,y}` (stylized map %), `passport` bool. `PASSPORT_SLUGS`, `RIDE_METRICS_NOTE`.
- `ride-routes.ts`: `RIDE_ROUTES` (3: tea-garden-loop, forest-escape, slow-sreemangal-ride), `findRoute(id)`, `ROUTE_METRICS_NOTE`
- `ride-moods.ts`: `RIDE_MOODS` (5: tea-chill, forest-adventure, photo-day, slow-explorer, half-day-escape), `findMood(id)`
- `journal.ts`: `JOURNAL_ARTICLES` (6 full articles w/ content blocks), `findArticle(slug)`, `JOURNAL_NOTE`
- `route-planner.ts`: legacy generator (may remain unused)

## 5. IMAGE MANIFEST (`public/images/` — all local, use next/image)

Existing: `hero-scooty.png` (red scooty in tea garden, portrait), `scooter-02.png` (mini scooty), `scooter-standard.png` (standard), `rider-road.png` (rider through plantations), `dest-tea-gardens.png`, `dest-lawachara.png`, `dest-madhabpur.png`, `dest-baikka.png`, `dest-hidden-roads.png`
Generating now (verify with `ls public/images`): `dest-town.png`, `dest-hamham.png`, `story-freedom.png` (sunset rider), `story-road.png` (open road), `journal-one-day.png`, `journal-tea-break.png` (seven-layer tea), `journal-cng.png` (scooter vs CNG), `about-shop.png` (red scooters outside shop), `journal-guide.png` (panorama)
→ If a generating image is not yet on disk when you build, still reference the path; files land shortly. Check `ls public/images/` first and warn in your worklog entry if something is missing at the end.

## 6. HONESTY RULES (CRITICAL — never violate)

- NEVER invent: prices (show "৳ — / DAY" or "—"), exact distances beyond data file, fleet count, owner identity, rental policies, customer reviews/ratings, availability, opening hours.
- Unknown specifics → `—`, `Details to be confirmed`, or a `DemoBadge`.
- Approximate ride times exist in data files, always footnoted with `RIDE_METRICS_NOTE` / `ROUTE_METRICS_NOTE`.
- "Live ride status" numbers are demo-labelled via `/api/rides-status` (returns `demo: true`).
- The stylized map is labelled "NOT TO SCALE".
- Contact facts (phone/address/Facebook/email) are verified; WhatsApp is derived & demo-flagged.
- Keep the footer disclaimer intact.

## 7. GLOBAL CONVENTIONS

- Internal links: ALWAYS `import Link from "next/link"` — never raw `<a href="/...">`.
- External links: use `TrackedLink` with `external` (target=_blank rel=noopener).
- Every interior page file starts with `export const metadata: Metadata = { title: "...", description: "..." }` (title pattern: "… | Red Scooty Sreemangal").
- Page shell: every page renders `<div className="flex min-h-screen flex-col"><Header /><main className="flex-1">…</main><Footer /><MobileCtaBar /></div>` (mirror existing `src/app/page.tsx`).
- Booking CTAs link to `/book` (optionally with query: `/book?route=tea-garden-loop`, `/book?vehicle=mini-scooty`, `/book?mood=tea-chill` — the booking page prefill contract).
- Mobile: content vertical, tap targets ≥44px, remember the fixed bottom bar exists (footer already handles clearance; avoid putting critical content in the last 80px of a page).
- Accessibility: semantic sections with aria-labelledby, alt text on every image, aria-pressed/aria-checked on toggles, keyboard-focusable controls.
- TypeScript strict: no `any`, no unused imports (lint fails). Run quality mentally — the integrator runs `bun run lint`.
- Client components: add `"use client"` ONLY where interactivity is needed; prefer server components for static sections.
- next/image: local images need explicit `width`/`height` OR `fill` + sized parent. Known sizes: hero 864x1152, landscape 1344x768, wide 1440x720, portrait 864x1152/768x1344, square 1024x1024.

## 8. BOOKING BACKEND CONTRACT

- `POST /api/bookings` accepts JSON: `{ type: "BOOKING"|"MESSAGE", rideDate?: "YYYY-MM-DD", duration?: "HALF_DAY"|"FULL_DAY"|"MULTI_DAY", vehicleId?: "mini-scooty"|"standard-scooty", riders?: string, routeRef?: string, name: string, phone: string, pickupPreference?: "station"|"hotel"|"town"|"shop"|"unsure", message?: string }`. BOOKING requires rideDate+duration. Returns 201 `{ok:true,id,status,type}` or 400 `{ok:false,error,issues}`.
- Reference implementation of a form client: `src/components/site/booking-form.tsx` (react-hook-form + zod + toast + success panel + WhatsApp handoff). Reuse its patterns; do not import it into pages directly if your page needs different fields — build your own variant in your page's component folder instead (do NOT edit `booking-form.tsx`).
