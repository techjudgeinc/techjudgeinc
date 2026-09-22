import {brandMarkdown} from '../../data/brand';
export const prerender = true;
export function GET(){return new Response(brandMarkdown(),{headers:{'Content-Type':'text/markdown; charset=utf-8','X-Robots-Tag':'noindex, nofollow'}});}
