import {createPlan,planQuestions,formatMoney} from '../lib/it-plan';
const form=document.querySelector<HTMLFormElement>('#it-planner')!;
const users=form.querySelector<HTMLInputElement>('#users')!;
const amount=document.querySelector<HTMLElement>('#plan-price')!;
const contact=document.querySelector<HTMLAnchorElement>('#plan-contact')!;
const status=document.querySelector<HTMLElement>('#plan-status')!;
const summary=document.querySelector<HTMLElement>('#plan-result')!;
const error=document.querySelector<HTMLElement>('#plan-change')!;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const lower=document.querySelector<HTMLElement>('#price-low')!;
const upper=document.querySelector<HTMLElement>('#price-high')!;
const mobileAmount=document.querySelector<HTMLElement>('#mobile-price')!;
let shown=[0,0],target=[0,0],animation=0,announcement:ReturnType<typeof setTimeout>;
function render(values:number[]){lower.textContent=formatMoney(Math.round(values[0]));upper.textContent=formatMoney(Math.round(values[1]));}
function animate(low:number,high:number,initial:boolean){
 cancelAnimationFrame(animation);target=[low,high];
 if(initial||reduced.matches||document.documentElement.dataset.motion==='paused'){shown=target;render(shown);return;}
 const from=[...shown],started=performance.now();
 const tick=(now:number)=>{const progress=Math.min(1,(now-started)/480),ease=1-Math.pow(1-progress,3);shown=target.map((v,i)=>from[i]+(v-from[i])*ease);render(shown);if(progress<1)animation=requestAnimationFrame(tick);};
 animation=requestAnimationFrame(tick);
}
function update(initial=false){
 clearTimeout(announcement);status.textContent='';
 const params=new URLSearchParams(),data=new FormData(form);
 for(const key of ['users',...planQuestions.map(q=>q.key)])params.set(key,String(data.get(key)||''));
 form.querySelectorAll<HTMLButtonElement>('[data-headcount]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.headcount===users.value)));
 form.querySelector<HTMLButtonElement>('[data-step="-1"]')!.disabled=users.value==='1';
 form.querySelector<HTMLButtonElement>('[data-step="1"]')!.disabled=users.value==='10000';
 for(const q of planQuestions){const selected=q.options.find(o=>o[0]===params.get(q.key));const hint=document.querySelector<HTMLElement>(`[data-choice-hint="${q.key}"]`)!;hint.textContent=selected?.[2]??'Choose an option.';}
 const plan=createPlan(params);
 if(!plan){cancelAnimationFrame(animation);summary.hidden=true;contact.hidden=true;error.hidden=false;users.setAttribute('aria-invalid','true');mobileAmount.textContent='Check your headcount';document.querySelector('#plan-team')!.textContent='';status.textContent='Enter a whole number from 1 to 10,000 to update your estimate.';return;}
 users.removeAttribute('aria-invalid');error.hidden=true;summary.hidden=false;contact.hidden=false;
 amount.dataset.large=String(plan.high>=100000);amount.setAttribute('aria-label',`${plan.range} per month`);animate(plan.low,plan.high,initial);
 document.querySelector('#plan-team')!.textContent=`Built around ${plan.users} ${plan.users===1?'person':'people'}.`;
 mobileAmount.textContent=plan.range+' / mo';
 const list=document.querySelector('#plan-items')!;list.replaceChildren();
 for(const item of plan.items){const row=document.createElement('div');row.className='quote-selection';const dt=document.createElement('dt');dt.textContent=item.label;const dd=document.createElement('dd');dd.textContent=item.answer;row.append(dt,dd);list.append(row);}
 params.set('plan','1');params.set('service','Managed IT & Cybersecurity');contact.href='/contact-us?'+params.toString();
 if(!initial)announcement=setTimeout(()=>{status.textContent=`Estimate updated: ${plan.range} per month for ${plan.users} people.`;},550);
}
form.addEventListener('input',()=>update());
form.addEventListener('submit',event=>{event.preventDefault();if(form.reportValidity())update();});
form.querySelectorAll<HTMLButtonElement>('[data-step]').forEach(button=>button.addEventListener('click',()=>{
 const current=Number(users.value);const valid=Number.isInteger(current)&&current>=1&&current<=10000;
 users.value=String(valid?Math.max(1,Math.min(10000,current+Number(button.dataset.step))):1);update();
}));
form.querySelectorAll<HTMLButtonElement>('[data-headcount]').forEach(button=>button.addEventListener('click',()=>{users.value=button.dataset.headcount!;update();}));
form.addEventListener('reset',()=>requestAnimationFrame(()=>{update();status.textContent='Choices reset to the starting configuration.';}));
const finishAnimation=()=>{if(reduced.matches||document.documentElement.dataset.motion==='paused'){cancelAnimationFrame(animation);shown=target;if(!summary.hidden)render(shown);}};
reduced.addEventListener('change',finishAnimation);
new MutationObserver(finishAnimation).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
const mobileBar=document.querySelector<HTMLElement>('.mobile-estimate')!;
let formVisible=false,quoteVisible=false;
new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===form)formVisible=entry.isIntersecting;else quoteVisible=entry.isIntersecting;}mobileBar.classList.toggle('is-active',formVisible&&!quoteVisible);},{threshold:0}).observe(form);
new IntersectionObserver(entries=>{quoteVisible=entries[0].isIntersecting;mobileBar.classList.toggle('is-active',formVisible&&!quoteVisible);},{threshold:0}).observe(document.querySelector('#quote-panel')!);
update(true);
