// ONE i18n file for UI strings. Work content lives in content.js.
import { PILLARS, PROJECTS, INDUSTRIES, STATUS, CHAPTERS, FS } from './content.js';

export const STR = {
  en: {
    brand: 'Mohammad Abu Jalboush',
    'nav.craft': 'Craft', 'nav.work': 'Work', 'nav.industries': 'Industries', 'nav.contact': 'Contact',
    'lang.other': 'العربية',
    'hero.kicker': 'Software · AI · Automation · Growth',
    'hero.h1': 'I build the systems businesses run on.',
    'hero.sub': 'Full-stack engineering, AI agents written from scratch, and automation that removes the busywork. Across every industry I have worked in.',
    'hero.cta': 'See how it connects',
    'net.label': 'Capability network. Select an industry to see what serves it.',
    'net.hint': 'Hover or tap an industry',
    'net.reset': 'Clear',
    'net.pillars': 'Pillars', 'net.projects': 'Projects',
    'foot.rights': '© Mohammad Abu Jalboush', 'foot.note': 'Amman · Built by hand',
    'theme.toLight': 'Switch to light theme', 'theme.toDark': 'Switch to dark theme',
    'scroll': 'Scroll',
    'craft.kicker': 'How the work gets done', 'craft.title': 'Problem, system, result.',
    'flag.kicker': 'Flagship work', 'flag.title': 'Systems I would show first.',
    'step.problem': 'Problem', 'step.system': 'System', 'step.result': 'Result',
    'flag.n': 'Flagship',
  },
  ar: {
    brand: 'محمد أبو جلبوش',
    'nav.craft': 'الحرفة', 'nav.work': 'الأعمال', 'nav.industries': 'القطاعات', 'nav.contact': 'تواصل',
    'lang.other': 'English',
    'hero.kicker': 'برمجة · ذكاء اصطناعي · أتمتة · نمو',
    'hero.h1': 'أبني الأنظمة التي تعمل عليها الأعمال.',
    'hero.sub': 'هندسة برمجية متكاملة، ووكلاء ذكاء اصطناعي مكتوبون من الصفر، وأتمتة تزيل العمل الروتيني. في كل قطاع اشتغلت فيه.',
    'hero.cta': 'شاهد كيف يترابط كل شيء',
    'net.label': 'شبكة القدرات. اختر قطاعاً لترى ما يخدمه.',
    'net.hint': 'مرّر المؤشر أو المس قطاعاً',
    'net.reset': 'مسح',
    'net.pillars': 'المحاور', 'net.projects': 'المشاريع',
    'foot.rights': '© محمد أبو جلبوش', 'foot.note': 'عمّان · صُنع يدوياً',
    'theme.toLight': 'التبديل إلى المظهر الفاتح', 'theme.toDark': 'التبديل إلى المظهر الداكن',
    'scroll': 'مرّر',
    'craft.kicker': 'كيف يُنجز العمل', 'craft.title': 'المشكلة، النظام، النتيجة.',
    'flag.kicker': 'أعمال رئيسية', 'flag.title': 'أنظمة أبدأ بعرضها.',
    'step.problem': 'المشكلة', 'step.system': 'النظام', 'step.result': 'النتيجة',
    'flag.n': 'عمل رئيسي',
  },
};

const KEY = 'lang';
const detect = () => {
  try { const s = localStorage.getItem(KEY); if (s === 'ar' || s === 'en') return s; } catch {}
  return (navigator.language || 'en').toLowerCase().startsWith('ar') ? 'ar' : 'en';
};

let lang = detect();
export const getLang = () => lang;
export const t = (k) => STR[lang][k] ?? STR.en[k] ?? k;
export const pick = (o) => o[lang] ?? o.en;
export const statusLabel = (s) => pick(STATUS[s]);

// data-c="pillar.eng.name" | "chapters.eng.problem" | "fs.omninode.title"
function resolve(path) {
  const [a, id, k] = path.split(".");
  if (a === "pillar") return PILLARS.find((p) => p.id === id)?.name;
  if (a === "chapters") return CHAPTERS[id]?.[k];
  if (a === "fs") return FS[id]?.[k];
}

export function applyLang(l = lang, persist = false) {
  lang = l;
  if (persist) { try { localStorage.setItem(KEY, l); } catch {} }
  const d = document.documentElement;
  d.lang = l; d.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-c]').forEach((el) => { const v = resolve(el.dataset.c); if (v) el.textContent = pick(v); });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
}

export function toggleLang() {
  const next = lang === 'en' ? 'ar' : 'en';
  const run = () => applyLang(next, true);
  document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches
    ? document.startViewTransition(run) : run();
}

export { PILLARS, PROJECTS, INDUSTRIES };
