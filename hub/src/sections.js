// Stage 3 sections: product strip (+ expanding mini-scenes), agents marquee, industry dial,
// trust counters (computed from content), racing teaser, contact (-> Supabase contact_messages).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PILLARS, PROJECTS, INDUSTRIES, DEMOS, AGENTS, PIPELINES, STACKS, STRIP, PS, FS, DID, SITE, STATUS } from './content.js';
import { productVisual, racingVisual } from './visuals.js';
import { pick, t, getLang, statusLabel } from './i18n.js';

const pad = (n) => String(n).padStart(2, '0');
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isRtl = () => document.documentElement.dir === 'rtl';
const ptxt = (id, k) => { const v = PS[id]?.[k] ?? FS[id]?.[k]; return v ? pick(v) : ''; };
const chipHtml = (s) => `<span class="chip chip--${s}" data-status="${s}">${statusLabel(s)}</span>`;
const ARROW = '<svg class="arr" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ================= markup ================= */
export function renderSections() {
  // ---- product strip ----
  document.getElementById('products').innerHTML = `
  <section class="strip" aria-labelledby="prod-h">
    <header class="sec-head sec-head--tight"><span class="mono" data-i18n="prod.kicker"></span><h2 id="prod-h" data-i18n="prod.title"></h2></header>
    <div class="strip__view"><div class="strip__track">
      ${STRIP.map((p, i) => {
        const pl = PILLARS.find((x) => x.id === p.pillar);
        return `<button type="button" class="pcard" data-id="${p.id}" style="--c:${pl.color}" aria-haspopup="dialog">
          <span class="pcard__n mono">${pad(i + 1)} / ${pad(STRIP.length)}</span>
          <span class="pcard__vis" aria-hidden="true">${productVisual(p.id, '-s')}</span>
          <span class="pcard__txt"><span class="pcard__h" data-c="ps.${p.id}.title"></span><span class="pcard__tag" data-c="ps.${p.id}.tag"></span>${chipHtml(p.status)}</span>
          <span class="pcard__open mono"><span data-i18n="prod.open"></span>${ARROW}</span>
        </button>`;
      }).join('')}
    </div></div>
  </section>
  <div class="ov" id="ov" role="dialog" aria-modal="true" aria-labelledby="ov-h" hidden>
    <button type="button" class="ov__x" id="ov-x" data-i18n-aria="prod.close"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
    <div class="ov__in"><div class="ov__vis" id="ov-vis"></div><div class="ov__copy" id="ov-copy"></div></div>
  </div>`;

  // ---- agents marquee ----
  document.getElementById('agents').innerHTML = `
  <section class="agents" aria-labelledby="ag-h">
    <header class="sec-head sec-head--tight"><span class="mono" data-i18n="agents.kicker"></span><h2 id="ag-h" data-i18n="agents.title"></h2></header>
    <div class="mq" id="mq-built" aria-label="" ></div><div class="mq mq--rev" id="mq-road"></div>
  </section>`;
  drawAgents();

  // ---- industries dial ----
  document.getElementById('industries').innerHTML = `
  <section class="ind" aria-labelledby="ind-h">
    <header class="sec-head sec-head--tight"><span class="mono" data-i18n="ind.kicker"></span><h2 id="ind-h" data-i18n="ind.title"></h2></header>
    <div class="ind__grid">
      <div class="dial" id="dial" role="group">${INDUSTRIES.map((x, i) => `<button type="button" class="dial__i" data-i="${i}"><span data-c="ind.${x.id}"></span></button>`).join('')}</div>
      <div class="ind__detail" aria-live="polite">
        <div class="ind__top"><span class="mono" id="ind-n"></span>
          <span class="ind__nav"><button type="button" id="ind-prev" class="tool" data-i18n-aria="ind.prev"><svg class="arr arr--back" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><button type="button" id="ind-next" class="tool" data-i18n-aria="ind.next">${ARROW}</button></span></div>
        <h3 class="ind__title" id="ind-title"></h3>
        <p class="ind__did" id="ind-did"></p>
        <div class="ind__items" id="ind-items"></div>
      </div>
    </div>
  </section>`;

  // ---- trust (counts computed from content.js) ----
  const stats = [
    [PROJECTS.length + DEMOS.length, 'trust.projects'],
    [INDUSTRIES.length, 'trust.industries'],
    [STACKS.length, 'trust.stacks'],
    [AGENTS.length, 'trust.agents'],
  ];
  document.getElementById('trust').innerHTML = `
  <section class="trust" aria-labelledby="tr-h">
    <h2 id="tr-h" class="sr-only" data-i18n="trust.title"></h2>
    <div class="trust__row">${stats.map(([n, k]) => `<div class="stat"><b data-n="${n}">${n}</b><span data-i18n="${k}"></span></div>`).join('')}</div>
    <p class="trust__stacks mono">${STACKS.join(' · ')}</p>
    <p class="trust__note" data-i18n="trust.note"></p>
  </section>`;

  // ---- racing teaser ----
  document.getElementById('racing').innerHTML = `
  <section class="race" aria-labelledby="race-h">
    <div class="race__copy"><span class="mono" data-i18n="race.kicker"></span><h2 id="race-h" data-i18n="race.title"></h2><p class="race__sub"><span data-i18n="race.sub"></span> ${chipHtml('roadmap')}</p></div>
    <div class="race__vis" aria-hidden="true">${racingVisual()}</div>
  </section>`;

  // ---- contact ----
  document.getElementById('contact').innerHTML = `
  <section class="contact" aria-labelledby="ct-h">
    <div class="contact__copy">
      <span class="mono" data-i18n="contact.kicker"></span>
      <h2 id="ct-h" data-i18n="contact.title"></h2>
      <p class="contact__sub" data-i18n="contact.sub"></p>
      <div class="contact__btns">
        <a class="btn" id="ct-wa" href="#" target="_blank" rel="noopener"><span data-i18n="contact.wa"></span>${ARROW}</a>
        <a class="btn btn--ghost" id="ct-mail" href="mailto:${SITE.email}"><span data-i18n="contact.mail"></span></a>
      </div>
    </div>
    <form class="cform" id="cform" novalidate>
      <label for="cf-n" data-i18n="contact.name"></label><input id="cf-n" name="name" autocomplete="name" maxlength="200" required>
      <label for="cf-r" data-i18n="contact.reach"></label><input id="cf-r" name="reach" autocomplete="email" maxlength="200" dir="auto" required>
      <label for="cf-m" data-i18n="contact.msg"></label><textarea id="cf-m" name="message" rows="5" maxlength="4000" required></textarea>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit" id="cf-b"><span data-i18n="contact.send"></span></button>
      <p class="cform__msg" id="cf-s" role="status"></p>
    </form>
  </section>`;
  refreshContactLinks();
  document.addEventListener('langchange', () => { drawAgents(); refreshContactLinks(); if (ov.open) renderOv(ov.id); showIndustry(ind.i, false); layoutDial(); });
}

/* ================= agents ================= */
function drawAgents() {
  const row = (list, rev) => {
    const one = list.map((a) => `<span class="mq__i"><span>${pick(a.name)}</span>${chipHtml(a.status)}</span>`).join('');
    return `<div class="mq__track" aria-hidden="false">${one}${one}</div>`;
  };
  const built = [...AGENTS, ...PIPELINES.filter((p) => p.status !== 'roadmap')];
  const road = PIPELINES.filter((p) => p.status === 'roadmap');
  const b = document.getElementById('mq-built'), r = document.getElementById('mq-road');
  b.innerHTML = row(built); r.innerHTML = row([...road, ...road, ...road]);
  b.setAttribute('aria-label', t('agents.built')); r.setAttribute('aria-label', t('agents.road'));
}

/* ================= overlay (product mini-scene) ================= */
const ov = { open: false, id: null, from: null, opener: null };
function renderOv(id) {
  const p = STRIP.find((x) => x.id === id), pl = PILLARS.find((x) => x.id === p.pillar);
  const el = document.getElementById('ov'); el.style.setProperty('--c', pl.color);
  document.getElementById('ov-vis').innerHTML = productVisual(id, '-o');
  const facts = ['f0', 'f1', 'f2'].map((k) => ptxt(id, k)).filter(Boolean);
  const note = FS[id]?.note ? `<p class="scene__note">${pick(FS[id].note)}</p>` : '';
  const mail = p.mail ? `<a class="btn" href="mailto:${SITE.email}?subject=${encodeURIComponent(ptxt(id, 'mailSubject'))}&body=${encodeURIComponent(ptxt(id, 'mailBody'))}"><span>${ptxt(id, 'mailCta')}</span>${ARROW}</a>` : '';
  const cta = p.cta ? `<a class="btn${p.mail ? ' btn--ghost' : ''}" href="${p.cta.href}" target="_blank" rel="noopener"><span>${ptxt(id, 'cta')}</span>${ARROW}</a>` : '';
  document.getElementById('ov-copy').innerHTML = `
    <div class="scene__meta"><span class="mono">${pad(STRIP.indexOf(p) + 1)} / ${pad(STRIP.length)}</span>${chipHtml(p.status)}</div>
    <h3 id="ov-h" class="ov__h">${ptxt(id, 'title')}</h3>
    <p class="scene__body">${ptxt(id, 'body')}</p>
    <p class="facts mono">${facts.map((f) => `<span>${f}</span>`).join('')}</p>${note}
    <div class="contact__btns">${mail}${cta}</div>`;
  ov.id = id;
}
function openOv(card, lenis) {
  const el = document.getElementById('ov');
  ov.opener = card; ov.open = true;
  renderOv(card.dataset.id);
  el.hidden = false; lenis?.stop(); document.documentElement.style.overflow = 'hidden';
  const r = card.getBoundingClientRect();
  ov.from = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 22px)`;
  if (reduce()) { el.style.clipPath = 'none'; } else {
    gsap.fromTo(el, { clipPath: ov.from }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.75, ease: 'power4.inOut' });
    gsap.from(el.querySelectorAll('.ov__vis, .ov__copy > *'), { autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.07, delay: 0.35, ease: 'power3.out' });
  }
  document.getElementById('ov-x').focus();
}
function closeOv(lenis) {
  if (!ov.open) return;
  const el = document.getElementById('ov');
  const done = () => { el.hidden = true; el.style.clipPath = ''; ov.open = false; lenis?.start(); document.documentElement.style.overflow = ''; ov.opener?.focus(); };
  if (reduce()) return done();
  const r = ov.opener.getBoundingClientRect();
  const to = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 22px)`;
  gsap.to(el, { clipPath: to, duration: 0.55, ease: 'power3.inOut', onComplete: done });
}

/* ================= industries dial ================= */
const ind = { i: 0, pos: 0 };
const CH = '!<>-_/[]{}=+*^?#';
function morph(el, text) {
  el.setAttribute('aria-label', text);
  if (reduce() || getLang() === 'ar') { el.textContent = text; return; }
  const from = el.textContent, len = Math.max(from.length, text.length);
  const q = Array.from({ length: len }, () => { const s = (Math.random() * 10) | 0; return { s, e: s + 8 + ((Math.random() * 10) | 0), c: '' }; });
  let f = 0; cancelAnimationFrame(el._r);
  const tick = () => {
    let out = '', done = 0;
    q.forEach((x, i) => {
      if (f >= x.e) { done++; out += text[i] || ''; }
      else if (f >= x.s) { if (!x.c || Math.random() < 0.3) x.c = CH[(Math.random() * CH.length) | 0]; out += x.c; }
      else out += from[i] || '';
    });
    el.textContent = out;
    if (done < len) { f++; el._r = requestAnimationFrame(tick); }
  };
  tick();
}
function showIndustry(i, animate = true) {
  ind.i = i;
  const x = INDUSTRIES[i];
  document.getElementById('ind-n').textContent = `${pad(i + 1)} / ${pad(INDUSTRIES.length)}`;
  const title = document.getElementById('ind-title');
  animate ? morph(title, pick(x.name)) : (title.textContent = pick(x.name));
  document.getElementById('ind-did').textContent = pick(DID[x.id]);
  const items = [
    ...x.projects.map((id) => PROJECTS.find((p) => p.id === id)),
    ...DEMOS.filter((d) => d.industry === x.id).map((d) => ({ ...d, status: 'built' })),
  ];
  const box = document.getElementById('ind-items');
  box.innerHTML = items.length ? `<span class="mono ind__lbl">${t('ind.items')}</span>` + items.map((p) => `<span class="itag">${pick(p.name)} ${chipHtml(p.status)}</span>`).join('') : '';
  document.querySelectorAll('.dial__i').forEach((b, k) => { b.classList.toggle('is-active', k === i); b.setAttribute('aria-current', k === i ? 'true' : 'false'); b.tabIndex = k === i ? 0 : -1; });
  if (animate && !reduce()) gsap.from('#ind-did, #ind-items', { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
  const dur = animate && !reduce() && matchMedia('(min-width: 900px)').matches ? 0.8 : 0;
  gsap.to(ind, { pos: i, duration: dur, ease: 'power3.out', onUpdate: layoutDial, overwrite: true });
  if (!dur) { ind.pos = i; layoutDial(); }
}
function layoutDial() {
  const dial = document.getElementById('dial');
  if (!dial) return;
  const wide = matchMedia('(min-width: 900px)').matches;
  const items = dial.querySelectorAll('.dial__i');
  if (!wide) { items.forEach((b) => { b.style.transform = ''; b.style.opacity = ''; b.style.visibility = ''; }); const a = dial.querySelector('.is-active'); a && dial.scrollTo({ left: a.offsetLeft - dial.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' }); return; }
  const H = dial.clientHeight, R = H * 0.95, step = 0.17, sign = isRtl() ? -1 : 1;
  items.forEach((b, k) => {
    const d = k - ind.pos, a = d * step, ad = Math.abs(d);
    const x = (R - R * Math.cos(a)) * sign, y = H / 2 + R * Math.sin(a) - b.offsetHeight / 2;
    const s = Math.max(0.55, 1 - ad * 0.1);
    b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
    b.style.opacity = ad > 4.6 ? 0 : Math.max(0.12, 1 - ad * 0.2).toFixed(2);
    b.style.visibility = ad > 4.6 ? 'hidden' : 'visible';
  });
}

/* ================= contact ================= */
function refreshContactLinks() {
  document.getElementById('ct-wa').href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t('contact.wamsg'))}`;
}
async function submitContact(e) {
  e.preventDefault();
  const f = e.target, s = document.getElementById('cf-s'), b = document.getElementById('cf-b');
  s.className = 'cform__msg';
  if (f.website.value) return;
  const name = f.name.value.trim(), reach = f.reach.value.trim(), message = f.message.value.trim();
  if (!name || !reach || !message) { s.classList.add('err'); s.textContent = t('contact.bad'); return; }
  try { if (Date.now() - Number(localStorage.getItem('cm.last') || 0) < 30000) { s.classList.add('err'); s.textContent = t('contact.wait'); return; } } catch {}
  const isMail = reach.includes('@');
  b.disabled = true;
  try {
    const r = await fetch(`${SITE.supabaseUrl}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: { apikey: SITE.supabaseAnon, Authorization: 'Bearer ' + SITE.supabaseAnon, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ name, email: isMail ? reach : null, phone: isMail ? null : reach, message, lang: getLang(), source: 'hub' }),
    });
    if (!r.ok) throw new Error(r.status);
    s.classList.add('ok'); s.textContent = t('contact.ok'); f.reset();
    try { localStorage.setItem('cm.last', String(Date.now())); } catch {}
  } catch { s.classList.add('err'); s.textContent = t('contact.fail'); }
  b.disabled = false;
}

/* ================= motion + events ================= */
export function initSections(lenis) {
  // overlay
  document.getElementById('products').addEventListener('click', (e) => { const c = e.target.closest('.pcard'); if (c) openOv(c, lenis); });
  document.getElementById('ov-x').addEventListener('click', () => closeOv(lenis));
  document.addEventListener('keydown', (e) => {
    if (!ov.open) return;
    if (e.key === 'Escape') closeOv(lenis);
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = [...document.querySelectorAll('#ov a, #ov button')]; if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // dial
  document.getElementById('dial').addEventListener('click', (e) => { const b = e.target.closest('.dial__i'); if (b) showIndustry(+b.dataset.i); });
  const go = (d) => showIndustry((ind.i + d + INDUSTRIES.length) % INDUSTRIES.length);
  document.getElementById('ind-prev').addEventListener('click', () => go(-1));
  document.getElementById('ind-next').addEventListener('click', () => go(1));
  document.getElementById('dial').addEventListener('keydown', (e) => {
    const k = e.key; const dn = k === 'ArrowDown' || k === 'ArrowRight', up = k === 'ArrowUp' || k === 'ArrowLeft';
    if (dn || up) { e.preventDefault(); go(dn ? 1 : -1); document.querySelector('.dial__i.is-active')?.focus(); }
  });
  let drag = null;
  const dial = document.getElementById('dial');
  dial.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && matchMedia('(min-width: 900px)').matches) drag = e.clientY; });
  addEventListener('pointerup', (e) => { if (drag == null) return; const dy = e.clientY - drag; drag = null; if (Math.abs(dy) > 40) go(dy < 0 ? 1 : -1); });
  addEventListener('resize', layoutDial);
  document.querySelectorAll('.dial__i').forEach((b) => b.setAttribute('tabindex', b.dataset.i === '0' ? '0' : '-1'));
  showIndustry(0, false);

  // contact
  document.getElementById('cform').addEventListener('submit', submitContact);

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // product strip: pinned, scrubbed horizontal travel (RTL travels the other way)
    const strip = document.querySelector('.strip'), track = strip.querySelector('.strip__track');
    const dist = () => Math.max(0, track.offsetWidth - innerWidth);
    const tw = gsap.to(track, {
      x: () => (isRtl() ? 1 : -1) * dist(), ease: 'none',
      scrollTrigger: { trigger: strip, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.5, invalidateOnRefresh: true },
    });
    // keyboard: focusing an off-screen card scrolls the pinned strip to it
    track.addEventListener('focusin', (e) => {
      const c = e.target.closest('.pcard'); if (!c) return;
      const st = tw.scrollTrigger, cards = [...track.children], p = cards.indexOf(c) / Math.max(1, cards.length - 1);
      const y = st.start + p * (st.end - st.start);
      lenis ? lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y);
    });
    // headings + blocks rise in
    gsap.utils.toArray('.sec-head, .ind__grid, .trust__row, .race__copy, .contact__copy, .cform, .mq').forEach((el) => {
      gsap.from(el, { autoAlpha: 0, y: 36, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    // counters
    document.querySelectorAll('.stat b').forEach((b) => {
      const n = +b.dataset.n, o = { v: 0 };
      b.textContent = '0';
      ScrollTrigger.create({ trigger: b, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.4, ease: 'power2.out', onUpdate: () => (b.textContent = Math.round(o.v)) }) });
    });
    // racing circuit draws itself
    const trk = document.querySelector('.trk');
    if (trk) { const L = trk.getTotalLength(); gsap.fromTo(trk, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.race', start: 'top 80%', end: 'center 40%', scrub: 0.6 } }); }
  });
  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelector('.strip').classList.add('is-native');
    document.querySelectorAll('.mq').forEach((m) => m.classList.add('is-static'));
  });
}
