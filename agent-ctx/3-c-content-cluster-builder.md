# Task 3-c — content-cluster-builder — Work Record

## Files created (only new files; zero edits to existing files)
- `src/app/explore/page.tsx` — /explore route (server)
- `src/components/explore/destination-entry.tsx` — giant editorial destination composition (server)
- `src/components/explore/ride-passport.tsx` — Ride Passport: client panel + card stamp buttons
- `src/app/journal/page.tsx` — /journal route (server)
- `src/components/journal/journal-featured.tsx` — featured note split layout (server)
- `src/components/journal/journal-card.tsx` — grid note card (server)
- `src/app/journal/[slug]/page.tsx` — article route (server, async params, notFound, JSON-LD)

## Ride Passport behavior summary
- Storage: `localStorage["rs-passport-v1"]` = JSON array of destination slugs,
  sanitized against `PASSPORT_SLUGS` on read; read happens in `useEffect`
  (server HTML + first client render both show 0 stamps → no hydration mismatch).
- Sync: card `PassportStampButton` (×4, `aria-pressed`) and the panel each run a
  small hook; toggles write storage then dispatch `rs-passport-change` window
  event (+ `storage` listener), so every instance re-reads and stays in sync
  without a context provider.
- Panel: 4 slots (filled = red border, slight rotate, check; empty = dashed),
  progress counter (`aria-live="polite"`), reset button (`aria-label`).
  Complete state: "PASSPORT COMPLETE." + "Show this screen at pickup — demo fun,
  real perks to be confirmed." + DemoBadge.
- Placement: xl+ → `sticky top-24` panel in a col-span-4 column next to the
  col-span-8 destination list; below xl → fixed collapsible bottom bar that
  expands into a scrollable sheet, offset by
  `calc(3.5rem + env(safe-area-inset-bottom))` to clear the fixed MobileCtaBar
  (md+ sits at bottom-4 since the CTA bar is md:hidden; hidden at xl).

## Verification done
- /explore, /journal, /journal/how-to-explore-sreemangal-in-one-day → 200;
  /journal/does-not-exist → 404. JSON-LD (ItemList + Article) confirmed in HTML.
  Route prefill `/book?route=tea-garden-loop` rendered on route-linked articles.
- No lint/build/dev-server actions (per task rules) — left for integrator.

## Notes / deviations for other agents
- Images: relaunch of `scripts/gen-images-mp.ts` produced the 8 missing images;
  `journal-guide.png` could NOT be generated at 1440x720 (image API requires
  32px-multiple dimensions) → generated at **1408x704** (~2:1). Manifest said
  1440x720 — layouts using aspect-[2/1] + object-cover are unaffected.
- All generated images are JPEG-encoded with `.png` extensions (matches the
  original 9 assets; next/image serves them fine).
- Image API constraint for future agents: sizes must be 512–2880px per side,
  multiples of 32, ≤ 2^22 px total.
