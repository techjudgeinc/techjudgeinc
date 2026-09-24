# Contact delivery setup

Resend sender: website@techjudge.com. Fixed recipient: info@techjudge.com.
The techjudge.com domain is verified for sending in Resend. The existing
Tech Judge website sending key is restricted to techjudge.com.
Reply-To is the validated visitor address. No automatic visitor emails are sent.

Cloudflare Pages review runtime settings:
- RESEND_API_KEY (Secret): sending-only key restricted to techjudge.com.
- TURNSTILE_SECRET_KEY (Secret): widget validation secret.
- CONTACT_ENABLED (Text): true.
- CONTACT_ALLOWED_HOSTS (Text): review.techjudge-review.pages.dev

The managed Turnstile widget is configured for review.techjudge-review.pages.dev.
GitHub repository Actions variables required to enable the built form:
- PUBLIC_CONTACT_ENABLED: true
- PUBLIC_TURNSTILE_SITE_KEY: public widget site key

The workflow passes those two variables into its build step. The review site
stays noindex independently of form mode. Local builds default to preview-only.
Deploy Functions together with dist through Wrangler; Astro dev alone does not
serve Pages Functions. Test server logic with node scripts/verify-contact.mjs.
Credentials must never enter Git, public build variables, chat or logs.

The existing privacy policy and terms were approved for the original site and
must remain unchanged for this launch. The contact form itself discloses that
Cloudflare handles the submission/security check and Resend delivers the email.

The review form passed an end-to-end delivery test on 2026-09-23. Before the
production domain goes live: allow its hostname in Turnstile; set production
runtime bindings and CONTACT_ALLOWED_HOSTS; test a live submission, inbox
placement, Reply-To, provider failure and double submission; and configure
host-level rate limiting as appropriate. A Resend accepted response alone is
not proof of inbox delivery. No full email addresses or message bodies are logged.
