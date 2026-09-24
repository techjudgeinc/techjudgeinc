// Content is visible without JavaScript. Reveal once, without moving sticky UI.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const selector = [
  '[data-reveal]', 'h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'figure',
  'article', 'li', 'dl', 'table', 'details', 'a', '.button', 'button',
  '.glass-card', '.client-panel', '.scope-board > section', '.hub-row',
  '.audience-card', '.setup-card', '.field', '.brand-grid > div',
  '.proof-ribbon > div', '.team-facts > div', '.process-grid > div',
  '.care-list > div', '.principles > div', '.comparison > div', '.contact-aside > div',
  '.showcase-shell', '.scene-scope > div', '.brand-scroll', '.footer-top a', '.footer-bottom', '.detail-wide-media', '.case-image'
].join(',');
const targets = [...document.querySelectorAll<HTMLElement>('main, .site-footer')]
  .flatMap(scope => [...scope.querySelectorAll<HTMLElement>(selector)])
  .filter(el => !el.closest('[aria-hidden="true"], .mobile-estimate, [data-no-reveal], .launch-copy, .page-header, .detail-opening, .estimate-header'));
// Cover content by its role and rendered treatment, not only a list of template classes.
// This catches image panels, review shells, contact cards, badges and future card types.
const excluded = '[data-no-reveal], .mobile-estimate, .launch-copy, .page-header, .detail-opening, .estimate-header';
document.querySelectorAll<HTMLElement>('main :is(div,section,aside,form,fieldset,img,figcaption,summary,span,strong), .site-footer > .wrap').forEach(el => {
  if (el.closest(excluded) || el.closest('[hidden]') || el.tagName === 'SVG') return;
  if (el.closest('[aria-hidden="true"]') && !el.matches('.visit-map,.scope-sheet,.connection-art')) return;
  const style = getComputedStyle(el);
  const directText = [...el.childNodes].some(node => node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim());
  const card = Number.parseFloat(style.borderRadius) > 0 &&
    (Number.parseFloat(style.borderTopWidth) > 0 || style.backgroundImage !== 'none' || style.backgroundColor !== 'rgba(0, 0, 0, 0)');
  const content = el.matches('img,figcaption,summary,.visit-map,.scope-sheet,.connection-art,.contact-band,.client-words>.wrap,.contact-layout>div');
  if (!card && !content && !directText) return;
  // Inline fragments already travel with their text block; positioned artwork with its card.
  if (el.matches('span,strong') && el.closest('h1,h2,h3,h4,p,a,button,li,figcaption')) return;
  if (el.matches('img') && style.position === 'absolute') return;
  if (!targets.includes(el)) targets.push(el);
});
// A card and its contents enter as one unit. Nested transforms compound movement.
const revealSet = new Set(targets);
const units = targets.filter(el => {
  let parent = el.parentElement;
  while (parent && !parent.matches('main,.site-footer')) {
    if (revealSet.has(parent) && !parent.matches('.brand-scroll')) return false;
    parent = parent.parentElement;
  }
  return true;
});
let observer: IntersectionObserver | undefined;
const show = (el: HTMLElement) => {
  if (el.classList.contains('is-visible')) return;
  el.classList.add('is-visible');
  if (!reducedMotion.matches) {
    const stationary = el.classList.contains('reveal-stationary');
    const opening = !!el.closest('.launch-hero');
    el.animate(
      [{opacity:0,translate:stationary?'none':'0 28px'}, {opacity:1,translate:'none'}],
      {duration:opening?1000:1500,delay:opening?0:Number.parseFloat(el.style.getPropertyValue('--reveal-delay'))||0,easing:'cubic-bezier(.22,.61,.36,1)',fill:'backwards'}
    );
  }
  observer?.unobserve(el);
};
const setup = () => {
  observer?.disconnect();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    units.forEach(el => el.getAnimations().forEach(animation => animation.finish()));
    units.forEach(show);
    return;
  }
  observer = new IntersectionObserver(entries => {
    if (document.documentElement.hasAttribute('data-loading')) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) show(entry.target as HTMLElement);
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
  units.forEach(el => {
    // Skip already read content when restoring a page's scroll position.
    if (el.classList.contains('is-visible')) return;
    const position = getComputedStyle(el).position;
    if (position === 'fixed') return;
    if (position === 'sticky') el.classList.add('reveal-stationary');
    el.classList.add('will-reveal');
    el.style.setProperty('--reveal-delay', (Math.min(
      [...(el.parentElement?.children || [])].indexOf(el), 3
    ) * 110) + 'ms');
    if (el.getClientRects().length && el.getBoundingClientRect().bottom < 0) show(el);
    else observer!.observe(el);
  });
};
// Register hidden states under the loader, then recheck the viewport when it closes.
// Observers can fire behind the loader, so those entries must not start animations.
setup();
document.addEventListener('tj:page-ready', setup, {once:true});
reducedMotion.addEventListener('change', setup);
// Keyboard navigation must never land on an invisible control.
document.addEventListener('focusin', event => {
  let el = event.target as HTMLElement | null;
  while (el) {
    if (el.classList.contains('will-reveal')) show(el);
    el = el.parentElement;
  }
});
window.addEventListener('beforeprint', () => units.forEach(show));

// Alternate page-level sections, leaving quiet black space between light fields.
// Add after reveal registration so decorative lights never become reveal targets.
const page = document.querySelector('main');
const chapters = [...(page?.children || [])].flatMap(child => {
  if (!(child instanceof HTMLElement) || child.matches('script,noscript,.mobile-estimate')) return [];
  const sections = [...child.children].filter(el => el.tagName === 'SECTION') as HTMLElement[];
  return child.tagName === 'SECTION' || !sections.length ? [child] : sections;
});
const litSections = chapters.filter((_, index) => index % 2 === 0);
// One shared layer: lights can cross section boundaries without rectangular clipping.
const backdrop = document.createElement('div');
backdrop.className = 'page-lights';
backdrop.setAttribute('aria-hidden','true');
backdrop.setAttribute('data-no-reveal','');
document.body.prepend(backdrop);
const fields = litSections.map((section,index) => {
  section.classList.add('section-lit');
  const lights = document.createElement('div');
  lights.className = 'section-lights';
  lights.dataset.lightSide = index % 2 === 0 ? 'left' : 'right';
  lights.innerHTML = '<span class="section-orb"></span><span class="section-halo"></span>';
  backdrop.append(lights);
  return {section,lights};
});
const positionLights = () => {
  if (!page) return;
  const pageTop = document.body.getBoundingClientRect().top + window.scrollY;
  fields.forEach(({section,lights}) => {
    // Offset layout coordinates are not affected by reveal transforms.
    let top = 0;
    let node: HTMLElement | null = section;
    while (node) {top += node.offsetTop; node = node.offsetParent as HTMLElement | null;}
    lights.style.top = (top - pageTop) + 'px';
    lights.style.height = section.offsetHeight + 'px';
  });
};
positionLights();
if ('ResizeObserver' in window && page) new ResizeObserver(positionLights).observe(page);
window.addEventListener('resize', positionLights);
document.fonts.ready.then(positionLights);
if ('IntersectionObserver' in window) {
  const lightingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => fields.find(field => field.section === entry.target)?.lights.classList.toggle('light-in-view', entry.isIntersecting));
  }, {rootMargin:'450px'});
  fields.forEach(({section}) => lightingObserver.observe(section));
} else fields.forEach(({lights}) => lights.classList.add('light-in-view'));
