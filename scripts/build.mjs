import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const target=process.argv[2]??'review';
if(!['review','production'].includes(target))throw new Error(`Unknown build target: ${target}`);
const production=target==='production';
if(production&&(!process.env.PUBLIC_TURNSTILE_SITE_KEY||process.env.PUBLIC_CONTACT_ENABLED!=='true')){
 throw new Error('Production builds require an enabled contact form and a Turnstile site key.');
}
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:{...process.env,PUBLIC_SITE_ENV:production?'production':'staging'}});
if(result.status!==0)process.exit(result.status??1);
const securityHeaders='  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n';
const reviewHeaders=production?'':'  X-Robots-Tag: noindex, nofollow\n';
const privateHeaders=readFileSync('public/_headers','utf8');
writeFileSync('dist/_headers','/*\n'+reviewHeaders+securityHeaders+'\n'+privateHeaders);
