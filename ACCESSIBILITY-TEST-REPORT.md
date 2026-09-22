# Accessibility testing — 2026-09-21

## Scope and outcome

Tested all 25 local pages with axe in dark and light themes (50 completed desktop scans). After the shared landmark fix, those scans reported **zero automated violations** for WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA and axe best-practice tags.

This is not a claim of complete WCAG conformance. Axe marked some contrast checks involving imagery, gradients and layered backgrounds as incomplete. A zero-violation result is not equivalent to passing those checks.

## Fixes made

- Floating display preferences now expose a named region landmark.
- Service showcase uses content-driven height instead of clipping longer text/buttons in a fixed-height panel.
- Long headings wrap safely under increased letter and word spacing.
- Calculator count-up animation now reads the same pause setting as the global motion control.
- Connection illustration now has a circular gold-gradient center, without the rounded square.
- The decorative overlapping circles were replaced by a headset-wearing support person and a checked computer.

## Browser interaction checks

- All 25 pages checked at a **320 CSS-pixel viewport** for off-screen headings, paragraphs, buttons and form controls. The only detected off-screen control was the intentionally hidden contact-form spam trap.
- At 320 pixels, tested line-height 1.5, letter spacing 0.12em, word spacing 0.16em and paragraph spacing 2em on Home, Services, Contact and Pricing. This exposed the showcase clipping, then passed targeted rechecks after the fix.
- Contact form: empty submission focused Name and exposed the required fields as invalid. A synthetic local-only message produced the preview and moved focus into it. Edit returned focus to Message. No message was submitted externally.
- Calculator: Enter activated the headcount button; arrow keys changed the radio selection and focus; the live region announced the updated range after its delay. Invalid zero headcount set aria-invalid and announced the permitted range. With motion paused, the price updated immediately.
- Earlier checks in this workstream confirmed skip-link focus, service-tab arrow navigation and mobile-menu Escape/focus restoration.
- Native browser accessibility-tree inspection confirmed labeled calculator groups, controls and result text. This is not an NVDA/VoiceOver speech-output test.

## Repeatable local audit

Development only: append `?a11y=1&theme=dark` or `?a11y=1&theme=light` to a page. Results appear in `#a11y-results`. Add `&spacing=1` for the text-spacing stress test.

The harness reveals scroll content and stops animations solely for deterministic scanning. Normal user-facing behavior must also be checked separately. Hidden service tabs, open menu states and carousel slides are not exhaustively covered by the default page scan.

The production build excludes the audit runner. Run `npm run build` and `npm run verify` for the existing markup, link, pricing and SEO regressions.

## Remaining checks requiring another environment or manual sign-off

- Actual NVDA, JAWS or VoiceOver speech output and reading order. Native screen-reader operation was not available through the browser-control surface.
- OS-level reduced-motion and forced-colors emulation. The supplied browser surface exposes viewport changes, but not these preference controls; source rules were reviewed, not presented as an executed preference test.
- Real browser zoom at 200%/400%, beyond the 320-pixel reflow and text-spacing simulations.
- Exhaustive contrast measurement over every image/gradient at every state, including user-uploaded/replacement photography. Visual inspection does not resolve all axe incomplete contrast findings.
- Real mobile assistive technology and production-only contact submission/error handling (the local form is deliberately preview-only).

Do not advertise the site as fully WCAG-certified based on this report.
