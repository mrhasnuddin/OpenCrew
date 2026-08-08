/**
 * The six capabilities, from OPENCREW V3.pdf p6–9.
 * Group labels and item wording are V3's own — do not paraphrase.
 */

import { INDEPENDENCE_DISCLAIMER } from './site';

export type ServiceGroup = { title: string; items: string[] };

export type Service = {
  slug: string;
  index: string;
  name: string;
  oneLiner: string;
  title: string;
  lead: string;
  problem: string;
  groups: ServiceGroup[];
  /** Numbered process, rendered as a stepper. */
  process?: { index: string; title: string }[];
  disclaimer?: string;
  relatedRoles: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'global-crew',
    index: '01',
    name: 'Global Crew',
    oneLiner: 'Global executives, advisors and regional leadership.',
    title: 'Build a credible global team around the project.',
    lead: 'Based on the project stage and target market, OPENCREW deploys core executives, strategic advisors, consultants, international spokespersons and regional leaders.',
    problem:
      'A project can hold strong technology and capital and still present as a single-region organisation — which is the first thing an exchange or an investor notices.',
    groups: [
      {
        title: 'Roles deployed',
        items: ['CEO', 'CTO', 'COO', 'CMO', 'Advisor', 'Consultant', 'Regional Lead'],
      },
      {
        title: 'Professional backgrounds',
        items: ['Web3', 'AI', 'Digital payments', 'Exchanges', 'Capital markets', 'Branding', 'Global business'],
      },
      {
        title: 'Deployment scope',
        items: [
          'Identity design',
          'Responsibility mapping',
          'Public profiles',
          'Meeting participation',
          'Community communication',
          'Long-term engagement',
        ],
      },
      {
        title: 'Participation standards',
        items: ['Credible identity', 'Clear responsibilities', 'Public engagement', 'Continuous involvement'],
      },
    ],
    relatedRoles: ['ceo-coo', 'cto-product', 'cmo-growth', 'regional-lead'],
  },
  {
    slug: 'consultants-education',
    index: '02',
    name: 'Consultants & Education',
    oneLiner: 'Project communication, community training and ongoing education.',
    title: 'Make the market understand what you built.',
    lead: 'Consultants present the project, train the community and sustain the explanation over time — so understanding compounds instead of resetting with every announcement.',
    problem:
      'Strong technology is rarely the constraint. The constraint is that no one is consistently explaining it in the markets that matter.',
    groups: [
      {
        title: 'Project communication',
        items: ['Project presentations', 'Core market meetings', 'Announcement and event communications'],
      },
      {
        title: 'Community education',
        items: ['Community training', 'AMA sessions', 'Ongoing education programmes'],
      },
      {
        title: 'What it produces',
        items: ['Clearer market understanding', 'Continuous community communication'],
      },
    ],
    relatedRoles: ['consultant', 'cmo-growth'],
  },
  {
    slug: 'exchange-readiness',
    index: '03',
    name: 'Exchange Readiness',
    oneLiner: 'Application coordination, due diligence and institutional communication.',
    title: 'Supporting projects through exchange and institutional engagement processes.',
    lead: 'Applications and institutional diligence fail on preparation, not potential. We strengthen the team structure, the documentation and the way the team communicates in English.',
    problem:
      'Team structure, executive roles, corporate information and project documentation are rarely prepared systematically before an application begins.',
    process: [
      { index: '01', title: 'Team & organisational structure' },
      { index: '02', title: 'Core member KYC documentation' },
      { index: '03', title: 'Project & token documentation' },
      { index: '04', title: 'Due diligence questions & response preparation' },
      { index: '05', title: 'English interview & meeting preparation' },
      { index: '06', title: 'Application coordination & ongoing follow-up' },
    ],
    groups: [
      {
        title: 'OPENCREW support',
        items: [
          'Talent deployment',
          'Meeting preparation',
          'Due diligence coordination',
          'Institutional communication',
          'Ongoing follow-up',
        ],
      },
    ],
    disclaimer: INDEPENDENCE_DISCLAIMER,
    relatedRoles: ['ceo-coo', 'cto-product', 'advisor'],
  },
  {
    slug: 'global-representation',
    index: '04',
    name: 'Global Representation',
    oneLiner: 'Global spokespersons, industry professionals and public participation.',
    title: 'Represented globally. Connected institutionally. Executed locally.',
    lead: 'When a project cannot build a full team in every target market, OPENCREW places credible, professional, long-term representatives in the ones that matter.',
    problem:
      'Conferences, roadshows, AMAs and institutional meetings need someone credible in the room — consistently, not once.',
    groups: [
      {
        title: 'People',
        items: [
          'Core executives',
          'Strategic advisors',
          'Project consultants',
          'Regional leaders',
          'Global spokespersons',
          'Industry professionals',
        ],
      },
      {
        title: 'Execution',
        items: [
          'Institutional meetings',
          'Global roadshows',
          'AMA & interviews',
          'Media communication',
          'Community building',
          'Regional operations',
        ],
      },
    ],
    relatedRoles: ['advisor', 'consultant', 'regional-lead'],
  },
  {
    slug: 'institutional-access',
    index: '05',
    name: 'Institutional Access',
    oneLiner: 'Capital, exchanges, payments, RWA and professional networks.',
    title: 'Enter a relationship network that already exists.',
    lead: 'Global growth needs more than visibility. It needs the right institutions and the right decision-makers, reached at the right stage.',
    problem:
      'Reaching exchanges, funds, chains, auditors and media independently takes years that most projects do not have.',
    groups: [
      {
        title: 'Access',
        items: [
          'Exchanges',
          'Investment institutions',
          'RWA institutions',
          'Audit & compliance',
          'Data & media',
          'Industry organisations',
        ],
      },
      {
        title: 'What access produces',
        items: [
          'Institutional introductions',
          'Investment and partnership meetings',
          'Ecosystem and grant applications',
          'Joint announcements and campaigns',
          'Media publication and database inclusion',
          'Audit and security partnerships',
        ],
      },
    ],
    relatedRoles: ['advisor', 'ceo-coo'],
  },
  {
    slug: 'market-execution',
    index: '06',
    name: 'Market Execution',
    oneLiner: 'Market launches, community engagement and regional operations.',
    title: 'From global presence to global growth.',
    lead: 'OPENCREW can act as the long-term international operating team — brand, community, business development and events, run continuously.',
    problem:
      'One PR campaign, one advisor appointment or one conference appearance does not create lasting results.',
    groups: [
      {
        title: 'Market launches',
        items: ['Overseas launches', 'Bilingual launch communication', 'Product and market announcements'],
      },
      {
        title: 'Community engagement',
        items: ['Telegram, Discord and regional communities', 'AMAs, Spaces and online events', 'Regional KOL partnerships'],
      },
      {
        title: 'Regional operations',
        items: ['Local business development', 'Regional partner expansion', 'Events and partnership follow-up'],
      },
    ],
    relatedRoles: ['regional-lead', 'cmo-growth'],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
