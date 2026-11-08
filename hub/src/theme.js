import { t } from './i18n.js';

export function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const label = () => btn.setAttribute('aria-label', root.dataset.theme === 'dark' ? t('theme.toLight') : t('theme.toDark'));
  label();
  document.addEventListener('langchange', label);

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0d0c0b' : '#f3eee4');
      label();
      document.dispatchEvent(new CustomEvent('themechange'));
    };
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('vt-theme');
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => root.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
    ));
    vt.finished.finally(() => root.classList.remove('vt-theme'));
  });
}
