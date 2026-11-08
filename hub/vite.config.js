import { defineConfig } from 'vite';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

// Shared partials: <!--include:nav--> -> src/partials/nav.html
const partials = () => ({
  name: 'html-partials',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) =>
      html.replace(/<!--include:([\w-]+)-->/g, (_, n) =>
        readFileSync(resolve(root, 'src/partials', n + '.html'), 'utf8')),
  },
});

// Every top-level .html file is a page.
const input = Object.fromEntries(
  readdirSync(root).filter((f) => f.endsWith('.html')).map((f) => [f.slice(0, -5), resolve(root, f)])
);

export default defineConfig({
  plugins: [partials()],
  build: { rollupOptions: { input }, target: 'es2020' },
});
