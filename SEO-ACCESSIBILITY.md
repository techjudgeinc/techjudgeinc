# SEO and accessibility pass

Completed 2026-09-21 on the private local preview. No publication or indexing changes.

## Implemented

- LocalBusiness structured data with the existing verified address, phone, office coordinates and service areas. No invented ratings, certifications, hours, or rankings.
- WebSite and route-specific BreadcrumbList markup. Existing service schema now includes service areas.
- Specific Los Angeles-focused descriptions for the three service pages, plus social-image alternative text and Twitter metadata.
- Shared page names for visible breadcrumbs and search markup.
- Focusable skip-link destination, visible focus outlines, sticky-header scroll clearance and wrapping breadcrumbs.
- Larger mobile menu and map controls; dropdowns close when keyboard focus leaves them. Short viewports can scroll the mobile menu.
- Stronger form boundaries and review pagination dots, required service label and associated message-length guidance.
- Correct roles for named display controls, review carousel, star graphic, calculator presets and connection illustration.
- Corrected heading hierarchy on the project overview.
- Repeatable SEO/accessibility markup checks added to npm run verify.

## Verified

- Production compilation of all 25 preview pages.
- 1,293 local references, canonical URLs, staging no-index metadata/headers and pricing regression checks.
- Unique titles/descriptions, document language, image alt attributes, form labels, unique IDs, ARIA target references, no positive tabindex, focusable main and structured-data presence across all 25 pages.
- Browser: skip link moves focus to main; service tab arrow keys update selection, focus and panel together; form guidance is associated with the field.
- Browser: light-mode mobile navigation fits a narrow viewport without horizontal overflow; Escape closes the menu and restores its trigger. Dark mode restored afterward.
- Existing reduced-motion styles and explicit animation pause controls preserved.

## Limits and launch checklist

This is a targeted implementation and regression pass, not a WCAG certification. The static checks do not calculate every rendered contrast pair, test all zoom combinations or emulate a screen reader. Complete NVDA/VoiceOver testing, axe/Lighthouse scans and real-device checks before public launch.

1. Keep the current no-index controls during private review. The build script intentionally forces staging. A separately authorized launch change must coordinate production page metadata, response headers and sitemap generation; removing one alone is not sufficient.
2. Obtain final approval for named client features and confirm all public claims, contact handling and privacy details.
3. Test structured data against Google's Rich Results Test on the deployed production URLs. Markup does not guarantee rich results or ranking.
4. Verify the actual host's canonical-domain redirect, extensionless routes, HTTPS and genuine 404 responses. These cannot be established by a local build.
5. Connect/verify Google Search Console, submit the production sitemap and inspect the important pages after launch. No account changes were made here.
6. Measure production Core Web Vitals and responsive image performance on real connections. The local preview is not field performance evidence.
7. Recheck all text over photography, animated glow backgrounds, light/dark modes, 200–400% zoom, keyboard order, contact-form errors and calculator announcements using assistive technology.

## References

- Google: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google structured-data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- W3C focus not obscured: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum
- W3C target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
