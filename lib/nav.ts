/**
 * Navigation + capability data.
 * Source of truth: OPENCREW V3.pdf. Names and one-liners are V3's own —
 * do not paraphrase them here, the deck wording is the approved wording.
 * See docs/01-information-architecture.md §2, §3.
 */

export type Capability = {
  index: string;
  slug: string;
  name: string;
  oneLiner: string;
};

export const CAPABILITIES: Capability[] = [
  {
    index: '01',
    slug: 'global-crew',
    name: 'Global Crew',
    oneLiner: 'Global executives, advisors and regional leadership, deployed into the project.',
  },
  {
    index: '02',
    slug: 'consultants-education',
    name: 'Consultants & Education',
    oneLiner: 'Project communication, community training and ongoing education.',
  },
  {
    index: '03',
    slug: 'exchange-readiness',
    name: 'Exchange Readiness',
    oneLiner: 'Application coordination, due diligence and institutional communication.',
  },
  {
    index: '04',
    slug: 'global-representation',
    name: 'Global Representation',
    oneLiner: 'Global spokespersons, industry professionals and public participation.',
  },
  {
    index: '05',
    slug: 'institutional-access',
    name: 'Institutional Access',
    oneLiner: 'Capital, exchanges, payments, RWA and professional networks.',
  },
  {
    index: '06',
    slug: 'market-execution',
    name: 'Market Execution',
    oneLiner: 'Market launches, community engagement and regional operations.',
  },
];

/** V3's role table — engagement + value columns feed /roles/[role]. */
export const ROLES = [
  { slug: 'ceo-coo', name: 'CEO / COO' },
  { slug: 'cto-product', name: 'CTO / Product' },
  { slug: 'cmo-growth', name: 'CMO / Growth' },
  { slug: 'advisor', name: 'Advisor' },
  { slug: 'consultant', name: 'Consultant' },
  { slug: 'regional-lead', name: 'Regional Lead' },
] as const;

export type NavItem = { label: string; href: string; hasPanel?: boolean };

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Capabilities', href: '/services', hasPanel: true },
  { label: 'The Crew', href: '/crew' },
  { label: 'Work', href: '/work' },
  { label: 'Network', href: '/network' },
  { label: 'How We Work', href: '/engage' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Capabilities',
    links: CAPABILITIES.map((c) => ({ label: c.name, href: `/services/${c.slug}` })),
  },
  {
    title: 'Network',
    links: [
      { label: 'The Crew', href: '/crew' },
      { label: 'Institutional Landscape', href: '/network' },
      { label: 'Deploy by Role', href: '/roles' },
      { label: 'Join the Crew', href: '/join' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'How We Work', href: '/engage' },
      { label: 'Disclosure', href: '/legal/disclosure' },
    ],
  },
  {
    title: 'Start',
    links: [{ label: 'Start a Project', href: '/start' }],
  },
] as const;

export const LEGAL_NAV = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Disclosure', href: '/legal/disclosure' },
] as const;
