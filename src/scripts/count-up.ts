const preference = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll<HTMLElement>('[data-count-to]').forEach(element => {
  const target = Number(element.dataset.countTo);
  let frame = 0, started = false;
  const settle = () => { cancelAnimationFrame(frame); element.textContent = target + '+'; };
  const motionOff = () => preference.matches || document.documentElement.dataset.motion === 'paused';
  const observer = new IntersectionObserver(entries => {
    if (started || !entries.some(entry => entry.isIntersecting)) return;
    started = true;
    observer.disconnect();
    if (motionOff()) { settle(); return; }
    const start = performance.now();
    const tick = (now: number) => {
      if (motionOff()) { settle(); return; }
      const progress = Math.min((now - start) / 3800, 1);
      element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 2))) + '+';
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }, { threshold: .65 });
  observer.observe(element);
  preference.addEventListener('change', () => { if (preference.matches) settle(); });
  window.addEventListener('pagehide', () => { settle(); observer.disconnect(); }, { once: true });
});
