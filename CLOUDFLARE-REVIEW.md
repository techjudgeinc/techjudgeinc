# Cloudflare review deployment

## GitHub automatic deployment

The `.github/workflows/deploy-review.yml` workflow builds and verifies pushes to
`codex/astro-rebuild`, then deploys to the existing `review` branch URL below.
It does not deploy `main` or change DNS. Add a GitHub repository Actions secret
named `CLOUDFLARE_API_TOKEN` with Cloudflare Pages Edit permission scoped to the
Tech Judge Inc account. This credential is distinct from the Resend email key;
never commit either credential. Until the deployment token is configured, the
workflow deliberately fails before deployment. Manual authenticated Wrangler
deployments remain available. Builds remain noindex and forms preview-only.

Project: `techjudge-review`
Preview branch: `review`
Review URL: https://review.techjudge-review.pages.dev
Initial deployment: https://e4145bae.techjudge-review.pages.dev
Published: 2026-09-21

This is separate from the live Tech Judge website. No custom domain or DNS changes were made. The preview is public, not password protected. Search indexing is discouraged through noindex metadata and HTTP headers. Contact forms remain preview-only and do not send messages.

To update the review link from this repository:

```powershell
npm run build
npm run verify
npx wrangler pages deploy dist --project-name techjudge-review --branch review --commit-dirty=true
```

Build and local verification passed before the initial upload. Cloudflare reported successful deployment of 182 files. The initial temporary HTTPS handshake error cleared, and the homepage returned HTTP 200 with the expected noindex header.

This project uses direct upload, not a Git connection. Updates require running the deployment command above; pushing to Git alone will not update it.
