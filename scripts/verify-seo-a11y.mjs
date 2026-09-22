import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const files=readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html'));
const titles=new Set(),descriptions=new Set();
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
for(const file of files){
 const html=readFileSync('dist/'+file,'utf8');
 const tags=[...html.matchAll(/<[a-z][^>]*>/gi)].map(m=>m[0]);
 const ids=tags.map(t=>attrs(t).id).filter(Boolean);
 assert.equal(new Set(ids).size,ids.length,file+': duplicate IDs');
 assert.match(html,/<html[^>]+lang="en"/,file+': document language');
 assert.match(html,/<main id="main" tabindex="-1"/,file+': focusable skip destination');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
 const description=tags.find(t=>attrs(t).name==='description');
 const text=description&&attrs(description).content;
 assert.ok(title&&!titles.has(title),file+': missing or duplicate title');titles.add(title);
 assert.ok(text&&!descriptions.has(text),file+': missing or duplicate description');descriptions.add(text);
 for(const tag of tags){
  const a=attrs(tag);
  if(tag.startsWith('<img '))assert.ok(/\balt(?:=|\s|>)/.test(tag),file+': image missing alt');
  for(const key of ['aria-labelledby','aria-describedby','aria-controls']){
   if(a[key])for(const id of a[key].split(/\s+/))assert.ok(ids.includes(id),file+': missing '+key+' target '+id);
  }
  if(/^<(input|select|textarea)\b/.test(tag)&&a.type!=='hidden'){
   const explicit=a.id&&html.includes('for="'+a.id+'"');
   const wrapped=[...html.matchAll(/<label\b[^>]*>[\s\S]*?<\/label>/g)].some(m=>m[0].includes(tag));
   assert.ok(explicit||wrapped||a['aria-label']||a['aria-labelledby'],file+': unlabeled control '+(a.id||a.name));
  }
  if(a.tabindex)assert.ok(Number(a.tabindex)<=0,file+': positive tabindex');
 }
 const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
 assert.ok(schemas.some(s=>s['@type']==='LocalBusiness'&&s.address&&s.telephone&&s.geo),file+': local business schema');
 assert.ok(schemas.some(s=>s['@type']==='WebSite'),file+': website schema');
 if(!['index.html','404.html','thank-you.html','brand.html'].includes(file)){
  const crumb=schemas.find(s=>s['@type']==='BreadcrumbList');
  assert.ok(crumb?.itemListElement.length>=2,file+': breadcrumbs');
  crumb.itemListElement.forEach((item,i)=>assert.equal(item.position,i+1));
 }
}
console.log('SEO/accessibility markup checks passed for '+files.length+' pages: unique metadata, image alternatives, labels, IDs, ARIA references, skip destinations and structured data.');
console.log('These checks do not certify WCAG conformance or replace browser/screen-reader testing.');
