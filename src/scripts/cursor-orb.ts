const orb = document.querySelector<HTMLElement>('.cursor-orb');

if (orb) {
  const root = document.documentElement;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0;
  let positioned = false;

  const allowed = () => finePointer.matches && !reducedMotion.matches &&
    root.dataset.motion !== 'paused' && !root.hasAttribute('data-loading') && !document.hidden;
  const hide = () => {
    orb.classList.remove('is-active');
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const draw = () => {
    x += (targetX - x) * .18;
    y += (targetY - y) * .18;
    orb.style.transform = `translate3d(${x - 110}px, ${y - 110}px, 0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > .5) frame = requestAnimationFrame(draw);
    else frame = 0;
  };

  window.addEventListener('pointermove', event => {
    if (!allowed() || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!positioned) {
      x = targetX;
      y = targetY;
      positioned = true;
    }
    orb.classList.add('is-active');
    if (!frame) frame = requestAnimationFrame(draw);
  }, { passive: true });
  window.addEventListener('pointerout', event => { if (!event.relatedTarget) hide(); });
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  finePointer.addEventListener('change', hide);
  reducedMotion.addEventListener('change', hide);
  new MutationObserver(() => { if (!allowed()) hide(); }).observe(root, {
    attributes: true,
    attributeFilter: ['data-motion', 'data-loading']
  });
}
