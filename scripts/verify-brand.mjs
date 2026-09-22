import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const html=readFileSync('dist/brand.html','utf8');
const markdown=readFileSync('dist/brand/guide.md','utf8');
const tokens=JSON.parse(readFileSync('dist/brand/tokens.json','utf8'));
assert.match(html, /name="robots" content="noindex, nofollow"/);
assert.ok(!html.includes('class="masthead"')&&!html.includes('class="site-footer"'),'Brand guide must stay standalone');
assert.equal(JSON.parse(html.match(/<script id="brand-markdown"[^>]*>([\s\S]*?)<\/script>/)[1]),markdown,'Copied guide must equal downloaded guide');
const headings=[...html.matchAll(/<h2 id="[^"]+-title">([^<]+)<\/h2>/g)].map(m=>m[1]);
assert.equal(headings.length,14);
for(const title of headings)assert.ok(markdown.includes(title.replaceAll('&amp;','&')),'Missing Markdown section: '+title);
for(const theme of Object.values(tokens.colors))for(const value of Object.values(theme))assert.ok(markdown.includes(value),'Missing exported token '+value);
assert.ok(!readFileSync('dist/sitemap.xml','utf8').includes('/brand'));
for(const file of readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html')&&f!=='brand.html'))assert.ok(!/href="\/brand(?:"|\/"|\.html)/.test(readFileSync('dist/'+file,'utf8')),'Public link to brand guide: '+file);
console.log('Brand checks passed: standalone layout, noindex, no public links, Markdown parity, all 14 sections and exported colors.');

