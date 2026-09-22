import {brandTokens} from '../../data/brand';
export const prerender = true;
export function GET(){return new Response(JSON.stringify(brandTokens,null,2)+'\n',{headers:{'Content-Type':'application/json; charset=utf-8','X-Robots-Tag':'noindex, nofollow'}});}
