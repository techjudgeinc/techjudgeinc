import land from '../data/globe-land.json';
// Geographic point positions from the supplied reference; independent gold renderer.
const canvas = document.querySelector<HTMLCanvasElement>('[data-gold-globe]');
if (canvas) {
 const ctx = canvas.getContext('2d');
 if (ctx) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let size=0, angle=.4, phase=0, frame=0, last=0, visible=true;
  const paused=()=>reduced.matches||document.hidden||!visible||document.documentElement.dataset.motion==='paused'||document.documentElement.hasAttribute('data-loading');
  const project=(p:number[],lift=1)=>{
   const x=p[0]*Math.cos(angle)+p[2]*Math.sin(angle), z=-p[0]*Math.sin(angle)+p[2]*Math.cos(angle);
   const y=p[1]*.97-x*.14;
   return [size*.5+x*size*.405*lift,size*.5+y*size*.405*lift,z];
  };
  const dot=(x:number,y:number,r:number,color:string)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();};
  const draw=()=>{
   ctx.clearRect(0,0,size,size);
   const light=document.documentElement.dataset.theme==='light';
   const rgb=light?'128,87,28':'224,188,118';
   const glow=ctx.createRadialGradient(size*.5,size*.5,size*.28,size*.5,size*.5,size*.48);
   glow.addColorStop(0,'rgba('+rgb+',0)');glow.addColorStop(.7,'rgba('+rgb+',.035)');glow.addColorStop(.88,'rgba('+rgb+',.10)');glow.addColorStop(1,'rgba('+rgb+',0)');
   ctx.fillStyle=glow;ctx.fillRect(0,0,size,size);
   ctx.strokeStyle='rgba('+rgb+',.15)';ctx.lineWidth=.7;
   ctx.beginPath();ctx.arc(size*.5,size*.5,size*.405,0,Math.PI*2);ctx.stroke();
   for(const p of land){const [x,y,z]=project(p);if(z<0)continue;dot(x,y,Math.max(.65,size/610)*(1+z*.35),'rgba('+rgb+','+(.18+z*.66)+')');}
   // Three lifted connections with small moving gold pulses.
   const routes=[[260,1150],[700,1650],[1500,2300]];
   for(let n=0;n<routes.length;n++){
    const a=land[routes[n][0]%land.length],b=land[routes[n][1]%land.length];
    const point=(t:number)=>{const v=a.map((v,i)=>v*(1-t)+b[i]*t);const length=Math.hypot(...v);return project(v.map(v=>v/length),1+.16*Math.sin(t*Math.PI));};
    ctx.beginPath();let pen=false;
    for(let j=0;j<=64;j++){const [x,y,z]=point(j/64);if(z>0){if(pen)ctx.lineTo(x,y);else ctx.moveTo(x,y);pen=true;}else pen=false;}
    ctx.strokeStyle='rgba('+rgb+',.27)';ctx.lineWidth=.9;ctx.stroke();
    const [x,y,z]=point((phase+n*.31)%1);
    if(z>0){dot(x,y,7,'rgba('+rgb+',.10)');dot(x,y,2.2,'rgba('+rgb+',.95)');}
   }
  };
  const tick=(now:number)=>{frame=0;if(paused())return;const dt=last?Math.min(now-last,60):0;last=now;angle+=dt*.000045;phase=(phase+dt*.0001)%1;draw();frame=requestAnimationFrame(tick);};
  const sync=()=>{cancelAnimationFrame(frame);last=0;draw();if(!paused())frame=requestAnimationFrame(tick);};
  const resize=()=>{size=Math.min(canvas.parentElement!.getBoundingClientRect().width,1800);if(size<=0)return;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);sync();};
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-motion','data-loading']});
  reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
  resize();
 }
}
