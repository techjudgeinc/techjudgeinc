import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml'};
createServer(async(req,res)=>{
 res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('X-Content-Type-Options','nosniff');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:'This staging preview does not send messages.'}));return;}
 try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep))throw Error('path');
  if(!extname(file))file+='.html';
  let code=200;try{if(!(await stat(file)).isFile())throw Error('missing');}catch{file=resolve(root,'404.html');code=404;}
  res.writeHead(code,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:await readFile(file));
 }catch{res.writeHead(400);res.end('Invalid request');}
}).listen(4321,'127.0.0.1',()=>console.log('Local staging preview: http://127.0.0.1:4321'));
