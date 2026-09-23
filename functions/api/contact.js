const reply = (status, error) => Response.json(error ? {ok:false,error} : {ok:true}, {status, headers:{'Cache-Control':'no-store'}});
const failure = 'Unable to send right now. Please call (818) 213-2050 or email info@techjudge.com.';
const limits = {name:120,email:254,phone:40,company:160,service:100,location:120,timeline:100,preference:100,message:5000};
const services = ['Managed IT & Cybersecurity','Infrastructure & Security','Luxury Smart Homes','Small & Medium Businesses','Property Management','General Contractors','Architects & Designers','Luxury Home Builders','Something else'];

// Cloudflare Pages Function. All credentials stay in runtime bindings, never the bundle.
export async function onRequest({request,env}, send = fetch) {
  if(request.method !== 'POST') return reply(405,'Use the contact form to send an enquiry.');
  if(env.CONTACT_ENABLED !== 'true' || !env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) return reply(503,failure);
  const url = new URL(request.url);
  const allowed = (env.CONTACT_ALLOWED_HOSTS || '').split(',').map(s=>s.trim());
  if(!allowed.includes(url.hostname) || request.headers.get('Origin') !== url.origin) return reply(403,'Please submit from the Tech Judge contact page.');
  if(!/^(multipart\/form-data|application\/x-www-form-urlencoded)(;|$)/i.test(request.headers.get('Content-Type') || '')) return reply(415,'Unsupported form format.');
  try {
    // Bound actual streamed bytes as Content-Length can be absent or untrusted.
    const reader=request.body?.getReader(); if(!reader) return reply(400,'Missing form data.');
    const chunks=[]; let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>32768){await reader.cancel();return reply(413,'Your message is too large.');}chunks.push(value);}
    const form=await new Response(new Blob(chunks),{headers:{'Content-Type':request.headers.get('Content-Type')}}).formData();
    if(form.get('website')) return reply(400,'Unable to accept this submission.');
    const values={};
    for(const [key,max] of Object.entries(limits)){
      const raw=form.get(key) ?? '';
      if(typeof raw!=='string'||form.getAll(key).length>1||raw.length>max) return reply(400,'Please check the form fields and their lengths.');
      values[key]=raw.trim();
      if(key!=='message' && /[\r\n\x00-\x1f\x7f]/.test(values[key])) return reply(400,'Please check the form fields.');
    }
    if(!values.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || !services.includes(values.service) || values.message.length<10) return reply(400,'Please provide your name, a valid email, a service and a message of at least 10 characters.');
    const token=form.get('cf-turnstile-response');
    if(typeof token!=='string'||!token||token.length>2048) return reply(400,'Please complete the security check.');
    const verification=await send('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
    if(!verification.ok) return reply(503,failure);
    const verdict=await verification.json();
    if(!verdict.success||verdict.hostname!==url.hostname||verdict.action!=='contact') return reply(400,'Security check expired or failed. Please try again.');
    const payload={from:'Tech Judge Website <enquiries@forms.techjudge.com>',to:['info@techjudge.com'],reply_to:values.email,subject:`Website enquiry: ${values.service}`,text:Object.entries(values).map(([key,value])=>`${key}: ${value || '(not provided)'}`).join('\n\n')};
    // Stable payload hash avoids duplicate mail when the same enquiry is retried.
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload)));
    const id=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
    const delivery=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`contact-${id}`},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
    if(!delivery.ok) return reply(502,failure);
    const result=await delivery.json();
    if(!result.id) return reply(502,failure);
    return reply(200);
  }catch{return reply(503,failure);}
}
