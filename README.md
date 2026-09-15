# Tech Judge — local staging build

## Review

Open http://127.0.0.1:4321 while the local preview is running. This address works on this computer only. This Astro rebuild is prepared for the codex/astro-rebuild branch in techjudgeinc/techjudgeinc. The existing root index.html is the preserved prototype; Astro builds its homepage from src/pages/index.astro. No changes have been made to Webflow, DNS or Cloudflare.

The Astro site uses the approved dark-and-gold direction, existing company imagery and content, and the prototype's service structure. It includes 19 content pages, a message confirmation utility and a custom 404. There is no CMS and no redirect configuration, as requested. Existing meaningful page paths are retained. The old test-of-new-site page is not recreated.

## Prototype design and pricing update

The visual system now follows the boss's rev14 prototype with pill buttons, rounded grid cards, technical SVG diagrams, subtle gradients, scroll reveals and a three-stage homepage scroll sequence. Mobile and reduced-motion visitors receive the readable stacked sequence. The footer stays still. The motion control also pauses diagrams and the scroll sequence.

The Pricing link opens `/plan-your-it`. Estimates update on every valid selection and headcount change, with animated totals. Rates and range factors come from the approved rev14 prototype. The tool uses actual headcount within the prototype's volume bands, with 250 users in the 101 to 250 band. Results are planning estimates in USD; the current amount and choices carry into the staging enquiry form. `node scripts/verify-pricing.mjs` checks rate examples and volume boundaries.

## Start and verify

Use Node 22.12+ or a supported newer version; this build was checked with Node 26.7.0.

```sh
npm ci
npm run build
npm run verify
npm run preview
```

For editing with automatic reload, stop the preview and run `npm run dev`.

## Review controls

- Builds deliberately force staging mode. Every page has noindex/nofollow; the output includes matching Cloudflare `_headers` and an empty sitemap. These are indexing controls, not password protection.
- Canonical URLs point to the intended individual www.techjudge.com pages.
- Structured data uses company information, services and breadcrumbs; no invented ratings or team profiles.
- The contact form validates fields and displays a local review. It does not send or store enquiries. Email and telephone links are available. No delivery backend or credentials are included.
- Existing legal content is carried forward and reformatted; review it before launch.
- Source image provenance is recorded in `src/data/assets.json`. Website photos are not represented as verified project photography.
- Advertising and consent scripts have not been enabled in staging.

## Before a public launch

Review wording and appearance, connect an agreed form provider with spam protection, test inbox delivery, confirm the final hosting account, and create a separate production build configuration. Then enable indexing and the production sitemap, verify analytics/consent, and smoke-test all routes on the selected Cloudflare host. DNS stays unchanged until the replacement is approved.

The earlier audit documents are historical recommendations. This implementation follows the newer instruction to add no redirects and no CMS. The retired test page will return 404 unless that decision changes.

## Validation

The build and verifier pass for 21 HTML pages and 1,231 internal asset/link references. Checks cover one H1 per page, titles, canonical targets, JSON-LD parsing, local link and anchor resolution, and staging indexing controls. Browser checks cover the form preview/edit flow, live pricing, estimate transfer, responsive navigation, homepage scroll stages and motion pause/resume. A public deployment and real email delivery have not been tested.
