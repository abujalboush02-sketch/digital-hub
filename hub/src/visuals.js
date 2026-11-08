// Product visuals: pure SVG strings, no stock images. Colours come from CSS (--c, --text, --line...).
// Conventions used by the animation layer (src/story.js):
//   data-chaos="dx,dy,rot"  starts displaced, settles into place        (chapters)
//   data-draw               path drawn on (pathLength=1)                 (chapters)
//   data-late               appears in the "result" phase                 (chapters)
//   data-in                 pops in when its scene enters                 (scenes)
//   .pulse                  dot travelling along the path with matching id; visible when the svg is .is-live

const VB = 'viewBox="0 0 480 360" role="img" aria-hidden="true" focusable="false"';
const path = (id, d, extra = '') => `<path id="${id}" class="ln" d="${d}" pathLength="1" data-draw ${extra}/>`;
const pulse = (id, dur = 3, begin = 0) =>
  `<circle class="pulse dt" r="4.5"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`;
const box = (x, y, w, h, label, chaos, cls = 'bx', rx = 10) =>
  `<g data-chaos="${chaos}"><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><text class="tx" x="${x + w / 2}" y="${y + h / 2 + 4.5}" text-anchor="middle">${label}</text></g>`;
const rnd = (seed) => { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); };

/* ================= CHAPTERS ================= */
const chapter = {
  eng: () => `<svg class="v" ${VB}>
    ${path('e1', 'M110 84 V150')}${path('e2', 'M240 84 V150')}${path('e3', 'M370 84 V150')}${path('e4', 'M240 210 V275')}
    ${box(65, 30, 90, 54, 'Flutter', '-70,40,-12', 'bx-a')}${box(195, 30, 90, 54, 'Web', '40,70,9', 'bx-a')}${box(325, 30, 90, 54, 'Admin', '80,20,-8', 'bx-a')}
    ${box(90, 150, 300, 60, '.NET API', '30,-60,-5', 'bx-a')}
    ${box(190, 275, 100, 50, 'Data', '-90,-30,14')}
    ${pulse('e1', 2.6, 0)}${pulse('e2', 2.6, .6)}${pulse('e3', 2.6, 1.2)}${pulse('e4', 2.2, .3)}
  </svg>`,
  ai: () => `<svg class="v" ${VB}>
    ${path('a1', 'M120 180 H190')}${path('a2', 'M290 180 H360')}
    <g data-chaos="-60,-50,-20"><rect class="bx" x="40" y="110" width="80" height="26" rx="6"/></g>
    <g data-chaos="50,60,16"><rect class="bx" x="30" y="150" width="90" height="26" rx="6"/></g>
    <g data-chaos="-40,80,-10"><rect class="bx" x="45" y="190" width="75" height="26" rx="6"/></g>
    <g data-chaos="70,-30,12"><rect class="bx" x="35" y="230" width="85" height="26" rx="6"/></g>
    <g data-chaos="0,-90,0"><circle class="bx-a" cx="240" cy="180" r="52"/><circle class="ring" cx="240" cy="180" r="66" fill="none"/><text class="tx" x="240" y="185" text-anchor="middle">OCR · ML</text></g>
    <g data-late><rect class="bar" x="365" y="130" width="90" height="16" rx="5"/><rect class="bar" x="365" y="160" width="68" height="16" rx="5"/><rect class="bar" x="365" y="190" width="80" height="16" rx="5"/><rect class="bar" x="365" y="220" width="54" height="16" rx="5"/></g>
    ${pulse('a1', 2, 0)}${pulse('a2', 2, 1)}
  </svg>`,
  auto: () => `<svg class="v" ${VB}>
    ${path('w1', 'M120 170 H170')}${path('w2', 'M290 170 H340')}${path('w3', 'M230 140 C230 80 340 80 400 140', 'stroke-dasharray="4 5"')}${path('w4', 'M230 200 V270')}
    ${box(30, 140, 90, 60, 'Webhook', '-50,60,-10', 'bx-a')}${box(170, 140, 120, 60, 'Reshape', '20,-70,8', 'bx-a')}${box(340, 140, 100, 60, 'API', '60,50,-12', 'bx-a')}
    ${box(170, 270, 120, 46, 'Log', '-40,-30,6')}
    <text data-late class="tx sm" x="325" y="78" text-anchor="middle">retry</text>
    ${pulse('w1', 2.4, 0)}${pulse('w2', 2.4, .8)}${pulse('w4', 2.4, 1.6)}
  </svg>`,
  biz: () => {
    const r = rnd(7); let dots = '';
    for (let i = 0; i < 12; i++) {
      const keep = i < 6; const fx = 150 + i * 36, fy = 318;
      dots += keep
        ? `<circle class="dt" cx="${fx}" cy="${fy}" r="7" data-chaos="${Math.round(r() * 220 - 110)},${Math.round(-230 + r() * 80)},0"/>`
        : `<circle class="dt faded" cx="${60 + r() * 360}" cy="${40 + r() * 110}" r="6" data-fade/>`;
    }
    return `<svg class="v" ${VB}>
      ${path('b1', 'M60 170 L200 250 L200 300')}${path('b2', 'M420 170 L280 250 L280 300')}${path('b3', 'M60 170 H420')}
      ${dots}
      <path data-late class="ac" d="M375 330 L430 270 M430 270 H408 M430 270 V292" fill="none" stroke-linecap="round"/>
    </svg>`;
  },
};

/* ================= FLAGSHIP SCENES ================= */
const scene = {
  gamified: () => {
    const cx = 240, cy = 170, R = 112, n = 8; let seg = '';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2, a1 = ((i + 1) / n) * Math.PI * 2;
      const p = (a, r) => `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
      seg += `<path class="${i % 2 ? 'seg-a' : 'seg-b'}" d="M${cx} ${cy} L${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} Z"/>`;
    }
    const tiles = [0, 1, 2, 3].map((i) => `<g data-in><rect class="bx" x="${70 + i * 88}" y="305" width="68" height="40" rx="9"/><circle class="dt" cx="${104 + i * 88}" cy="325" r="${5 + i}"/></g>`).join('');
    return `<svg class="v" ${VB}>
      <g class="spin" data-spin><g>${seg}</g><circle class="hub" cx="${cx}" cy="${cy}" r="22"/></g>
      <path class="ptr" d="M${cx - 12} 40 L${cx + 12} 40 L${cx} 66 Z"/>
      <g data-in class="coin c1"><circle cx="86" cy="96" r="14"/><text x="86" y="101" text-anchor="middle">+</text></g>
      <g data-in class="coin c2"><circle cx="404" cy="236" r="12"/><text x="404" y="241" text-anchor="middle">+</text></g>
      <g data-in class="coin c3"><circle cx="410" cy="88" r="10"/><text x="410" y="92" text-anchor="middle">+</text></g>
      ${tiles}
    </svg>`;
  },
  superapp: () => `<svg class="v" ${VB}>
    <g data-in><circle class="rg" cx="240" cy="180" r="150"/></g><g data-in><circle class="rg" cx="240" cy="180" r="100"/></g><g data-in><circle class="rg" cx="240" cy="180" r="52"/></g>
    <path class="ln soft" d="M60 250 C150 200 190 240 240 180 S380 120 430 150" pathLength="1" data-draw/>
    <path class="ln soft" d="M120 80 C170 140 220 130 240 180 S300 280 360 300" pathLength="1" data-draw/>
    <circle class="you" cx="240" cy="180" r="9"/><circle class="you-ring" cx="240" cy="180" r="9"/>
    <g data-in class="pin" transform="translate(150 118)"><path d="M0 0 C-14 -18 -14 -34 0 -34 C14 -34 14 -18 0 0Z"/><rect x="-6" y="-27" width="12" height="9" rx="2" class="gl"/></g>
    <g data-in class="pin" transform="translate(338 252)"><path d="M0 0 C-14 -18 -14 -34 0 -34 C14 -34 14 -18 0 0Z"/><path class="gl2" d="M2 -30 L-5 -20 H0 L-2 -12 L5 -23 H0Z"/></g>
    <g data-in class="pin" transform="translate(356 120)"><path d="M0 0 C-14 -18 -14 -34 0 -34 C14 -34 14 -18 0 0Z"/><circle cx="0" cy="-22" r="6" class="gl"/></g>
    <g data-in class="pin" transform="translate(122 262)"><path d="M0 0 C-14 -18 -14 -34 0 -34 C14 -34 14 -18 0 0Z"/><path class="gl2" d="M-6 -22 H6 M0 -28 V-16"/></g>
  </svg>`,
  mehsab: () => {
    let bars = '';
    for (let i = 0; i < 11; i++) bars += `<rect class="wv" x="${158 + i * 14}" y="262" width="7" height="${10 + ((i * 7) % 5) * 5}" rx="3.5" style="--d:${(i * 0.11).toFixed(2)}s"/>`;
    return `<svg class="v" ${VB}>
      <rect class="bx" x="140" y="14" width="200" height="332" rx="28"/>
      <g data-in><rect class="bubble" x="158" y="46" width="130" height="34" rx="12"/><rect class="ln-w" x="170" y="60" width="86" height="6" rx="3"/></g>
      <g data-in><rect class="bubble me" x="190" y="92" width="130" height="34" rx="12"/><rect class="ln-w2" x="202" y="106" width="70" height="6" rx="3"/></g>
      <g data-in><rect class="bubble" x="158" y="138" width="150" height="48" rx="12"/><rect class="ln-w" x="170" y="152" width="110" height="6" rx="3"/><rect class="ln-w" x="170" y="166" width="70" height="6" rx="3"/></g>
      <g data-in><rect class="act" x="158" y="198" width="164" height="38" rx="10"/><path class="chk" d="M172 217 L180 225 L194 209"/><rect class="ln-w2" x="204" y="213" width="96" height="8" rx="4"/></g>
      ${bars}
    </svg>`;
  },
  omninode: () => {
    const hex = [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 3 * i - Math.PI / 6; return `${(240 + Math.cos(a) * 54).toFixed(1)},${(180 + Math.sin(a) * 54).toFixed(1)}`; }).join(' ');
    const src = [100, 180, 260].map((y, i) => `<g data-in><circle class="bx-a" cx="60" cy="${y}" r="20"/><text class="tx sm" x="60" y="${y + 4}" text-anchor="middle">${['App', 'API', 'Bot'][i]}</text></g>`).join('');
    const dst = [100, 180, 260].map((y, i) => `<g data-in><rect class="bx" x="368" y="${y - 20}" width="74" height="40" rx="9"/><text class="tx sm" x="405" y="${y + 4}" text-anchor="middle">${['CRM', 'ERP', 'Sheet'][i]}</text></g>`).join('');
    return `<svg class="v" ${VB}>
      ${[100, 180, 260].map((y, i) => `<path id="o${i}" class="ln" d="M80 ${y} C150 ${y} 160 180 186 180"/>`).join('')}
      ${[100, 180, 260].map((y, i) => `<path id="p${i}" class="ln" d="M294 180 C320 180 330 ${y} 368 ${y}"/>`).join('')}
      <path id="rt" class="ln dashed" d="M300 150 C300 110 330 110 335 150"/>
      <polygon class="hexa" points="${hex}"/><text class="tx" x="240" y="185" text-anchor="middle">Omni</text>
      ${src}${dst}
      ${pulse('o0', 2.4, 0)}${pulse('o1', 2.4, .5)}${pulse('o2', 2.4, 1)}${pulse('p0', 2.4, 1.2)}${pulse('p1', 2.4, 1.7)}${pulse('p2', 2.4, .2)}
    </svg>`;
  },
  restaurant: () => `<svg class="v" ${VB}>
    <path id="r1" class="ln" d="M130 110 C190 110 190 110 230 150"/><path id="r2" class="ln" d="M130 250 C190 250 190 250 230 210"/><path id="r3" class="ln" d="M300 180 H350"/>
    <g data-in><rect class="bx-a" x="50" y="70" width="80" height="80" rx="14"/>${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ((r * 3 + c) % 2 ? `<rect class="qr" x="${64 + c * 20}" y="${84 + r * 20}" width="14" height="14" rx="3"/>` : ''))).join('')}</g>
    <g data-in><rect class="bx-a" x="50" y="210" width="80" height="80" rx="14"/><rect class="bx" x="64" y="224" width="52" height="22" rx="4"/><rect class="ln-w" x="64" y="256" width="52" height="5" rx="2.5"/><rect class="ln-w" x="64" y="268" width="34" height="5" rx="2.5"/></g>
    <g data-in><rect class="bx-a" x="350" y="130" width="90" height="100" rx="14"/><rect class="tk" x="362" y="144" width="66" height="20" rx="4"/><rect class="tk" x="362" y="170" width="66" height="20" rx="4"/><rect class="tk" x="362" y="196" width="40" height="20" rx="4"/></g>
    <g data-in><rect class="rcpt" x="215" y="40" width="66" height="96" rx="4"/><rect class="ln-w" x="226" y="54" width="44" height="5" rx="2.5"/><rect class="ln-w" x="226" y="68" width="34" height="5" rx="2.5"/><rect class="ln-w" x="226" y="82" width="44" height="5" rx="2.5"/><rect class="scan" x="213" y="52" width="70" height="3"/></g>
    <path id="r4" class="ln" d="M281 100 C320 100 340 120 350 140"/>
    <text class="tx sm" x="90" y="170" text-anchor="middle">QR</text><text class="tx sm" x="90" y="312" text-anchor="middle">POS</text><text class="tx sm" x="395" y="250" text-anchor="middle">KMS</text><text class="tx sm" x="248" y="156" text-anchor="middle">OCR</text>
    ${pulse('r1', 2.2, 0)}${pulse('r2', 2.2, .8)}${pulse('r3', 2.2, 1.4)}${pulse('r4', 2.2, .4)}
  </svg>`,
  alpha: () => {
    const r = rnd(11); let dots = '', i = 0;
    for (; i < 34; i++) {
      const x = 30 + r() * 150, y = 30 + r() * 300, pass = i % 3 === 0;
      dots += `<circle data-in class="${pass ? 'dt' : 'dt rej'}" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${pass ? 5 : 4}"/>`;
    }
    return `<svg class="v" ${VB}>
      ${dots}
      <line class="gate" x1="230" y1="20" x2="230" y2="340"/>
      <g data-in><rect class="bar2" x="290" y="70" width="150" height="22" rx="6"/><rect class="bar2" x="290" y="110" width="124" height="22" rx="6"/><rect class="bar2" x="290" y="150" width="104" height="22" rx="6"/><rect class="bar2" x="290" y="190" width="78" height="22" rx="6"/><rect class="bar2" x="290" y="230" width="52" height="22" rx="6"/></g>
      <path class="ln" d="M180 180 H224 M236 180 H284" pathLength="1" data-draw/>
    </svg>`;
  },
};

export const chapterVisual = (id) => chapter[id]();
export const sceneVisual = (id) => scene[id]();
