// Rates and range factors from the user-approved boss prototype, rev14.
// Use actual headcount instead of the prototype's representative group size.
export const planQuestions = [
 {key:'management',label:'Service level',options:[['support','Essential','Monitoring, patching and help desk',96],['managed','Managed','Full management and security operations',148],['strategy','Complete','Full management, plus strategy and vCIO',206]]},
 {key:'security',label:'Cybersecurity',options:[['core','Standard','Core endpoint and email controls',0],['advanced','Advanced','EDR, identity hardening and training',24],['complete','Complete','Managed detection, response and review',46]]},
 {key:'cloud',label:'Cloud platform',options:[['microsoft','Microsoft 365','Microsoft 365 administration',9],['azure','Azure','Azure administration',20],['hybrid','Hybrid','Cloud and on-site systems',26],['unsure','Other / none yet','Other platforms or a new environment',11]]},
 {key:'coverage',label:'Support coverage',options:[['business','Business hours','Usual hours: 8am to 5pm Pacific',0],['extended','Extended','Early, late and weekend coverage',13],['continuous','24/7','Around-the-clock coverage',28]]},
 {key:'network',label:'Network & infrastructure',options:[['basic','Basic','Existing equipment, monitored',0],['managed','Managed','Firewall, switching and Wi-Fi managed',15],['advanced','Advanced','Multi-site, segmented and redundant',30]]}
] as const;
export const formatMoney=(value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export function createPlan(params:URLSearchParams){
 const raw=params.get('users')??'';
 if(!/^\d+$/.test(raw))return null;
 const users=Number(raw);if(!Number.isSafeInteger(users)||users<1||users>10000)return null;
 const selections=planQuestions.map(q=>({question:q,option:q.options.find(o=>o[0]===params.get(q.key))}));
 if(selections.some(s=>!s.option))return null;
 const items=selections.map(s=>({label:s.question.label,answer:s.option![1],scope:s.option![2],rate:s.option![3]}));
 // Resolve the prototype's overlapping 250 boundary in favor of 101 to 250.
 const multiplier=users<=10?1.16:users<=25?1:users<=50?.94:users<=100?.89:users<=250?.84:.78;
 const perUser=items.reduce((sum,item)=>sum+item.rate,0)*multiplier;
 const round50=(value:number)=>Math.max(50,Math.round(value/50)*50);
 const low=round50(users*perUser*.88),high=round50(users*perUser*1.24);
 const range=`${formatMoney(low)} to ${formatMoney(high)}`;
 return {users,items,perUser,low,high,range,text:['IT pricing estimate',`People to support: ${users}`,`Planning estimate: ${range} per month (USD)`,...items.map(i=>`${i.label}: ${i.answer}`),'','This is a planning estimate, not a quote. Please assess our environment and confirm the scope and final pricing.'].join('\n')};
}
