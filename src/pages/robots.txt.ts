export const prerender=true;
export function GET(){return new Response(import.meta.env.PUBLIC_SITE_ENV==='production'?'User-agent: *\nAllow: /\n\nSitemap: https://www.techjudge.com/sitemap.xml\n':'# Staging preview. Indexing is disabled in page metadata and response headers.\nUser-agent: *\nAllow: /\n',{headers:{'Content-Type':'text/plain'}});}
