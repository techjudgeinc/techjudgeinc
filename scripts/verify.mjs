import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const target=process.argv[2]??'review';
if(!['review','production'].includes(target))throw new Error(`Unknown verification target: ${target}`);
const production=target==='production';
const files=readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html')).map(f=>f.replaceAll('\\','/'));
let links=0;
for(const file of files){
 const html=readFileSync(join('dist',file),'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: one h1`);
 if(production){
  if(['404.html','thank-you.html','brand.html'].includes(file))assert.match(html,/<meta name="robots" content="noindex, nofollow"/,`${file}: utility robots`);
  else assert.doesNotMatch(html,/<meta name="robots" content="noindex, nofollow"/,`${file}: public page is indexable`);
  if(file==='contact-us.html'){
   assert.match(html,/data-preview="false"/,`${file}: contact form enabled`);
   assert.match(html,/class="cf-turnstile"/,`${file}: Turnstile included`);
  }
 }else assert.match(html,/<meta name="robots" content="noindex, nofollow"/,`${file}: staging robots`);
 assert.match(html,/<title>[^<]+<\/title>/,`${file}: title`);
 if(!['404.html','thank-you.html','brand.html'].includes(file)){
  const path=file==='index.html'?'/':'/'+file.replace('.html','');
  assert.ok(html.includes(`href="https://www.techjudge.com${path}"`),`${file}: canonical`);
 }
 for(const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs))JSON.parse(m[1]);
 for(const m of html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)){
  const url=new URL(m[1],'https://www.techjudge.com');
  const path=decodeURIComponent(url.pathname);
  if(path==='/api/contact')continue;
  const target=path==='/'?'dist/index.html':existsSync('dist'+path)?'dist'+path:'dist'+path+'.html';
  assert.ok(existsSync(target),`${file}: missing ${path}`);
  if(url.hash&&target.endsWith('.html'))assert.ok(readFileSync(target,'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: missing anchor ${m[1]}`);
  links++;
 }
}
const headers=readFileSync('dist/_headers','utf8');
if(production)assert.doesNotMatch(headers,/^\/\*\s*\n\s*X-Robots-Tag: noindex/m,'Production must not block every page');
else assert.match(headers,/^\/\*\s*\n\s*X-Robots-Tag: noindex/m,'Review must block indexing');
assert.match(headers,/\/brand\s*\n\s*X-Robots-Tag: noindex/,'Unlisted brand guide stays noindex');
assert.ok(!existsSync('dist/_redirects'),'No redirects requested');
const sitemap=readFileSync('dist/sitemap.xml','utf8');
if(production){assert.ok(sitemap.includes('<loc>https://www.techjudge.com/</loc>'),'Production sitemap includes home');assert.ok(sitemap.includes('/contact-us</loc>'),'Production sitemap includes contact');}
else assert.ok(!sitemap.includes('<loc>'),'Staging sitemap excludes public URLs');
console.log(`Verified ${files.length} pages and ${links} local references; canonicals, schema, headings and ${target} indexing controls passed.`);
