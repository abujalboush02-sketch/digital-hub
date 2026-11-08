import './styles/base.css';
import './styles/hero.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { applyLang, toggleLang, t, statusLabel } from './i18n.js';
import { initNetwork } from './network.js';
import { initTheme } from './theme.js';

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

applyLang();
initTheme();
document.getElementById('lang-toggle').addEventListener('click', toggleLang);

// specimen chips (stage 1 only)
const chips = document.getElementById('chips');
const drawChips = () => {
  chips.replaceChildren();
  ['live', 'soon', 'built', 'roadmap'].forEach((s) => {
    const c = document.createElement('span'); c.className = 'chip chip--' + s; c.textContent = statusLabel(s); chips.appendChild(c);
  });
};
drawChips(); document.addEventListener('langchange', drawChips);

// nav state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// smooth scroll
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute('href') === '#') return;
  const el = document.querySelector(a.getAttribute('href'));
  if (!el) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(el, { offset: -60 }) : el.scrollIntoView();
});

// hero headline: word-by-word reveal (Arabic-safe: split on spaces only)
const h1 = document.getElementById('h1');
function splitWords() {
  const words = t('hero.h1').split(' ');
  h1.setAttribute('aria-label', words.join(' '));
  h1.replaceChildren(...words.flatMap((w, i) => {
    const o = document.createElement('span'); o.className = 'w'; o.setAttribute('aria-hidden', 'true');
    const s = document.createElement('span'); s.textContent = w; o.appendChild(s);
    return i ? [document.createTextNode(' '), o] : [o];
  }));
}
// applyLang rewrites textContent of [data-i18n]; re-split afterwards
document.addEventListener('langchange', splitWords);
splitWords();

if (!reduce) {
  gsap.set('.hero h1 .w > span', { yPercent: 110 });
  gsap.set(['.hero__kicker', '.hero__sub', '.net'], { autoAlpha: 0, y: 24 });
  gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 })
    .to('.hero__kicker', { autoAlpha: 1, y: 0, duration: 0.8 })
    .to('.hero h1 .w > span', { yPercent: 0, duration: 1.1, stagger: 0.08 }, '<0.1')
    .to('.hero__sub', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.7')
    .to('.net', { autoAlpha: 1, y: 0, duration: 1.2 }, '-=0.9');
}

initNetwork(document.getElementById('network'));
