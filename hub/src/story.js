// Chapters (pinned, scrubbed: problem -> system -> result) and flagship scenes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PILLARS, FLAGSHIPS, FS, STATUS } from './content.js';
import { chapterVisual, sceneVisual } from './visuals.js';
import { pick } from './i18n.js';

const pad = (n) => String(n).padStart(2, '0');
const STEPS = ['problem', 'system', 'result'];

// ---------- markup (text is filled by applyLang via data-c / data-i18n) ----------
export function renderStory() {
  const craft = document.getElementById('craft');
  craft.innerHTML = `
    <header class="sec-head"><span class="mono" data-i18n="craft.kicker"></span><h2 data-i18n="craft.title"></h2></header>
    ${PILLARS.map((p, i) => `
    <section class="chapter" data-pillar="${p.id}" style="--c:${p.color}" aria-labelledby="ch-${p.id}">
      <div class="chapter__pin">
        <div class="chapter__top"><span class="mono">${pad(i + 1)} / ${pad(PILLARS.length)}</span><h3 id="ch-${p.id}" data-c="pillar.${p.id}.name"></h3></div>
        <div class="chapter__body">
          <div class="chapter__copy">
            <ol class="steps" aria-hidden="true">${STEPS.map((s, k) => `<li data-k="${k}"><i></i><span data-i18n="step.${s}"></span></li>`).join('')}</ol>
            <div class="panels">${STEPS.map((s) => `<p class="panel" data-c="chapters.${p.id}.${s}"></p>`).join('')}</div>
          </div>
          <div class="chapter__vis">${chapterVisual(p.id)}</div>
        </div>
      </div>
    </section>`).join('')}`;

  const work = document.getElementById('work');
  work.innerHTML = `
    <header class="sec-head"><span class="mono" data-i18n="flag.kicker"></span><h2 data-i18n="flag.title"></h2></header>
    ${FLAGSHIPS.map((f, i) => {
      const pl = PILLARS.find((p) => p.id === f.pillar);
      const fs = FS[f.id];
      return `
    <article class="scene${i % 2 ? ' scene--flip' : ''}" style="--c:${pl.color}" aria-labelledby="sc-${f.id}">
      <div class="scene__vis">${sceneVisual(f.visual)}</div>
      <div class="scene__copy">
        <div class="scene__meta"><span class="mono">${pad(i + 1)} · <span data-i18n="flag.n"></span></span><span class="chip chip--${f.status}" data-status="${f.status}"></span></div>
        <h3 id="sc-${f.id}" data-c="fs.${f.id}.title"></h3>
        <p class="scene__body" data-c="fs.${f.id}.body"></p>
        <p class="facts mono"><span data-c="fs.${f.id}.f0"></span><span data-c="fs.${f.id}.f1"></span><span data-c="fs.${f.id}.f2"></span></p>
        ${fs.note ? `<p class="scene__note" data-c="fs.${f.id}.note"></p>` : ''}
        ${f.cta ? `<a class="btn${f.status === 'soon' ? ' btn--ghost' : ''}" href="${f.cta.href}" target="_blank" rel="noopener"><span data-c="fs.${f.id}.cta"></span><svg class="arr" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>` : ''}
      </div>
    </article>`;
    }).join('')}`;
}

export function labelStatuses() {
  document.querySelectorAll('[data-status]').forEach((el) => { el.textContent = pick(STATUS[el.dataset.status]); });
}

// ---------- motion ----------
export function initStory(reduce) {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll('.chapter').forEach(chapter);
    document.querySelectorAll('.scene').forEach(sceneMotion);
  });
  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelectorAll('.chapter').forEach((c) => { c.classList.add('is-static'); c.querySelector('.v').classList.add('is-live'); });
    document.querySelectorAll('.scene .v').forEach((v) => { v.classList.add('is-live'); v.pauseAnimations?.(); });
  });
  document.addEventListener('langchange', () => ScrollTrigger.refresh());
}

function chapter(el) {
  const panels = el.querySelectorAll('.panel');
  const steps = el.querySelectorAll('.steps li');
  const svg = el.querySelector('.v');
  const tl = gsap.timeline({ defaults: { ease: 'none' } });

  // panels
  gsap.set(panels, { autoAlpha: 0, y: 24 });
  gsap.set(panels[0], { autoAlpha: 1, y: 0 });
  tl.to(panels[0], { autoAlpha: 0, y: -24, duration: 0.2 }, 0.85)
    .to(panels[1], { autoAlpha: 1, y: 0, duration: 0.2 }, 1.0)
    .to(panels[1], { autoAlpha: 0, y: -24, duration: 0.2 }, 1.85)
    .to(panels[2], { autoAlpha: 1, y: 0, duration: 0.2 }, 2.0);

  // visual: chaos -> order (system), draw links, result extras
  svg.querySelectorAll('[data-chaos]').forEach((n, i) => {
    const [x, y, r] = n.dataset.chaos.split(',').map(Number);
    gsap.set(n, { x, y, rotation: r, transformOrigin: '50% 50%' });
    tl.to(n, { x: 0, y: 0, rotation: 0, ease: 'power2.inOut', duration: 0.85 }, 0.95 + i * 0.03);
  });
  svg.querySelectorAll('[data-draw]').forEach((n, i) => {
    gsap.set(n, { strokeDasharray: 1, strokeDashoffset: 1 });
    tl.to(n, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.inOut' }, 1.5 + i * 0.08);
  });
  svg.querySelectorAll('[data-late]').forEach((n) => {
    gsap.set(n, { autoAlpha: 0 });
    tl.to(n, { autoAlpha: 1, duration: 0.3 }, 2.05);
  });
  svg.querySelectorAll('[data-fade]').forEach((n) => tl.to(n, { autoAlpha: 0, duration: 0.4 }, 1.7));
  tl.to({}, { duration: 0.0001 }, 3);

  ScrollTrigger.create({
    trigger: el, start: 'top top', end: '+=260%', pin: el.querySelector('.chapter__pin'), scrub: 0.6, animation: tl,
    onUpdate: (self) => {
      const k = Math.min(2, Math.floor(self.progress * 3));
      steps.forEach((s, i) => s.classList.toggle('is-on', i <= k));
      svg.classList.toggle('is-live', self.progress > 0.66);
    },
  });
  steps[0].classList.add('is-on');
}

function sceneMotion(el) {
  const svg = el.querySelector('.v');
  const copy = el.querySelectorAll('.scene__copy > *');
  gsap.set(copy, { autoAlpha: 0, y: 28 });
  svg.querySelectorAll('[data-in]').forEach((n) => gsap.set(n, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }));
  svg.querySelectorAll('[data-draw]').forEach((n) => gsap.set(n, { strokeDasharray: 1, strokeDashoffset: 1 }));

  ScrollTrigger.create({
    trigger: el, start: 'top 68%', once: true,
    onEnter: () => {
      gsap.to(copy, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out' });
      gsap.to(svg.querySelectorAll('[data-in]'), { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.6)', delay: 0.1 });
      gsap.to(svg.querySelectorAll('[data-draw]'), { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.inOut', delay: 0.3 });
      svg.classList.add('is-live');
    },
  });
  // gentle parallax + the wheel turns with scroll
  gsap.fromTo(el.querySelector('.scene__vis'), { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  const spin = svg.querySelector('[data-spin]');
  if (spin) gsap.to(spin, { rotation: 360, svgOrigin: '240 170', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
}
