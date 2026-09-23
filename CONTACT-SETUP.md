# Contact delivery setup

Current Resend sender: enquiries@forms.techjudge.com. Target sender:
website@techjudge.com. Fixed recipient: info@techjudge.com.
The function uses the current sender until CONTACT_FROM is set to
website@techjudge.com. Before setting it, verify techjudge.com in Resend and
permit that domain on the existing website sending key. Keep forms.techjudge.com
intact until the switch has been verified.
Reply-To is the validated visitor address. No automatic visitor emails are sent.

Cloudflare Pages Preview runtime settings:
- RESEND_API_KEY (Secret): sending-only key restricted to forms.techjudge.com
  until techjudge.com is verified and its key scope is changed.
- CONTACT_FROM (Text, optional): website@techjudge.com after sender verification.
- TURNSTILE_SECRET_KEY (Secret): widget validation secret.
- CONTACT_ENABLED (Text): true only when ready for real enquiries.
- CONTACT_ALLOWED_HOSTS (Text): review.techjudge-review.pages.dev

Create a managed Turnstile widget for review.techjudge-review.pages.dev.
GitHub repository Actions variables required to enable the built form:
- PUBLIC_CONTACT_ENABLED: true
- PUBLIC_TURNSTILE_SITE_KEY: public widget site key

The workflow passes those two variables into its build step. The site
stays noindex independently of form mode. Local builds default to preview-only.
Deploy Functions together with dist through Wrangler; Astro dev alone does not
serve Pages Functions. Test server logic with node scripts/verify-contact.mjs.
Credentials must never enter Git, public build variables, chat or logs.

Before enabling: update privacy disclosures for Cloudflare/Resend processing;
configure host-level rate limiting as appropriate; test managed Turnstile in a
real browser, provider failure, double submission, receipt and Reply-To. A Resend
accepted response is not proof of inbox delivery. Keep CONTACT_ENABLED unset
until this setup is complete. No full email addresses or message bodies are logged.
