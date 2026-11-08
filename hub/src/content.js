// ONE content file. Everything the site says about work lives here (EN + AR).
// status: live | soon | built | roadmap   — never mark something live that is not.
// Stage 1 holds the capability graph (pillars, industries, projects). Later stages extend it.

export const PILLARS = [
  { id: 'eng',  color: 'var(--c-eng)',  name: { en: 'Engineering',        ar: 'الهندسة البرمجية' } },
  { id: 'ai',   color: 'var(--c-ai)',   name: { en: 'AI Agents',          ar: 'وكلاء الذكاء الاصطناعي' } },
  { id: 'auto', color: 'var(--c-auto)', name: { en: 'Automation',         ar: 'الأتمتة' } },
  { id: 'biz',  color: 'var(--c-biz)',  name: { en: 'Business & Growth',  ar: 'الأعمال والنمو' } },
];

export const PROJECTS = [
  { id: 'omninode',   status: 'live',  pillars: ['auto', 'ai'],        name: { en: 'OmniNode',                    ar: 'OmniNode' } },
  { id: 'alpha',      status: 'soon',  pillars: ['ai', 'eng'],         name: { en: 'Alpha Advisor',               ar: 'Alpha Advisor' } },
  { id: 'restaurant', status: 'built', pillars: ['eng', 'ai'],         name: { en: 'Restaurant Ecosystem',        ar: 'منظومة المطاعم' } },
  { id: 'erplite',    status: 'built', pillars: ['eng'],               name: { en: 'ERP Lite',                    ar: 'ERP Lite' } },
  { id: 'delivery',   status: 'soon',  pillars: ['eng', 'biz'],        name: { en: 'Delivery Platform',           ar: 'منصة التوصيل' } },
  { id: 'sparkle',    status: 'built', pillars: ['eng'],               name: { en: 'Sparkle CRM',                 ar: 'Sparkle CRM' } },
  { id: 'flip',       status: 'live',  pillars: ['biz'],               name: { en: 'The Flip',                    ar: 'The Flip' } },
  { id: 'shami',      status: 'live',  pillars: ['eng', 'biz'],        name: { en: 'Shami Cosmetics',             ar: 'شامي كوزمتكس' } },
  { id: 'mehsab',     status: 'soon',  pillars: ['ai', 'auto', 'eng'], name: { en: 'Mehsab',                      ar: 'محسب' } },
  { id: 'gamified',   status: 'built', pillars: ['eng'],               name: { en: 'Gamified Commerce Platform',  ar: 'منصة تجارة تفاعلية بالألعاب' } },
  { id: 'superapp',   status: 'built', pillars: ['eng'],               name: { en: 'Hyperlocal Super-App',        ar: 'تطبيق خدمات محلية شامل' } },
];

// Each industry links to the pillars and projects that serve it.
export const INDUSTRIES = [
  { id: 'fnb',        pillars: ['eng', 'ai'],          projects: ['restaurant'],                    name: { en: 'F&B & restaurants',       ar: 'المطاعم والضيافة' } },
  { id: 'retail',     pillars: ['eng', 'biz'],         projects: ['shami', 'gamified', 'erplite'],  name: { en: 'Retail & e-commerce',     ar: 'التجزئة والتجارة الإلكترونية' } },
  { id: 'social',     pillars: ['eng', 'auto'],        projects: ['erplite'],                       name: { en: 'Social sellers',          ar: 'البائعون عبر السوشيال' } },
  { id: 'beauty',     pillars: ['eng', 'biz'],         projects: ['shami'],                         name: { en: 'Beauty',                  ar: 'التجميل' } },
  { id: 'automotive', pillars: ['eng', 'biz'],         projects: ['sparkle'],                       name: { en: 'Automotive services',     ar: 'خدمات السيارات' } },
  { id: 'logistics',  pillars: ['eng', 'auto'],        projects: ['delivery', 'superapp'],          name: { en: 'Logistics & dispatch',    ar: 'اللوجستيات والتوزيع' } },
  { id: 'fintech',    pillars: ['ai', 'eng'],          projects: ['alpha'],                         name: { en: 'Islamic fintech',         ar: 'التقنية المالية الإسلامية' } },
  { id: 'accounting', pillars: ['ai', 'auto'],         projects: ['mehsab'],                        name: { en: 'Accounting & finance',    ar: 'المحاسبة والمالية' } },
  { id: 'realestate', pillars: ['eng', 'biz'],         projects: [],                                name: { en: 'Real estate',             ar: 'العقارات' } },
  { id: 'ngo',        pillars: ['eng', 'biz'],         projects: [],                                name: { en: 'NGOs',                    ar: 'المنظمات غير الربحية' } },
  { id: 'education',  pillars: ['eng'],                projects: [],                                name: { en: 'Education & campus safety', ar: 'التعليم وسلامة الحرم' } },
  { id: 'hr',         pillars: ['eng', 'auto'],        projects: [],                                name: { en: 'HR',                      ar: 'الموارد البشرية' } },
  { id: 'cinema',     pillars: ['eng'],                projects: [],                                name: { en: 'Entertainment & cinema',  ar: 'الترفيه والسينما' } },
  { id: 'transport',  pillars: ['eng', 'biz'],         projects: ['superapp'],                      name: { en: 'Transport',               ar: 'النقل' } },
  { id: 'media',      pillars: ['ai', 'auto'],         projects: [],                                name: { en: 'Media',                   ar: 'الإعلام' } },
  { id: 'gaming',     pillars: ['eng'],                projects: ['gamified'],                      name: { en: 'Gaming',                  ar: 'الألعاب' } },
  { id: 'rentals',    pillars: ['eng'],                projects: [],                                name: { en: 'Rentals',                 ar: 'التأجير' } },
  { id: 'ev',         pillars: ['eng'],                projects: ['superapp'],                      name: { en: 'EV charging',             ar: 'شحن المركبات الكهربائية' } },
  { id: 'agencies',   pillars: ['auto', 'biz'],        projects: ['omninode'],                      name: { en: 'Agencies & integrations', ar: 'الوكالات والتكاملات' } },
];

export const STATUS = {
  live:    { en: 'Live',            ar: 'يعمل' },
  soon:    { en: 'Launching soon',  ar: 'قريباً' },
  built:   { en: 'Built (demo)',    ar: 'مُنجز (نموذج)' },
  roadmap: { en: 'Roadmap',         ar: 'على الخارطة' },
};
