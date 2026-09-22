# Worklog

---
Task ID: 1
Agent: Z.ai Code (main agent)
Task: Build the Red Scooty Sreemangal demo website (demo v1) from the uploaded PRD
(upload/Red-Scooty-Sreemangal-Website-Research-PRD.md), per PRD section 36
"Demo Scope". Single-page, mobile-first, Tourism Editorial x Mid Brutalism.

Work Log:
- Read the full 1,765-line PRD; extracted design tokens (red #F5222D, ink #111111,
  cream #F4F1EA), typography (Bebas Neue + DM Sans), section flow, booking spec,
  data model, and honesty rules (no invented prices/reviews/scarcity).
- Generated 9 brand images via z-ai CLI into public/images/ (hero scooty in tea
  garden, 2 fleet shots, rider shot, 5 destination shots).
- src/app/globals.css: rebuilt Tailwind 4 theme — brand tokens (brand/ink/cream/
  paper/steel/leaf), shadcn var remap, brutalist utilities (shadow-hard[-red],
  text-outline, label-micro), marquee keyframes, reduced-motion support, custom
  scrollbar, safe-area helper.
- src/app/layout.tsx: Bebas Neue + DM Sans via next/font, full SEO metadata
  (PRD section 30 titles/description/OG/Twitter), AutoRental JSON-LD, viewport.
- src/data/: site.ts (verified contact facts; WhatsApp derived as flagged demo
  placeholder), vehicles.ts (Mini Scooty verified; Standard Scooty generic;
  priceLabel "CONTACT FOR CURRENT RATE"), destinations.ts (5 destinations, approx
  distances per PRD sources), route-planner.ts (deterministic HALF/FULL DAY +
  TEA/FOREST/LAKE/PHOTOS generator).
- Components (src/components/site/): Header (sticky, mobile Sheet), Hero, Marquee,
  BrandValue, Fleet (black section, red price blocks, honest "MORE MODELS" tile),
  Explore (5 destination cards + red conversion tile, tracked Google Maps links),
  RoutePlanner (interactive, aria radiogroup/pressed), HowItWorks, SocialProof
  (screenshot-sourced stats only), About, BookingSection (inline form on black),
  BookingForm (RHF + zod, POST /api/bookings, success panel + WhatsApp handoff,
  toasts), BookingOverlay (Drawer on mobile / Dialog on desktop via zustand
  store + useBookingStore), LocationSection, Footer (pb-24 mobile clearance for
  CTA bar), MobileCtaBar (CALL|WHATSAPP|BOOK, 48px+ targets, safe-area).
- Client-wrapper pattern: BookRideButton + TrackedLink so sections stay server
  components; analytics lib pushes to window.dataLayer (PRD section 29 events).
- Backend: prisma/schema.prisma BookingRequest (status pipeline NEW->CONTACTED->
  CONFIRMED->COMPLETED->CANCELLED), db push ok; src/app/api/bookings/route.ts
  (zod validation, past-date guard, 201/400/500 shape). No server actions.
- page.tsx assembly + sitemap.ts + robots.ts.

Fixes during verification:
- lucide `Scooter` export doesn't exist -> replaced with Bike (page 500 fixed).
- Stale Turbopack CSS cache served old globals.css after edits (custom utilities
  missing, fonts not applying visually) -> cleared .next, restarted dev server.
- Route planner produced duplicate "AFTERNOON" labels (5 mid stops vs 5 labels)
  -> FULL DAY picks reduced to 3 so stops+return map 1:1 to time labels.
- Generated "standard scooty" image was a sport motorcycle -> regenerated as a
  step-through scooter (Honda Activa style), renamed to scooter-standard.png to
  bust image cache.
- Radix Dialog aria-describedby warning -> aria-describedby={undefined}.
- Mobile menu anchor clicks: sheet scroll-lock release cancelled smooth scroll ->
  preventDefault, close sheet, scrollIntoView after 350ms.
- public/robots.txt (template static file) conflicted with app/robots.ts ->
  removed static file; app route now serves robots with sitemap reference.

Browser verification (agent-browser, desktop 1440x900 + mobile 390x844):
- Hero/typography/palette render correctly; all sections present.
- Route planner: FULL DAY + interests -> correct route, unique time labels.
- Fleet card "BOOK THIS RIDE" -> dialog opens with MINI SCOOTY preselected.
- Form: empty date blocked with explicit error; valid submit -> "REQUEST
  RECEIVED." + date/duration summary + CONTINUE ON WHATSAPP + toast.
- DB row confirmed via Prisma: rideDate 2026-09-23, FULL_DAY, mini-scooty,
  name/phone/message stored, status NEW.
- Mobile: sticky bottom bar, booking drawer, menu sheet, footer clearance ok.
- Endpoints: / 200, /sitemap.xml 200, /robots.txt 200, /api/bookings 405 (GET,
  POST-only by design). Lint: 0 errors (1 benign RHF watch() warning). Console:
  no page errors.

Stage Summary:
- Demo v1 complete and browser-verified at / (single page, anchor nav).
- Stack: Next.js 16 + TS + Tailwind 4 + shadcn/ui + Prisma/SQLite + zustand +
  framer-motion (reduced-motion aware).
- Honesty guards kept: no prices, no invented reviews/stats/scarcity, demo
  imagery disclaimer, "pending owner validation" footer note.
- Open items for production (PRD section 50): owner-confirmed pricing, WhatsApp
  number, real customer media, Bangla/bilingual decision, robots/sitemap domain
  (NEXT_PUBLIC_SITE_URL), analytics tooling (GTM/GA4 keys).

---
Task ID: 2
Agent: Z.ai Code (main agent)
Task: Multi-page transformation foundation — data layer, shared shell, backend contracts, image pipeline.

Work Log:
- Read existing demo v1 codebase fully (header/footer/sections/data/api/prisma).
- site.ts: NAV_LINKS -> page routes (/explore /scooties /routes /how-it-works), added ALL_PAGES (10 pages) + SITE.bookingUrl="/book".
- destinations.ts: extended Destination type (rideTimeLabel, routeType, whyGo, coords for stylized SVG map, passport flag); added HAM HAM FALLS + SREEMANGAL TOWN; PASSPORT_SLUGS + RIDE_METRICS_NOTE exports.
- vehicles.ts: priceLabel -> "৳ — / DAY" (brief placeholder pricing).
- NEW ride-moods.ts: 5 Build-Your-Ride moods (tea-chill, forest-adventure, photo-day, slow-explorer, half-day-escape) w/ stop plans, est "—".
- NEW ride-routes.ts: route library (tea-garden-loop, forest-escape, slow-sreemangal-ride) w/ tags, highlights, start time, related destinations.
- NEW journal.ts: 6 complete articles (content blocks, categories, read times, demo dates) + JOURNAL_NOTE.
- header.tsx rewritten: next/link multi-page nav + usePathname active state, mobile sheet lists ALL_PAGES, BOOK -> /book (booking-store no longer used by shell).
- mobile-cta-bar.tsx: BOOK cell -> Link to /book.
- footer.tsx: giant "SEE YOU ON THE ROAD." statement + ALL_PAGES grid nav (2 cols) + WhatsApp row; demo disclaimer kept.
- NEW src/app/template.tsx: subtle 0.28s page transition (reduced-motion aware).
- NEW components/site/page-header.tsx (shared interior page header) + demo-badge.tsx (honesty marker).
- prisma/schema.prisma: BookingRequest + type/riders/routeRef, rideDate+duration now nullable; db push OK.
- api/bookings: extended zod (type BOOKING|MESSAGE, riders, routeRef, pickup enum + station/town, MULTI_DAY); conditional validation.
- NEW api/rides-status: demo-labelled live-status payload.
- sitemap.ts: all 10 pages + 6 journal slugs.
- scripts/gen-images-mp.ts launched in background (9 new images: dest-town, dest-hamham, story-freedom, story-road, journal-one-day, journal-tea-break, journal-cng, about-shop, journal-guide).
- Wrote agent-ctx/red-scooty-multi-page.md (shared design system + conventions + contracts for all page agents).

Stage Summary:
- Shell is multi-page ready; data layer covers all 10 pages; backend accepts booking + message types with route prefill refs.
- Agents must follow agent-ctx/red-scooty-multi-page.md. BOOK CTAs = Link to /book (optionally ?route=|?vehicle=|?mood=).
- Legacy single-page pieces (booking-overlay, booking-section, old booking-form, book-button, route-planner, fleet/explore/about/location sections) are retired from home; agent clusters may adapt fleet.tsx/explore.tsx/how-it-works.tsx/about.tsx/location-section.tsx for their pages.

---
Task ID: 3-b
Agent: fleet-cluster-builder
Task: Build 4 pages of the Red Scooty Sreemangal multi-page site:
/scooties, /routes, /how-it-works, /rental-guide (pages + fresh components
in dedicated folders, no edits to existing files).

Work Log:
- Read agent-ctx/red-scooty-multi-page.md + worklog.md + pattern files
  (page-header, fleet, how-it-works, vehicles/ride-routes/site data, page.tsx
  shell). Verified public/images (scooter-02, scooter-standard, dest-tea-gardens,
  dest-lawachara, rider-road all on disk) and lucide exports (IdCard,
  ScrollText, HandCoins, ShieldCheck, Wrench, Undo2 exist; Scooter avoided).
- /scooties (src/app/scooties/page.tsx + src/components/scooties/):
  fleet-showcase.tsx (ink section, VEHICLES cards w/ "RED SCOOTY 01/02" index,
  aspect-[4/5] fill images, feature chips, red price block from data
  "৳ — / DAY" + "rate confirmed on booking — no online payment" micro,
  BOOK THIS RIDE -> /book?vehicle={id}, ASK ABOUT THIS SCOOTY ->
  whatsappMessageUrl tracked external, honest dashed MORE MODELS tile);
  specs-strip.tsx (4-cell bordered grid: TRANSMISSION AUTOMATIC CONFIRMED,
  ENGINE/STORAGE "TO BE CONFIRMED" + DemoBadge, HELMETS ask on booking);
  included-ask.tsx (generic "WHAT IS INCLUDED" / "ASK WHEN YOU BOOK" columns,
  no invented policies + DemoBadge micro); scooties-cross-links.tsx
  (/routes, /rental-guide, red /book cell); FLEET_NOTE as micro text footer.
- /routes (src/app/routes/page.tsx + src/components/routes/):
  route-card.tsx (md:grid-cols-12, image col-span-7 alternating sides,
  bordered tilted figure w/ ROUTE 0n flag, tag chips + duration chip,
  character/description, square-bullet highlights, SUGGESTED START dashed
  chip, numbered mini timeline of stops, BOOK THIS RIDE -> /book?route={slug}
  + SEE DESTINATIONS -> /explore); ROUTE_METRICS_NOTE footnote as label-micro;
  routes-own-band.tsx (PREFER YOUR OWN ROUTE? ink band -> /book, planning on
  request note).
- /how-it-works (src/app/how-it-works/page.tsx + components/how-it-works/):
  process-steps.tsx (5 stacked min-h-[60vh] steps CHOOSE/BOOK/PICK UP/RIDE/
  RETURN, alternating md:flex-row[-reverse] alignment on alternating
  paper/cream, giant numbers text-[clamp(80px,14vw,200px)] alternating
  text-brand/text-outline, Reveal per step, maps TrackedLink (get_directions)
  on step 03 + /explore link on step 04); trust-strip.tsx (ink, three bordered
  cells BOOKING BY REQUEST / CONFIRMED PERSONALLY / NO ONLINE PAYMENT REQUIRED
  + DemoBadge small print for deposit/documents/delivery); cta-band.tsx
  (red band, START WITH STEP 01. -> /book).
- /rental-guide (src/app/rental-guide/page.tsx + components/rental-guide/):
  guide-sections.tsx (6 numbered bordered cards sm:grid-cols-2 — REQUIREMENTS/
  RENTAL RULES/DEPOSIT/SAFETY/DAMAGE POLICY/RETURN POLICY — lucide IdCard/
  ScrollText/HandCoins/ShieldCheck/Wrench/Undo2, square-bullet "what to
  expect" lines, DemoBadge DETAILS TO BE CONFIRMED on every card, no invented
  policies); FAQPage JSON-LD with 5 honest Q&As (request->personal
  confirmation, no online payment, licence + deposit confirmed personally,
  Jalalia Road pickup, rates on request); guide-cta-band.tsx (/book + /contact).
- All 4 pages: server components only (Reveal/TrackedLink are the client
  boundary), exact shell div>Header>main.flex-1>Footer>MobileCtaBar, next/link
  for internal, TrackedLink external for WhatsApp/maps, next/image fill+sized
  parents with explicit sizes attrs, metadata per spec.
- Verification: curls returned 200 for all four routes; dev.log shows clean
  compiles (no errors, only pre-existing benign Fast Refresh warnings);
  spot-checked rendered HTML (price placeholder, route titles, JSON-LD,
  demo badges, step labels all present). No lint/build run per task rules.
- Deviation (minor): route card titles rendered as h2 (not h3) to keep
  heading order h1->h2 on /routes.

Stage Summary:
- /scooties, /routes, /how-it-works, /rental-guide built and rendering 200,
  consistent with the mid-brutalist system (border-2, shadow-hard, Bebas
  display, label-micro) and the booking prefill contract
  (?vehicle= / ?route=).
- Honesty kept: no prices, no fleet count, no policies, no reviews; unknowns
  carry DemoBadge / "to be confirmed" / "ask on booking" framing; route
  metrics footnoted with ROUTE_METRICS_NOTE.
- New files only: 4 pages + 11 components under src/components/{scooties,
  routes,how-it-works,rental-guide}. Zero edits to existing files.

---
Task ID: 3-a
Agent: home-builder
Task: Rebuild HOME (/) for the multi-page site — hero refresh + 10 new home
components (src/components/home/) + page.tsx assembly, per
agent-ctx/red-scooty-multi-page.md design system and honesty rules.

Work Log:
- Read agent-ctx, worklog (tasks 1-2), existing site components (hero,
  brand-value, route-planner, reveal, social-proof, marquee-strip), data layer
  (site, vehicles, destinations, ride-moods) and globals.css tokens.
- components/home/hero.tsx (client): stacked clamp(64px,10vw,150px) headline
  "DON'T JUST VISIT / SREEMANGAL. / RIDE IT." (last line brand red); SITE.heroSub
  sub; primary Link /book "BOOK A SCOOTY →" (ink→red hover, shadow-hard,
  press active state, start_booking tracked) + secondary Link /explore outline;
  hero-scooty.png 864x1152 priority in rotated border-2 shadow-hard-lg frame;
  floating tags "SCOOTY RENTAL" (ink) + "SREEMANGAL / 3210" (red, rotated);
  subtle parallax text -30px / image +30px via useScroll+useTransform
  (useReducedMotion → offsets 0); kept micro-location strip (location + CALL).
- components/home/scroll-rail.tsx (client): fixed right rail lg+ (hidden below)
  "01/05..05/05" + current section label + thin progress line (page scroll %);
  rAF-throttled scroll listener, last-section-past-40%-viewport logic over
  [top, the-ride, routes, the-story, your-turn]; fixed left vertical
  "RIDE — EXPLORE — DISCOVER" (writing-mode vertical-rl, steel); both
  pointer-events-none, z-30 (below header z-50).
- components/home/brand-intro.tsx (server): "SREEMANGAL / IS BETTER (outlined) /
  FROM A SEAT." clamp 48-110; two-column editorial body (kicker + three
  sentences); full-bleed h-2/h-3 bg-brand rule; compact 3 benefit minis row
  (FREEDOM / EASY RENTAL / LOCAL ACCESS, small bordered tiles).
- components/home/scooty-showcase.tsx (client, id=the-ride): ink band, "PICK /
  YOUR RIDE." (outlined cream); overflow-x-auto + snap-x scrollbar-brutal
  gallery (min-w 340/400px cards) from VEHICLES; cards: RED SCOOTY 01/02 index,
  AUTOMATIC/EASY TO RIDE/TOURIST FRIENDLY tag chips, aspect-[4/5] image,
  "৳ — / DAY" price block, VIEW SCOOTY → → /scooties; desktop hover: image
  scale-105, card -translate-y-1.5, red spec panel (features + "FULL
  SPECIFICATIONS TO BE CONFIRMED") slides over card bottom (also on
  focus-within for keyboard); static overlay on mobile; dashed "MORE MODELS ON
  REQUEST." tile → /scooties.
- components/home/map-section.tsx (client, id=routes): "ONE SCOOTY. / ENDLESS
  ROUTES." (outlined); bordered cream panel with hand-drawn-feel SVG
  (preserveAspectRatio none + non-scaling-stroke: 4 wobbly tea-area blobs,
  5 dashed routes from town marker, ink strokes); 7 DESTINATIONS pins at
  coords % (aria-pressed buttons, red squares + bordered labels, labels flip
  side for right-edge pins); default lawachara; aria-live info card: DISTANCE /
  EST. RIDE TIME / TYPE OF ROUTE / WHY GO; "STYLIZED MAP — NOT TO SCALE"
  micro-label + RIDE_METRICS_NOTE; CTA "SEE THE ROUTES →" → /routes.
- components/home/build-your-ride.tsx (client, id=build-your-ride): "WHAT KIND /
  OF RIDE / DO YOU WANT?"; 5 RIDE_MOODS radio buttons (aria-checked, selected =
  brand red); ink result panel (shadow-hard-red, aria-live): tagline, planTitle,
  vertical stop timeline (connector + square markers per old route-planner),
  EST. TIME "—" / DISTANCE "—" rendered literally from data + honesty micro
  line; CTA "BOOK THIS ROUTE →" → /book?mood={bookQuery} (click_booking) +
  "ASK ABOUT IT ON WHATSAPP" via whatsappMessageUrl; start_booking tracked on
  mood select (source build_your_ride).
- components/home/scroll-story.tsx (client, id=the-story): 350vh section +
  sticky 100vh viewport; 4 stages (TEA/dest-tea-gardens → FOREST/dest-lawachara
  → ROAD/story-road → FREEDOM/story-freedom) crossfade via useScroll
  (start start→end end) + useTransform with short keyframe ranges, subtle
  1.04→1.1 zoom per stage, duration-free; giant Bebas words solid cream /
  text-outline-cream; "YOUR TURN." + BOOK A RIDE → /book in final 20%
  (opacity + pointerEvents driven by scroll progress so the invisible link
  never blocks); useReducedMotion → static 2x2 grid + CTA fallback.
- components/home/process-strip.tsx (server): 01 CHOOSE … 05 RETURN bordered
  tiles, trust line "BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO ONLINE
  PAYMENT REQUIRED", "SEE HOW IT WORKS →" → /how-it-works (does NOT import
  site/how-it-works.tsx).
- components/home/final-cta.tsx (server, id=your-turn): ink band, kicker "NO
  FORMS TO STUDY", "READY? / LET'S GO." (red), BOOK A SCOOTY → /book, call
  link with SITE.phoneDisplay, WhatsApp handoff link.
- page.tsx rewritten as shell: Header + ScrollRail + main(Hero, MarqueeStrip,
  BrandIntro, ScootyShowcase, MapSection, BuildYourRide, ScrollStory,
  ProcessStrip, SocialProof, FinalCta) + Footer + MobileCtaBar. Retired home
  pieces (Fleet/Explore/RoutePlanner/About/BookingSection/LocationSection/
  BookingOverlay/BookRideButton) no longer imported.
- Browser-verified (agent-browser 1440x900 + 390x844): page 200, no page
  errors; parallax containers given `relative` after framer-motion dev warning
  investigation (remaining dev-only console notice is FM 12's known
  scrollingElement check — offsets verified working); rail state 02/05→05/05 +
  fill % correct; map pin click swaps info card (BAIKKA verified); mood select
  renders plan, 2 "—" stats, /book?mood=forest-adventure link; story crossfade
  at 50% shows ROAD only, final stage opacity/pointer-events correct at 90%;
  showcase swipe scrollable on mobile, rail hidden, CTA bar visible.

Stage Summary:
- Home is fully multi-page: all CTAs are next/link routes (no anchor nav, no
  booking overlay); sections 01-05 map to the scroll rail ids.
- Honesty kept: "৳ — / DAY" prices, "—"/"WHENEVER" metrics from data files,
  RIDE_METRICS_NOTE + NOT-TO-SCALE labels, no invented reviews/availability,
  "FULL SPECIFICATIONS TO BE CONFIRMED" on hover panels, dashed more-models
  tile, process strip trusts personal confirmation only.
- Images: hero + both scooties + dest-tea-gardens + dest-lawachara exist;
  MISSING ON DISK at build time: /images/story-road.png and
  /images/story-freedom.png (referenced by scroll-story per manifest — Task 2
  generator still pending); also missing (not used by home): dest-town.png,
  dest-hamham.png, journal-*.png, about-shop.png. Story stage 3/4 will 404
  until the generator lands.
- Dev-only notice: framer-motion 12 "non-static position" console warning
  (checks document.scrollingElement when using useScroll({target}) with window
  scroll) — benign, dev-only, verified parallax/crossfade work correctly.

---
Task ID: 3-d
Agent: conversion-cluster-builder
Task: Build the conversion cluster pages /book, /contact, /about for the Red
Scooty multi-page site (Next.js 16 App Router + TS + Tailwind 4 + Prisma),
following agent-ctx/red-scooty-multi-page.md (design system, data APIs,
honesty rules, backend contract). No edits to existing files.

Work Log:
- Read shared context + worklog + all reference implementations (api/bookings,
  legacy booking-form, location-section, about, page-header, demo-badge,
  data files, analytics, use-toast). `ls public/images/` checked first:
  about-shop.png NOT yet on disk (gen script still running) - referenced the
  path anyway per agent-ctx section 5; flagged below.
- /book (src/app/book/page.tsx + src/components/book/{ride-status,booking-form}.tsx):
  * PageHeader "BOOK A RIDE / LET'S GET YOU MOVING." + LIVE RIDE STATUS strip
    (client, fetch GET /api/rides-status, two stat blocks RIDES TODAY /
    SCOOTIES READY with DemoBadge + API note as micro text, loading = "—",
    fetch fail = numbers hidden + fallback note, aria-live polite).
  * Fresh BookingForm (RHF + zod, mirrors legacy patterns): NAME, PHONE,
    DATE (min = today via local-date helper), DURATION segmented
    (HALF_DAY/FULL_DAY/MULTI_DAY, default FULL_DAY), PREFERRED SCOOTY
    segmented (none/mini-scooty/standard-scooty), NUMBER OF RIDERS free text,
    "WHERE ARE YOU RIDING FROM?" segmented (station/hotel/town/shop/unsure)
    with aria-pressed buttons + aria-live contextual line per choice,
    MESSAGE optional. Hidden inputs + setValue for segment fields (legacy
    pattern). Client zod + inline role=alert errors matched to API issue keys
    (server 400 issues merged into the same inline lines). Toast on error and
    success. POST /api/bookings {type:"BOOKING", ...} -> 201.
  * useSearchParams prefill wrapped in <Suspense fallback={null}> on the page
    (Next 16 requirement): ?vehicle= -> preselect scooty; ?route= ->
    findRoute() -> message "I want to ride: {title} ({tags})" + routeRef;
    ?mood= -> findMood() -> "I want the {label} ride." + routeRef. Chip
    "PRE-FILLED FROM: {sources}" (verified SSR: "RIDE ROUTE + SCOOTY PAGE").
  * Success state: bordered panel "REQUEST RECEIVED." + confirmation copy +
    summary grid (date/duration/scooty/route if present) + tracked
    CONTINUE ON WHATSAPP (whatsappMessageUrl prefilled summary) + MAKE
    ANOTHER REQUEST reset. Trust line under card: "BOOKING BY REQUEST ·
    CONFIRMED PERSONALLY · NO ONLINE PAYMENT REQUIRED".
  * Analytics: track("start_booking") once on mount, track("submit_booking")
    on success; WhatsApp handoff via TrackedLink click_whatsapp.
  * Right rail (server): GOOD TO KNOW card (booking by request / confirmed
    personally / no online payment / deposit & documents "Details to be
    confirmed." + DemoBadge), Link rows RENTAL GUIDE / HOW IT WORKS /
    CONTACT, bordered PREFER TO TALK? card with CALL (tel, tracked) +
    WHATSAPP (external, tracked).
- /contact (src/app/contact/page.tsx + src/components/contact/quick-message-form.tsx):
  * PageHeader "CONTACT / TALK TO A HUMAN."; six brutal method cards
    (sm:2 lg:3, hover lift): CALL, WHATSAPP (DemoBadge - derived number),
    FACEBOOK ("fastest reply"), EMAIL (mailto, plain anchor - no matching
    analytics event by design), GOOGLE MAPS (get_directions), HOURS
    (DemoBadge, no fake opening hours).
  * Address block (addressLine1/2 + plusCode) + deep-green stylized map panel
    reusing location-section's bg-leaf + repeating-linear-gradient tea-rows
    pattern with OPEN IN GOOGLE MAPS tracked CTA.
  * QUICK MESSAGE FORM (client): NAME/PHONE/MESSAGE -> POST /api/bookings
    {type:"MESSAGE"}; inline validation (phone required), toast, success
    inline panel "MESSAGE RECEIVED." + "We will get back to you — usually
    fastest on WhatsApp." + SEND ANOTHER MESSAGE reset.
- /about (src/app/about/page.tsx, server):
  * PageHeader "ABOUT RED SCOOTY / WE'RE NOT JUST RENTING SCOOTIES."
    (brand red on SCOOTIES.); mission story two-col: "MAKING SREEMANGAL
    EASIER TO EXPLORE — INDEPENDENTLY." + 3 mission-level paragraphs (no
    founder/history invented); /images/about-shop.png (1344x768) in rotated
    bordered frame shadow-hard-lg + floating tag "JALALIA ROAD / SREEMANGAL".
  * Facts card: VERIFIED micro row (phone tel-tracked, address, Facebook
    tracked, category from SITE.stats) + "NOT YET VERIFIED" dashed section
    (WhatsApp + opening hours with DemoBadges).
  * Stats strip from SITE.stats (3.1K+ / 108 / SMG) on ink card + micro note
    "SCREENSHOT-SOURCED NUMBERS — NEVER INFLATED."
  * Qualitative TIMELINE (no dates, honesty rule): STARTED -> GROWING ->
    MORE RIDES -> MORE EXPLORATION as connected bordered squares with red
    arrows.
  * Quote block (bg-cream border-2): "SREEMANGAL IS NOT A PLACE TO RUSH
    THROUGH." + tea-capital identity paragraph; ink CTA band -> /book
    primary + /explore secondary.
- Infrastructure repair (no file edits): first live POSTs returned 500
  "could not save" - prisma schema (task 2) was pushed but the generated
  Prisma Client in node_modules was stale ("Unknown argument `type`").
  Ran `bun run db:push` (regenerated client v6.19.2; DB already in sync),
  then restarted the dev server with the same system command (`bun run dev`
  on :3000, detached) because the running process kept the stale client.
  Retested end-to-end, then deleted all test rows from BookingRequest
  (deleteMany where name in Probe/Test Rider/Test Sender -> count 4).

Stage Summary:
- /book, /contact, /about live and verified: all routes 200; BOOKING +
  MESSAGE POSTs return 201 {ok,id,status:"NEW"}; invalid payloads return 400
  with issue keys matching the form's inline error mapping; /api/rides-status
  demo payload renders with DemoBadge; prefill chip renders server-side.
- Honesty rules held: no prices, no availability claims, no invented
  founder/history/dates, WhatsApp + hours + deposit demo-flagged, ride-status
  demo-labelled, stats screenshot-sourced note.
- Files created (8): src/app/book/page.tsx, src/app/contact/page.tsx,
  src/app/about/page.tsx, src/components/book/ride-status.tsx,
  src/components/book/booking-form.tsx,
  src/components/contact/quick-message-form.tsx (+ this worklog entry and
  agent-ctx/3-d-conversion-cluster-builder.md). Zero edits to existing files.
- OPEN FLAG: /images/about-shop.png was still missing from public/images at
  build time (scripts/gen-images-mp.ts still running, 7/9 images done).
  /about references the path and will render once the file lands - verify on
  the /about page.
- NOTE FOR INTEGRATOR: dev server was restarted to load the regenerated
  Prisma Client; if any process sees Prisma "Unknown argument `type`" 500s,
  rerun `bun run db:push` and restart `bun run dev`.

---
Task ID: 3-c
Agent: content-cluster-builder
Task: Build the content cluster — /explore (with Ride Passport), /journal,
/journal/[slug] article pages. No edits to existing files; fresh components in
src/components/explore/ + src/components/journal/.

Work Log:
- Read agent-ctx/red-scooty-multi-page.md, worklog.md, pattern files
  (page-header/explore/reveal, destinations/journal/site data, home shell).
- /explore (src/app/explore/page.tsx): PageHeader (WHERE WILL YOU RIDE?), Tourist
  attraction ItemList JSON-LD, RIDE_METRICS_NOTE footnote. Destination list =
  7 giant editorial entries (components/explore/destination-entry.tsx): alternating
  md:grid-cols-12 composition, image left/right, py-16/24 spacing, rotated frames
  (±1.25deg desktop only), negative-margin bleed into the gutter, oversized outline
  index numbers overlapping frames, routeType figcaption chip, goodFor slash tags,
  distance/ride-time chips, whyGo red-rule pull-quote, GET DIRECTIONS (TrackedLink
  external, event get_directions, source explore:{slug}) + RIDE IT (Link /book).
  Ham Ham uses portrait aspect-[3/4] (864x1152); others aspect-[7/4].
- RIDE PASSPORT (components/explore/ride-passport.tsx, client): localStorage key
  "rs-passport-v1" (array of slugs, sanitized), read in useEffect (no hydration
  mismatch), write + window CustomEvent sync on toggle so 4 card buttons and the
  panel stay in sync. Card toggle: aria-pressed, dashed→red stamp w/ slight rotate.
  Panel: 4 stamp slots (filled = red border/rotate/check, empty = dashed + name),
  progress "X / 4 STAMPS" (aria-live), segment bar, complete state = "PASSPORT
  COMPLETE." + pickup line + DemoBadge, reset button w/ aria-label, "saved on this
  device only" honesty note. Desktop xl: sticky top-24 panel in col-span-4 beside
  col-span-8 list; below xl: fixed collapsible bottom bar/sheet
  (bottom-[calc(3.5rem+env(safe-area-inset-bottom))] to clear MobileCtaBar,
  md:bottom-4, hidden at xl, max-h-62vh scroll area).
- /journal (src/app/journal/page.tsx + journal-featured.tsx + journal-card.tsx):
  PageHeader (NOTES FROM THE ROAD.), featured = first article split layout
  (image 7 cols shadow-hard-lg, category/title/excerpt/date·readTime + DEMO badge,
  READ THE NOTE →), grid sm:2/lg:3 of remaining 5 cards (aspect-4/3 image,
  line-clamp-3 excerpt, hover -translate-y-1 + shadow-hard-lg), JOURNAL_NOTE
  footnote, black CTA band → /book.
- /journal/[slug] (src/app/journal/[slug]/page.tsx, server): generateStaticParams
  from JOURNAL_ARTICLES, generateMetadata (title pattern, excerpt description, OG
  image), notFound() on unknown slug (verified 404). Breadcrumb "← ALL NOTES",
  full-width hero image (sizes 100vw, shadow-hard-lg), meta row w/ DEMO CONTENT
  badge, giant title, editorial body (max-w-2xl, red-rule h2s, 17px prose, lead
  paragraph larger), Article JSON-LD (Organization author), GO RIDE IT end band
  (RIDE {route.title} → /book?route={id} when relatedRoute exists, else /book),
  related destination chips → /explore, JOURNAL_NOTE footnote.
- Images: relaunch of scripts/gen-images-mp.ts regenerated the 8 missing files
  (dest-town, dest-hamham, story-freedom, story-road, journal-one-day,
  journal-tea-break, journal-cng, about-shop). journal-guide.png FAILED at
  1440x720 (API requires 32px multiples) → regenerated at 1408x704 (~2:1), no
  code change needed (object-cover). NOTE: all generated files are JPEG-encoded
  with .png extensions (same as the original 9; next/image serves them fine).
- Verified: /explore /journal /journal/{slug} all 200, unknown slug 404, JSON-LD
  present in HTML, route-prefill link /book?route=tea-garden-loop rendered,
  aria-pressed toggles SSR'd. No lint/build runs per task rules (integrator runs).

Stage Summary:
- Content cluster complete: /explore w/ working Ride Passport persistence,
  /journal index, /journal/[slug] static article pages (6 slugs prebuilt).
- Honesty rules kept: DEMO badges on demo dates, ride metrics footnote, no
  invented facts; passport complete-state explicitly labelled demo fun.
- All images referenced by these pages now exist on disk (see journal-guide
  size deviation above). No existing files were modified.

---
Task ID: 4
Agent: Z.ai Code (main agent)
Task: Multi-page integration — cleanup, lint, end-to-end browser verification.

Work Log:
- Integrated 4 agent clusters (10 pages live). Fixed 2 issues:
  (1) ride-passport.tsx refactored from useState-in-effect to useSyncExternalStore
  (cached snapshot vs raw localStorage string to keep referential stability);
  restored missing useState import for the mobile collapsible.
  (2) fleet priceLabel -> "৳ — / DAY" (brief placeholder pricing).
- Deleted 14 retired single-page legacy files (book-button, booking-overlay/
  section/form, hero, brand-value, fleet, explore, route-planner, how-it-works,
  about, location-section, lib/booking-store, data/route-planner). social-proof
  + marquee-strip kept (still used by home).
- Verified all 18 images on disk (9 generated this phase).
- Lint: 0 errors, 1 benign warning (RHF watch() in live booking form).
- Browser verification (agent-browser, desktop 1440x900 + mobile 390x844):
  * Home: hero typography/parallax, floating labels, scroll rail 01→05, map
    pin click switches info panel, mood builder renders plan + honest — stats,
    scroll story crossfade (ROAD stage at 45%), social proof, final CTA.
  * /book: ?mood=forest-adventure prefill chip + message, form submit →
    "REQUEST RECEIVED." + summary + WhatsApp handoff; DB row verified
    (type BOOKING, routeRef forest-adventure, pickup station, status NEW).
  * /contact: MESSAGE form → "MESSAGE RECEIVED." (API 201).
  * /explore: passport stamps → localStorage rs-passport-v1, panel 2/4,
    sticky desktop panel renders.
  * All routes 200 + correct metadata titles: / /scooties /routes
    /how-it-works /rental-guide /journal /journal/[slug] /contact /about.
  * /sitemap.xml 200 (16 URLs), /robots.txt 200, /api/rides-status 200 (demo-flagged).
  * Mobile: bottom CTA bar (CALL|WHATSAPP|BOOK) fixed + footer clears it,
    hero stacks correctly, menu sheet lists all pages.
- Cleaned 2 test rows from BookingRequest.

Stage Summary:
- Premium multi-page experience complete: 10 pages + journal article pages,
  4 extraordinary features (ride passport, ride status strip, cinematic scroll
  story, build-your-ride moods), booking + contact backends with real persistence.
- Visual DNA preserved site-wide: cream bg, red strategic accents, Bebas/DM Sans,
  2px black borders, hard offset shadows, editorial asymmetry.
- Honesty guards intact everywhere: ৳ — / DAY pricing, — distances/times,
  DemoBadge markers, NOT TO SCALE map, no invented reviews/policies/hours.

---
Task ID: 5
Agent: Z.ai Code (main agent)
Task: Integrate owner-supplied materials — owner photo (Radiyan Hossen),
YouTube tour video (youtu.be/vk0oyKnZVPs) and verified Google Maps listing
(maps.app.goo.gl/ZE53GmbXSVHsUJQJ7) into the finished multi-page site.

Work Log:
- Extracted info: Maps share link resolves to place "Red Scooty Sreemangal"
  at coords 24.3040891, 91.7342349; video metadata (title, publish date
  2025-11-01, ~1.9K views); fetched real 1280x720 video stills via ytimg
  (yt-dlp blocked by YouTube bot check).
- Assets: optimized owner photo -> public/images/owner-radiyan-hossen.jpg
  (960px JPEG, 138KB); video thumbnail -> video-sreemangal-tour.jpg (poster);
  two real frames -> real-tea-break.jpg (Finlay tea-garden tea stop) and
  real-town-ride.jpg (POV town riding).
- src/data/site.ts: added owner block (name/role/photo/alt), verified
  coords, youtube block (id/embedUrl/watchUrl/poster), mapsUrl upgraded from
  search-query fallback to owner's verified share link; added MAPS_EMBED_URL.
- New src/components/site/video-band.tsx: click-to-play, privacy-enhanced
  YouTube embed (youtube-nocookie), brutalist frame, zero YT requests until play.
- About page: new "THE PERSON BEHIND THE PHONE" owner section (rotated photo
  card + THE OWNER sticker + honest copy + WhatsApp CTA with demo badge);
  new "SEE SREEMANGAL IN MOTION" video section; VideoObject JSON-LD with
  real upload date 2025-11-01.
- Contact page: stylized plus-code panel replaced with REAL Google Maps embed
  (grayscale -> color on hover, red sticker label, verified-listing note,
  plus code kept); OPEN IN GOOGLE MAPS buttons now hit the verified share link.
- Footer: added YouTube + Google Maps icon buttons; footer address now links
  to the Maps listing.
- Journal: swapped AI images for real video stills on "one day" (real tea
  break) and "travel guide" (real town ride) with accurate alt text.
- layout.tsx JSON-LD: added founder (Radiyan Hossen), GeoCoordinates, hasMap,
  expanded sameAs (FB, IG, YouTube, Maps).
- analytics.ts: added click_youtube event.
- Lint: 0 errors (1 known benign RHF warning). Browser-verified (desktop
  1440x900 + mobile 390x844): owner section, video poster -> click -> iframe
  loads youtube-nocookie embed, contact map renders pin at verified coords,
  journal real images load, footer icons present; all 14 routes 200; no
  dev-log errors.

Stage Summary:
- All owner-supplied material is now live: owner identity + photo on About,
  business tour video embedded (click-to-play), verified Maps listing
  embedded on Contact and linked everywhere.
- Real footage stills replace two AI journal images for authenticity.
- Structured data enriched (founder, geo, hasMap, VideoObject) — SEO benefit.
- Honesty guards preserved: WhatsApp still demo-badged, no invented facts;
  video publish date sourced from the actual YouTube page.

---
Task ID: 6-a
Agent: Z.ai Code (research sub-agent)
Task: Research-only verification of REAL coordinates for Red Scooty Sreemangal +
7 destinations around Sreemangal (Lawachara gate, Madhabpur Lake, Baikka Beel,
Ham Ham waterfall, Sreemangal town/station, tea-garden viewpoint); plus road
distances, road notes and Google Business Profile public data. No project code
written or modified (per task rules).

Work Log:
- Plus-code cross-check: decoded 8P3M+JMQ with the official openlocationcode
  library (pip, v1.0.1; self-tested against known vector 849VCWC8+R9).
  recoverNearest -> 7MPH8P3M+JMQ, center 24.304088, 91.734234 = 0.2 m from the
  owner's Google Maps share-link coords (24.3040891, 91.7342349). Also
  re-resolved maps.app.goo.gl/ZE53GmbXSVHsUJQJ7 -> google.com/maps/place/Red+
  Scooty+Sreemangal/...!8m2!3d24.3040891!4d91.7342349 (CID 0xafc386e426495147).
  CONCLUSION: plus code and coordinates are MUTUALLY CONSISTENT, no discrepancy.
- Wikipedia/Wikidata APIs: Lawachara NP 24.319722, 91.783611 (en+bn wiki,
  Q3350641); Madhobpur Lake 24.2812, 91.8181 (enwiki Q/26048036 + bnwiki
  মাধবপুর হ্রদ); Hum Hum Waterfall 24.16797222, 91.91252778 (enwiki 35399385;
  bnwiki 24.16722222, 91.91161111); Sreemangal settlement Q4526619 24.308333,
  91.733333; Sreemangal railway station Q60433078 24.306648, 91.734984.
- OpenStreetMap (Nominatim/Overpass/OSM API): Lawachara MAIN ENTRANCE GATE node
  401422104 (barrier=gate, entrance=main, desc "Main entrance to the Lowachara
  national park") 24.3250162, 91.7871805; Sreemangal Railway Station way
  1545698095 / node 317357840 24.306587, 91.734756; Baikka Beel wetland way
  662227904 center 24.3502701, 91.6994845 + Baikka Beel Visitor Centre way
  662227909 / node 10146518044 24.351474, 91.705516; Madhabpur lake way
  29278148 24.281044, 91.817327; "Hum Ham Waterfall" node 10313158135
  24.167732, 91.911957; Tea Museum (চা যাদুঘর) way 34580584, addr:street
  "Sreemangal - Bhanugach Road", center 24.2999599, 91.7599871; unnamed
  tourism=viewpoint node 13360929201 24.30946, 91.762857 in a tea garden.
- Offroad Bangladesh pages scraped: Madhobpur Lake 24.2819, 91.8197; Baikka
  Beel Sanctuary 24.3514, 91.6979; road notes captured (Baikka: CNG 400-500
  BDT from Srimangal station road, ~6 km on main road then left at signboard,
  "4WD Jeep/SUV suggested, country road not suitable for sedans"; Madhabpur:
  CNG/bus from Sreemangal, lake trek 8-10 km trail, risky in rainy season).
- Web searches: distances — Lawachara 7-8 km (Wikipedia "8 km from Sreemangal",
  TripAdvisor "7 km"); Madhabpur 16 km (beautifulbangladesh.gov.bd official);
  Baikka ~17 km (orientecotourism) / ~20 km (touristplacesbd), 45 min
  (TripAdvisor); Ham Ham 32 km by road to trailhead (distancesfrom.com) + 2-3 h
  trek (touristplacesbd/TripAdvisor/beautifulbangladesh). Tea gardens =
  Sreemangal-Bhanugach Rd (OSM + Wikipedia + htlbd address); Lawachara inside
  West Bhanugach Reserved Forest (Wikipedia).
- DISTRICT CORRECTION found: Madhabpur Lake is in Kamalganj Upazila,
  Moulvibazar (enwiki "Madhobpur Lake", offroadbangladesh, bnwiki "মাধবপুর
  ইউনিয়ন, কমলগঞ্জ") — NOT Madhabpur Upazila, Habiganj (a different place);
  flag for site copy fix.
- Google Business Profile (headless browser on live Maps place panel): name
  "Red Scooty Sreemangal", category "motorcycle/scooter rental agency"
  (電單車租借代理), address "8P3M+JMQ, Jalalia road, Sreemangal, Bangladesh";
  NO rating, NO review count, NO hours, NO phone, NO website published
  (listing shows "add hours/phone/website" + "claim this business" prompts =>
  appears unclaimed). FB page (public search snippet) shows phone +880 18 9742
  3694 and "Jalaiya road" location; Instagram/TikTok/YouTube reels exist.
- Straight-line distances computed from business coords: station 0.28 km,
  Tea Museum 2.65 km, viewpoint node 2.96 km, Lawachara park centroid 5.30 km,
  Lawachara gate 5.85 km, Baikka visitor centre 6.02 km, Madhabpur lake
  8.87 km, Ham Ham falls 23.58 km.

Stage Summary:
- All 7 destinations now have source-verified coordinates (5-6 dp) with URLs;
  nothing fabricated. Verified pairs: business 24.3040891, 91.7342349 (Maps +
  plus code agree 0.2 m); Lawachara gate 24.325016, 91.787181 (OSM) with park
  centroid 24.319722, 91.783611 (Wikipedia/Wikidata); Madhabpur 24.2812,
  91.8181 (Wikipedia + OSM + offroadbd); Baikka visitor centre 24.351474,
  91.705516 (OSM; no Wikipedia coord — OSM/travel-site only, flagged); Ham Ham
  24.167972, 91.912528 (Wikipedia + OSM); station 24.306587, 91.734756 (OSM) +
  town 24.308333, 91.733333 (Wikidata); tea-garden viewpoint via Tea Museum
  24.299960, 91.759987 (OSM; formal "viewpoint POI" does not exist in sources,
  flagged).
- GBP: category + plus-code address verified live; rating/reviews/hours do NOT
  exist publicly yet (listing unclaimed) — site must not display any.
- Key copy risks flagged: Madhabpur district (Kamalganj/Moulvibazar, not
  Habiganj); Ham Ham NOT scooty-accessible (jeep + 2-3 h trek); Baikka last
  stretch is a rough country road.
- No project files modified; research artifacts in /home/z/tmp/research/.

---
Task ID: 6-b
Agent: General-purpose research sub-agent (web research, no code changes)
Task: Research "Red Scooty Sreemangal" for website content — find creator/third-party
videos (YouTube), Facebook public info (followers, pricing posts, about), reviews/
news presence. Deliver JSON of videos + business facts. Read-only task.

Work Log:
- Tooling: `z-ai search` does not exist; used `z-ai function -n web_search`
  (18 queries: EN/Bengali name variants, rental terms, handle, site:youtube.com,
  Mini Scooty, instagram) and `page_reader`. Facebook page-level URLs redirect to
  login, but individual post/video URLs return og:title/og:description + rendered
  text via page_reader — used that to extract real post text, dates, reaction counts.
- YouTube watch pages + innertube API + Googlebot UA are bot-walled (LOGIN_REQUIRED)
  from this IP. Workarounds: curl-able YouTube oEmbed (title/channel), channel RSS
  feeds (exact publish dates, view counts, full descriptions, no bot wall), and
  agent-browser on youtube.com/results?search_query=... (ytInitialData scrape:
  video IDs, channels, channel IDs, views, published-relative, description
  snippets). Resolved channel IDs from @handles via curl; pulled RSS for Monsur27,
  Vlogs Riyad 07, Sreemangal Bachelor Point, Tahsanur Rob, Film by Saeid, The Slow
  Rider, Sulaiman Patwary, Tusher vlog44, Sakib Shoikot, Emon Atif.
- KEY FINDING (flag for owner/integrator): the video the site embeds as "the
  business's own tour video" (youtu.be/vk0oyKnZVPs, Monsur27, 2025-11-01,
  1,921 views) never mentions "Red Scooty" in title/description. Its description
  booking line is "Bike Rent-01738-055774 whatsapp/Call" + FB share link — the
  same phone (01738055774) and share link used in the same channel's other rental
  videos tagged #exploremotosreemangal, i.e. EXPLORE MOTO SREEMANGAL (competitor/
  separate outfit; Red Scooty's public number is 01897-423694). Channel Monsur27
  is a creator (fb.com/Monsur27official), not the Red Scooty page. Recommend the
  owner confirm whether this video should stay embedded on the site.
- Quoted YouTube search "Red Scooty" returns ZERO Sreemangal-related videos —
  no third-party creator video mentions Red Scooty in indexed metadata. Closest:
  Vlogs Riyad 07 "২ টাকায় শ্রীমঙ্গল ভ্রমণ!!" (~Sep 2025, 370 views) echoes the
  ৳2/minute promo hook but desc unread (bot wall) → unclear.
- FB facts captured via search snippets + page_reader og-meta: page @redscootysmg
  ("Explore Sreemongl with Red Scooty…"), about: +880 1897-423694,
  redscootysreemangal@gmail.com; 3,116 followers / 160 talking (recent snippet),
  3,096 likes (older); category "Bike Rental" with "Call now" action; posts: rain
  reel 2025-05-21 (2.1K views), "🥺" 2025-01-29 (3.8K views), "Right😏" 2025-06-30
  (3K views); "ধামাকা" teaser 2026-09-12 (72 reactions, asks followers what to
  launch next — new scooty / car rental / new service). ৳2/minute promo
  "২ টাকা প্রতি মিনিটে শ্রীমঙ্গল ঘুরুন 🌱 Red Scooty Sreemangal 🌱" posted
  2025-08-26 by page "Boy from Sreemangal" (ID 100092326193851, 2.4K reactions,
  23 shares) — affiliate/promoter page that ALSO posts Explore Moto promos;
  not the official page. Mini Scooty post 2026-03-19 (Google-indexed snippet:
  "Mini Scooty rental : Red Scooty Sreemangal Number : +880 18 9742 3694
  Location: jalaiya road. Eco-friendly • Affordable • Fun"); full URL not
  recoverable (search API truncates long FB URLs).
- No TripAdvisor listing, no news/blog coverage, no public Instagram account
  found for the business. Competitor landscape mapped: Explore Moto Sreemangal
  (01738055774), Sreemangal Bike Rent Point, Sreemangal Bikes Rental Services,
  orientecotourism.com (motorbike/bicycle), Sreemangal Bachelor Point guest
  house scooty rent, TikTok @mkrent11 (250৳/hr electric), @raj977547 (120৳/hr),
  @rent.a.motorcycle (200৳/hr TVS/Gixxer/Scooty). Market rate signal: ৳120–250/hr
  vs Red Scooty's former ৳2/min promo. UdHqUiRzXls ("Dhaka to Srimongol Bike
  Tour") returned oEmbed 404 → video unavailable, excluded. Raw artifacts in
  /tmp/research/*.json (search results, RSS, FB page reads).

Stage Summary:
- Deliverable 1 (creator/third-party videos JSON): 13 real videos verified with
  URLs — 0 third-party videos mention Red Scooty; 3 Monsur27 videos are rental
  promos tied to Explore Moto's contact (incl. the currently embedded one);
  10+ genuine Sreemangal travel/rental-scene videos catalogued with dates/views.
- Deliverable 2 (business facts JSON): FB page identity/contact/followers/
  category VERIFIED-PUBLIC; ৳2/min Aug-2025 promo VERIFIED (posted via affiliate
  page "Boy from Sreemangal"); Mini Scooty + Jalalia Road post 2026-03-19
  VERIFIED-PUBLIC; hours/reviews/news = none found (UNCLEAR/absent).
- Deliverable 3: 8 public FB post/page URLs (page, about, 4 page videos,
  2 posts incl. ৳2/min pair).
- ACTION ITEMS for owner/integrator: (1) confirm vk0oyKnZVPs embedding given its
  Explore Moto booking contact; (2) treat Monsur27 as a contactable local creator
  for a real Red Scooty feature video; (3) pricing story "৳2/minute" belongs to
  Aug 2025 (affiliate-posted) — do not present as current price; (4) Mini Scooty
  is real (Mar 2026 post) — keep as verified fleet item.

---
Task ID: 7-c
Agent: Z.ai Code (design-language migration agent)
Task: Design-language migration (Task 6+ brief v2) for how-it-works, rental-guide,
about (+VideoBand), contact, book (+booking-form/ride-status), journal (+article
pages), mobile-cta-bar. Structure/copy/logic preserved; styling upgraded to the
premium editorial language (card-soft, hairlines, display/btn utilities, Reveal
motion, ≤1 sticker per frame, shadow-hard only on stickers).

Work Log:
- Read worklog.md, agent-ctx/style-guide.md in full, exemplars (hero, final-cta,
  social-proof, map-section, globals.css) and every scoped file before editing.
- how-it-works/process-steps.tsx: removed border-b-2 separators and ad-hoc clamps;
  alternating bg-paper/bg-cream with rule-soft; step numbers → display-hero
  text-brand; headlines → display-1; step links → btn-base btn-outline with
  group arrow motion. Kept STEPS copy, TrackedLink events/sources/ariaLabel.
- how-it-works/trust-strip.tsx: border-2 grid → one quiet hairline panel
  (border-cream/15 + divide-x), hover:bg-cream/5; DemoBadge "DETAILS TO BE
  CONFIRMED" kept.
- how-it-works/cta-band.tsx: red band → band-ink, display-1 headline, btn-base
  btn-red hero-size CTA with animated ArrowRight.
- rental-guide/guide-sections.tsx: border-2+shadow-hard cards → card-soft with
  -translate-y-1.5/shadow-lift hover; icon chip solid ink; ghost numbers; display-1
  heading keeps the page's single text-outline accent; bullets keep red dots;
  dashed divider → border-ink/10 hairline; Reveal → StaggerGroup/StaggerItem.
- rental-guide/guide-cta-band.tsx: ink band, two hairline panels, display-2
  headings, btn-red + btn-cream with group arrows.
- app/about/page.tsx: section dividers border-2 → rule-soft; all ad-hoc clamps →
  display-1/display-3; shop + owner photos softened to img-frame (kept rotate +
  hover-straighten) with ONE sticker each (sticker class, no rotate conflicts);
  owner role pill → quiet solid ink label-micro chip; WhatsApp CTA → btn-base
  btn-primary (kept DemoBadge + "to be confirmed" note); facts card → card-soft
  with link-underline contact links; band-ink stats card kept, inner boxes →
  border-cream/15 hairlines; timeline cards → card-soft; quote → card-soft;
  CTA band → btn-red/btn-cream. Avoided clip-path mask Reveal on rotated/stickered
  frames (clip-path would clip stickers/corners); VideoObject JSON-LD untouched.
- site/video-band.tsx: border-2/shadow-hard-lg frame → img-frame; click-to-play
  logic, iframe attrs, poster, darkening, caption chip kept; play button → single
  red "sticker" (sticker class + bg-brand, composes with Tailwind v4 translate/
  scale properties); label chip → quiet bg-ink/cream.
- app/contact/page.tsx: MethodCard → card-soft, hover lift exactly 6px
  (-translate-y-1.5) + shadow-lift; grid → StaggerGroup/StaggerItem (h-full
  chain intact); map panel → img-frame with the Google-embed iframe kept exactly
  (src/title/loading/allowFullScreen/referrerPolicy/grayscale classes) + ONE
  brand sticker; directions CTA → btn-base btn-red; address card → card-soft;
  separators → rule-soft.
- contact/quick-message-form.tsx: panel → card-soft; inputs → hairline
  (border-ink/15, focus:border-brand, ring removed, shadow-none) via shared
  inputClass; error box → border-brand/30; submit → btn-base btn-red w-full
  (plain button; dropped shadcn Button to avoid utility conflicts); success
  panel refined (hairline cream surface, display-2, link-underline reset).
  Schema/validation/API contract/toasts/aria unchanged.
- app/book/page.tsx: form wrapper border-2+hard shadows → card-soft overflow
  hidden with quiet solid ink header strip; GOOD TO KNOW → card-soft; helpful
  links → hairline rows with arrow motion; direct-contact card → band-ink with
  btn-cream/btn-red; heading → display-1; all TrackedLink events (click_call,
  click_whatsapp, book_rail sources) intact.
- book/booking-form.tsx: ALL logic intact (prefill params vehicle/route/mood,
  sync effect, start_booking/submit_booking tracking, zod schema, POST
  /api/bookings, issue-keyed inline errors, WhatsApp handoff memo, reset).
  Styling: hairline inputs, quiet SegmentOption chips (border-ink/20, selected
  = solid ink), gap-6 grid, refined success panel (bg-cream inside card,
  hairline summary tiles, btn-red WhatsApp CTA), pickup note kept as red left
  accent.
- book/ride-status.tsx: strip border-b-2 → border-ink/10 hairline; blocks →
  card-soft; DEMO DATA badges + aria-live + fallback note untouched.
- app/journal/page.tsx: grid separator → rule-soft; grid → StaggerGroup; note
  strip → hairline; CTA band → band-ink + display-1 + btn-red.
- journal/journal-card.tsx: card-soft, quiet category chip, display-3 title,
  hover lift -translate-y-1.5 + shadow-lift, gentle image zoom, hairline image
  divider; Reveal+delay → StaggerItem (grid stagger).
- journal/journal-featured.tsx: hero image now Reveal variant="mask" (clip-path
  wipe, safe: no rotation/no overflowing children) inside img-frame; content
  side Reveal; display-1 title; quiet chip; btn-primary CTA; DemoBadge kept.
- journal/[slug]/page.tsx: hero border → hairline; image → img-frame; title →
  display-hero; meta chips quietened; body measure max-w-2xl → max-w-3xl with
  Bebas drop-cap treatment on the first paragraph (first-letter utilities);
  back link + internal links get link-underline; end band → band-ink with
  btn-red; destination chips → hairline; JOURNAL_NOTE strip hairline; Article
  JSON-LD + generateStaticParams/metadata untouched.
- site/mobile-cta-bar.tsx: solid surfaces — bg-paper + border-t/ink/10 +
  divide-x hairlines + shadow-lift; CALL|WHATSAPP|BOOK entries, events, aria,
  safe-area (pb-safe) and 44px+ targets exactly preserved.
- site/demo-badge.tsx / site/tracked-link.tsx: reviewed, no change needed (badge
  already reads as quiet dashed hairline; TrackedLink carries no styling).
- Verification: `bun run lint` → 0 errors, 1 pre-existing acceptable warning
  (react-hook-form watch, booking-form). `bunx tsc --noEmit` → no errors in any
  scoped file (remaining tsc errors live in files owned by other agents:
  reveal.tsx, route-map.tsx, destinations.ts — untouched per scope). All scoped
  routes return 200 from the dev server (/how-it-works, /rental-guide, /about,
  /contact, /book, /journal, /journal/[slug]); rendered HTML spot-checked for
  card-soft / hairline inputs / btn-red / img-frame / sticker / drop-cap tokens.
  Note: /routes?route=lake-run 500 in dev.log originates in map/route-map.tsx +
  /routes pages owned by another agent — not touched.
- Honesty guards preserved everywhere: DemoBadges, "DETAILS TO BE CONFIRMED",
  "DEMO DATA", JOURNAL_NOTE, "NOT YET VERIFIED", "to be confirmed" notes,
  phone/WhatsApp/maps links and event names.

Stage Summary: Scoped pages migrated to the Revision-B design language —
70/20/10 premium-editorial balance, card-soft surfaces, hairline rules,
display/btn/label utilities, staggered reveals, single-sticker frames, refined
booking forms and magazine-style journal. Structure, copy, tracked links,
forms, ARIA, JSON-LD and footer/mobile-bar behavior unchanged. Lint clean
(1 pre-existing warning). No packages added; no forbidden files modified.

---
Task ID: 7-b
Agent: Z.ai Code (frontend code agent — scooties + routes + route map)
Task: Rebuild /scooties as a premium product catalog (fleet-showcase, specs-strip,
included-ask, scooties-cross-links + page), rebuild /routes as an editorial route
library with an interactive map (route-card, routes-own-band, new routes-explorer
+ page), and build src/components/map/route-map.tsx (Leaflet + OSRM real-road
geometry with honest schematic fallback) per style-guide.md v2.

Work Log:
- Read worklog, style-guide v2, exemplars (hero, map-section, scooty-showcase,
  globals.css), data files (vehicles, ride-routes with waypoints, destinations),
  booking-form prefill contract (supports ?vehicle= and ?route= — kept both).
- NEW src/components/map/route-map.tsx: one client Leaflet map bound to the
  active route. Attempts REAL road geometry from OSRM public demo
  (router.project-osrm.org, all waypoints joined into one
  /route/v1/driving/{lng},{lat};… request, overview=full&geometries=geojson),
  4s AbortController timeout, results cached in a module-level Map consumed via
  useSyncExternalStore (no setState-in-effect). Real geometry = Polyline
  #f5222d w3.5 o0.9; failure = straight dashed waypoints line (dashArray "6 8",
  #111111). Honesty label overlay switches between "REAL ROAD GEOMETRY VIA
  OSRM · OSM DATA" / "SCHEMATIC WAYPOINT LINE — NOT A NAVIGATION ROUTE" /
  loading. Numbered L.divIcon pins (.smg-marker styles), HQ styled
  .smg-marker-pin--hq; marker popups reverse-lookup destination names from
  DESTINATIONS geo (no invented labels). fitBounds on mount, flyToBounds on
  route change, env-configurable tile URL/attribution, attribution kept,
  leaflet CSS imported only in the inner file. NEW lazy-route-map.tsx wraps it
  via next/dynamic ssr:false (same pattern as lazy-map.tsx).
- NEW src/components/routes/routes-explorer.tsx (client): sticky route selector
  (desktop left list lg:sticky top-24 with radiogroup aria; mobile horizontal
  scrollbar-brutal chip scroller), map h-[380px] lg:h-[480px], MapFootnote,
  selected-route editorial detail (card-soft: tags, character, description,
  distance + SOURCE micro-line, suggested start, highlights, RouteStops
  mini-itinerary, BOOK THIS RIDE → /book?route=<id> + SEE DESTINATIONS), then
  the full library of RouteCard entries wired with onSelect ("SHOW THIS ROUTE
  ON THE MAP" → select + scrollIntoView, reduced-motion aware).
- REBUILT route-card.tsx: premium editorial stacked card-soft entries,
  alternating image side (mask reveal, hover zoom ≤1.03), tags as hairline
  chips, duration chip, verified distanceLabel + tiny distanceSource text,
  character, highlights, stops as vertical mini-itinerary with hairline
  connectors (exported RouteStops, reused in the map detail), startTime,
  related-destination chips → /explore, tracked booking CTA (click_booking).
- REBUILT routes-own-band.tsx: band-ink end CTA (btn-red h-16) → /book +
  ROUTE_METRICS_NOTE footnote above a cream/15 hairline.
- REBUILT /routes page: async searchParams — honours ?route= (booking contract)
  and ?dest= (map popups deep-link) to preselect the route; PageHeader meta
  updated to 4 ROUTES / VERIFIED WAYPOINTS / APPROX. TIMING; metadata
  description fixed to "Four".
- REBUILT fleet-showcase.tsx (client): large portrait hero image per scooty
  (Reveal variant="mask", img-frame, group-hover:scale-[1.03]), display type,
  key characteristics as refined hairline spec rows (TRANSMISSION confirmed,
  RIDES LIKE features, AVAILABILITY = "CONFIRM AVAILABILITY" only, DAY RATE =
  priceLabel "৳ — / DAY" rendered exactly + "PRICING AVAILABLE ON REQUEST"),
  btn-base btn-primary booking CTA → /book?vehicle=<id>, WhatsApp
  "CONFIRM AVAILABILITY" secondary CTA, one sticker, historical promo note
  "HISTORICAL PROMO (AUG 2025) WAS ৳2/MINUTE — CURRENT RATES ON REQUEST"
  (clearly historical per Task 6-b finding), honest dashed "MORE MODELS ON
  REQUEST" panel.
- REBUILT specs-strip.tsx: hairline spec-sheet rows (not boxed grid) +
  card-soft "WHY THE GAPS" explainer; text-outline used once per page.
- REBUILT included-ask.tsx: card-soft INCLUDED column (leaf accents, hairline
  items) + band-ink ASK column; DemoBadge "TO BE CONFIRMED" kept.
- REBUILT scooties-cross-links.tsx: band-ink with three hairline tiles
  (routes / rental-guide / tracked booking tile).
- UPDATED /scooties page: section order + meta strip "CONFIRM AVAILABILITY",
  FLEET_NOTE footnote kept on a rule-soft strip.
- INTEGRATION FIX (cross-task, minimal): MapFootnote moved out of
  sreemangal-map.tsx into NEW server-safe src/components/map/map-footnote.tsx.
  Reason: sreemangal-map statically imports Leaflet, which throws
  "window is not defined" when its module graph is evaluated during SSR — a
  cold dev-server start 500'd every page importing it (/, /explore, /routes).
  Updated importers: home/map-section.tsx, explore-map-section.tsx (import
  line only — later superseded by the parallel agent's footnote-prop refactor),
  app/explore/page.tsx (one import line, aligning with that refactor),
  routes-explorer.tsx. sreemangal-map.tsx otherwise untouched. No npm packages
  added; no data files touched.

Verification:
- bun run lint: 0 errors (only pre-existing react-hook-form warning in
  booking-form.tsx). tsc --noEmit: no errors in Task 7-b files.
- Live-tested with headless browser: /routes renders, Leaflet map shows real
  OSRM geometry ("REAL ROAD GEOMETRY VIA OSRM · OSM DATA"), route switching
  updates pins (3→4) via flyToBounds with cache hits, OSRM-blocked reload
  falls back to dashed schematic + correct label, "SHOW THIS ROUTE ON THE MAP"
  from a library card selects + scrolls, mobile 375px has zero horizontal
  overflow with scrollable chips. All routes (/ /scooties /routes /explore
  /book /journal) return 200 on a cold dev-server start.

Stage Summary:
- /scooties is now a premium catalog with honest pricing/availability language
  (priceLabel placeholders intact, Aug-2025 ৳2/min promo framed as history).
- /routes is now a route-map-first editorial library: verified waypoints drawn
  with real OSRM road geometry or a clearly-labelled schematic fallback,
  sourced distances, sticky selector + mobile chip scroller, cross-linked
  destinations, band-ink booking CTA with ROUTE_METRICS_NOTE footnote.
- MapFootnote extraction fixed a site-wide cold-start SSR crash (leaflet in
  server graph); documented for future agents: NEVER statically import
  sreemangal-map.tsx / route-map.tsx from SSR-rendered modules — import
  footnotes from @/components/map/map-footnote and maps via the lazy wrappers.
- Files: NEW src/components/map/route-map.tsx, src/components/map/lazy-route-map.tsx,
  src/components/map/map-footnote.tsx, src/components/routes/routes-explorer.tsx;
  REBUILT src/components/scooties/{fleet-showcase,specs-strip,included-ask,
  scooties-cross-links}.tsx, src/components/routes/{route-card,routes-own-band}.tsx,
  src/app/scooties/page.tsx, src/app/routes/page.tsx; one-line import fixes in
  src/components/home/map-section.tsx, src/components/explore/explore-map-section.tsx,
  src/app/explore/page.tsx; MapFootnote export removed from
  src/components/map/sreemangal-map.tsx.

---
Task ID: 7-a
Agent: Z.ai Code (explore experience cluster)
Task: Build the /explore experience for the v2 design language — real map
section, premium editorial destination rows, restyled Ride Passport, soft
booking CTA band. Adapts to the changed data model (verified geo, geoSource,
access, roadNote; old SVG coords gone).

Work Log:
- Read worklog (1–6), style-guide.md fully, exemplars (hero, home
  map-section, build-your-ride, route-card, final-cta, globals.css) and the
  updated data files (destinations.ts, site.ts, ride-routes.ts) before coding.
- src/components/explore/explore-map-section.tsx (NEW, client): the defining
  real-map section — LazySreemangalMap at h-[340px] sm:h-[420px]
  lg:h-[560px] (min 340px mobile per overflow rule), overlay chip, ACCESS KEY
  legend (SCOOTY-FRIENDLY / ROUGH LAST STRETCH / JEEP + TREK ONLY in
  leaf/brand/ink chips), and a synced card-soft detail panel (tablist
  quick-switch like home, aria-live, distance + ride time with DEMO badge,
  geoSource micro-label with full source in title attr, roadNote, whyGo
  pull-quote, GET DIRECTIONS TrackedLink + SEE ROUTES) with an empty state
  (TAP A MARKER + verified HQ card + tracked OPEN IN GOOGLE MAPS).
- src/components/explore/access-chip.tsx (NEW, server-safe): shared
  AccessChip + geoSourceLabel helpers. Plain helpers cannot live in a "use
  client" module — calling geoSourceLabel() from the server component threw
  "Attempted to call ... from the server"; moved here and both the map
  section (client) and destination rows (server) import it.
- src/components/explore/destination-entry.tsx (REWRITE): premium editorial
  rows — alternating lg:grid-cols-12 image/text, Reveal variant="mask"
  imagery with img-frame and group-hover:scale-[1.04] zoom, quiet N°+access
  chip meta row, type kicker, display-2 name, description, whyGo pull-quote
  (muted for trek), distance + ride time with DemoBadge "DEMO", geoSource
  authenticity micro-line, roadNote with access icon (bike/warn/footprints),
  GOOD FOR refined chips, CTAs (GET DIRECTIONS TrackedLink external via
  mapsQueryUrl; SEE ROUTES → /routes; BOOK A SCOOTY… link-underline →
  /book), PAIRED ROUTES micro-links derived from RIDE_ROUTES
  .relatedDestinations (→ /routes?dest=<slug>, same convention as the map
  popup), PassportStampButton on passport destinations. Ham Ham: quieter
  card (steel kicker/quote, portrait image, "NOT BY SCOOTY" instead of ride
  time, no stamp button, "BOOK A SCOOTY FOR YOUR OTHER RIDES").
- src/components/explore/ride-passport.tsx (RESTYLE): storage mechanic kept
  byte-identical (rs-passport-v1 + change event + useSyncExternalStore +
  snapshot cache; PassportStampButton/aria-pressed, aria-live progress
  preserved). New presentation: full-width rule-soft bg-cream band — left
  editorial copy (kicker, display-1, 3-step how-to, honesty micro-note),
  right card-soft panel with ONE sticker ("STAMP GAME", leaf), leaf-green
  stamp language (slots, segments, complete banner in ink with DEMO FUN
  badge), refined chips (border + ink/15-25, no border-2, no hard shadows).
  Collapsible fixed quick-bar kept below lg (same offsets/aria as before,
  restyled to ink + shadow-lift; sheet = card-soft + scrollbar-brutal).
- src/components/explore/explore-cta-band.tsx (NEW, client): soft band-ink
  closing band — btn-red BOOK A SCOOTY (tracked click_booking) +
  link-underline WhatsApp (tracked click_whatsapp) + honesty micro-line.
- src/app/explore/page.tsx (REWRITE): PageHeader (kicker EXPLORE SREEMANGAL,
  meta adds VERIFIED COORDINATES), ItemList JSON-LD upgraded to
  TouristAttraction items with VERIFIED GeoCoordinates from d.geo, map
  section, bg-paper destinations section with display-1 heading + honest
  intro + RIDE_METRICS_NOTE role="note" footnote, RidePassport band,
  ExploreCtaBand. All grids collapse to single column <lg; no negative
  margins/rotations → no horizontal overflow.
- MAP IMPORT CONSTRAINT (important for future tasks): MapFootnote from
  "@/components/map/sreemangal-map" must NOT be imported by any second
  route. Verified live: a static client import from /explore pulled Leaflet
  into shared SSR chunks → "window is not defined" → 500 on ALL routes
  (home/routes/explore); rendering it as a client-reference from the server
  page → "Element type is invalid: got: undefined" (ssr:false stub).
  Explore therefore ships a byte-identical local footnote (same
  "REAL MAP DATA © OPENSTREETMAP CONTRIBUTORS · RIDE_METRICS_NOTE" text
  sourced from the same constant). home/map-section keeps its original
  single-importer pattern — untouched.
- Verification: bun run lint → 0 errors (only the pre-existing benign
  RHF watch warning). tsc --noEmit → no errors in explore files. Dev server
  was down at session start, came back via system supervisor; HTTP-verified
  /explore ×5 200-stable + / , /routes, /book all 200; SSR HTML spot-checked
  (access chips, 7 entries, ham-ham honesty markers, 4 aria-pressed stamp
  buttons, paired routes, passport band, CTA band, 7 GeoCoordinates in
  JSON-LD, footnote text). No errors in dev.log tail.
- Flag for data owner (NOT touched per rules): src/data/destinations.ts
  entries carry `distanceSource` but the Destination type doesn't declare
  it → 5 pre-existing TS2353 errors; add `distanceSource?: string;` next
  to distanceLabel when data files are next edited.

Stage Summary:
- /explore now leads with the real verified map + synced panel, premium
  alternating editorial rows with honest access language, the restyled Ride
  Passport stamp game (mechanic unchanged), and a tracked booking handoff.
- Style-guide compliant: card-soft/band-ink/img-frame/btn-* utilities only;
  no border-2 cards, no shadow-hard on cards/buttons, 1 sticker, 0
  text-outline, one display-1 per section, mask reveals + ≤1.04 zooms.
- Honesty guards intact: DEMO tags on ride times, RIDE_METRICS_NOTE
  footnote, Ham Ham explicitly not a scooty destination, geoSource
  attribution surfaced, nothing invented.

---
Task ID: 6
Agent: Z.ai Code (main agent)
Task: MAJOR UX/UI + CONTENT + DATA revision per brief v2 — premium editorial
direction, rail removal, real maps, motion system, research integration.

Work Log (foundation + coordination by main agent):
- Research (6-a/6-b subagents): verified coords for all destinations
  (OSM/Wikipedia sources); Google listing has NO rating/hours (unclaimed —
  do not fabricate); no third-party videos mention Red Scooty (no fake
  endorsements); verified FB slogans; Madhabpur is Kamalganj/Moulvibazar
  (not Habiganj); Ham Ham NOT scooty-accessible (jeep + trek).
- CRITICAL LAYOUT: deleted scroll-rail.tsx ("01 / 05" rail + left vertical
  label + reserved width). Fixed root-cause horizontal overflow: scooty
  showcase used -mx-4/-mx-6 negative margins on a full-width parent
  (24px overflow at 1280) — rebuilt scroller with plain padding.
  Overflow sweep: 10 pages x 5 widths (1280/1440/1600/768/390) all OK.
- DESIGN SYSTEM (globals.css rewritten): 70/20/10 language — new soft
  elevation tokens (shadow-soft/lift/deep), card-soft/img-frame/rule-soft/
  band-ink utilities, type scale (display-hero/1/2/3, copy-body), button
  system (btn-base/primary/outline/red/cream with hover/press/focus/
  disabled + animated arrows), link-underline animated underline, sticker
  utility, ultra-subtle grain overlay, Leaflet brand styles. Reduced-motion
  coverage extended.
- MOTION: Reveal upgraded (up/mask/fade/scale variants + StaggerGroup/
  StaggerItem), template.tsx page transition (fade+rise 0.45s), IntroReveal
  branded first-visit wipe (~1.2s, sessionStorage-gated, rAF-deferred).
  Fixed TS types (TargetAndTransition) and a REAL BUG: mask variant's
  zero-area clip-path blocked IntersectionObserver -> whileInView never
  fired (map invisible on mobile); fixed with 99.9% hairline clip.
- REAL MAPS (Leaflet + react-leaflet + OSM): new components/map/ —
  sreemangal-map (HQ + verified destination markers, brand popups w/
  distance + DEMO ride time + Explore Route/Directions), lazy-map (ssr
  false), route-map (per-route geometry via OSRM demo w/ 4s timeout +
  module cache, honest dashed-waypoint fallback, numbered pins,
  flyToBounds), map-footnote extracted server-safe (SSR crash fix).
  Tile URL configurable via NEXT_PUBLIC_MAP_TILE_URL; OSM attribution kept.
- DATA: destinations.ts rebuilt with verified geo/geoSource/access/roadNote
  (Ham Ham reclassified as trek-only; distanceSource fields); ride-routes.ts
  enriched with verified waypoints + sourced distances + new LAKE RUN route
  (Madhabpur); site.ts: removed unverified Instagram, added verified FB
  slogans, marquee now uses them.
- REAL BUG: /api/bookings rejected routeRef:null (schema .optional() vs
  .nullish()) — every booking WITHOUT a route prefill failed 400.
  Fixed; end-to-end booking verified + DB row checked + test row cleaned.
- Delegated page clusters: 7-a (explore + passport + access chips),
  7-b (scooties catalog + routes explorer + route-map), 7-c (how-it-works,
  rental-guide, about, contact, book, journal, video-band, mobile bar).
  Style guide at agent-ctx/style-guide.md; all agents verified + worklogged.
- Images: all 18 PNGs -> WebP (q82 + gentle unsharp), unused journal PNGs
  removed, all references migrated.
- Fixes post-merge: map labels moved bottom-left (zoom-control overlap),
  hero stickers tucked inside image frame, "RIDES LIKE" spec repetition
  collapsed to single row, route-map Polyline remount keys (Leaflet
  setStyle keeps stale dashArray across state swaps).

Stage Summary:
- Site-wide: no rail, no reserved dead space, no horizontal overflow at
  any tested width; premium editorial surface system with restrained
  brutalist accents; coherent motion (page transitions, scroll reveals,
  masks, stagger, tactile buttons, marquee, branded intro).
- Real geographic integrity everywhere: Leaflet/OSM maps on Home + Explore
  + Routes with verified coords only, sourced distances, DEMO-tagged ride
  times, real OSRM road geometry with honest fallback labeling.
- Booking pipeline bug fixed (routeRef) — verified end-to-end with DB.
- Lint 0 errors (1 benign pre-existing warning); tsc clean for src/.

---
Task ID: 8
Agent: Z.ai Code (main agent)
Task: UX revision round 2 — nav dropdowns, footer Legal/Company columns +
policy pages + Tasbir Kabir credit, logo/favicon/apple-icon integration,
badge cleanup, and phone map/image reliability fixes.

Work Log:
- DIAGNOSIS (phone): server + image optimizer + all images verified healthy
  via curl + agent-browser mobile emulation (0 broken images). Real culprits
  found: (a) Google Maps IFRAME on /contact renders blank on phones -> replaced
  with our Leaflet map; (b) map popup AUTO-OPENED on load (MapController fired
  for the preselected slug) and buried the whole map on small screens; (c)
  OSM-hosted tiles are the single point of failure on flaky mobile networks;
  (d) contact map wrapper `min-h-72 flex-1` -> `h-[340px] flex-1` collapsed to
  height 0 (flex-basis 0 beats height in a column flex) — removed flex-1,
  added shrink-0 + ResizeObserver-driven invalidateSize on both maps.
- MAPS: new src/components/map/tiles.ts (provider chain, env-overridable) +
  fallback-tile-layer.tsx — after 4 tile errors the map silently switches
  provider (OSM -> openstreetmap.de -> HOT France). CARTO is NOT usable
  anonymously anymore ("API KEY REQUIRED" watermark) — do not use.
  Popups now only open on USER tap (first-run guard in MapController);
  popup width min(244px, 76vw). SreemangalMap props made optional so
  /contact can embed a standalone map.
- LOGO (owner-supplied PNG): scripts/make-logo-assets.mjs (sharp) generates
  public/logo/{mark,mark-white,logo-full}.png (white->alpha via redness mask),
  src/app/icon.png (256), public/favicon.ico (hand-packed PNG-in-ICO 16/32/48;
  Next chokes on processing an app-dir favicon.ico — keep it in public/),
  src/app/apple-icon.png (180, red bg + white mark), src/app/opengraph-image.png
  (1200x630 brand card). Layout metadata now relies on file-convention icons/OG.
  Mark wired into header wordmark, mobile sheet, footer (white), IntroReveal.
- NAV: new src/data/nav.ts — NAV_ITEMS with children (EXPLORE -> 7 destinations
  /explore#slug, ROUTES -> 4 routes /routes?route=id, COMPANY -> about/journal/
  rental-guide/contact). Header rewritten: hover+click dropdowns, Escape close,
  derived open-state (openAt === pathname) so route changes close menus without
  setState-in-effect (lint clean). Mobile sheet groups children as chips.
  Destination entries got id={slug} + scroll-mt-24 anchors.
- FOOTER: rebuilt — brand+contact column (white mark), EXPLORE destinations,
  COMPANY links, LEGAL links; bottom bar: (c) line, DEVELOPED BY TASBIR KABIR
  -> https://tasbirkabir.me (external, arrow-up-right), demo note.
- LEGAL PAGES: /privacy-policy, /refund-policy, /terms-of-service via new
  components/site/legal-page.tsx (numbered sections, honest demo-stage
  footnotes, contact strip). Added to sitemap.ts. Truthful copy: no online
  payment exists; analytics = local dataLayer only.
- BADGES REMOVED: hero kicker "SCOOTY RENTAL — SREEMANGAL" -> verified slogan
  "THE WAY YOU EXPLORE SREEMANGAL"; hero stickers (SCOOTY RENTAL / SREEMANGAL
  3210) removed -> quiet verified-coordinates caption under the image; About
  "JALALIA ROAD / SREEMANGAL" + "THE OWNER" stickers removed; contact map
  "RED SCOOTY SREEMANGAL" sticker removed with the iframe. Honesty DEMO tags
  and slogan stickers ("NO GEARS · NO TENSION", @REDSCOOTYSMG) kept.
- FIXES DURING BUILD: script buildIco reduce bug (60-byte ico), 3-channel RGB
  raw stride bug, sharp trim+raw corruption (manual alpha-bbox trim), tint()
  greying the white mark (manual RGB rewrite), next/image aspect warnings
  (intrinsic width/height), LegalPage title ReactNode.
- VERIFICATION: lint 0 errors; tsc src clean; 13 routes x iPhone-14 emulation:
  0 broken images, 0 horizontal overflow; desktop 1440: EXPLORE/ROUTES/COMPANY
  dropdowns, deep links (/explore#tea-gardens scrolls, /routes?route=forest-
  escape selects), map tiles render, user-tap popup works, OSRM real geometry
  on /routes, contact Leaflet map 340px with 4 tiles, booking form intact,
  favicon/apple-icon/og:image links present in <head>.

Stage Summary:
- Phone reliability: maps never covered by popups, tiles self-heal across
  providers, contact uses Leaflet (no Google iframe), maps re-measure on
  resize. Every route image-clean and overflow-free at mobile widths.
- Brand: owner logo now lives everywhere (favicon, apple icon, OG card,
  header, footer, intro). Nav has real dropdowns incl. COMPANY; footer has
  EXPLORE/COMPANY/LEGAL columns and the tasbirkabir.me credit; three honest
  policy pages shipped and sitemapped.
- Files: NEW src/data/nav.ts, src/components/map/{tiles,fallback-tile-layer}.tsx,
  src/components/site/legal-page.tsx, src/app/{privacy-policy,refund-policy,
  terms-of-service}/page.tsx, public/logo/*, public/favicon.ico,
  src/app/{icon,apple-icon,opengraph-image}.png; REWRITTEN header/footer;
  EDITED hero, about, contact, explore/destination-entry, map components,
  layout.tsx, sitemap.ts, site.ts, globals.css, intro-reveal.
