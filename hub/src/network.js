// Living capability network: 4 pillars, industries orbiting, projects on an inner ring.
// Canvas draws links + pulses; DOM buttons are the nodes (crisp text, a11y, tap targets).
import { PILLARS, PROJECTS, INDUSTRIES, pick, t, statusLabel } from './i18n.js';

const TAU = Math.PI * 2;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initNetwork(root) {
  const canvas = root.querySelector('.net__canvas');
  const layer = root.querySelector('.net__nodes');
  const read = root.querySelector('.net__read');
  const ctx = canvas.getContext('2d');

  // ---- graph ----
  const nodes = [];
  const byKey = new Map();
  const add = (type, d, extra = {}) => {
    const n = { type, id: d.id, d, key: type + ':' + d.id, x: 0, y: 0, ...extra };
    nodes.push(n); byKey.set(n.key, n); return n;
  };
  PILLARS.forEach((p, i) => add('pil', p, { slot: i }));
  PROJECTS.forEach((p, i) => add('proj', p, { slot: i }));
  INDUSTRIES.forEach((p, i) => add('ind', p, { slot: i }));

  const edges = []; // [a, b, pillarColorKey]
  const E = (a, b, c) => edges.push({ a: byKey.get(a), b: byKey.get(b), c });
  INDUSTRIES.forEach((i) => {
    i.pillars.forEach((p) => E('ind:' + i.id, 'pil:' + p, p));
    i.projects.forEach((p) => E('ind:' + i.id, 'proj:' + p, PROJECTS.find((x) => x.id === p).pillars[0]));
  });
  PROJECTS.forEach((p) => p.pillars.forEach((pl) => E('proj:' + p.id, 'pil:' + pl, pl)));

  const neighbours = new Map(nodes.map((n) => [n, new Set()]));
  edges.forEach((e) => { neighbours.get(e.a).add(e.b); neighbours.get(e.b).add(e.a); });

  // ---- DOM nodes ----
  nodes.forEach((n) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'node node--' + n.type;
    el.dataset.key = n.key;
    el.innerHTML = '<span class="hit"></span><span class="dot"></span><span class="lbl"></span>';
    if (n.type === 'pil') el.style.setProperty('--pc', n.d.color);
    layer.appendChild(el);
    n.el = el; n.lbl = el.querySelector('.lbl');
  });
  const setLabels = () => nodes.forEach((n) => {
    const name = pick(n.d.name);
    n.lbl.textContent = name;
    n.el.setAttribute('aria-label', name + (n.type === 'proj' ? ', ' + statusLabel(n.d.status) : ''));
  });

  // ---- state ----
  let W = 0, H = 0, dpr = 1, rtl = false;
  let angle = 0, speed = 1, pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let hover = null, pinned = null, active = null, activeSet = null;
  let visible = true, raf = 0, last = 0;
  const colors = {};
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    ['eng', 'ai', 'auto', 'biz'].forEach((k) => (colors[k] = cs.getPropertyValue('--c-' + k).trim()));
    colors.text = cs.getPropertyValue('--text').trim();
    colors.muted = cs.getPropertyValue('--muted').trim();
    colors.line = cs.getPropertyValue('--line').trim();
  };

  function size() {
    const r = root.getBoundingClientRect();
    W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rtl = document.documentElement.dir === 'rtl';
    place(0);
    if (!animating()) draw(0);
  }

  // Orbit layout on an ellipse that fills the stage. Alternating rings stop neighbouring labels colliding.
  function place(time) {
    const cx = W / 2, cy = H / 2 - (W < 700 ? 18 : 0);
    const rx = W * (W < 700 ? 0.40 : 0.42), ry = H * (W < 700 ? 0.38 : 0.40);
    const a0 = angle;
    const mx = (x) => (rtl ? 2 * cx - x : x);
    const px = pointer.x * 10, py = pointer.y * 10;
    const nInd = INDUSTRIES.length, nProj = PROJECTS.length;
    nodes.forEach((n) => {
      let x, y;
      if (n.type === 'pil') {
        const a = Math.PI / 4 + n.slot * (TAU / 4); // diagonals
        const wob = reduce() ? 0 : Math.sin(time / 1700 + n.slot * 1.9) * 0.015;
        x = cx + Math.cos(a + wob) * rx * 0.25; y = cy + Math.sin(a + wob) * ry * 0.25;
        n.depth = 1.0;
      } else if (n.type === 'proj') {
        const a = -a0 * 0.8 + (n.slot / nProj) * TAU;
        const k = 0.46 + (n.slot % 2) * 0.1;
        x = cx + Math.cos(a) * rx * k; y = cy + Math.sin(a) * ry * k; n.depth = 0.6;
      } else {
        const a = a0 + (n.slot / nInd) * TAU;
        const k = n.slot % 2 ? 0.74 : 0.95;
        x = cx + Math.cos(a) * rx * k; y = cy + Math.sin(a) * ry * k; n.depth = k;
      }
      n.x = mx(x) + px * n.depth * 1.4; n.y = y + py * n.depth * 1.4;
      n.el.style.transform = 'translate3d(' + n.x.toFixed(1) + 'px,' + n.y.toFixed(1) + 'px,0)';
    });
  }

  // ---- drawing ----
  const pulses = Array.from({ length: 7 }, (_, i) => ({ e: (i * 11) % edges.length, t: i / 7, s: 0.00018 + (i % 3) * 0.00006 }));
  const ctrl = (e) => {
    const mx = (e.a.x + e.b.x) / 2, my = (e.a.y + e.b.y) / 2;
    const cx = W / 2, cy = H / 2;
    return [mx + (cx - mx) * 0.28, my + (cy - my) * 0.28];
  };
  const bez = (e, [qx, qy], u) => {
    const v = 1 - u;
    return [v * v * e.a.x + 2 * v * u * qx + u * u * e.b.x, v * v * e.a.y + 2 * v * u * qy + u * u * e.b.y];
  };

  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    // faint orbit guides
    ctx.lineWidth = 1; ctx.strokeStyle = colors.line; ctx.globalAlpha = 0.5;
    ctx.setLineDash([2, 7]);
    [0.74, 0.95].forEach((k) => {
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2 - (W < 700 ? 18 : 0), W * (W < 700 ? 0.40 : 0.42) * k, H * (W < 700 ? 0.38 : 0.40) * k, 0, 0, TAU);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // links
    edges.forEach((e) => {
      const on = !!activeSet && activeSet.has(e.a) && activeSet.has(e.b);
      const q = ctrl(e);
      ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.quadraticCurveTo(q[0], q[1], e.b.x, e.b.y);
      if (on) { ctx.strokeStyle = colors[e.c]; ctx.globalAlpha = 0.95; ctx.lineWidth = 1.6; }
      else { ctx.strokeStyle = colors[e.c]; ctx.globalAlpha = activeSet ? 0.04 : 0.16; ctx.lineWidth = 1; }
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // pulses travelling along links
    if (!reduce()) {
      const list = [];
      if (activeSet) edges.forEach((e, i) => { if (activeSet.has(e.a) && activeSet.has(e.b)) list.push(i); });
      pulses.forEach((p, i) => {
        p.t += p.s * dt * (activeSet ? 2.4 : 1);
        if (p.t > 1) { p.t = 0; p.e = activeSet && list.length ? list[(Math.random() * list.length) | 0] : (Math.random() * edges.length) | 0; }
        const e = edges[p.e];
        if (activeSet && !(activeSet.has(e.a) && activeSet.has(e.b)) && list.length) p.e = list[i % list.length];
        const [x, y] = bez(e, ctrl(e), p.t);
        ctx.fillStyle = colors[e.c]; ctx.globalAlpha = activeSet && activeSet.has(e.a) && activeSet.has(e.b) ? 1 : 0.55;
        ctx.beginPath(); ctx.arc(x, y, activeSet ? 2.6 : 1.8, 0, TAU); ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
  }

  const animating = () => !reduce();

  function loop(now) {
    raf = 0;
    const dt = Math.min(now - (last || now), 64); last = now;
    if (!reduce()) {
      const target = activeSet ? 0 : 1; // orbit holds still while something is selected
      speed += (target - speed) * Math.min(dt / 260, 1);
      angle += dt * 0.000042 * speed;
      pointer.x += (pointer.tx - pointer.x) * 0.06; pointer.y += (pointer.ty - pointer.y) * 0.06;
    }
    place(now); draw(dt);
    if (visible && !document.hidden && animating()) raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(loop); } };

  // ---- selection ----
  function setActive(n) {
    active = n;
    activeSet = n ? new Set([n, ...neighbours.get(n)]) : null;
    // an industry also lights the pillars of its projects; a pillar lights nothing else beyond its links
    nodes.forEach((m) => {
      m.el.classList.toggle('is-on', !!activeSet && activeSet.has(m));
      m.el.classList.toggle('is-dim', !!activeSet && !activeSet.has(m));
    });
    renderRead();
    if (!animating()) { place(0); draw(0); } else kick();
  }
  const current = () => pinned || hover;
  const refresh = () => setActive(current());

  function renderRead() {
    read.replaceChildren();
    if (!active) { read.textContent = t('net.hint'); return; }
    const title = document.createElement('strong');
    title.textContent = pick(active.d.name);
    read.appendChild(title);
    if (active.type === 'proj') {
      const c = document.createElement('span'); c.className = 'chip chip--' + active.d.status; c.textContent = statusLabel(active.d.status);
      read.appendChild(c);
    }
    [...neighbours.get(active)].sort((a, b) => a.type.localeCompare(b.type)).forEach((n) => {
      if (n.type === 'ind') return; // list pillars + projects only (keeps the readout short)
      const tag = document.createElement('span');
      tag.className = 'tag tag--' + n.type;
      const i = document.createElement('i'); if (n.type === 'pil') tag.style.setProperty('--pc', n.d.color);
      tag.appendChild(i);
      tag.appendChild(document.createTextNode(pick(n.d.name)));
      if (n.type === 'proj') { const s = document.createElement('small'); s.textContent = statusLabel(n.d.status); tag.appendChild(s); }
      read.appendChild(tag);
    });
  }

  // ---- events ----
  const nodeOf = (el) => byKey.get(el.closest('.node')?.dataset.key);
  layer.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const n = e.target.closest('.node') && nodeOf(e.target);
    if (n) { hover = n; refresh(); }
  });
  layer.addEventListener('pointerout', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('.node')) { hover = null; refresh(); }
  });
  layer.addEventListener('click', (e) => {
    const n = e.target.closest('.node') && nodeOf(e.target);
    if (!n) return;
    pinned = pinned === n ? null : n; hover = null; refresh();
  });
  layer.addEventListener('focusin', (e) => { const n = e.target.closest('.node') && nodeOf(e.target); if (n) { hover = n; refresh(); } });
  layer.addEventListener('focusout', () => { hover = null; refresh(); });
  root.addEventListener('click', (e) => { if (!e.target.closest('.node')) { pinned = null; hover = null; refresh(); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && (pinned || hover)) { pinned = hover = null; refresh(); } });
  root.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduce()) return;
    const r = root.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  root.addEventListener('pointerleave', () => { pointer.tx = pointer.ty = 0; });

  new ResizeObserver(size).observe(root);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe(root);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
  document.addEventListener('langchange', () => { setLabels(); rtl = document.documentElement.dir === 'rtl'; renderRead(); size(); });
  document.addEventListener('themechange', () => { readColors(); if (!animating()) draw(0); });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { kick(); size(); });

  readColors(); setLabels(); renderRead(); size(); kick();
  return { setActive };
}
