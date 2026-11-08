// i18n audit: every data-i18n key exists in EN + AR, EN/AR key sets match, every content item has AR text.
import { readFileSync, readdirSync } from 'node:fs';
globalThis.window = {}; globalThis.localStorage = { getItem() {} };
const { STR } = await import('../src/i18n.js');
const C = await import('../src/content.js');
const src = ['index.html', 'src/partials/nav.html', 'src/partials/footer.html', 'src/story.js', 'src/sections.js', 'src/network.js']
  .map((f) => readFileSync(new URL('../' + f, import.meta.url), 'utf8')).join('\n');
const used = new Set([...src.matchAll(/data-i18n(?:-aria)?="([\w.]+)"/g)].map((m) => m[1]));
[...src.matchAll(/(?:data-i18n="|t\(')((?:step|think|trust|prod|ind|agents|race|contact|net|flag|craft|nav|foot|hero|lang|theme|skip)[\w.]*)/g)].forEach((m) => used.add(m[1]));
let bad = 0;
const fail = (m) => { console.log('MISSING', m); bad++; };
used.forEach((k) => { if (k.endsWith('.')) return; if (!/^[\w.]+$/.test(k)) return; for (const l of ['en', 'ar']) if (!(k in STR[l]) && !/\.\$|\$\{/.test(k)) fail(`${l}: ${k}`); });
Object.keys(STR.en).forEach((k) => { if (!(k in STR.ar)) fail('ar key ' + k); });
Object.keys(STR.ar).forEach((k) => { if (!(k in STR.en)) fail('en key ' + k); });
const walk = (o, p) => { if (o && typeof o === 'object') { if ('en' in o || 'ar' in o) { if (!o.en || !o.ar) fail(p); } else for (const k in o) walk(o[k], p + '.' + k); } };
for (const [n, v] of Object.entries(C)) if (typeof v === 'object') walk(v, n);
console.log(bad ? bad + ' problems' : 'i18n OK: ' + Object.keys(STR.en).length + ' UI keys, content fully bilingual');
