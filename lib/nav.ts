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
    oneLiner: 'Executives, advisors and regional leads, deployed into your project.',
  },
  {
    index: '02',
    slug: 'consultants-education',
    name: 'Consultants & Education',
    oneLiner: 'Project communication, community training and education.',
  },
  {
    index: '03',
    slug: 'exchange-readiness',
    name: 'Exchange Readiness',
    oneLiner: 'Applications, due diligence and institutional communication.',
  },
  {
    index: '04',
    slug: 'global-representation',
    name: 'Global Representation',
    oneLiner: 'Spokespersons and industry professionals representing you publicly.',
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

/** V3's role table — feeds the crew directory's role filter. */
export const ROLES = [
  { slug: 'ceo-coo', name: 'CEO / COO' },
  { slug: 'cto-product', name: 'CTO / Product' },
  { slug: 'cmo-growth', name: 'CMO / Growth' },
  { slug: 'advisor', name: 'Advisor' },
  { slug: 'consultant', name: 'Consultant' },
  { slug: 'regional-lead', name: 'Regional Lead' },
] as const;

export type NavItem = { label: string; href: string; hasPanel?: boolean };

/** Four items + a contact pill — the reference's header shape.
 *  Capabilities points at the home page's #what-we-do stack — the capability
 *  subpages are retired (client direction); the cards ARE the capability
 *  pages now, deep-linkable as /#cap-<slug>. */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Capabilities', href: '/#what-we-do', hasPanel: true },
  { label: 'Crew', href: '/crew' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
];

export const LEGAL_NAV = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Disclosure', href: '/legal/disclosure' },
] as const;
