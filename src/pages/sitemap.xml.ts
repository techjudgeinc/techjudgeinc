import {publishedRoutes} from '../data/routes';
export const prerender=true;
export function GET(){const routes=import.meta.env.PUBLIC_SITE_ENV==='production'?publishedRoutes:[];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(p=>'<url><loc>https://www.techjudge.com'+p+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});}
