// Generates public/og.png (1200x630) and public/favicon.svg. Run once: node scripts/og.mjs
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0d0c0b"/>
<circle cx="900" cy="300" r="250" fill="none" stroke="#f3ede2" stroke-opacity=".12" stroke-dasharray="3 10"/>
<circle cx="900" cy="300" r="165" fill="none" stroke="#f3ede2" stroke-opacity=".12" stroke-dasharray="3 10"/>
<g stroke-opacity=".5" stroke-width="2" fill="none"><path d="M820 230 L900 300" stroke="#ff6a2b"/><path d="M980 230 L900 300" stroke="#c6f24e"/><path d="M820 370 L900 300" stroke="#3fd6ae"/><path d="M980 370 L900 300" stroke="#f3c34f"/></g>
<circle cx="820" cy="230" r="16" fill="#ff6a2b"/><circle cx="980" cy="230" r="16" fill="#c6f24e"/><circle cx="820" cy="370" r="16" fill="#3fd6ae"/><circle cx="980" cy="370" r="16" fill="#f3c34f"/>
<g fill="#f3ede2" fill-opacity=".7"><circle cx="900" cy="50" r="7"/><circle cx="1130" cy="300" r="7"/><circle cx="900" cy="550" r="7"/><circle cx="670" cy="300" r="7"/><circle cx="1060" cy="140" r="6"/><circle cx="740" cy="140" r="6"/><circle cx="1060" cy="460" r="6"/><circle cx="740" cy="460" r="6"/></g>
<text x="70" y="280" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="76" fill="#f3ede2">Mohammad</text>
<text x="70" y="365" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="76" fill="#f3ede2">Abu Jalboush</text>
<text x="70" y="440" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a69e8f">Engineering · AI agents · Automation · Growth</text>
<rect x="70" y="480" width="120" height="6" rx="3" fill="#ff6a2b"/>
</svg>`;
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
import { writeFileSync } from 'node:fs';
writeFileSync('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="9" fill="#ff6a2b"/></svg>');
