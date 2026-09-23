import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/contact.js';
const env={CONTACT_ENABLED:'true',RESEND_API_KEY:'test-only',TURNSTILE_SECRET_KEY:'test-only',CONTACT_ALLOWED_HOSTS:'review.techjudge-review.pages.dev'};
const fields={name:'Test Visitor',email:'visitor@example.com',service:'Managed IT & Cybersecurity',message:'Synthetic test enquiry only.', 'cf-turnstile-response':'test-token'};
function request(overrides={},origin='https://review.techjudge-review.pages.dev') {return new Request('https://review.techjudge-review.pages.dev/api/contact',{method:'POST',headers:{Origin:origin},body:new URLSearchParams({...fields,...overrides})});}
let calls=[];
const mock=async (url,options)=>{calls.push({url,options});return Response.json(url.includes('siteverify')?{success:true,hostname:'review.techjudge-review.pages.dev',action:'contact'}:{id:'test-id'});};
const run=(req,bindings=env,transport=mock)=>onRequest({request:req,env:bindings},transport);
assert.equal((await run(request(),{})).status,503);
assert.equal((await run(request({},'https://evil.example'))).status,403);
assert.equal((await run(request({website:'spam'}))).status,400);
assert.equal((await run(request({email:'bad\r\nBcc:test@example.com'}))).status,400);
assert.equal((await run(request({message:'short'}))).status,400);
assert.equal((await run(request({service:'unlisted'}))).status,400);
assert.equal((await run(request({'cf-turnstile-response':''}))).status,400);
assert.equal(calls.length,0);
assert.equal((await run(request())).status,200);
const mail=JSON.parse(calls[1].options.body);
assert.deepEqual(mail.to,['info@techjudge.com']);assert.equal(mail.reply_to,'visitor@example.com');
assert.equal(mail.from,'Tech Judge Website <enquiries@forms.techjudge.com>');
const firstKey=calls[1].options.headers['Idempotency-Key'];calls=[];
await run(request());assert.equal(calls[1].options.headers['Idempotency-Key'],firstKey);
for(const verdict of [{success:false},{success:true,hostname:'evil.example',action:'contact'},{success:true,hostname:'review.techjudge-review.pages.dev',action:'other'}]){
 let count=0;assert.equal((await run(request(),env,async()=>{count++;return Response.json(verdict);})).status,400);assert.equal(count,1);
}
assert.equal((await run(request(),env,async()=>{throw Error('provider unavailable');})).status,503);
assert.equal((await run(request({message:'a'.repeat(33000)}))).status,413);
console.log('Contact tests passed: disabled defaults, origin, validation, size, spam checks, routing, deduplication and upstream failures. No emails sent.');
