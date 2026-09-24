# Tech Judge launch tracker

Updated 2026-09-23. This is a working checklist, not authorization to publish or change DNS.

## Confirmed

- The public figures **35+ years of combined leadership experience** and **200+ locations supported** were confirmed by the site owner on 2026-09-23.
- The existing privacy policy and terms of service were approved for the original site and must remain unchanged for this launch, per the site owner on 2026-09-23. Do not rewrite them as part of this project.
- The review build remains noindex. A separate local production build and production verification pass exist, but no production deployment or domain cutover has occurred.
- The review contact form has passed an end-to-end Resend delivery test from `website@techjudge.com` to `info@techjudge.com`. Inbox placement and a production-host submission still need checking.
- On 2026-09-23, a fresh Edge review tab at 375px width showed no horizontal overflow on Home, Services, Pricing, or Contact. The mobile menu opened and closed with Escape, and an empty contact-form submission focused the required Name field without sending data. This is a targeted check, not a complete accessibility audit.
- The home page uses the existing optimized WebP imagery. The office map's dark tiles, pin, and controls rendered in a browser check. A deferred map-library import was reverted after it exposed a stale dependency-cache issue in the running local preview; the preview was restarted and the map rendered again. This is not a field Core Web Vitals measurement.
- The home loading-screen flash was corrected by registering scroll reveals before the loading screen closes and removing a duplicate entrance animation. The local browser check showed the loading screen before content and the home hero after it, without the content being hidden a second time.
- A second built-site browser pass on 2026-09-23 checked Home, Services, Pricing, and Contact at 375px width without horizontal overflow; the mobile menu opened and closed with Escape, and an empty review-form action focused the required Name field without submitting. The Services breadcrumb was corrected to match the navigation label, “All services,” and a regression check was added. The desktop home hero was visually checked. These are targeted checks, not a full device/browser matrix.

## Waiting on company/client approval

- Pinnacle Estate Properties, RidgeGate Escrow, and Priority Title stories, descriptions, logos, testimonials, and any project photographs are **not cleared for publication**. Company leadership will supply facts and obtain approval. Do not deploy an indexable build containing these features until they are approved or removed.
- Company leadership should review claims about the C7 license, named technology partnerships/certifications, support availability, and any outcome statements before publication.

## URL and search audit

- The 15 main legacy paths captured in `src/data/baseline.json` have matching paths in the rebuild. The old `/test-of-new-site` draft page is not in the new site; no redirect decision has been made for it.
- The old Webflow sitemap could not be retrieved in this environment. Before cutover, compare a Search Console page export or full Webflow URL export against `src/data/routes.ts` and create redirects for any meaningful changed URLs.
- The production build generates an indexable sitemap and leaves the unlisted brand guide and utility pages noindex. Verify this again on the actual production host before Search Console submission.

## Still to complete before cutover

- Decide on the production Cloudflare Pages deployment/project and configure its production environment without changing the review deployment.
- Add the live hostname(s) to Turnstile and configure production contact settings, allowed hosts, and secrets; test from the live hostname.
- Complete manual accessibility and mobile-browser checks, final visual/content QA, performance checks, and production form failure-path testing.
- Decide whether to use analytics and confirm Google Search Console access.
- Prepare a DNS cutover and rollback plan. Preserve the existing mail MX and authentication records.
- After cutover, verify HTTPS, canonical redirects, genuine 404s, key pages, robots, sitemap, structured data, and enquiry inbox delivery.
