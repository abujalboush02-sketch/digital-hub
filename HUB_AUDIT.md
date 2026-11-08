# HUB_AUDIT — mohammad-abujalboush.com digital hub

Audited: 2026-11-08, read-only, static analysis of the repo (no live site, no browser, no console run). Git: 4 commits, branch `master`. Everything below is from code unless marked **[inferred]**.

---

## 1. STACK & DEPLOY

**Architecture:** no build system. 71 tracked files, ~17k lines of hand-written static HTML. No `package.json`, no bundler, no framework, no shared partials. Every page copy-pastes its own `<head>`, nav, footer, theme and JS. A single design change means editing ~30 files.

| Layer | What |
|---|---|
| CSS | Tailwind **Play CDN** (`cdn.tailwindcss.com`, unpinned) on every page except `omni-node/` (hand-written `assets/site.css`) and `fadfada/` (Tailwind CDN + custom). Play CDN is not meant for production (≈300 KB JS, runtime JIT, console warning). |
| Icons | Font Awesome 6.4.0 (cdnjs) on hub/portfolio/marketplace pages; inline SVG on OmniNode; emoji as icons on Alpha/SafiCash/FADFADA. |
| Fonts | Google Fonts. See §3. |
| JS libs | `@supabase/supabase-js@2` (jsdelivr, floating major), AOS 2.3.1 (unpkg), ApexCharts (jsdelivr, **unpinned**), Chart.js (admin, unpinned), Gumroad overlay `gumroad.js`. |
| Backend | **Supabase** project (ref `dvlabpioxtyyzvhzpmyc`) used directly from the browser with the anon key (key is hard-coded in 9 files — normal for anon, but see §5 RLS). **n8n** at `automation.mohammad-abujalboush.com/webhook/...` (called from Admin only). |
| Payments | **Gumroad** (Alpha Founders, E-Book tiers). Marketplace checkout has **no payment processor** (see §5). Admin mentions Lemon Squeezy / Stripe; legal pages mention Gumroad / Lemon Squeezy / Stripe as MoR. OmniNode: manual CliQ / bank / cash invoices inside the app. |
| Hosting | **[inferred] Netlify** — `portfolio/index.html` uses `data-netlify="true"` form. `privacy/` mentions Vercel as a hosting provider. No `netlify.toml`, `vercel.json`, `_redirects`, `CNAME` in repo, so subdomain→folder mapping lives only in the host dashboard. `omni-node/README.txt` says "upload folder to web root of omni.…" (manual upload). |
| Env vars | **None.** No env/config files. All config is hard-coded: Supabase URL + anon key (×9 files), n8n webhook URL (admin), `window.SITE` in `omni-node/assets/site.js` (appUrl, registerPath, loginPath, apiBase, email). |

### Domain → folder mapping
Confirmed = referenced in code. Inferred = folder name + link evidence. **Nothing in the repo proves the actual DNS/hosting mapping.**

| Host | Folder | Status |
|---|---|---|
| `mohammad-abujalboush.com` | `main/` | Hub. Several pages link to the bare domain as "Portfolio" (Marketplace footer, refund, terms, E-Book) while hub's own card says portfolio is `portfolio.` → ambiguity [inferred] |
| `portfolio.mohammad-abujalboush.com` | `portfolio/` | Linked from hub + product footers |
| `market.mohammad-abujalboush.com` | `Marketplace/` | Hub card + legal links |
| `marketplace.mohammad-abujalboush.com` | `Marketplace/`? | Used only by `portfolio/` CTA. **Different from `market.`** — one of them is probably dead. |
| `help.` | `help/` | Support ticket form |
| `feedback.` | `testimonials/` | Hub card; accepts `?product=` |
| `privacy.` `terms.` `refund.` | `privacy/` `terms/` `refund/` | Shared "M. Solutions" legal pages |
| `admin.`? | `Admin Panel/` | **Not linked from anywhere**; hostname unknown |
| `testers.`? / `lab.`? | `testers/` | Not linked from anywhere; hostname unknown |
| `alpha.` | `Alpha-Manager Landing Page/` | Confirmed by og:url + testers link. **Not linked from hub.** |
| `flip.` | `E-Book/` | Confirmed by og:url. Not linked from hub. |
| `safi.` | `Finance Flow Landing Page/` | og:url says `safi.`; **hub links `SafiCash.` (different host!)** |
| `app.safi.` | external app (not in repo) | Signup CTA |
| `shiftshelf.`? | `ShiftShelf Landing Page/` | No og:url; hostname unknown. App at `app.shiftshelf.` |
| `sparklecrm.`? | `Sparkle CRM Landing Page/` | Hostname unknown. App at `app.sparklecrm.` |
| `omni.` | `omni-node/` | Confirmed (canonical, sitemap, README) |
| `omniapp.` | external Flutter web app (hash routing: `/#/register`, `/#/login`) | Not in repo |
| `omniapi.` | external API (`apiBase`) | Not in repo |
| `automation.` | n8n | Not in repo |
| ganzohr domain | `fadfada/` | `ganzohrfadfada.com` (email only); site host unknown |
| — | `Discard/` | Business-plan doc, gitignored, not deployed [inferred] |

### Repo hygiene
- `.gitignore` lists `Discard/index.html`, `fadfada/index.html`, `fadfada/FADFADA_2K_HQ.png`, `omni-node/{index,docs,legal}.html`, `omni-node/fadfada`. The three omni-node pages are ignored **yet were committed** ("omni-node html pages") — the ignore lines are stale/contradictory. `fadfada/index.html` (the actual FADFADA homepage) is **not in git** → no history/backup, anyone cloning gets a site with no index.
- No README at root. `omni-node/README.txt` is the only doc.

---

## 2. FULL SITE MAP

Legend: lang = EN unless stated. "RTL" = real `dir=rtl` switching.

### 2.1 `/` Hub — `main/index.html` (256 lines)
- **Purpose:** personal landing / link hub. **Audience:** prospects, clients, visitors from socials. **Lang:** EN only.
- **Sections:** (1) logo "M." + H1 "Mohammad Abu Jalboush" + typing-animated tagline "Full_Stack_Architect & Workflow_Engineer" + one paragraph ("Bridging the gap between complex business logic and scalable code…") + 4 icon links; (2) 4 cards "Node_01–04"; (3) footer = live UTC clock + "Loc: Amman, JO".
- **CTAs:** WhatsApp `wa.me/962776110639`; Support Hub `help.`; LinkedIn `/in/mohammad-abu-jalboush`; GitHub `mohammad-abujalboush`. Cards → Portfolio ("Access Portal"), Marketplace ("Enter Marketplace"), **SafiCash SaaS ("Launch Application" → `SafiCash.` landing, not app)**, Feedback Hub ("Submit Feedback").
- **Missing from hub:** OmniNode, Alpha, ShiftShelf, Sparkle CRM, The Flip, services, contact form/email, about, pricing. Only 1 of ~8 products appears.
- **SEO:** only `<title>` + viewport. No description, OG, canonical, favicon, sitemap.
- Footer has no legal links; no email visible (WhatsApp only).

### 2.2 `/portfolio` — `portfolio/index.html` (836 lines)
- **Purpose:** capability + case-study showcase. **Audience:** prospective clients. **EN only.**
- **Nav:** Profile / Ecosystems / Automations / Products / Engagement + phone link + "Inquire". Mobile hamburger overlay.
- **Hero:** "Transforming Chaos into Code." — Full Stack Developer & Workflow Architect; "5 years" claim; chips Custom SaaS Architecture / Workflow Automation / Multi-Platform Delivery. CTAs: "View Ecosystems" (#systems), "Direct Technical Intake" (WhatsApp).
- **01 Profile:** bio, education (CS, Applied Science Private University), delivery model quote, stack "Flutter, .NET Core, SQL, Unity", 17 domain chips (CRM, ERP, POS, Marketplace, EV charging, Legal Tech …).
- **02 Engineered Solutions (anonymous case studies, no logos/screenshots/links/metrics):** Village Super-App (Flutter/.NET/PostgreSQL), Enterprise Business Platform (CRM+POS+Inventory, offline-first, Google Drive/Calendar — this is ShiftShelf/ERP-Lite in spirit but not named), Real Estate Ops, Legal Tech, Next-Gen E-Commerce (20+ mini-games), NGO Grants, Student Security, SaaS Contract Engine, Equipment Rental, "Modern POS Architecture", "QR Smart-Order System", Media Aggregation; plus 6 "UI/UX registry" mini-cards (HR, Cinema, Luxury Transport, EdTech, Digital Library, Delivery Network).
- **03 Intelligent Pipelines:** Lead Gen & Outreach, Market Intelligence, Resume Intelligence (all "Operational"); AI Voice Agent, Support AI, WhatsApp Sales, AI Marketing (Roadmap). Unity games row.
- **04 Live Digital Products:** grid loaded from Supabase `portfolio_products` (admin-managed); empty-state "// AWAITING_NEW_RELEASES". CTA "Visit The Marketplace Hub" → `marketplace.` (see mapping issue).
- **05 Engagement:** email, phone, contact form (Netlify Forms, fields: identity / endpoint / strategic brief) → "Transmit Request".
- **Footer:** © only. No legal, no nav back to hub.
- **SEO:** `<title>` only.

### 2.3 `market.` Marketplace — `Marketplace/` (5 pages)
EN only; light/dark toggle; cart in `localStorage`; currency **JOD**.
| Page | Purpose | Notes |
|---|---|---|
| `index.html` | Catalogue; category filter; cart drawer | Supabase `product_categories`, `products(is_active)`. Nav: My Library / Support. Footer: Portfolio (bare domain), Feedback, Support, Library. Placeholder images via `via.placeholder.com`. |
| `details.html?id=` | Product detail + add to cart | `products` by id |
| `checkout.html` | Name + email; payment selector "Credit Card / Stripe" or "CliQ / Manual" | **Inserts `orders` (status `pending`) + `order_items`, then redirects to success. No payment is taken or even initiated.** |
| `success.html?orderId=` | "Transaction_Success … CONFIRMED_SYSTEM_READY" | Claims confirmed without payment |
| `library.html` | "Enter email used during purchase" → lists purchased assets | Queries `order_items → marketplace_products` (table name differs from `products` used everywhere else); matches **email only** (no auth/OTP) and the comment says it also shows `pending` orders "for your current test" |
- Catalogue contents are DB-driven (unknown from code). Admin `products` table suggests SaaS templates, Notion architectures, n8n workflows (per hero copy).

### 2.4 `alpha.` Alpha Wealth — `Alpha-Manager Landing Page/` (5 pages)
EN only. Dark "terminal/fintech" style. **Product positioning differs from your brief** (see §6).
- **`index.html` (1039 lines):** Hero "Institutional Math. Zero Custody." + CTAs "Secure Lifetime Access" (#pricing), "Join Retail Waitlist". Sections: Dilemma (4 pains: manual audits, predatory 2% fees, zero diversity, emotional paralysis) → Risk architecture (ATR stops, bearish divergence, automated purification) → 4 Mandates (Catalyst, Yield Matrix, Property Trust, Sovereign Anchor) → "Mathematical Confluence" (RSI/EMA/MACD/OBV, 70% threshold) → interactive Live Logic Simulator → Telegram bot mock ("EXECUTE WITH 5.2% STOP", Alpaca brokerage, bracket orders) → **Founders Pass staircase pricing from Supabase `tranches`** (live seat counter) → FAQ (4) → footer.
  - Forms: **Founders modal** (name/email/WhatsApp) → Supabase `founders_leads` → reveals Gumroad overlay checkout link from `tranches.gumroad_url`. **Waitlist modal** → Supabase `waitlist`. Retail price promised: **$49/month**.
  - SEO: title, og:title/image/url, twitter card. **No meta description, no canonical.** `og:image` = 2.7 MB PNG.
  - **Footer has only logo + ©. No links to FAQ, Privacy, Terms, or the quant page.**
- `faq.html` (190) "Deep-Dive FAQ", `privacy.html` (103), `terms.html` (112), `quant_visualizer.html` (410, "Institutional Quant Engine – Architecture & Simulation"): **all four orphaned — nothing links to them** (verified by grep).
- Legal-risk copy to review: "We deliver the absolute truth", "One tap to buy" execution via Telegram, "Institutional Signal Integrity", "AAOIFI compliant" — wording is stronger than "advisory only"; no risk/not-financial-advice disclaimer found on the landing page (grep for "not financial/investment advice" returned nothing in index.html).

### 2.5 `omni.` OmniNode — `omni-node/` (3 pages + assets) — **the best page in the hub**
EN + AR, real RTL (`dir` switching, logical CSS props, IBM Plex Sans Arabic), auto-detects language, `?lang=` override, saved in localStorage `omni.lang`.
- **`index.html`:** Nav (How / Use cases / Agencies / Pricing / Docs / FAQ / language / Log in / Start free trial; mobile menu; skip link). Hero "Catch any event. Deliver it anywhere." + "Live now · 14-day free trial, no card needed" + animated flow diagram (Source → OmniNode → CRM/Courier/Accounting/Any REST) + integration marquee (Shopify, WooCommerce, Salla, Zid, Stripe, Tap, PayTabs, Meta Lead Ads, HubSpot, Zoho, Odoo, WhatsApp, Telegram …). How it works (3 steps). **AI message-parsing live demo** (AR/EN tabs). 6 use cases. 9 reliability features. **Agencies** section (multi-client, pooled quota, PDF/white-label reports, fake agency-pool widget). "Made for our region" (JOD billing, Arabic, agency-ready, real support). **Pricing** (JS-rendered from `BIZ`/`AG` arrays, Business/Agency toggle): Free trial 150 tasks; Bronze 14 JOD (2.5k); Silver 35 (10k, popular); Gold 85 (35k); Platinum 179 (100k). Agency: Bronze 70.191 JOD (30k tasks, 5 clients), Silver 176.541 (80k/15), Gold 353.791 (250k/40), Platinum from 637.391 (750k/200); white-label +20.561/mo on lower tiers. Roadmap (7 items). FAQ (9). Final CTA. Footer (Product / Developers / Company).
- **CTAs:** "Start free trial / Start your 14-day free trial / Start an agency trial / Choose plan" → `omniapp.…/#/register`; "Log in" → `/#/login`; "Talk to us" and Platinum → `mailto:moe.abujalboush@gmail.com` (**different Gmail from the one on portfolio/legal pages**). All hrefs are `#` in HTML and filled by JS (fail without JS).
- `docs.html` (326): API reference — quickstart, auth, errors, webhooks, AI parsing, endpoints, credentials, connections, mappings & discovery, templates, events/retries, account/API key, limits, support. Placeholder hosts `api.example.com`, `courier.example.com`.
- `legal.html` (211): combined Terms / Privacy / Refunds; Jordan law, Amman courts; EN prevails over AR. AR translations in `assets/i18n-*-ar.js`.
- SEO: title, description, canonical, OG (title/desc/url/type), twitter `summary`, JSON-LD `SoftwareApplication`, `robots.txt`, `sitemap.xml` (3 URLs), theme-color, SVG favicon. **Missing:** `og:image`, `hreflang`, AR URLs in sitemap.
- Positioning note: copy is "integration hub for businesses and agencies" — "anything to everything" / "multi-tenant middleware" / "MENA e-commerce/delivery" positioning is present but softer; **testers page calls it "OmniRouter"** (naming drift).

### 2.6 `flip.` The Micro-SaaS Flip — `E-Book/` (6 pages)
EN only; dark/light. Info-product, unrelated to the rest of your offer (see §6).
- `index.html` (1591): hero "Stop Building. Start Flipping.", builder-vs-operator, 4-phase model, SOP previews, 30-day guarantee, **3 tiers via Gumroad**: Blueprint $39, Operator $99 (most popular), Dealmaker $249 ("3 spots left" — static claim), testimonials from Supabase `testimonials`, FAQ, footer with legal/support/feedback links.
- `book.html` (1735, "Elite Tier") — the full e-book as a **publicly reachable HTML page** (print-styled). `30_Day_Sprint_Tracker.html`, `Cold_Outreach_Swipes.html`, `Due_Diligence_Checklist.html` — the paid SOPs. **All are static files at guessable URLs with no auth → the paywalled content is free to anyone who guesses `/book.html`.** Not noindexed (no robots tag found).
- Quoted testimonial "I bought a dead Chrome extension for $300 … flipped it for $4,500" is hard-coded in HTML; verify it is real.

### 2.7 `safi.` SafiCash — `Finance Flow Landing Page/`
EN; copy mentions Arabic input. Emerald/dark. Hero "Track, Save, and Automate Your Finances Without the Hassle". Sections: Wall of Love (Supabase `testimonials`), WhatsApp assistant, AI NLP entry ("45 JOD on groceries…"), 4 features (50/30/20 buffer, Trip Mode, collaborative goals, Zakat hub), pricing (Basic free; Premium **$70/yr or $7/mo**), FAQ (4: security AES-256, WhatsApp, cancel, PWA), CTA, footer.
- CTAs: all → `app.safi.…/signup`; "Share Your Experience" → feedback hub `?product=SafiCash`.
- **Dead links:** footer `privacy.html`, `terms.html` (relative; files don't exist in this folder). `<link rel=manifest href="site.webmanifest">` but file is `manifest.json`. `twitter:image` → `social-cover.png` (doesn't exist in folder). Favicon is a 171×175 PNG used for 16/32 sizes.
- Hub card says "SafiCash SaaS … Launch Application" but goes to the landing, not the app. SafiCash is a **B2C** consumer finance app — off-strategy relative to your listed products.

### 2.8 `ShiftShelf Landing Page/`
EN. Cyan/teal. Hero "Your Inventory, Moving At The Speed Of Thought" — "100% Offline Capable". Sections: inventory/barcode, POS, CRM, offline (Isar), WhatsApp alerts, integrations (analytics, Drive, Calendar), pricing (Basic Free; **Full Ecosystem $49/mo** via Supabase sync), CTA, footer (privacy/terms/support/feedback?product=ShiftShelf/portfolio).
- All CTAs → `app.shiftshelf.…/login` (login, not signup).
- **All product visuals are text placeholders: "[ App Dashboard Mockup ]", "[ POS Screen Mockup ]", "[ CRM Screen Mockup ]", "[ Offline Sync Indicator Mockup ]", "[ WhatsApp Notification Mockup ]"** — no real screenshots shipped.
- No meta description, no OG, no canonical; viewport has `user-scalable=no, maximum-scale=1`.
- Doesn't mention e-commerce/social sellers, the "ERP Lite" name, or Google Drive/Calendar *as a selling point for sellers* (only generic). Pricing lacks currency localisation.

### 2.9 `Sparkle CRM Landing Page/`
EN. Cyan. **Auto detailing/car-wash CRM** — not in your product list. Hero "Run Your Detail Shop Like a Well-Oiled Machine"; features (vehicles, bay routing, dispatch, follow-ups), analytics mock (hard-coded revenue numbers $1.2k/$4.5k/$5.2k), pricing Mobile Solo $0 / Shop Empire $89/mo (14-day trial). Copy says "React-powered" (a feature nobody buys). CTAs → `app.sparklecrm.…/login`. Real `dashboard-screenshot.png` used. Same SEO gaps + `user-scalable=no` as ShiftShelf.

### 2.10 Support / legal / feedback utilities (shared "M. Solutions" brand, dark terminal-jargon UI)
- `help/` Support Hub: ticket form (name, email, category: bug / billing / API key / missing asset / general, message) → Supabase `support_tickets`. Tone: "Transmit_Payload", "Earth Hours". 
- `testimonials/` (feedback hub): category → product → name/email/1–5 rating/text → Supabase `testimonials`; reads `?product=`. 
- `testers/` ("The Lab"): beta portal, product cards with live capacity (reads `tester_applications`): SafiCash, The Flip, **OmniRouter**, Alpha (live). Application form → `tester_applications`. Not linked from anywhere.
- `privacy/`, `terms/`, `refund/`: single policy set for "M. Solutions" digital goods (effective April 2026; Gumroad/Lemon Squeezy/Stripe MoR; refund claims require "Financial Evidence … Stripe dashboard screenshots" — written for the E-Book/Flip, not generic). Contact email `mohammadabujalboush02@gmail.com`. Linked from E-Book, ShiftShelf, Sparkle; **not from Alpha (has its own), SafiCash (dead relative links), hub, portfolio**.
- `Admin Panel/` (`index.html` login, `admin.html` "Mission Control", 1662 lines): Supabase auth (email+password) → tabs: telemetry/revenue (Chart.js), ledger, subscriptions (+ "dunning" n8n webhook), products CRUD + storage upload, portfolio products, orders, user access, testimonials, promotions, founders-leads pipeline, support tickets. Admin guard = "has any session"; **no role/admin check client-side** → relies 100% on RLS (see §5).
- `fadfada/` (see §2.11) and `Discard/` (§2.12).

### 2.11 `fadfada/` — "GanzOhr – FADFADA" (not in your list)
Non-clinical emotional-support listening service by **Ahlam Abu Jalboush**, Augsburg, Germany. EN / AR / DE with RTL (`translations` object, `setLanguage`). Hero "Talk. Breathe. Be Heard."; 45-min session **€25**; CTAs → WhatsApp `+49 163 7048416`, `hello@ganzohrfadfada.com`, Instagram `@ganzohrfadfada`. Sections: message from Ahlam, who it's for, how it works, values, insights (3 blog images ×3 languages), disclaimer, imprint address. `privacy-policy.html` (EN+DE, GDPR) and `disclaimer.html`. **Email mismatch:** homepage `hello@ganzohrfadfada.com` vs privacy policy `ganzohr.fadfada@gmail.com`. Own palette (coffee-brown, Poppins/Tajawal/Dancing Script) — intentionally a separate brand. Homepage is gitignored (see §1).

### 2.12 `Discard/` — "Discard App — Business Plan 2026" (not in your list)
Confidential investor-style business plan for a free discount/cashback app in Jordan/MENA (merchant 30% contribution: 15% user discount, 5% cashback, 5% referral, 5% Discard). Co-founder "Sayf". Gitignored → not published. Contains **confidential** content; keep out of the public repo/host.

---

## 3. DESIGN SYSTEM AS-IS

There is **no design system** — there are ~6 visual dialects.

| Family | Pages | Look |
|---|---|---|
| **A. "Terminal/Mainframe" dark** | hub, portfolio, Marketplace, help, testimonials, testers, admin, privacy/terms/refund | bg `#020617`, accent sky `#38bdf8`, Plus Jakarta Sans + JetBrains Mono, glass cards, jargon copy (`Node_01`, `Transmit_Payload`, `Sys_Time`). Marketplace/legal/help have light/dark toggle. |
| **B. OmniNode** | omni-node | bg `#060A13`, accent `#38BDF8` + indigo `#818CF8`, Inter + IBM Plex Sans Arabic + JetBrains Mono, CSS variables, hand-written CSS, clean SaaS tone. Closest in palette to A but a different, cleaner system. |
| **C. Alpha** | alpha | navy + emerald + gold, Montserrat + Plus Jakarta Sans + JetBrains Mono, glass cards, emoji icons. |
| **D. Product-SaaS** | ShiftShelf (cyan/teal `#2C5364`), Sparkle (cyan `#06B6D4`), SafiCash (emerald `#10B981`) | Tailwind-CDN, each re-coloured; near-identical layouts (hero → features → pricing → CTA). Fonts: default Tailwind sans (no font links found for ShiftShelf/Sparkle/SafiCash). |
| **E. The Flip** | E-Book | Montserrat + Inter + JetBrains Mono, own palette, dark/light. |
| **F. FADFADA** | fadfada | warm coffee/cream, Poppins + Tajawal + Dancing Script. Deliberately different. |

- **Colors/tokens:** only OmniNode uses CSS variables/tokens. Others use Tailwind utility colours inline; Tailwind config is redefined per page (`accent:'#38bdf8'` repeated in 6 files).
- **Spacing/components:** no shared components. Glass card, pill badge, gradient button are re-implemented per page. Corner radii vary (`rounded-2xl` → `rounded-[3rem]`).
- **Theme:** light/dark toggle on Marketplace(3 pages), help, privacy/terms/refund, admin, E-Book, SafiCash; **dark-only** hub, portfolio, Alpha, OmniNode, ShiftShelf, Sparkle, FADFADA. No shared persistence key.
- **Animations:** AOS 2.3.1 (portfolio, Alpha); CSS keyframes — typing/caret + fadeInUp (hub), marquee, pulse flow-line, blink (OmniNode, with `prefers-reduced-motion` respected — the only page that does); hover lift/glow on cards everywhere; ApexCharts (Alpha sim), Chart.js (admin). No scroll-driven/3D/video/Lottie/GSAP/Three.js anywhere.
- **Navbars:** hub none; portfolio custom with overlay menu; Marketplace logo+library+support+cart; product pages logo+3 anchors+app link; OmniNode full SaaS nav; legal pages minimal; **no navbar links back to the hub from product pages** (only a tiny "BUILT BY M. ABU JALBOUSH" → portfolio).
- **Footers:** 5 different footers; legal links present on E-Book/ShiftShelf/Sparkle only; Alpha and hub have none.
- **Tone drift:** hacker-jargon ("Earth Hours", "SYSTEM_CRITICAL: TRANSACTION_FAILED") on utility pages → plain SaaS (OmniNode, Sparkle) → institutional/finance (Alpha) → warm/personal (FADFADA) → hype (Flip). Brand name drifts: "M. Solutions", "Engineered Solutions", "M. Abu Jalboush", "Mohammad Abu Jalboush", "Abujalboush", "Mission Control".
- **Naming drift:** SafiCash vs "Finance Flow" folder/Admin; "OmniRouter" vs OmniNode; "Alpha Wealth" vs "Alpha Wealth Manager" vs your "Alpha Advisor"; "Full-Stack Architect" vs "Systems Architect & Full Stack Developer" vs "Workflow Architect".
- **Language/RTL:** only OmniNode and FADFADA do real AR (RTL). Everything else is LTR English although your targets are MENA/Arabic-first (Shami Cosmetics, OmniNode MENA, SafiCash mentions Arabic).

---

## 4. ASSETS

No video, no 3D, no audio, no Lottie. All raster assets are PNG. Total repo images ≈ 38 MB; **~29 MB is FADFADA alone.**

| File | Size | Dim | Used? | Note |
|---|---|---|---|---|
| `fadfada/FADFADA_2K_HQ.png` | **14.8 MB** | 2560×1440 | yes (logo, bg, favicon, og:image) | Gitignored. Used as favicon + 2K background. Must be compressed (target <150 KB webp). |
| `Alpha…/social-cover.png` | **2.7 MB** | 1749² | og:image | Crawlers (WhatsApp/LinkedIn) often skip >600 KB. Should be 1200×630 JPG ~150 KB. |
| `fadfada/fadfada-images/{1,2,3}/*` ×9 | 1.1–1.8 MB each (13.5 MB) | 1254² | yes (by language) | Compress → webp. |
| `E-Book/social-cover.png` | 193 KB | 1275² | og:image | Square, not 1.91:1. |
| `Alpha…/favicon.png` | 57 KB | 298×217 | yes | Non-square favicon. |
| `Alpha…/2-nobg.png`, `Sparkle/2-nobg.png`, `ShiftShelf/2-nobg.png` | 39–61 KB | 500² | yes (logo + 150vw watermark) | Three near-identical logo files. |
| `Sparkle/dashboard-screenshot.png` | 126 KB | — | yes | |
| `Sparkle/1.png` (153 KB), `2.png` (135 KB) | | | `1.png` apple-touch-icon only; `2.png` **unused** | |
| `Sparkle/3-nobg.png` | 48 KB | | **unused** | |
| `ShiftShelf/1.png`, `1-nobg.png` | 50/56 KB | | **unused**; `2.png` apple-touch-icon only | |
| `Finance Flow/dashboard.png` | 92 KB | 1862×932 | yes (hero) | |
| `Finance Flow/FinanceFlow.png` | 77 KB | | og:image | |
| `Finance Flow/FinanceFlow1.png` | 35 KB | 171×175 | favicon + logo | Too small for 192/512 manifest icons it claims to be. |
| `E-Book/mockup.png`, `favicon.png` | 33 / 19 KB | | yes | |
| `omni-node/assets/favicon.svg` | tiny | | yes | Only SVG logo in the hub. |

- **External image deps:** `via.placeholder.com` (Marketplace + Admin fallback — service is unreliable/discontinued-prone), `transparenttextures.com` (Alpha, ShiftShelf).
- **Missing:** hub has **no logo/favicon/OG image**; no real screenshots for ShiftShelf, OmniNode (animated CSS mock only), KMS/QR/POS; no photo of Mohammad anywhere; no client logos.
- Fonts/icons come from third-party CDNs (privacy/GDPR relevant for FADFADA, which serves EU users).

---

## 5. TECHNICAL HEALTH

### 5.1 Broken / dead / suspicious links
1. **SafiCash host mismatch:** hub → `SafiCash.mohammad-abujalboush.com` vs canonical `safi.…` (og:url, testers) — one of them probably doesn't resolve.
2. **Marketplace host mismatch:** hub/legal use `market.`; portfolio uses `marketplace.`.
3. SafiCash footer `privacy.html` / `terms.html` → 404 (relative, files absent). Should be `privacy.`/`terms.` subdomains.
4. SafiCash `site.webmanifest` → 404 (file is `manifest.json`); `twitter:image` `social-cover.png` → 404.
5. Alpha `faq.html`, `privacy.html`, `terms.html`, `quant_visualizer.html` exist but **no inbound links** (orphans).
6. `Admin Panel`, `testers/` have no inbound links (admin should stay unlinked; testers should be linked).
7. Several pages link "Portfolio" to the **bare domain** (`mohammad-abujalboush.com`), which is the hub, not the portfolio.
8. Footers on Marketplace/refund/terms link `refund.` etc. — legal pages cross-link to each other via subdomains: fine if DNS exists [unverified].
9. OmniNode CTAs have `href="#"` until JS runs (no-JS = dead buttons).
10. No 404 page anywhere.

### 5.2 Console / runtime risks (static analysis; not run)
- Tailwind Play CDN warning on ~25 pages.
- `Marketplace/library.html` queries `marketplace_products`, every other file uses `products` → probable relation-not-found error unless a view exists.
- Admin inserts to `finance_ledger`, `user_access`, `promotions` etc.; if RLS/tables missing, errors are `alert()`ed only.
- Alpha: `alert("Loading live pricing…")`, `alert("Issue saving details")` — native alerts for errors.
- ApexCharts + AOS + Supabase loaded on first paint on Alpha (3 render-blocking-ish third parties).

### 5.3 Security / correctness (important)
- **Marketplace sells nothing for real:** checkout creates a `pending` order and shows "CONFIRMED_SYSTEM_READY"; library can show `pending` orders by email. If the DB or edge doesn't enforce payment, anyone can "buy" free by typing an email. Payment buttons "Credit Card / Stripe" do not call Stripe. **Needs a real payment path (Lemon Squeezy/Paddle/Gumroad link-out) or hide the marketplace.**
- Library = email-only lookup: anyone who knows/guesses a customer's email can list their purchases (privacy leak).
- **E-Book paid files are public static pages.**
- Anon key + direct table writes from the browser on `orders`, `order_items`, `founders_leads`, `waitlist`, `support_tickets`, `testimonials`, `tester_applications`: safe only if RLS is strict (insert-only, no select). **Cannot verify from repo.** Admin panel has no role check beyond "has session".
- Admin `webhook` to n8n `/webhook/dunning` has no visible auth header.
- Hard-coded personal data: two different Gmail addresses (`mohammadabujalboush02@`, `moe.abujalboush@`), phone, Amman location.
- Alpha: investment-adjacent claims and execution ("One tap to buy") with no visible risk disclosure → regulatory exposure (Jordan/UAE/US); also uses Alpaca/Stake brand names.
- Static "3 spots left" (E-Book) and "Syncing Live Tier Availability…" are fine but static scarcity claims should be real.

### 5.4 SEO — per page
| Page | title | description | canonical | OG | twitter | schema | favicon | sitemap/robots |
|---|---|---|---|---|---|---|---|---|
| hub `main` | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| portfolio | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| Marketplace ×5 | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| Alpha index | ✔ | ✘ | ✘ | title/image/url | card | ✘ | ✔ | ✘ |
| Alpha faq/privacy/terms/quant | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ |
| OmniNode index | ✔ | ✔ | ✔ | title/desc/url (no image) | summary | **SoftwareApplication** | ✔ SVG | ✔ both |
| OmniNode docs/legal | ✔ | ✔ | ✔ | ✘ | ✘ | ✘ | ✔ | in sitemap |
| E-Book index | ✔ | ✘ | ✘ | title/image/url | card | ✘ | ✔ | ✘ |
| E-Book SOP/book pages | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ (should be noindex) |
| SafiCash | ✔ | ✔ | ✘ | ✔ (image path ok, twitter:image 404) | ✔ | ✘ | ✔ (tiny) | ✘; manifest 404 |
| ShiftShelf | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | apple only | ✘ |
| Sparkle | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | apple only | ✘ |
| FADFADA | ✔ | ✔ | ✘ | ✔ (relative image path!) | ✘ | ✘ | ✔ (14 MB) | ✘; **no hreflang** |
| help/testimonials/testers/admin | ✔ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | **should be noindex** (admin esp.) |
- Only `omni-node/` has `robots.txt` + `sitemap.xml`. Admin Panel has no `noindex`.
- `lang="en"` everywhere, including pages whose content is AR (FADFADA sets `html lang` via JS only).

### 5.5 Performance red flags
- Tailwind Play CDN on every page (+ FA 6.4 full CSS ~100 KB for a handful of icons).
- Images in §4 (FADFADA 14.8 MB hero used as favicon; Alpha OG 2.7 MB).
- Alpha loads AOS + ApexCharts + Supabase + Gumroad.js synchronously in head/body.
- Fonts via `@import` inside `<style>` (hub) = render-blocking waterfall.
- Hub `typing-effect` + clock `setInterval` every second (negligible).
- Portfolio is one 836-line page rendering ~30 cards with AOS delays (long scroll).
- No caching/compression config in repo; no image `width/height` or `loading="lazy"` found in sampled pages.
- Text-heavy E-Book (1.7k lines inline) fine, but publicly crawlable.

### 5.6 Accessibility
- ShiftShelf & Sparkle: `user-scalable=no, maximum-scale=1` → blocks pinch zoom (WCAG fail).
- `prefers-reduced-motion` honoured only in OmniNode; typing/AOS/marquee elsewhere ignore it.
- Emoji/FA icons as only content in icon-links (hub social icons have `title` but no `aria-label`).
- Low-contrast `text-slate-600` on `#020617` for footers/labels (hub, portfolio, Marketplace) and 8–10 px uppercase tracking-[0.5em] text (portfolio footer `text-[8px]`).
- Forms use placeholder-heavy labels (portfolio form uses visible small labels, ok); Admin/Marketplace use `alert()`.
- OmniNode: skip link, `aria-expanded`, labelled menu — the only page with a11y basics.
- Missing `alt` on decorative watermarks is described as "Watermark" (should be `alt=""`).
- Native `alert()` for errors on Alpha, Marketplace.

### 5.7 Mobile
- Tailwind responsive classes used consistently (md: breakpoints) — hub/portfolio/product pages stack fine in markup. OmniNode has explicit 980/820/640/560 px breakpoints.
- Risks: portfolio `rounded-[3rem]` / `p-12` cards on small screens; 150vw watermark images (ShiftShelf/Sparkle/Alpha) cause horizontal-overflow risk; typing effect `white-space:nowrap` at `text-xs` on 320 px (hub) may clip; Alpha pricing staircase JS-rendered cards. **Not verified in a browser.**

### 5.8 Forms — where submissions go
| Form | Destination | Works? |
|---|---|---|
| Portfolio contact | Netlify Forms (`name="contact"`, `data-netlify`) | Works only if hosted on Netlify with form detection; **no confirmation/redirect page, no spam protection (honeypot/reCAPTCHA) found.** Submissions land in Netlify dashboard/email — not in Supabase/n8n. |
| Support ticket (`help`) | Supabase `support_tickets` | Depends on RLS; shown in Admin. No email notification visible. |
| Feedback (`testimonials`) | Supabase `testimonials` | Same; admin moderates. |
| Beta apply (`testers`) | Supabase `tester_applications` | Same; capacity read from same table. |
| Alpha Founders | Supabase `founders_leads` → Gumroad URL from `tranches` | Likely works; no email confirmation. |
| Alpha waitlist | Supabase `waitlist` | Likely works. |
| Marketplace checkout | Supabase `orders`/`order_items` | "Works" but no payment (above). |
| OmniNode | none (CTAs go to app; "Talk to us" = mailto) | OK |
| FADFADA | none (WhatsApp / mailto / Instagram) | OK |
| ShiftShelf/Sparkle/SafiCash | none (login/signup at external app) | Depends on external app |
- No analytics tag found on any page (grep for gtag/GA/plausible/clarity only hit page copy). **You can't currently measure visitors, conversion, or CTA clicks.**
- n8n is only wired in Admin, not to any visitor-facing form.

---

## 6. PRODUCT COVERAGE

| Product / topic | Page? | Currency | Gaps |
|---|---|---|---|
| **OmniNode** | ✅ `omni.` (EN+AR) + docs + legal | Newest (Oct 2026), fully redesigned, best quality | No og:image; positioning vs "multi-tenant middleware / anything-to-everything / e-commerce & delivery" is only partly there (copy says "any event, any API"); no case study / customer logo / screenshot of real dashboard (animated mock only); no demo booking; no link from hub/portfolio; testers page calls it "OmniRouter"; no comparison vs Zapier/Make/n8n; no delivery/courier vertical landing (Salla/Zid/Foodics only in roadmap); contact email differs from rest of site. |
| **KMS (Kitchen Mgmt + receipt/invoice OCR)** | ❌ none | — | Zero mentions of "KMS", "kitchen management", "OCR" anywhere. |
| **QR Ordering** | ⚠ one card in portfolio ("QR Smart-Order System", 2 lines) + "Hospitality & Food Ordering" chip | stale/anon | No page, no pricing, no demo, no link to KMS/POS. |
| **POS** | ⚠ portfolio card "Modern POS Architecture" (2 lines) + ShiftShelf has a basic POS | anon | No restaurant POS page; no ecosystem bundle (KMS+QR+POS). |
| **Restaurant ecosystem bundle** | ❌ | — | Biggest missing story. |
| **ERP Lite / ShiftShelf** | ⚠ `ShiftShelf Landing Page` exists | Mid; placeholders instead of screenshots | Positioned for generic warehouse/inventory, not "e-commerce/social sellers"; no "ERP Lite" name; Drive/Calendar sync is a small feature tile; no seller-specific use cases (Instagram sellers, COD); login-only CTAs; no description/OG; USD price in a JOD/MENA audience. |
| **Alpha Advisor** | ⚠ `Alpha-Manager` = "Alpha Wealth" | Updated recently (last commits) | Name mismatch (Wealth/Advisor); described as a **signal engine with Telegram one-tap execution via Alpaca**, not "advisory-only"; no disclaimers; orphaned FAQ/legal; no AR (Muslim MENA audience!); $49/mo vs Founders pricing; not on hub. |
| **Delivery system** (store subscription + per-order fee) | ⚠ portfolio chip "Delivery Network" (1 line); OmniNode mentions courier integration | — | No page, no pricing model shown. |
| **Services**: business development / sales | ❌ (only "Business Development" word in portfolio bio) | | No services page, no packages, no rates. |
| n8n automation | ⚠ portfolio "Intelligent Pipelines" (lead gen, market intel, resume) — mostly showcase | | n8n never named on public pages (only admin). No "hire me for n8n" offer. |
| Full-stack dev (Flutter, .NET) | ✅ portfolio | OK | Strong stack list, weak proof (no screenshots/links/metrics). |
| Websites | ❌ | | Not offered anywhere (although the site itself is evidence). |
| Accounting | ❌ | | |
| **Portfolio / case studies** | ⚠ 12 anonymous cards | | **Rodl** (Canada roadside assistance) ❌ absent. **Shami Cosmetics** ❌ absent. Village Super-App is the lead case study (not in your list). No outcomes, timelines, screenshots, client names. |
| **About / personal brand** | ⚠ bio inside portfolio (5 yrs, CS degree, Amman) | | No photo, no story, no "Moe" brand, no founder narrative. **Kart racing / sim-to-track academy: ❌ nothing** (grep "kart" hits only the word in unrelated copy). Jordan location only in hub footer. |

### On the site but NOT in your list
- **SafiCash** (consumer personal-finance SaaS, PWA, WhatsApp, Zakat) — has landing + beta + hub card; highest-placed product on hub.
- **Sparkle CRM** (auto-detailing CRM).
- **The Micro-SaaS Flip** (e-book, $39/$99/$249).
- **Digital Marketplace** (templates/workflows/Notion, JOD).
- **FADFADA / GanzOhr** (family member's listening service, DE).
- **Discard** (cashback app business plan).
- Portfolio showcases: Village Super-App, Real Estate Ops, Legal Tech, NGO Grants, Student Security, SaaS Contract Engine, Equipment Rental, E-commerce gamified (20+ mini-games), HR/attendance, Cinema, Luxury Transport, EdTech, Digital Library, Media Aggregation, Unity games, AI voice/support/WhatsApp/marketing (roadmap).
- Admin "Mission Control", Support Hub, Feedback Hub, Beta Lab.

**Core finding:** the live hub presents a *generic freelance-developer + digital-products shop*, while your actual strategy (B2B middleware, restaurant ecosystem, MENA, Arabic, Shariah finance) is mostly **absent or buried**.

---

## 7. FLOW & UX

### Visitor journeys today
1. **Hub → Portfolio →** long scroll → email/WhatsApp/form. Good enough for a lead, but no product linkage, no pricing, no proof.
2. **Hub → Marketplace →** cart → fake checkout (dead end: no payment).
3. **Hub → SafiCash landing → app signup** — only product reachable from hub.
4. **Hub → Feedback / Support** — two of four hub cards are *utility*, not conversion.
5. **Direct link → OmniNode / Alpha / Flip / ShiftShelf / Sparkle** — unreachable from hub; each product page links back only via small "BUILT BY" → portfolio (which doesn't list them either, except Marketplace).
6. **Portfolio → "Visit The Marketplace Hub"** → `marketplace.` (maybe different host).

### Dead ends / duplicates / weak CTAs
- Hub has **no primary CTA** ("Contact", "Book a call", "See products"). Cards are labelled "Access Portal / Enter Marketplace / Launch Application / Submit Feedback" — jargon, not benefits.
- Hub, portfolio, products have **no cross-product navigation**; a visitor who lands on OmniNode never learns about KMS/QR/POS/ShiftShelf and vice versa.
- Duplicate paths: Support Hub reachable from hub, marketplace, E-Book, SafiCash; Feedback Hub from hub, marketplace, E-Book, SafiCash, ShiftShelf, Sparkle — good for support, noisy for conversion.
- Product CTAs go to **login** (ShiftShelf, Sparkle) rather than signup/trial; SafiCash "Start Premium Trial" = same signup as free; OmniNode "Choose plan" = same register link — no plan pre-selection.
- No lead capture on products (no email-for-updates, no demo request, no WhatsApp button except hub/portfolio/FADFADA).
- Legal links inconsistent; customer can't find terms on Alpha/Hub.
- Two company identities: "M. Solutions / Engineered Solutions" (terminal-jargon) vs "Mohammad Abu Jalboush" vs per-product brands.
- Arabic users have **no Arabic path** except OmniNode & FADFADA.
- Email/phone scattered, two different Gmails.

### Top 10 recommendations (ranked by impact; no implementation done)
1. **Reposition the hub around who you serve, not "systems architect".** One clear promise + 2 audience paths (Restaurants & retail / Agencies & integrations) + primary CTA ("Book a call" / WhatsApp). Surface OmniNode, restaurant ecosystem, ShiftShelf, Alpha as the product grid; move SafiCash/Flip/Sparkle/Marketplace to "More" or retire.
2. **Build the missing restaurant-ecosystem page(s)**: KMS (+OCR), QR Ordering, POS as one bundle with a diagram and per-module pages; add delivery subscription model. This is your largest unmonetised asset with zero web presence.
3. **Create a shared design system + build step** (tokens, one nav, one footer, one language switcher, one theme toggle; static-site generator like Astro/11ty or Vite + partials). Drop Tailwind Play CDN for a compiled build. Cuts 30 duplicated heads to 1.
4. **Make Arabic/RTL first-class everywhere** using the OmniNode i18n approach (it is the only working model in the repo); at minimum hub, restaurant ecosystem, ShiftShelf, Alpha.
5. **Fix commerce trust issues before driving traffic:** replace fake Marketplace checkout with a real MoR (Lemon Squeezy/Paddle/Gumroad), stop serving paid E-Book files publicly, require auth/OTP for library, confirm RLS on every table written from the browser, add a role check to Admin.
6. **Replace anonymous portfolio with 4–6 real case studies**: Rodl, Shami Cosmetics, Village Super-App, ShiftShelf, OmniNode — each with problem/solution/stack/outcome/screenshot. Add services page (n8n automation, Flutter/.NET dev, websites, business development, accounting) with packages and a single inquiry form.
7. **Fix broken plumbing in one pass:** SafiCash host (`safi` vs `SafiCash`), Marketplace host (`market` vs `marketplace`), SafiCash dead privacy/terms/manifest/twitter:image, Alpha orphan pages (link FAQ/legal/quant in footer), noindex admin/testers/SOP pages, 404 page.
8. **Add measurement + SEO baseline:** privacy-friendly analytics (Plausible/Umami) with CTA click events; per-page description/OG/canonical/favicon; sitemap + robots for every host; proper 1200×630 OG images; JSON-LD (Organization, Person, SoftwareApplication, Product). Compress the 14.8 MB/2.7 MB images.
9. **Rework Alpha compliance & positioning:** rename consistently (Alpha Advisor), state "advisory/educational only, not a regulated advisory service", add risk disclosure + sources, soften "absolute truth", Arabic version, link legal pages; clarify that execution is the user's, not one-tap automation.
10. **Build the personal brand layer:** real About page (photo, story, Jordan/Amman, 5 yrs, languages, "Moe" brand), kart-racing / sim-to-track academy teaser (waitlist), consistent single contact email + WhatsApp, and a trust bar (clients, tech, years). Replace the jargon tone with plain benefit-led copy; keep the terminal style only as an accent.

---

## 8. OPEN QUESTIONS

1. **Hosting/DNS:** what is the real host (Netlify? Vercel? cPanel?) and the exact host → folder mapping? In particular: `safi.` vs `SafiCash.`, `market.` vs `marketplace.`, where `Admin Panel`, `testers`, ShiftShelf, Sparkle, FADFADA are served, and whether `mohammad-abujalboush.com` root = `main/` or `portfolio/`.
2. **Supabase RLS:** are policies strict (insert-only for visitors; admin-only read/write; library by auth)? Is there a `marketplace_products` view? Which table does `library.html` actually need?
3. **Marketplace/E-Book:** is the marketplace intentionally live without payment? Which products are actually sold there today? Should E-Book SOP pages be gated?
4. **Which products are active vs retire?** SafiCash, Sparkle CRM, The Flip, Marketplace, Discard, FADFADA — keep on the hub, move under "Labs/More", or sunset?
5. **Alpha:** official product name; is it legally "advisory-only" (no execution)? Target launch date; jurisdiction/licensing; is the Telegram bot live? Real tranche prices?
6. **KMS/QR/POS/Delivery:** do working demos/apps/screenshots/pricing exist? Names and domains? Are they sold as one bundle? Is the delivery pricing public?
7. **ShiftShelf vs "ERP Lite":** same product? Target audience = e-commerce/social sellers? Is the current $49 plan real, and do real screenshots exist?
8. **Rodl & Shami Cosmetics:** permission to name clients, show screenshots, share outcomes/metrics? Live URLs?
9. **Services:** which services do you want to sell publicly (n8n, Flutter/.NET dev, websites, accounting, business development, sales), at what pricing model, and which are paused?
10. **Brand/contact:** preferred name ("Moe"/"Mohammad Abujalboush"/"M. Solutions"), single contact email (two Gmails used) and WhatsApp number; photo allowed?
11. **Languages/markets:** Arabic required on which pages? Is German (FADFADA) in scope for the hub? Primary currency (JOD vs USD)?
12. **Kart racing / sim-to-track academy:** is this a public business to launch (waitlist/page) or just a future idea?
13. **FADFADA & Discard:** should FADFADA stay as a separate brand outside the hub? Why is `fadfada/index.html` gitignored? Should `Discard/` (confidential plan) be removed from the repo?
14. **Claims to verify:** "5 years of experience", E-Book testimonial ($300→$4,500), "Trusted by smart spenders worldwide", Dealmaker "3 spots left", SafiCash "AES-256 / bank-grade", OmniNode "Live now".
15. **Analytics/Tooling:** any analytics currently installed at the host level? Is Netlify Forms really the contact destination (and who receives it)?
