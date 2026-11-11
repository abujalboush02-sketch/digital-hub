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
  { id: 'mehsab',     status: 'soon',  pillars: ['ai', 'auto', 'eng'], name: { en: 'Mehsab',                      ar: 'محساب' } },
  { id: 'gamified',   status: 'built', pillars: ['eng'],               name: { en: 'Gamified Commerce Platform',  ar: 'منصة تجارة تفاعلية بالألعاب' } },
  { id: 'superapp',   status: 'built', pillars: ['eng'],               name: { en: 'Hyperlocal Super-App',        ar: 'تطبيق خدمات محلية شامل' } },
  { id: 'marketplace', status: 'soon', pillars: ['biz'],               name: { en: 'Marketplace',                 ar: 'المتجر' } },
];

// Each industry links to the pillars and projects that serve it.
export const INDUSTRIES = [
  { id: 'fnb',        pillars: ['eng', 'ai'],          projects: ['restaurant', 'delivery'],          name: { en: 'F&B & restaurants',       ar: 'المطاعم والضيافة' } },
  { id: 'retail',     pillars: ['eng', 'biz'],         projects: ['shami', 'gamified', 'erplite', 'delivery'],  name: { en: 'Retail & e-commerce',     ar: 'التجزئة والتجارة الإلكترونية' } },
  { id: 'social',     pillars: ['eng', 'auto'],        projects: ['erplite'],                       name: { en: 'Social sellers',          ar: 'البائعون عبر السوشيال' } },
  { id: 'beauty',     pillars: ['eng', 'biz'],         projects: ['shami'],                         name: { en: 'Beauty',                  ar: 'التجميل' } },
  { id: 'automotive', pillars: ['eng', 'biz'],         projects: ['sparkle'],                       name: { en: 'Automotive services',     ar: 'خدمات السيارات' } },
  { id: 'logistics',  pillars: ['eng', 'auto'],        projects: [],                                name: { en: 'Real-time dispatch & logistics', ar: 'أنظمة الإرسال واللوجستيات الفورية' } },
  { id: 'fintech',    pillars: ['ai', 'eng'],          projects: ['alpha'],                         name: { en: 'Islamic fintech',         ar: 'التقنية المالية الإسلامية' } },
  { id: 'accounting', pillars: ['ai', 'auto'],         projects: ['mehsab'],                        name: { en: 'Accounting & finance',    ar: 'المحاسبة والمالية' } },
  { id: 'realestate', pillars: ['eng', 'biz'],         projects: [],                                name: { en: 'Real estate',             ar: 'العقارات' } },
  { id: 'ngo',        pillars: ['eng', 'biz'],         projects: [],                                name: { en: 'NGOs',                    ar: 'المنظمات غير الربحية' } },
  { id: 'education',  pillars: ['eng'],                projects: [],                                name: { en: 'Education & campus safety', ar: 'التعليم وسلامة الحرم الجامعي' } },
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

// ---- Stage 2: one pinned chapter per pillar (problem -> system -> result) ----
export const CHAPTERS = {
  eng: {
    problem: { en: 'Businesses run on tools that do not talk to each other: a storefront here, a spreadsheet there, a driver app nobody owns.', ar: 'الأعمال تعمل بأدوات لا تتحدث مع بعضها: متجر هنا، وجدول بيانات هناك، وتطبيق سائقين لا يملكه أحد.' },
    system:  { en: 'One architecture instead: Flutter apps for customers, staff and drivers, a .NET core, a single source of truth. Offline-first wherever the field is unreliable.', ar: 'بنية واحدة بدلاً من ذلك: تطبيقات Flutter للعملاء والموظفين والسائقين، ونواة .NET، ومصدر واحد للحقيقة. وتعمل دون اتصال حيث لا يُعتمد على الشبكة.' },
    result:  { en: 'Software that behaves like one product, delivered across mobile, web and admin.', ar: 'برمجيات تتصرف كمنتج واحد، تصل عبر الجوال والويب ولوحة الإدارة.' },
  },
  ai: {
    problem: { en: 'Documents, chats and decisions pile up faster than people can read them.', ar: 'المستندات والمحادثات والقرارات تتراكم أسرع مما يستطيع الناس قراءته.' },
    system:  { en: 'Agents written from scratch in Python: a compliance engine with a trained classifier, an OCR engine for receipts and invoices, AI message parsing in Arabic and English, a voice accountant.', ar: 'وكلاء مكتوبون من الصفر بلغة Python: محرك امتثال مع مصنِّف مدرَّب، ومحرك OCR للإيصالات والفواتير، وتحليل رسائل بالذكاء الاصطناعي بالعربية والإنجليزية، ومحاسب صوتي.' },
    result:  { en: 'Work that used to wait for a person now arrives structured, checked and ready to act on.', ar: 'عمل كان ينتظر شخصاً أصبح يصل منظَّماً ومفحوصاً وجاهزاً للتنفيذ.' },
  },
  auto: {
    problem: { en: 'The same copy and paste happens ten times a day, and nobody notices until it breaks.', ar: 'النسخ واللصق نفسه يتكرر عشر مرات يومياً، ولا ينتبه أحد إلا حين يتعطل.' },
    system:  { en: 'n8n workflows and webhooks that catch, reshape and deliver data, with retries and logs, so every failure is visible and recoverable.', ar: 'مسارات عمل n8n وwebhooks تلتقط البيانات وتعيد تشكيلها وتسلّمها، مع إعادة المحاولة وسجلات، فيكون كل خلل ظاهراً وقابلاً للإصلاح.' },
    result:  { en: 'The busywork leaves the day. What remains are exceptions, and each one comes with a log.', ar: 'يخرج العمل الروتيني من اليوم. وما يبقى هو الاستثناءات، ولكل منها سجل.' },
  },
  biz: {
    problem: { en: 'Good software still fails without a market, a price and a way to sell it.', ar: 'البرمجيات الجيدة تفشل أيضاً دون سوق وسعر وطريقة للبيع.' },
    system:  { en: 'Business development, sales and accounting thinking built into the product: subscription and per-order models, quote flows, lead and outreach pipelines.', ar: 'تطوير الأعمال والمبيعات والمحاسبة مدمجة في المنتج: نماذج اشتراك ولكل طلب، ومسارات عروض أسعار، وخطوط توليد عملاء وتواصل.' },
    result:  { en: 'Products that know how they earn, and sites that bring in the next conversation.', ar: 'منتجات تعرف كيف تربح، ومواقع تجلب المحادثة التالية.' },
  },
};

// ---- Stage 2: flagship scenes ----
// status: live | soon | built. visual keys match src/visuals.js.
export const FLAGSHIPS = [
  { id: 'gamified',   status: 'built', pillar: 'eng',  visual: 'gamified' },
  { id: 'superapp',   status: 'built', pillar: 'eng',  visual: 'superapp' },
  { id: 'mehsab',     status: 'soon',  pillar: 'ai',   visual: 'mehsab' },
  { id: 'omninode',   status: 'live',  pillar: 'auto', visual: 'omninode', cta: { href: 'https://omni.mohammad-abujalboush.com' } },
  { id: 'restaurant', status: 'built', pillar: 'eng',  visual: 'restaurant' },
  { id: 'alpha',      status: 'soon',  pillar: 'ai',   visual: 'alpha', cta: { href: 'https://alpha.mohammad-abujalboush.com' } },
];

export const FS = {
  gamified: {
    title: { en: 'Gamified Commerce Platform', ar: 'منصة تجارة تفاعلية بالألعاب' },
    body: { en: 'An online store where shopping is a game. More than 20 mini-games are wired into the catalogue, the cart and the rewards, with loyalty mechanics and live-stream commerce. What a customer wins by playing, they redeem at checkout.', ar: 'متجر إلكتروني يتحوّل فيه التسوق إلى لعبة. أكثر من 20 لعبة مصغّرة مرتبطة بالكتالوج والسلة والمكافآت، مع آليات ولاء وتجارة عبر البث المباشر. وما يكسبه العميل باللعب يستبدله عند الدفع.' },
    f0: { en: '20+ mini-games', ar: 'أكثر من 20 لعبة مصغّرة' }, f1: { en: 'Loyalty and rewards', ar: 'ولاء ومكافآت' }, f2: { en: 'Storefront + admin', ar: 'متجر ولوحة إدارة' },
  },
  superapp: {
    title: { en: 'Hyperlocal Super-App', ar: 'تطبيق خدمات محلية شامل' },
    body: { en: 'One app for a whole neighbourhood or destination: local shops, services and guides, plus EV charging discovery and reservation, all in one place.', ar: 'تطبيق واحد لحيّ أو وجهة كاملة: متاجر وخدمات ومرشدون محليون، إضافة إلى اكتشاف محطات شحن المركبات الكهربائية وحجزها، كل ذلك في مكان واحد.' },
    f0: { en: 'Local shops and services', ar: 'متاجر وخدمات محلية' }, f1: { en: 'EV charging: find and reserve', ar: 'شحن كهربائي: اكتشاف وحجز' }, f2: { en: 'Flutter', ar: 'Flutter' },
  },
  mehsab: {
    title: { en: 'Mehsab', ar: 'محساب' },
    body: { en: 'An AI accountant platform for a client. I built the platform and the accountant itself, on n8n. It chats with the user, reads all of their platform data, advises, and performs actions inside the platform on their behalf. It also holds a full voice conversation and answers in its own voice. The platform adds a regulations library with structured workflows for preparing cases, organising evidence and retrieving documentation.', ar: 'منصة محاسب ذكي لصالح عميل. بنيتُ المنصة والمحاسب الذكي نفسه على n8n. يتحدث مع المستخدم، ويقرأ جميع بياناته داخل المنصة، ويقدّم النصح، وينفّذ الإجراءات داخل المنصة نيابةً عنه. ويجري أيضاً محادثة صوتية كاملة ويردّ بصوته الخاص. وتضيف المنصة مكتبة أنظمة وتشريعات مع مسارات عمل منظَّمة لإعداد القضايا وتنظيم الأدلة واسترجاع الوثائق.' },
    f0: { en: 'Client project', ar: 'مشروع لعميل' }, f1: { en: 'Chat and full voice', ar: 'نص وصوت كامل' }, f2: { en: 'Acts inside the platform', ar: 'ينفّذ داخل المنصة' },
  },
  omninode: {
    title: { en: 'OmniNode', ar: 'OmniNode' },
    body: { en: 'An integration hub. It catches webhooks from any app, reshapes the data and delivers it to any API, with retries, logs and AI message parsing in Arabic and English. Live today.', ar: 'مركز تكامل. يلتقط webhooks من أي تطبيق، ويعيد تشكيل البيانات ويسلّمها إلى أي API، مع إعادة المحاولة والسجلات وتحليل الرسائل بالذكاء الاصطناعي بالعربية والإنجليزية. يعمل اليوم.' },
    f0: { en: 'Webhooks in, any API out', ar: 'webhooks للداخل، وأي API للخارج' }, f1: { en: 'Retries and logs', ar: 'إعادة محاولة وسجلات' }, f2: { en: 'AI parsing, AR + EN', ar: 'تحليل بالذكاء الاصطناعي، عربي وإنجليزي' },
    cta: { en: 'Open OmniNode', ar: 'افتح OmniNode' },
  },
  restaurant: {
    title: { en: 'Restaurant Ecosystem', ar: 'منظومة المطاعم' },
    body: { en: 'Three systems that pair into one. Customers order from a QR code, the POS runs the counter, and the Kitchen Management System (KMS) runs the line. My OCR engine reads supplier receipts and invoices straight into KMS, so stock and costs update without typing.', ar: 'ثلاثة أنظمة تعمل كمنظومة واحدة. يطلب الزبون عبر رمز QR، ونقطة البيع POS تدير الكاونتر، ونظام إدارة المطبخ KMS يدير الخط. ومحرك OCR الذي بنيته يقرأ إيصالات الموردين وفواتيرهم مباشرة إلى KMS، فيتحدّث المخزون والتكاليف دون كتابة.' },
    f0: { en: 'QR Ordering', ar: 'الطلب عبر QR' }, f1: { en: 'POS', ar: 'نقطة البيع POS' }, f2: { en: 'KMS + OCR engine', ar: 'KMS مع محرك OCR' },
  },
  alpha: {
    title: { en: 'Alpha Advisor', ar: 'Alpha Advisor' },
    body: { en: 'A Shariah-compliant AI investing advisor. A Python engine screens the market with a compliance engine and a trained classifier, then explains what it found. It advises only: you make and place every decision yourself.', ar: 'مستشار استثمار بالذكاء الاصطناعي متوافق مع الشريعة. محرك Python يفحص السوق بمحرك امتثال ومصنِّف مدرَّب، ثم يشرح ما وجده. دوره استشاري فقط: أنت من يتخذ كل قرار وينفّذه.' },
    f0: { en: 'Python engine', ar: 'محرك Python' }, f1: { en: 'Compliance engine + trained classifier', ar: 'محرك امتثال ومصنِّف مدرَّب' }, f2: { en: 'Advisory only', ar: 'استشاري فقط' },
    note: { en: 'Not financial advice.', ar: 'ليس نصيحة مالية.' },
    cta: { en: 'Join the waitlist', ar: 'انضم لقائمة الانتظار' },
  },
};

// =====================  Stage 3  =====================

// Public contact details.
export const SITE = {
  whatsapp: '962776110639',
  email: 'mohammadabujalboush02@gmail.com',
};

// Technologies actually used across the work above. The trust strip counts this list.
export const STACKS = ['Flutter', '.NET', 'Python', 'n8n', 'Supabase', 'Unity'];

// Built demos / concepts (always "built", never presented as live).
export const DEMOS = [
  { id: 'property',  industry: 'realestate', name: { en: 'Property Operations Suite',       ar: 'منظومة إدارة العقارات' } },
  { id: 'grant',     industry: 'ngo',        name: { en: 'Grant & Donor Management',        ar: 'إدارة المنح والمتبرعين' } },
  { id: 'campus',    industry: 'education',  name: { en: 'Campus Safety Platform',          ar: 'منصة سلامة الحرم التعليمي' } },
  { id: 'contract',  industry: 'agencies',   name: { en: 'Contract Automation Engine',      ar: 'محرك أتمتة العقود' } },
  { id: 'rental',    industry: 'rentals',    name: { en: 'Rental Fleet & Booking Platform', ar: 'منصة تأجير الأساطيل والحجز' } },
  { id: 'media',     industry: 'media',      name: { en: 'Media Intelligence Aggregator',   ar: 'مجمّع ذكاء الإعلام' } },
  { id: 'workforce', industry: 'hr',         name: { en: 'Workforce & Attendance Suite',    ar: 'منظومة القوى العاملة والحضور' } },
  { id: 'cinema',    industry: 'cinema',     name: { en: 'Cinema Booking Experience',       ar: 'تجربة حجز السينما' } },
  { id: 'chauffeur', industry: 'transport',  name: { en: 'Premium Chauffeur Booking',       ar: 'حجز سائق خاص فاخر' } },
  { id: 'learning',  industry: 'education',  name: { en: 'Learning Platform',               ar: 'منصة تعلّم' } },
  { id: 'library',   industry: 'education',  name: { en: 'Digital Library Platform',        ar: 'منصة مكتبة رقمية' } },
  { id: 'unity',     industry: 'gaming',     name: { en: 'Interactive Games (Unity)',       ar: 'ألعاب تفاعلية (Unity)' } },
];

// AI agents written from scratch + automation pipelines.
export const AGENTS = [
  { id: 'alpha-engine', status: 'soon',  name: { en: 'Alpha engine: compliance + trained classifier', ar: 'محرك Alpha: امتثال ومصنِّف مدرَّب' } },
  { id: 'kms-ocr',      status: 'built', name: { en: 'KMS OCR: receipts and invoices',                ar: 'OCR لنظام KMS: إيصالات وفواتير' } },
  { id: 'omni-parse',   status: 'live',  name: { en: 'OmniNode AI message parsing (AR/EN)',            ar: 'تحليل رسائل OmniNode بالذكاء الاصطناعي' } },
  { id: 'mehsab-voice', status: 'soon',  name: { en: 'Mehsab voice accountant',                        ar: 'محاسب محساب الصوتي' } },
];
export const PIPELINES = [
  { id: 'leadgen', status: 'built',   name: { en: 'Lead Gen & Outreach',  ar: 'توليد العملاء والتواصل' } },
  { id: 'market',  status: 'built',   name: { en: 'Market Intelligence',  ar: 'ذكاء السوق' } },
  { id: 'resume',  status: 'built',   name: { en: 'Resume Intelligence',  ar: 'ذكاء السير الذاتية' } },
  { id: 'voice',   status: 'roadmap', name: { en: 'AI Voice Agent',       ar: 'وكيل صوتي بالذكاء الاصطناعي' } },
  { id: 'support', status: 'roadmap', name: { en: 'Support AI',           ar: 'ذكاء الدعم' } },
  { id: 'wa',      status: 'roadmap', name: { en: 'WhatsApp Sales',       ar: 'مبيعات واتساب' } },
  { id: 'mkt',     status: 'roadmap', name: { en: 'AI Marketing',         ar: 'تسويق بالذكاء الاصطناعي' } },
];

// Product strip. Items without own text reuse FS (flagship) text.
export const STRIP = [
  { id: 'omninode', status: 'live', pillar: 'auto', cta: { href: 'https://omni.mohammad-abujalboush.com' } },
  { id: 'alpha', status: 'soon', pillar: 'ai', cta: { href: 'https://alpha.mohammad-abujalboush.com' } },
  { id: 'restaurant', status: 'built', pillar: 'eng' },
  { id: 'erplite', status: 'built', pillar: 'eng' },
  { id: 'delivery', status: 'soon', pillar: 'biz' },
  { id: 'sparkle', status: 'built', pillar: 'eng', mail: true, cta: { href: 'https://sparklecrm.mohammad-abujalboush.com' } },
  { id: 'flip', status: 'live', pillar: 'biz', cta: { href: 'https://flip.mohammad-abujalboush.com' } },
  { id: 'shami', status: 'live', pillar: 'biz' },
  { id: 'marketplace', status: 'soon', pillar: 'biz', cta: { href: 'https://market.mohammad-abujalboush.com' } },
];
export const PS = {
  omninode:   { tag: { en: 'Webhooks in, any API out.', ar: 'webhooks للداخل، وأي API للخارج.' } },
  alpha:      { tag: { en: 'Shariah-compliant AI investing advisor.', ar: 'مستشار استثمار ذكي متوافق مع الشريعة.' } },
  restaurant: { tag: { en: 'QR ordering, POS and kitchen, as one.', ar: 'الطلب عبر QR ونقطة البيع والمطبخ كمنظومة واحدة.' } },
  erplite: {
    title: { en: 'ERP Lite', ar: 'ERP Lite' },
    tag: { en: 'Offline inventory, POS and CRM for online sellers.', ar: 'مخزون ونقطة بيع وCRM دون اتصال للبائعين عبر الإنترنت.' },
    body: { en: 'Inventory, POS, CRM and tasks for e-commerce and social-media sellers. It works offline and syncs to Google Drive and Google Calendar when the connection is back.', ar: 'مخزون ونقطة بيع وCRM ومهام للبائعين في التجارة الإلكترونية ووسائل التواصل. يعمل دون اتصال ويتزامن مع Google Drive وGoogle Calendar عند عودة الاتصال.' },
    f0: { en: 'Offline-first', ar: 'يعمل دون اتصال' }, f1: { en: 'Inventory + POS + CRM + tasks', ar: 'مخزون + نقطة بيع + CRM + مهام' }, f2: { en: 'Google Drive / Calendar sync', ar: 'مزامنة Google Drive وCalendar' },
  },
  delivery: {
    title: { en: 'Delivery Platform', ar: 'منصة التوصيل' },
    tag: { en: 'Concept: stores subscribe, drivers pay nothing.', ar: 'فكرة: المتاجر تشترك والسائقون لا يدفعون.' },
    body: { en: 'A delivery platform model: each store pays a subscription plus a small per-order fee, and drivers pay no fees at all. Shown here as the idea and its economics. It is not a live service yet.', ar: 'نموذج منصة توصيل: يدفع كل متجر اشتراكاً مع رسم صغير لكل طلب، ولا يدفع السائقون أي رسوم. يُعرض هنا كفكرة واقتصادياتها، وليس خدمة تعمل بعد.' },
    f0: { en: 'Per-store subscription', ar: 'اشتراك لكل متجر' }, f1: { en: 'Per-order model', ar: 'نموذج لكل طلب' }, f2: { en: 'No fees for drivers', ar: 'بلا رسوم للسائقين' },
  },
  sparkle: {
    title: { en: 'Sparkle CRM', ar: 'Sparkle CRM' },
    tag: { en: 'CRM for auto detailers and car washes.', ar: 'نظام CRM لمراكز تلميع وغسيل السيارات.' },
    body: { en: 'A management system for auto detailers and car washes: client and vehicle profiles, bay scheduling, assigning jobs to staff, and follow-ups.', ar: 'نظام إدارة لمراكز تلميع وغسيل السيارات: ملفات العملاء والمركبات، وجدولة المواقع، وإسناد المهام للموظفين، والمتابعات.' },
    f0: { en: 'Client + vehicle profiles', ar: 'ملفات العملاء والمركبات' }, f1: { en: 'Bay scheduling', ar: 'جدولة المواقع' }, f2: { en: 'Follow-ups', ar: 'متابعات' },
    cta: { en: 'See Sparkle CRM', ar: 'شاهد Sparkle CRM' },
    mailCta: { en: 'Request a quote', ar: 'اطلب عرض سعر' },
    mailSubject: { en: 'Sparkle CRM quote request', ar: 'طلب عرض سعر لـ Sparkle CRM' },
    mailBody: { en: 'Hi Mohammad,\n\nI would like a quote for Sparkle CRM.\n\nBusiness name:\nNumber of locations:\nWhatsApp:\n', ar: 'مرحباً محمد،\n\nأرغب بعرض سعر لنظام Sparkle CRM.\n\nاسم النشاط:\nعدد الفروع:\nواتساب:\n' },
  },
  flip: {
    title: { en: 'The Flip', ar: 'The Flip' },
    tag: { en: 'E-book: buy, fix in 30 days, sell.', ar: 'كتاب: اشترِ، أصلح خلال 30 يوماً، وبِع.' },
    body: { en: 'An e-book and toolkit on buying an abandoned micro-SaaS, fixing it in 30 days and selling it. Order by CliQ, bank transfer or cash; it is delivered by hand once your payment is confirmed.', ar: 'كتاب وأدوات حول شراء منتج SaaS صغير مهجور وإصلاحه خلال 30 يوماً وبيعه. اطلبه بكليك أو حوالة بنكية أو نقداً، ويُسلَّم يدوياً بعد تأكيد الدفع.' },
    f0: { en: 'E-book + toolkit', ar: 'كتاب وأدوات' }, f1: { en: 'CliQ / bank / cash', ar: 'كليك / بنك / نقداً' }, f2: { en: 'Manual delivery', ar: 'تسليم يدوي' },
    cta: { en: 'Get The Flip', ar: 'احصل على The Flip' },
  },
  shami: {
    title: { en: 'Shami Cosmetics', ar: 'شامي كوزمتكس' },
    tag: { en: 'Arabic-first storefront with a full admin.', ar: 'متجر بالعربية أولاً مع لوحة إدارة كاملة.' },
    body: { en: 'A client project: an Arabic-first online storefront and a full admin panel, built on Supabase.', ar: 'مشروع لعميل: متجر إلكتروني بالعربية أولاً ولوحة إدارة كاملة، مبنيان على Supabase.' },
    f0: { en: 'Client project', ar: 'مشروع لعميل' }, f1: { en: 'Arabic-first storefront', ar: 'متجر بالعربية أولاً' }, f2: { en: 'Full admin panel on Supabase', ar: 'لوحة إدارة كاملة على Supabase' },
  },
  marketplace: {
    title: { en: 'Marketplace', ar: 'المتجر' },
    tag: { en: 'Production-ready codebases. Coming soon.', ar: 'أكواد جاهزة للإنتاج. قريباً.' },
    body: { en: 'A marketplace for production-ready codebases, SaaS architectures and automation workflows. Not open yet: leave your details and you will be told the day it opens.', ar: 'متجر لأكواد جاهزة للإنتاج وهياكل SaaS وسير عمل أتمتة. لم يُفتح بعد: اترك بياناتك لتعرف يوم افتتاحه.' },
    f0: { en: 'Codebases', ar: 'أكواد جاهزة' }, f1: { en: 'SaaS architectures', ar: 'هياكل SaaS' }, f2: { en: 'Automation workflows', ar: 'سير عمل أتمتة' },
    cta: { en: 'Get notified', ar: 'أبلغني' },
  },
};

// Industry explorer: what was actually done in each industry. Items (products/demos) are derived.
export const DID = {
  fnb:        { en: 'A restaurant ecosystem: QR ordering, a POS and a kitchen management system, with OCR that reads supplier receipts and invoices. A delivery model for stores, as a concept.', ar: 'منظومة مطاعم: طلب عبر QR ونقطة بيع ونظام إدارة مطبخ، مع OCR يقرأ إيصالات الموردين وفواتيرهم. ونموذج توصيل للمتاجر كفكرة.' },
  retail:     { en: 'A live Arabic-first storefront with a full admin, a gamified shop with 20+ mini-games, and offline inventory and POS for small sellers.', ar: 'متجر حيّ بالعربية أولاً مع لوحة إدارة كاملة، ومتجر تفاعلي بأكثر من 20 لعبة مصغّرة، ومخزون ونقطة بيع دون اتصال للبائعين الصغار.' },
  social:     { en: 'Tools for sellers who run their business from social media: inventory, POS, CRM and tasks that work offline and sync to Google Drive and Calendar.', ar: 'أدوات للبائعين الذين يديرون أعمالهم عبر وسائل التواصل: مخزون ونقطة بيع وCRM ومهام تعمل دون اتصال وتتزامن مع Google Drive وCalendar.' },
  beauty:     { en: 'Shami Cosmetics: an Arabic-first storefront and a full admin panel on Supabase.', ar: 'شامي كوزمتكس: متجر بالعربية أولاً ولوحة إدارة كاملة على Supabase.' },
  automotive: { en: 'Sparkle CRM for detailers and car washes: client and vehicle profiles, bay scheduling, job assignment and follow-ups.', ar: 'Sparkle CRM لمراكز التلميع والغسيل: ملفات العملاء والمركبات، وجدولة المواقع، وإسناد المهام، والمتابعات.' },
  logistics:  { en: 'Real-time dispatch and logistics systems: live tracking, smart driver matching, payment pre-authorization, and multi-app platforms for customers, drivers and admins.', ar: 'أنظمة إرسال ولوجستيات فورية: تتبّع مباشر، ومطابقة ذكية للسائقين، وتفويض مسبق للدفع، ومنصات متعددة التطبيقات للعملاء والسائقين والإدارة.' },
  fintech:    { en: 'Alpha Advisor: a Shariah-compliant AI investing advisor, with a Python compliance engine and a trained classifier. Advisory only.', ar: 'Alpha Advisor: مستشار استثمار ذكي متوافق مع الشريعة، بمحرك امتثال بلغة Python ومصنِّف مدرَّب. استشاري فقط.' },
  accounting: { en: 'Mehsab: an AI accountant that chats, reads platform data, advises, acts inside the platform and talks back by voice.', ar: 'محساب: محاسب ذكي يتحدث ويقرأ بيانات المنصة ويقدّم النصح وينفّذ داخل المنصة ويردّ بالصوت.' },
  realestate: { en: 'A property operations concept: centralized property data, polygon-based map highlighting, ownership tracking and automated lead handling.', ar: 'نموذج لإدارة العقارات: بيانات مركزية، وإبراز بالمضلعات على الخريطة، وتتبع الملكية، ومعالجة آلية للعملاء المحتملين.' },
  ngo:        { en: 'A grants concept covering submission, multi-layer review, approval tracking and operational transparency.', ar: 'نموذج لإدارة المنح يشمل التقديم والمراجعة متعددة الطبقات وتتبع الموافقات وشفافية التشغيل.' },
  education:  { en: 'Campus safety with QR and biometric verification for student exits, bus tracking and parent pickup permissions, plus a learning platform and a digital library.', ar: 'سلامة الحرم التعليمي بتحقق QR وبيومتري لخروج الطلاب، وتتبع الحافلات، وأذونات استلام أولياء الأمور، إضافة إلى منصة تعلّم ومكتبة رقمية.' },
  hr:         { en: 'A workforce and attendance suite, built as a concept.', ar: 'منظومة للقوى العاملة والحضور، مبنية كنموذج.' },
  cinema:     { en: 'A cinema booking experience, built as a concept.', ar: 'تجربة حجز سينما، مبنية كنموذج.' },
  transport:  { en: 'A premium chauffeur booking concept, and transport inside the Hyperlocal Super-App.', ar: 'نموذج لحجز سائق خاص فاخر، والنقل ضمن تطبيق الخدمات المحلية الشامل.' },
  media:      { en: 'A media intelligence aggregator concept, and a Market Intelligence pipeline.', ar: 'نموذج لمجمّع ذكاء الإعلام، وخط ذكاء السوق.' },
  gaming:     { en: 'Interactive games in Unity, and the mini-games inside the Gamified Commerce Platform.', ar: 'ألعاب تفاعلية بـ Unity، والألعاب المصغّرة داخل منصة التجارة التفاعلية.' },
  rentals:    { en: 'Equipment and fleet rental: digital contracting, maintenance logs and availability scheduling.', ar: 'تأجير المعدات والأساطيل: تعاقد رقمي وسجلات صيانة وجدولة التوفر.' },
  ev:         { en: 'EV charging discovery and reservation, inside the Hyperlocal Super-App.', ar: 'اكتشاف محطات الشحن الكهربائي وحجزها، ضمن تطبيق الخدمات المحلية الشامل.' },
  agencies:   { en: 'OmniNode connects any app to any API; a contract automation engine for B2B pricing; and lead generation, outreach and resume pipelines.', ar: 'OmniNode يربط أي تطبيق بأي API؛ ومحرك أتمتة عقود لتسعير B2B؛ وخطوط توليد عملاء وتواصل وفرز سير ذاتية.' },
};

// How I think: solution-design study (no client named, not presented as client work).
export const THINK = {
  discovery:    { en: 'Start with the people, not the screens. Who quotes, who drives, who keeps the books, and where does a job get stuck between them?', ar: 'أبدأ بالناس لا بالشاشات. من يسعّر، ومن يقود، ومن يمسك الدفاتر، وأين تعلق المهمة بينهم؟' },
  architecture: { en: 'One system with three sides: an office view, a driver app and an accountant view over the same data. Quotations become PDF documents with e-signature, and a Python OCR step reads paperwork so nobody retypes it.', ar: 'نظام واحد بثلاثة جوانب: واجهة للمكتب وتطبيق للسائق وواجهة للمحاسب على البيانات نفسها. تتحول عروض الأسعار إلى مستندات PDF بتوقيع إلكتروني، وخطوة OCR بلغة Python تقرأ الأوراق فلا يعيد أحد كتابتها.' },
  cost:         { en: 'Decide what to build and what to rent. Every third-party service has to earn its monthly fee, so the stack is shaped to keep recurring costs minimal.', ar: 'أقرر ما يُبنى وما يُستأجر. على كل خدمة خارجية أن تستحق رسمها الشهري، لذلك صُممت الحزمة التقنية لتبقى التكاليف الدورية في حدها الأدنى.' },
};
