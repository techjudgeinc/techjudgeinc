// Opt-in local QA harness, omitted by the production build.
if(import.meta.env.DEV && new URLSearchParams(location.search).has('a11y')){
 const params=new URLSearchParams(location.search);
 document.documentElement.dataset.theme=params.get('theme')==='light'?'light':'dark';
 const run=async()=>{
  await document.fonts.ready;
  await new Promise(resolve=>setTimeout(resolve,1800));
  // Reveal all scroll content for the scan, without changing normal page behavior.
  const style=document.createElement('style');
  style.textContent='*,*::before,*::after{animation:none!important;transition:none!important}.will-reveal{opacity:1!important;translate:none!important}';
  document.head.append(style);
  if(params.has('spacing'))style.textContent+='p,li,a,button,label,span,h1,h2,h3{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';
  document.getAnimations().forEach(animation=>animation.finish());
  document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-visible'));
  const {default:axe}=await import('axe-core');
  const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});
  const output=document.createElement('pre');
  output.id='a11y-results';
  output.setAttribute('data-no-reveal','');
  output.style.cssText='white-space:pre-wrap;padding:24px;background:#fff;color:#111;font:14px monospace;position:relative;z-index:100';
  output.textContent=JSON.stringify({url:location.pathname,theme:document.documentElement.dataset.theme,violations:result.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),passes:result.passes.length});
  document.body.append(output);
 };
 if(document.readyState==='complete')void run();
 else window.addEventListener('load',()=>void run(),{once:true});
}
