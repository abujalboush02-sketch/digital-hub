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
    title: { en: 'Mehsab', ar: 'محسب' },
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
