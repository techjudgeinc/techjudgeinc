# Tech Judge redesign: working review build

## Replacement direction after design feedback

The first pass was rejected as too close to the original layout. The active build now uses a completely separate stylesheet, `src/styles/experience.css`; neither `global.css` nor `redesign.css` is imported by the site layout.

The references were inspected visually at RankinAI and FinSight. The new composition uses a centered illuminated hero, a floating pill navigation, subtle full-width grids, an interactive three-service showcase, asymmetric connected-system panels, client relationship cards, a sticky process sequence, a schematic service-area panel and a large typographic footer. It does not copy the reference websites' content, assets or branding.

Service/industry detail pages now open with centered introductions and full-width framed media, followed by modular scope panels. Service overview pages use full-bleed photographic sections. Shared page headers, contact forms, pricing, reviews, legal and supporting pages all use the new design system.

The service showcase supports pointer interaction plus Left/Right, Home and End keys, tab selection states and associated panels. A no-JavaScript fallback supplies direct service links. Motion honors reduced-motion preferences. Dark remains the default and the light-mode choice persists.

The original stylesheets are retained only as inactive source history. Existing business facts, client publication restrictions, calculator rates and local-only form safeguards remain unchanged.

Implemented September 21, 2026. This is a local review build, not a production deployment.

## What changed

- Dark-default charcoal and gold design with a persistent visitor-controlled light mode.
- New homepage with staggered service stories, project context, client reviews and local coverage.
- Rewritten main service pages, About page, pricing introduction and contact flow.
- Added Our Work, Pinnacle Estate Properties, Service Areas and Client Support pages.
- Updated shared styling and navigation across all 25 pages, including existing industry and utility pages.
- Responsive menu, service navigation, keyboard focus states, review controls, scroll reveals and progressive scroll-linked image motion. Reduced-motion preferences disable motion.
- Removed visible decorative numbering, eyebrow labels, directional-link arrow icons and en/em dashes from the redesigned marketing pages.
- Reused existing website imagery. The client feature explicitly identifies its image as illustrative, not project photography.

## Pricing and contact behavior

Dennis's per-user rates, volume factors, lower/upper estimate multipliers and rounding are unchanged. Only the support-hours description was clarified. Regression tests cover the original examples, every volume boundary, maximum add-ons and invalid input.

Calculator selections transfer into the contact message. The form also captures project location, timeline and a preferred next step. Site-walk links preselect that option.

The enquiry form previews information locally. It does not save or send messages. The production contact endpoint and delivery configuration have not been supplied. Do not present this preview as a live lead-capture system.

## Verification

- `npm run build`: 25 static pages.
- `npm run verify`: recursive route/link, canonical, schema, heading and indexing checks; pricing regression tests.
- Browser inspected homepage in dark and light modes, main service page, calculator and contact preview.
- Checked all 25 routes at a 390px viewport for horizontal overflow and broken loaded images.
- Checked homepage, calculator, contact, services and Pinnacle pages at 320px, 768px and 1024px widths.
- Tested theme persistence, mobile navigation, calculator headcount changes, invalid input, reset and calculator-to-enquiry transfer.
- Tested the maximum 10,000-person configuration on a 320px viewport and corrected its layout to stack large prices.
- Tested the local message preview with synthetic details only. No enquiry was transmitted.

## Before publication

- Obtain final approval for Pinnacle, RidgeGate Escrow and Priority Title name/case-study use.
- Add approved project photography and the planned video testimonial when available.
- Confirm credential wording, supported-location count and any service promises before launch.
- Configure and test actual enquiry delivery, spam protection and failure handling.
- Review legal pages against the final hosting, analytics and form setup.
- Review accessibility, real-device behavior and production performance on the chosen host.
- Only then change staging/indexing behavior and publish. The build script currently forces staging, emits `noindex` headers and produces an empty public sitemap.

## Run locally

`npm run dev` starts the default local server. `npm run build` creates `dist`; `npm run verify` runs the checks. The review session used port 4322.

Main files: `src/layouts/SiteLayout.astro`, `src/styles/redesign.css`, `src/pages/index.astro`, `src/data/services.ts`, `src/components/DetailPage.astro` and `src/pages/contact-us.astro`.

The earlier `TECH-JUDGE-WEBSITE-BLUEPRINT.md` remains as the discovery/design reference. No production content was changed and no Git commit was created.
