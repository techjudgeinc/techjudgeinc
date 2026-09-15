import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
// This project intentionally produces review builds only until delivery is configured.
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:{...process.env,PUBLIC_SITE_ENV:'staging'}});
if(result.status!==0)process.exit(result.status??1);
writeFileSync('dist/_headers','/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
