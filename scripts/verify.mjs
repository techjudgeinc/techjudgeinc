import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const files=readdirSync('dist').filter(f=>f.endsWith('.html'));
let links=0;
for(const file of files){
 const html=readFileSync(join('dist',file),'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: one h1`);
 assert.match(html,/<meta name="robots" content="noindex, nofollow"/,`${file}: staging robots`);
 assert.match(html,/<title>[^<]+<\/title>/,`${file}: title`);
 if(!['404.html','thank-you.html'].includes(file)){
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
assert.match(readFileSync('dist/_headers','utf8'),/X-Robots-Tag: noindex/);
assert.ok(!existsSync('dist/_redirects'),'No redirects requested');
assert.ok(!readFileSync('dist/sitemap.xml','utf8').includes('<loc>'),'Staging sitemap excludes public URLs');
console.log(`Verified ${files.length} pages and ${links} local references; canonicals, schema, headings and staging indexing controls passed.`);
