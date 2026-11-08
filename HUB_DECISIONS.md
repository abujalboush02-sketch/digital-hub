# HUB_DECISIONS — locked for the rebuild

Locked by Mohammad, 2026-11-08. Do not re-litigate; build to this. Source audit: HUB_AUDIT.md.

## Hub identity
- The hub is a **personal showcase of Mohammad Abu Jalboush**, not a company or product shop.
- Fields to show (all of them): full-stack development (Flutter, .NET), AI agents built from scratch in Python, n8n automation, business development, sales, websites, accounting.
- Industries: show **all** industries worked in, and for each one **what was actually done**.

## What is shown
| Item | Notes |
|---|---|
| OmniNode | Live, `omni.` |
| Sparkle CRM | CTA = quote request as a **prefilled email** (no trial/login CTA) |
| The Flip e-book | Manual-order flow (see Payments) |
| Alpha | Landing page to be **fully rebuilt**; until then waitlist only |
| ShiftShelf | Product page |
| Restaurant ecosystem | KMS (with receipt/invoice OCR) + QR Ordering + POS, presented as one ecosystem |
| Shami Cosmetics | Case study |

## What is hidden or forbidden
- **Hidden** (site may stay live, never linked from the hub): SafiCash.
- **Never** link, mention or reference: FADFADA, Rodl, Discard.

## Marketplace
- **Coming soon** until further notice. Waitlist form saves to Supabase `waitlist` with `source = 'marketplace'`. Checkout, library, details and success pages stay disabled (redirect to coming soon).
- One host only: `market.`

## Payments
- **CliQ / bank transfer / cash only.** No Stripe, Gumroad, Lemon Squeezy or any online checkout.
- Flow: order form (name, WhatsApp, email, product, method) -> Supabase `orders` with `status = 'pending_payment'` -> instructions screen -> confirmation on WhatsApp -> admin clicks **Confirm payment** (`paid`) or **Reject** (`rejected`) -> manual delivery.
- Payment details live in ONE file: `main/payment-config.js` (public, no secrets).
- Paid files are never served from a public folder; delivered manually after confirmation.

## Languages and layout
- **Arabic + English on every page.** Default = device language, with a visible switcher and persisted choice.
- Full **RTL** support (logical CSS properties, Arabic font, mirrored layouts). OmniNode's i18n approach is the reference implementation.

## Brand and stack
- **No logo.** Fresh new color palette (do not reuse the old sky/terminal look as-is).
- Stack: **Astro + compiled Tailwind + GSAP**, static output, deployed to the VPS behind **nginx** (one server block per subdomain). No Tailwind Play CDN, no Netlify features (e.g. Netlify Forms) in the rebuild.

---
# PHASE 1 — main hub rebuild (locked 2026-11-08)

## Goal
mohammad-abujalboush.com = the showcase of Mohammad Abu Jalboush across every industry. Premium, modern, clearly not a template. The portfolio is merged in: `portfolio.` -> 301 to the hub.

## Stack (supersedes the Astro line above)
- Vanilla HTML/CSS/JS, Vite multi-page ONLY for shared partials (nav/footer), i18n and asset bundling. No React. Lives in `hub/`.
- GSAP + ScrollTrigger + Lenis, View Transitions API, Canvas 2D for the network. Static `dist/` rsynced to the VPS behind nginx.
- AR + EN from one i18n file (`hub/src/i18n.js`) plus one content file (`hub/src/content.js`); default = device language; RTL mirrors; toggle remembered.
- Fresh palette and type, no logo, light + dark themes. Lighthouse 90+ mobile, reduced-motion fallback, full SEO (OG 1200x630, canonical, hreflang, JSON-LD Person + Organization, sitemap, robots).

## Presentation (no card grids, no plain lists)
1. Hero: living capability network. 4 pillars (Engineering, AI Agents, Automation, Business & Growth) with industries orbiting; hover/tap lights links to pillars + projects.
2. Pinned chapters per pillar: problem -> system -> result, SVG/CSS product visuals.
3. Flagship scenes: Gamified Commerce Platform, Hyperlocal Super-App, Mehsab, OmniNode, Restaurant Ecosystem, Alpha.
4. Horizontal pinned product strip; each item expands to a mini-scene.
5. Industries: interactive (ring / text-morph), not tiles.
6. "How I think": solution-design study.
7. Trust strip: counts computed from the content file only. No invented metrics; no "5 years" unless confirmed.
8. Racing teaser: "Moving into racing & racing tech, soon."
9. Contact: WhatsApp + email + form -> Supabase `contact_messages` (anon insert-only RLS), shown in Admin. No Netlify form code.
- Status labels on every item: Live / Launching soon / Built (demo/concept) / Roadmap. Never fake a live status.

## Content rules
- Products: OmniNode (Live), Alpha Advisor (Soon; Shariah-compliant AI investing ADVISOR, advisory only, user executes, no one-tap-trading claims, not-financial-advice line), Restaurant Ecosystem (KMS + OCR engine, QR Ordering, POS), ERP Lite (offline inventory + POS + CRM + tasks, Google Drive/Calendar sync), Delivery Platform (concept: per-store subscription + per-order, no driver fees, Soon), Sparkle CRM (quote = prefilled email), The Flip (flip.), Marketplace (Soon).
- Client work: Shami Cosmetics (Live; Arabic-first storefront + admin on Supabase). Mehsab (Soon; AI accountant built in n8n: chats, reads platform data, advises, acts in the platform, full voice; absorbs the old "Legal Tech" card).
- How I think (no client name): custom CRM + delivery operations system (office/driver/accountant sides, quotes, PDF + e-signature, Python OCR, minimal monthly third-party cost): discovery -> architecture -> cost-aware choices.
- Built demos (professional descriptive names): Hyperlocal Super-App, Gamified Commerce Platform, Property Operations Suite, Grant & Donor Management, Campus Safety Platform, Contract Automation Engine, Rental Fleet & Booking Platform, Media Intelligence Aggregator, Workforce & Attendance Suite, Cinema Booking Experience, Premium Chauffeur Booking, Learning Platform, Digital Library Platform, Interactive Games (Unity). Modern POS / QR Smart-Order fold into Restaurant Ecosystem.
- AI & automation: agents from scratch (Alpha Python engine with compliance engine + trained ML classifier, KMS OCR, OmniNode AI message parsing AR/EN, Mehsab voice accountant). Built pipelines: Lead Gen & Outreach, Market Intelligence, Resume Intelligence. Roadmap: AI Voice Agent, Support AI, WhatsApp Sales, AI Marketing.
- Capability only (NO project, client, country, screenshots, details): "Real-time dispatch & logistics systems" (live tracking, smart driver matching, payment pre-authorization, multi-app customer/driver/admin). Shown as an industry/capability node only.
- Industries: F&B, retail & e-commerce, social sellers, beauty, automotive services, logistics & dispatch, Islamic fintech, accounting & finance, real estate, NGOs, education & campus safety, HR, entertainment/cinema, transport, media, gaming, rentals, agencies & integrations, EV charging.
- NEVER: Rodl (name or any detail), FADFADA, Discard, SafiCash.

## Stages (commit after each)
1 design system + hero network -> 2 chapters + flagship scenes -> 3 strip, industries, how-I-think, trust, racing, contact -> 4 i18n pass, SEO, perf + a11y, deploy.

## Stage 1 design direction
Warm ink / paper neutrals, one ember accent (#ff6a2b dark, #d9460f light), pillar hues orange / acid-lime / mint / gold. Bricolage Grotesque + Instrument Sans (Readex Pro + IBM Plex Sans Arabic for AR). Motion rules are documented at the top of `hub/src/styles/tokens.css`.

## Stage 4 notes
- Two routes: `/` (English, device-language default) and `/ar/` (Arabic default) so hreflang points at real URLs. Stored language choice wins on both.
- Counter label is "AI agents built". Statuses unchanged: Sparkle CRM, ERP Lite, Restaurant Ecosystem = Built (demo).
- `main/payment-config.js` is also shipped at the hub root via `hub/public/`.
- Hostnames confirmed: sparklecrm., flip., market., omni., alpha. ERP Lite has no link yet.
