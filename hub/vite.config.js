import { defineConfig } from 'vite';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://mohammad-abujalboush.com';

// Shared partials: <!--include:nav--> -> src/partials/nav.html
const partials = () => ({
  name: 'html-partials',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<!--include:([\w-]+)-->/g, (_, n) => readFileSync(resolve(root, 'src/partials', n + '.html'), 'utf8')),
  },
});

// ---- SEO: head tags per language; the Arabic page is emitted at /ar/ so hreflang points at real URLs ----
const COPY = {
  en: {
    title: 'Mohammad Abu Jalboush: engineering, AI agents and automation',
    desc: 'Mohammad Abu Jalboush builds full-stack software (Flutter, .NET), AI agents from scratch in Python, n8n automation and business systems, across every industry.',
    job: 'Full-stack engineer, AI agent builder and automation specialist',
    locale: 'en_US', alt: 'ar_AR', url: ORIGIN + '/',
  },
  ar: {
    title: 'محمد أبو جلبوش: برمجة ووكلاء ذكاء اصطناعي وأتمتة',
    desc: 'محمد أبو جلبوش يبني برمجيات متكاملة (Flutter و.NET) ووكلاء ذكاء اصطناعي من الصفر بلغة Python وأتمتة n8n وأنظمة أعمال، في كل القطاعات.',
    job: 'مهندس برمجيات متكامل وبنّاء وكلاء ذكاء اصطناعي وأخصائي أتمتة',
    locale: 'ar_AR', alt: 'en_US', url: ORIGIN + '/ar/',
  },
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function seoHead(l) {
  const c = COPY[l];
  const person = {
    '@type': 'Person', '@id': ORIGIN + '/#person', name: l === 'ar' ? 'محمد أبو جلبوش' : 'Mohammad Abu Jalboush', alternateName: l === 'ar' ? 'Mohammad Abu Jalboush' : 'محمد أبو جلبوش',
    url: ORIGIN + '/', jobTitle: c.job, image: ORIGIN + '/og.png',
    knowsAbout: ['Flutter', '.NET', 'Python', 'n8n', 'AI agents', 'Business automation', 'Supabase', 'Business development'],
    knowsLanguage: ['ar', 'en'],
  };
  const org = { '@type': 'Organization', '@id': ORIGIN + '/#org', name: person.name, url: ORIGIN + '/', founder: { '@id': ORIGIN + '/#person' }, image: ORIGIN + '/og.png' };
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, org] });
  return `<!--seo:start-->
  <title>${esc(c.title)}</title>
  <meta name="description" content="${esc(c.desc)}">
  <link rel="canonical" href="${c.url}">
  <link rel="alternate" hreflang="en" href="${ORIGIN}/">
  <link rel="alternate" hreflang="ar" href="${ORIGIN}/ar/">
  <link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(person.name)}">
  <meta property="og:title" content="${esc(c.title)}">
  <meta property="og:description" content="${esc(c.desc)}">
  <meta property="og:url" content="${c.url}">
  <meta property="og:image" content="${ORIGIN}/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${c.locale}">
  <meta property="og:locale:alternate" content="${c.alt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(c.title)}">
  <meta name="twitter:description" content="${esc(c.desc)}">
  <meta name="twitter:image" content="${ORIGIN}/og.png">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">${ld}</script>
  <!--seo:end-->`;
}
const SEO_RE = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;

const seo = () => ({
  name: 'hub-seo',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replace('<!--seo-->', seoHead('en')) },
  closeBundle() {
    const dist = resolve(root, 'dist');
    let html = readFileSync(resolve(dist, 'index.html'), 'utf8');
    html = html
      .replace(SEO_RE, seoHead('ar'))
      .replace('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl" data-route="ar">')
      .replace('<script>\n', '<script>\n    window.__DEFAULT_LANG = \'ar\';\n');
    mkdirSync(resolve(dist, 'ar'), { recursive: true });
    writeFileSync(resolve(dist, 'ar/index.html'), html);
  },
});

const input = Object.fromEntries(
  readdirSync(root).filter((f) => f.endsWith('.html')).map((f) => [f.slice(0, -5), resolve(root, f)])
);

export default defineConfig({
  plugins: [partials(), seo()],
  build: { rollupOptions: { input }, target: 'es2020' },
});
