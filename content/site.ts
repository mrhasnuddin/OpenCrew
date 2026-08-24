/**
 * Site copy, sourced from OPENCREW V3.pdf.
 *
 * This file — not docs/02-copy-deck.md — is the source of truth for copy on
 * implemented pages. Keeping approved wording in one place stops the doc and
 * the build drifting apart, which matters most for the claims in WORK below:
 * those strings are fixed by docs/00-brand-identity.md §7.2 and ship verbatim.
 */

export const HERO = {
  eyebrow: 'Global team & growth partner · Web3 · AI · New finance',
  title: 'Your global team for Web3 & AI.',
  lead: 'OPENCREW supports Web3, AI and new finance projects through global talent deployment, international representation, institutional access and overseas market coordination.',
  primaryCta: { label: 'Start a project', href: '/contact' },
  secondaryCta: { label: 'Browse the crew', href: '/crew' },
  rhythm: 'Global Team. Global Access. Global Execution.',
  /**
   * Grounds the "global" claim in named places rather than an adjective.
   * `code` is an ISO-3166 alpha-2 used to pick the flag.
   *
   * Two are approximations worth knowing about: Dubai flies the UAE flag
   * (there is no emirate-level flag in the set), and North America uses the US
   * flag because no continental flag exists. Both are conventional, but say so
   * if you'd rather those two stayed as plain text.
   */
  markets: [
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Japan', code: 'JP' },
    { name: 'Dubai', code: 'AE' },
    { name: 'Europe', code: 'EU' },
    { name: 'North America', code: 'US' },
  ],
};

/** V3 p2 — the four-word summary of the business. */
export const PILLARS = [
  {
    title: 'Global Crew',
    body: 'Executives, advisors, consultants and regional leaders.',
  },
  {
    title: 'Global Representation',
    body: 'Institutional meetings, public appearances and global communications.',
  },
  {
    title: 'Institutional Access',
    body: 'Exchanges, capital, payments, RWA and professional services.',
  },
  {
    title: 'Market Execution',
    body: 'Overseas launches, community engagement and regional operations.',
  },
];

/** V3 p4 — five problems, not six. */
export const PROBLEM = {
  eyebrow: 'The problem we solve',
  title: 'Why global projects get stuck',
  lead: 'Most projects do not lack ideas. They lack a complete global capability system.',
  items: [
    {
      index: '01',
      title: 'Global team',
      body: 'A lack of credible, professional international members who can participate publicly.',
    },
    {
      index: '02',
      title: 'Community communication',
      body: 'A lack of professional representatives who can explain the project, educate the community and build market understanding over time.',
    },
    {
      index: '03',
      title: 'Institutional readiness',
      body: 'Exchange applications, KYC and due diligence materials are not systematically prepared.',
    },
    {
      index: '04',
      title: 'Resource access',
      body: 'Limited access to funds, exchanges and professional service networks.',
    },
    {
      index: '05',
      title: 'Market execution',
      body: 'No dedicated representative to continuously advance the project in overseas markets.',
    },
  ],
  closing:
    'A single missing capability can prevent a strong product or technology from moving beyond its original market.',
};

/** V3 p7 — the standard that separates deployment from an advisor logo. */
export const PARTICIPATION_STANDARDS = [
  { title: 'Credible identity', body: 'A real professional background that withstands review.' },
  { title: 'Clear responsibilities', body: 'A defined role with defined work, not a title on a slide.' },
  { title: 'Public engagement', body: 'Members who appear, speak and represent the project.' },
  { title: 'Continuous involvement', body: 'Sustained participation, not a one-time appearance.' },
];

/** V3 p20 */
export const ENGAGEMENT_MODELS = [
  {
    index: '01',
    slug: 'project-engagement',
    title: 'Project Engagement',
    body: 'Targeted deployment of executives, advisors, regional leads or specific institutional resources.',
    bestFor: 'A defined gap: a seat to fill, an application to prepare, a market to enter.',
    shape: 'Monthly or project-based',
  },
  {
    index: '02',
    slug: 'global-growth-mandate',
    title: 'Global Growth Mandate',
    body: 'Continuous involvement across strategy, brand, institutional access and international markets.',
    bestFor: 'Projects that need an international operating team rather than a placement.',
    shape: 'Monthly retainer plus campaign budgets',
  },
  {
    index: '03',
    slug: 'venture-co-building',
    title: 'Venture Co-Building',
    body: 'Core team members and global resources committed to long-term development and critical growth stages.',
    bestFor: 'Selected projects where long-term incentives should be aligned.',
    shape: 'Fees plus equity or token allocation',
  },
];

/** V3 p20 */
export const EXECUTION_FLOW = [
  { index: '01', title: 'Project Assessment', body: 'Product, team, stage, target markets and actual needs.' },
  { index: '02', title: 'Strategic Planning', body: 'One integrated plan across talent, readiness, institutions and market entry.' },
  { index: '03', title: 'Talent & Resource Deployment', body: 'The right members, advisors and regional representatives placed into the project.' },
  { index: '04', title: 'Execution & Delivery', body: 'Brand, applications, institutional connections, events and overseas operations.' },
  { index: '05', title: 'Review & Expansion', body: 'Configuration adjusts with the market, over years rather than weeks.' },
];

export type Institution = {
  name: string;
  domain: string | null;
  logo: string | null;
  industry: string;
  blurb: string;
  /**
   * Only set where the supplied artwork is drawn in LIGHT ink for a dark
   * background — those marks disappear on the light chip the wall uses, so
   * they get a dark chip instead. Everything else is dark or coloured ink and
   * takes the default. Measured from the rendered chips, not assumed; if a
   * dark-ink version of one of these arrives, delete the flag.
   */
  logoTheme?: 'light';
};

/** V3 p10 — 27 institutions in five categories. Text use is authorised;
 *  LOGO display is a separate permission, so this renders typographically. */
export const NETWORK: {
  eyebrow: string;
  title: string;
  lead: string;
  qualifier: string;
  categories: Array<{ title: string; items: Institution[] }>;
} = {
  eyebrow: 'Our institutional network',
  title: 'Institutional landscape',
  lead: 'Across capital, payments, RWA, professional services and global industries.',
  qualifier:
    'This institutional landscape reflects the cooperation, business engagements, ecosystem relationships and professional experience of the OPENCREW network.',
  categories: [
    {
      title: 'Capital Markets & Exchanges',
      items: [
        { name: 'OKX', domain: 'okx.com', logo: '/partners/okx.svg', industry: 'Digital asset exchange', blurb: 'Global digital asset exchange and Web3 technology company.' },
        { name: 'UOB Venture Management', domain: 'uobvm.com.sg', logo: '/partners/uobvm.svg', industry: 'Private equity', blurb: 'Private equity arm of United Overseas Bank, investing across Southeast Asia.' },
        { name: 'Signum Capital', domain: 'signum.capital', logo: '/partners/signum-capital.webp', industry: 'Venture capital', blurb: 'Singapore-based venture firm focused on blockchain and digital assets.' },
        { name: 'Ledger Capital', domain: 'ledgercap.xyz', logo: '/partners/ledgercapital.webp', logoTheme: 'light', industry: 'Investment firm', blurb: 'Investment firm focused on Web3 infrastructure and digital assets.' },
        { name: 'Republic Crypto', domain: 'republic.com', logo: '/partners/republic.svg', industry: 'Advisory & investment', blurb: 'Digital asset advisory and investment arm of the Republic group.' },
        { name: 'HKEX', domain: 'hkex.com.hk', logo: '/partners/hkex.svg', industry: 'Securities exchange', blurb: "Operator of Hong Kong's securities and derivatives markets." },
        { name: 'OSL', domain: 'osl.com', logo: '/partners/osl-color.svg', industry: 'Digital asset platform', blurb: 'Licensed digital asset trading platform headquartered in Hong Kong.' },
      ],
    },
    {
      title: 'Payments & Fintech',
      items: [
        { name: 'Visa', domain: 'visa.com', logo: '/partners/visa.svg', industry: 'Payment network', blurb: 'Global payments technology company connecting consumers, businesses and banks.' },
        { name: 'Stripe', domain: 'stripe.com', logo: '/partners/stripe.svg', industry: 'Payment infrastructure', blurb: 'Payments infrastructure for internet businesses.' },
        { name: 'Wise', domain: 'wise.com', logo: '/partners/wise.svg', industry: 'Cross-border payments', blurb: 'International transfers and multi-currency accounts.' },
        { name: 'Airwallex', domain: 'airwallex.com', logo: '/partners/airwallex.svg', industry: 'Business payments', blurb: 'Global payments and financial platform for modern businesses.' },
        { name: 'Alipay', domain: 'alipay.com', logo: '/partners/alipay.svg', industry: 'Digital payments', blurb: 'Digital payment platform operated by Ant Group.' },
        { name: 'WeChat Pay', domain: 'wechat.com', logo: '/partners/wechat.svg', industry: 'Digital payments', blurb: 'Mobile payment service built into WeChat.' },
      ],
    },
    {
      title: 'RWA & Institutional Finance',
      items: [
        { name: 'OpenEden', domain: 'openeden.com', logo: '/partners/openeden.svg', industry: 'Tokenised RWA', blurb: 'Platform for tokenised real-world assets and treasury products.' },
        { name: 'BNY', domain: 'bny.com', logo: '/partners/bny.svg', industry: 'Global custody bank', blurb: 'Global custody bank and financial services group.' },
        { name: 'Eddid Financial', domain: 'eddid.com.hk', logo: '/partners/eddid.webp', industry: 'Financial services', blurb: 'Hong Kong financial services group spanning securities, futures and fintech.' },
        { name: 'INK Finance', domain: 'inkfinance.xyz', logo: '/partners/inkfinance.svg', logoTheme: 'light', industry: 'On-chain finance', blurb: 'Decentralised finance and governance infrastructure.' },
      ],
    },
    {
      title: 'Audit, Data & Professional Services',
      items: [
        { name: 'CertiK', domain: 'certik.com', logo: '/partners/certik.svg', industry: 'Security auditing', blurb: 'Blockchain security firm known for smart-contract audits.' },
        { name: 'RootData', domain: 'rootdata.com', logo: '/partners/rootdata.webp', industry: 'Data & research', blurb: 'Web3 asset data platform covering projects, funds and fundraising.' },
        { name: 'Dun & Bradstreet', domain: 'dnb.com', logo: '/partners/dnb.svg', industry: 'Business intelligence', blurb: 'Business data and analytics for credit, risk and compliance.' },
        { name: 'SafeEdges', domain: 'safeedges.in', logo: '/partners/safeedges.webp', logoTheme: 'light', industry: 'Security', blurb: 'Security assessment and audit services for Web3 systems.' },
        { name: 'ALLO Lawyers', domain: 'allolawyers.com', logo: '/partners/allo-lawyers.webp', logoTheme: 'light', industry: 'Legal', blurb: 'Legal practice advising on corporate and digital asset matters.' },
      ],
    },
    {
      title: 'Web3 & Global Industry Ecosystem',
      items: [
        { name: 'NTT Digital', domain: 'nttdigital.io', logo: '/partners/nttdigital.svg', industry: 'Web3 infrastructure', blurb: 'Web3 company of the NTT Group building wallet and chain infrastructure.' },
        { name: 'BitTrade', domain: 'bittrade.co.jp', logo: '/partners/bittrade.svg', industry: 'Exchange · Japan', blurb: 'Licensed cryptocurrency exchange operating in Japan.' },
        { name: 'Malaysia Blockchain Institution', domain: 'malaysiablockchain.my', logo: '/partners/mbi.webp', industry: 'Industry body', blurb: 'Malaysian institution connecting blockchain ventures, talent and partners.' },
        { name: 'Malaysia Digital Asset Community', domain: 'mydac.org.my', logo: '/partners/mydac.svg', industry: 'Community body', blurb: 'Community organisation for digital asset education and adoption in Malaysia.' },
        { name: 'InfraSingularity', domain: 'infrasingularity.com', logo: '/partners/infrasingularity.png', logoTheme: 'light', industry: 'Web3 infrastructure', blurb: 'Web3 infrastructure investor and node operations firm.' },
      ],
    },
  ],
};

/**
 * V3 p11–13. Milestone strings are FIXED — see docs/00-brand-identity.md §7.2.
 * Note the precision: "engagement initiated", not "backed by"; "audit
 * engagement initiated", not "audited". Do not paraphrase these.
 */
export type WorkItem = {
  slug: string;
  tier: 'featured' | 'supporting';
  name: string;
  projectType: string;
  background?: string;
  /** The gap OPENCREW was engaged to close, stated client-first. Derived by
   *  restating the approved mandate/capability copy — it introduces no claim
   *  the deck doesn't already make. */
  problem?: string;
  mandate?: string;
  deliverables: string[];
  milestones?: string[];
  capability?: string;
  /** Full lockup (logomark + wordmark), client-supplied artwork in
   *  /public/engagement. This is the dark-on-light variant, shown in the light
   *  theme; `logoDark` is its white counterpart, shown when the theme flips and
   *  the card surface (canvas-mixed) goes dark with it. The swap is the same
   *  `.logo-on-light`/`.logo-on-dark` mechanism the header wordmark uses. */
  logo: string | null;
  logoDark?: string;
  /** Logomark alone — the symbol with no wordmark. Used where a lockup would be
   *  illegible: the 76px collapsed accordion strips, where a mark is recognised
   *  at a glance but a wordmark would be a smear. */
  mark?: string;
  /** Official destination, client-supplied. `null` = no live presence, which
   *  renders as no link rather than a dead one. */
  site: string | null;
};

export const WORK: WorkItem[] = [
  {
    slug: 'paygo',
    site: 'https://www.paygo.ac/',
    logo: '/engagement/paygo-lockup-onlight.svg',
    logoDark: '/engagement/paygo-lockup-ondark.svg',
    mark: '/engagement/paygo-mark.svg',
    tier: 'featured' as const,
    name: 'PAYGO',
    projectType: 'ENI Chain-native payment & AI agent settlement infrastructure',
    background:
      'PAYGO is a Web3 payment and AI agent settlement project built on ENI Chain. It provides request-level payment infrastructure for APIs, AI agents and digital economy applications.',
    problem:
      'Strong technology and mechanism design, but no international team, institutional footprint or market recognition to carry it beyond its original market.',
    mandate:
      'Take a project with strong technology and mechanism design and build it into an infrastructure brand backed by an international team, institutional resources and market recognition.',
    deliverables: [
      'Global positioning and English narrative',
      'Global team and project materials system',
      'Exchange application and due diligence preparation',
      'Investment and industry resource connections',
      'Media, database and audit coordination',
      'Overseas market and ecosystem development',
    ],
    milestones: [
      'Global core team established',
      'OKX listing offer secured',
      'Engagement initiated with UOB Venture Management',
      'Engagement initiated with Signum Capital and Ledger Capital',
      'RootData listing and market exposure advanced',
      'CertiK audit engagement initiated',
    ],
  },
  {
    slug: 'enipay',
    site: 'https://www.enipay.net/',
    logo: '/engagement/enipay-lockup-onlight.svg',
    logoDark: '/engagement/enipay-lockup-ondark.svg',
    mark: '/engagement/enipay-mark.svg',
    tier: 'featured' as const,
    name: 'ENIPAY',
    projectType: 'A digital payment platform for global users',
    background:
      'ENIPAY is a digital payment platform serving global users, spanning card issuance, a multi-chain wallet and mainstream top-up scenarios across Asian markets.',
    problem:
      'A live payment product (card issuance, multi-chain wallet, top-up scenarios) with no global brand position or bilingual communication system to carry it into Asian markets.',
    mandate:
      'Establish a global brand position and a bilingual communication system, then carry the product into Asian markets alongside its payment and partner ecosystem.',
    deliverables: [
      'Global brand positioning',
      'Chinese and English decks and product materials',
      'Brand and product content system',
      'Product launch and market communication',
      'Asian market execution',
      'Payment ecosystem and partner coordination',
    ],
    milestones: [
      'Visa ENI Card business',
      'Multi-chain wallet and user application',
      'Alipay and WeChat Pay top-up scenarios',
      'Website and product launch',
      'Asian market communication system',
      'Expansion of payment resources including Stripe, Wise and Airwallex',
    ],
  },
  {
    slug: 'vino-labs',
    site: 'https://linktr.ee/vinolabs',
    logo: '/engagement/vino-lockup-onlight.svg',
    logoDark: '/engagement/vino-lockup-ondark.svg',
    mark: '/engagement/vino-mark.svg',
    tier: 'supporting' as const,
    name: 'VINO LABS',
    projectType: 'Web3 × AI ecosystem',
    problem:
      'A Web3 × AI ecosystem whose narrative was too complex to travel across markets on its own.',
    // ⚠️ DRAFT copy, expanded from the one-line deck deliverable at the
    // client's request. Describes OPENCREW's own work and delivered outputs
    // only; no third-party outcome is claimed. Client to confirm wording.
    deliverables: [
      'Strategic positioning and a single ecosystem narrative',
      'Project materials: deck, one-pager and website copy',
      'Announcement and launch communications',
      'Event and conference communications',
      'Cross-market messaging for English- and Chinese-speaking audiences',
    ],
    milestones: [
      'Ecosystem narrative and positioning framework delivered',
      'Bilingual project materials in use across channels',
      'Announcement and event communications running on a cadence',
    ],
    capability: 'Complex ecosystem narratives and cross-market communication',
  },
  {
    slug: 'yaib-ai',
    site: null,
    logo: '/engagement/yaib-lockup-onlight.svg',
    logoDark: '/engagement/yaib-lockup-ondark.svg',
    mark: '/engagement/yaib-mark.svg',
    tier: 'supporting' as const,
    name: 'YAIB.AI',
    projectType: 'Artificial intelligence',
    problem:
      'An AI product starting from zero: no brand identity, no visual system, no communication guidelines.',
    // ⚠️ DRAFT copy, expanded at the client's request. OPENCREW's own work
    // and delivered outputs only. Client to confirm wording.
    deliverables: [
      'Brand identity: logomark, wordmark and lockups',
      'Visual system: colour, type and layout rules',
      'Communication guidelines: voice, tone and message architecture',
      'Launch-ready brand assets and templates',
    ],
    milestones: [
      'Complete brand identity delivered from zero',
      'Visual system and guidelines adopted across product and communications',
      'Launch assets and templates in use',
    ],
    capability: 'Building an AI brand from zero to one',
  },
  {
    slug: 'omni-ai',
    site: 'https://x.com/omniai_network',
    logo: '/engagement/omni-lockup-onlight.svg',
    logoDark: '/engagement/omni-lockup-ondark.svg',
    mark: '/engagement/omni-mark.svg',
    tier: 'supporting' as const,
    name: 'OMNI AI',
    projectType: 'AI computing infrastructure',
    problem:
      'AI computing infrastructure without bilingual launch material or regional market support outside its home market.',
    // ⚠️ DRAFT copy, expanded at the client's request. OPENCREW's own work
    // and delivered outputs only. Client to confirm wording.
    deliverables: [
      'Bilingual launch narrative and materials (English and Chinese)',
      'AMA programme: scripting, hosting and follow-up content',
      'Technical storytelling for a complex compute product',
      'Regional market and community communication support',
    ],
    milestones: [
      'Bilingual launch delivered across English and Chinese channels',
      'AMA series running with prepared content',
      'Regional market communication established outside the home market',
    ],
    capability: 'International communication for complex technology projects',
  },
];

export const CLOSING_CTA = {
  eyebrow: 'Let the next stage of your project start here',
  title: 'Tell us about your project.',
  fields: ['Project deck', 'Current stage', 'Target market', 'Role needs', 'Resource needs', 'Timeline'],
  signoff: ['Build globally.', 'Operate globally.', 'Grow globally.'],
};

/** Mandatory wherever listings, KYC or due diligence are mentioned (V3 p8). */
export const INDEPENDENCE_DISCLAIMER =
  'Final review, investment and listing decisions are made independently by the relevant institutions.';
