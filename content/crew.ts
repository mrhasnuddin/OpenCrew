/**
 * The crew registry.
 *
 * ⚠️ EVERY RECORD IN THIS FILE IS A REAL PERSON. Do not add a member who does
 * not exist, does not hold the role stated, or has not agreed to be listed.
 * The entire proposition of this site is verifiable people; one invented
 * profile destroys it, and it is the first thing a fund's diligence would find.
 * See docs/00-brand-identity.md §7.2 and /legal/disclosure.
 *
 * Adding a member is a DATA task, not a code task — append a record below.
 * Facets (the filter options) are computed from the data, so a filter only
 * appears once at least one member carries a value for it. That is why market
 * and language filters are absent today: those fields are genuinely unknown
 * for the current members and are left null rather than guessed.
 */

import type { EngagementMode, Web3Level } from '@/lib/team';
import { LEADERSHIP, ADVISORS, NETWORK, REPRESENTATION, type TeamMember } from '@/lib/team';

export type CrewRoleSlug =
  | 'ceo-coo'
  | 'cto-product'
  | 'cmo-growth'
  | 'advisor'
  | 'consultant'
  | 'regional-lead'
  | 'community-lead'
  | 'spokesperson';

export type Availability = 'available' | 'limited' | 'by_introduction';

/**
 * Which roster a member belongs to. `core` members are OPENCREW's own crew and
 * carry credentials; `representation` members came through the representation
 * intake and carry attributes (nationality, base, languages, engagement mode,
 * Web3 level) instead. The directory renders both from one card, but the two
 * are never presented as the same thing.
 */
export type CrewTrack = 'core' | 'representation';

export type CrewMember = TeamMember & {
  track: CrewTrack;
  /** One factual line. Never an adjective about the person. */
  headline: string;
  roleCode: string;
  roles: CrewRoleSlug[];
  sectors: string[];
  availability: Availability;
  /** V3's deployment scope, per member. */
  deploymentScope: string[];
};

const byRole = (slug: string) =>
  [...LEADERSHIP, ...ADVISORS, ...NETWORK].find((m) => m.slug === slug) as TeamMember;

/**
 * Availability is `by_introduction` for all current members, and that is the
 * truthful value — you do not hire a co-founder off a directory listing.
 * `available` and `limited` become meaningful as the wider network is added.
 */
// Order is presentation order everywhere crew renders (directory, featured
// strip): Amir Leo and Dean lead, per client direction — the members most
// relevant to the target market front the list.
const CORE_CREW: CrewMember[] = [
  {
    track: 'core',
    ...byRole('amir-leo'),
    headline: 'CEO, PAYGO · COO, ASEAN Labs · Eight years in digital assets',
    roleCode: 'LEAD / OPERATIONS',
    roles: ['ceo-coo'],
    sectors: ['Web3', 'Digital payments', 'Global business'],
    availability: 'by_introduction',
    deploymentScope: [
      'Strategic planning',
      'Institutional meetings',
      'Regional execution',
      'Long-term engagement',
    ],
  },
  {
    track: 'core',
    ...byRole('dean'),
    headline: 'CMO, ASEAN Labs · COO, PAYGO · Designer and front-end developer',
    roleCode: 'LEAD / BRAND',
    roles: ['cmo-growth', 'consultant'],
    sectors: ['Web3', 'AI', 'Branding'],
    availability: 'by_introduction',
    deploymentScope: [
      'Brand positioning and product design',
      'Community communication',
      'Public representation',
      'Long-term engagement',
    ],
  },
  {
    track: 'core',
    ...byRole('adam-gee'),
    headline: 'Founder, ASEAN Labs · Director, ENI Singapore Foundation',
    roleCode: 'LEAD / ECOSYSTEM',
    roles: ['ceo-coo', 'advisor'],
    sectors: ['Web3', 'RWA', 'Capital markets'],
    availability: 'by_introduction',
    deploymentScope: [
      'Institutional meetings',
      'Ecosystem and partnership development',
      'Project strategy',
      'Long-term engagement',
    ],
  },
  {
    track: 'core',
    ...byRole('ak'),
    headline: 'CMO, ENIPAY · 11+ years in finance and entrepreneurship',
    roleCode: 'LEAD / GROWTH',
    roles: ['cmo-growth', 'advisor'],
    sectors: ['Capital markets', 'Digital payments', 'Web3'],
    availability: 'by_introduction',
    deploymentScope: [
      'Brand positioning',
      'Cross-border business development',
      'Institutional meetings',
      'Long-term engagement',
    ],
  },
  {
    track: 'core',
    ...byRole('arion'),
    headline: 'CEO, ENI Chain · Former Director, HKEX and OSL Hong Kong',
    roleCode: 'ADVISOR / FINANCE',
    roles: ['advisor'],
    sectors: ['Capital markets', 'Exchanges', 'Web3'],
    availability: 'by_introduction',
    deploymentScope: [
      'Strategic advice',
      'Exchange and institutional relationships',
      'Critical meetings',
      'Governance structure',
    ],
  },
  {
    track: 'core',
    ...byRole('timothy-marvelous'),
    headline: 'Web3 Marketing & Growth Professional · Community Growth',
    roleCode: 'GROWTH / COMMUNITY',
    roles: ['cmo-growth', 'regional-lead', 'community-lead'],
    sectors: ['Web3', 'Marketing'],
    availability: 'limited',
    deploymentScope: [
      'Web3 marketing campaigns',
      'Community engagement',
      'Ambassador programs',
      'Content strategy',
    ],
  },
  {
    track: 'core',
    ...byRole('deepak-sharma'),
    headline: 'Community Leader · Web3 Ecosystem Contributor · Token Launches',
    roleCode: 'ECOSYSTEM / COMMUNITY',
    roles: ['advisor', 'community-lead'],
    sectors: ['Web3', 'DeFi', 'GameFi'],
    availability: 'limited',
    deploymentScope: [
      'Community building',
      'Token launches',
      'Venture capital',
      'Web3 ecosystem support',
    ],
  },
];

/**
 * The representation roster, projected into crew records. Generated rather
 * than hand-written so a card can never claim something the application file
 * does not say: the headline is composed from the stored attributes, and the
 * fields the intake does not ask about stay empty.
 */
function representationHeadline(m: TeamMember): string {
  const base = `${m.nationality} national, based in ${m.baseCity}.`;
  return m.languages?.length ? `${base} Speaks ${listWords(m.languages)}.` : base;
}

function listWords(items: string[]) {
  if (items.length < 2) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const REPRESENTATION_CREW: CrewMember[] = REPRESENTATION.map((m) => ({
  ...m,
  track: 'representation' as const,
  headline: representationHeadline(m),
  roleCode: 'REPRESENTATION',
  // The intake is specifically for public representation work; that is the
  // one role assignment the document supports, so it is the only one made.
  roles: ['spokesperson' as const],
  sectors: [],
  // Their own answer to "willing to outstation" and "monthly / one-off /
  // both" is yes and both, which is what available means here.
  availability: 'available' as const,
  deploymentScope: [],
}));

/** Core crew first, then the representation roster. Sorting is a view
 *  concern — see sortCrew — so the source order stays editorial. */
export const CREW: CrewMember[] = [...CORE_CREW, ...REPRESENTATION_CREW];

export function getCrewMember(slug: string) {
  return CREW.find((m) => m.slug === slug);
}

/* ------------------------------------------------------------------ facets */

export type FacetKey =
  'role' | 'sector' | 'market' | 'language' | 'nationality' | 'web3' | 'availability';

export const ROLE_LABELS: Record<CrewRoleSlug, string> = {
  'ceo-coo': 'CEO / COO',
  'cto-product': 'CTO / Product',
  'cmo-growth': 'CMO / Growth',
  advisor: 'Advisor',
  consultant: 'Consultant',
  'regional-lead': 'Regional Lead',
  'community-lead': 'Community Lead',
  spokesperson: 'Spokesperson',
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  available: 'Available now',
  limited: 'Limited availability',
  by_introduction: 'By introduction',
};

/** Only surfaces options that at least one member actually has. */
const FACET_ORDER: Partial<Record<FacetKey, string[]>> = {
  // Ranked facets read in their own order, not alphabetically: "Building
  // familiarity, Strong background, Working knowledge" is a list of three
  // unrelated things; high to low is a scale.
  web3: ['high', 'moderate', 'low'],
  availability: ['available', 'limited', 'by_introduction'],
};

export function buildFacets(crew: CrewMember[]) {
  const collect = (fn: (m: CrewMember) => string[] | null, key?: FacetKey) => {
    const set = new Set<string>();
    crew.forEach((m) => (fn(m) ?? []).forEach((v) => set.add(v)));
    const order = key ? FACET_ORDER[key] : undefined;
    if (!order) return [...set].sort();
    return [...set].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  };

  return {
    role: collect((m) => m.roles),
    sector: collect((m) => m.sectors),
    market: collect((m) => m.markets),
    language: collect((m) => m.languages),
    nationality: collect((m) => (m.nationality ? [m.nationality] : [])),
    web3: collect((m) => (m.web3Level ? [m.web3Level] : []), 'web3'),
    availability: collect((m) => [m.availability], 'availability'),
  } satisfies Record<FacetKey, string[]>;
}

export const WEB3_LABELS: Record<Web3Level, string> = {
  low: 'Building familiarity',
  moderate: 'Working knowledge',
  high: 'Strong background',
};

/** Chip-length version of the same scale, for places a sentence will not fit. */
export const WEB3_SHORT: Record<Web3Level, string> = {
  low: 'Familiar',
  moderate: 'Working',
  high: 'Strong',
};

export const ENGAGEMENT_LABELS: Record<EngagementMode, string> = {
  monthly: 'Monthly',
  one_off: 'One-off',
  both: 'Monthly or one-off',
};

/** Human label for any facet value, so the filter UI never shows a raw slug. */
export function facetLabel(key: FacetKey, value: string) {
  if (key === 'role') return ROLE_LABELS[value as CrewRoleSlug] ?? value;
  if (key === 'availability') return AVAILABILITY_LABELS[value as Availability] ?? value;
  if (key === 'web3') return WEB3_LABELS[value as Web3Level] ?? value;
  return value;
}

export const FACET_LABELS: Record<FacetKey, string> = {
  role: 'Role',
  sector: 'Sector',
  market: 'Market',
  language: 'Language',
  nationality: 'Nationality',
  web3: 'Web3 knowledge',
  availability: 'Availability',
};

/* ------------------------------------------------------------------- view */

/**
 * How the results are laid out. Two, not the file-manager's eight: a card wall
 * and a compact row. The sizes in between (small / medium / large icons) are
 * the same layout at different scales, which is a preference, not a different
 * way of reading the list — and every extra option is one more thing to
 * choose before you have found anyone.
 */
export type ViewKey = 'grid' | 'list';

export const VIEW_LABELS: Record<ViewKey, string> = {
  grid: 'Grid',
  list: 'List',
};

/* ------------------------------------------------------------------- sort */

export type SortKey = 'featured' | 'name' | 'web3' | 'availability';

export const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  name: 'Name A-Z',
  web3: 'Web3 knowledge',
  availability: 'Availability',
};

const WEB3_RANK: Record<Web3Level, number> = { high: 0, moderate: 1, low: 2 };
const AVAILABILITY_RANK: Record<Availability, number> = {
  available: 0,
  limited: 1,
  by_introduction: 2,
};

/**
 * Featured order is the editorial one: top performing, then the rest of the
 * verified core crew, then the representation roster — the same hierarchy the
 * badges state, so the grid never contradicts them. Every sort falls back to
 * name, so the order is stable and does not depend on array order.
 */
const CHINESE_MEMBERS = ['adam-gee', 'ak', 'arion', 'candy-lim', 'ning-chan'];

export function sortCrew(crew: CrewMember[], sort: SortKey = 'featured') {
  const byName = (a: CrewMember, b: CrewMember) => a.displayName.localeCompare(b.displayName);
  const rank = (m: CrewMember) => {
    if (m.topPerforming) return 0;
    if (CHINESE_MEMBERS.includes(m.slug)) return 3;
    return m.verified ? 1 : 2;
  };

  return [...crew].sort((a, b) => {
    if (sort === 'name') return byName(a, b);
    if (sort === 'web3') {
      const d = (WEB3_RANK[a.web3Level ?? 'low'] ?? 3) - (WEB3_RANK[b.web3Level ?? 'low'] ?? 3);
      return d || byName(a, b);
    }
    if (sort === 'availability') {
      const d = AVAILABILITY_RANK[a.availability] - AVAILABILITY_RANK[b.availability];
      return d || byName(a, b);
    }
    return rank(a) - rank(b) || byName(a, b);
  });
}

export type CrewQuery = Partial<Record<FacetKey, string[]>> & { q?: string };

export function filterCrew(crew: CrewMember[], query: CrewQuery) {
  const has = (selected: string[] | undefined, values: string[] | null) =>
    !selected?.length || (values ?? []).some((v) => selected.includes(v));

  const term = query.q?.trim().toLowerCase();

  return crew.filter(
    (m) =>
      has(query.role, m.roles) &&
      has(query.sector, m.sectors) &&
      has(query.market, m.markets) &&
      has(query.language, m.languages) &&
      has(query.nationality, m.nationality ? [m.nationality] : []) &&
      has(query.web3, m.web3Level ? [m.web3Level] : []) &&
      has(query.availability, [m.availability]) &&
      (!term ||
        [
          m.displayName,
          m.headline,
          m.role,
          m.nationality ?? '',
          m.baseCity ?? '',
          ...(m.languages ?? []),
          ...m.capabilities,
          ...m.credentials,
        ]
          .join(' ')
          .toLowerCase()
          .includes(term)),
  );
}
