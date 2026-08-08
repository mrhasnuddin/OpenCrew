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

import { LEADERSHIP, ADVISORS, type TeamMember } from '@/lib/team';

export type CrewRoleSlug =
  | 'ceo-coo'
  | 'cto-product'
  | 'cmo-growth'
  | 'advisor'
  | 'consultant'
  | 'regional-lead';

export type Availability = 'available' | 'limited' | 'by_introduction';

export type CrewMember = TeamMember & {
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
  [...LEADERSHIP, ...ADVISORS].find((m) => m.slug === slug) as TeamMember;

/**
 * Availability is `by_introduction` for all current members, and that is the
 * truthful value — you do not hire a co-founder off a directory listing.
 * `available` and `limited` become meaningful as the wider network is added.
 */
export const CREW: CrewMember[] = [
  {
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
];

export function getCrewMember(slug: string) {
  return CREW.find((m) => m.slug === slug);
}

/* ------------------------------------------------------------------ facets */

export type FacetKey = 'role' | 'sector' | 'market' | 'language' | 'availability';

export const ROLE_LABELS: Record<CrewRoleSlug, string> = {
  'ceo-coo': 'CEO / COO',
  'cto-product': 'CTO / Product',
  'cmo-growth': 'CMO / Growth',
  advisor: 'Advisor',
  consultant: 'Consultant',
  'regional-lead': 'Regional Lead',
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  available: 'Available now',
  limited: 'Limited availability',
  by_introduction: 'By introduction',
};

/** Only surfaces options that at least one member actually has. */
export function buildFacets(crew: CrewMember[]) {
  const collect = (fn: (m: CrewMember) => string[] | null) => {
    const set = new Set<string>();
    crew.forEach((m) => (fn(m) ?? []).forEach((v) => set.add(v)));
    return [...set].sort();
  };

  return {
    role: collect((m) => m.roles),
    sector: collect((m) => m.sectors),
    market: collect((m) => m.markets),
    language: collect((m) => m.languages),
    availability: collect((m) => [m.availability]),
  } satisfies Record<FacetKey, string[]>;
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
      has(query.availability, [m.availability]) &&
      (!term ||
        `${m.displayName} ${m.headline} ${m.capabilities.join(' ')} ${m.credentials.join(' ')}`
          .toLowerCase()
          .includes(term)),
  );
}
