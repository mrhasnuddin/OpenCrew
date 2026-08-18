/**
 * OPENCREW Labs core team + advisors.
 *
 * Sources: OPENCREW V3.pdf p18–19 (Adam Gee, Amir Leo, AK, Arion) and direct
 * input from the person for Dean. Credential lines follow V3's own format —
 * title, then verifiable positions, then a capability tagline.
 *
 * `null` fields are genuinely unknown, not placeholders to be filled with a
 * plausible guess. This site's entire proposition is verifiable people; an
 * invented market or language on a real person's profile is the one error the
 * business cannot afford. See docs/00-brand-identity.md §7.2.
 */

export type Tier = 'public' | 'named_on_request' | 'confidential';

export type TeamMember = {
  slug: string;
  tier: Tier;
  displayName: string;
  initials: string;
  role: string;
  /** Verifiable positions, most relevant first. */
  credentials: string[];
  /** Capability tagline — rendered as mono caps, V3's own convention. */
  capabilities: string[];
  /** Public-facing formats this member actually performs. */
  formats?: string[];
  markets: string[] | null;
  languages: string[] | null;
  links: { linkedin?: string; x?: string };
  portrait: string | null;
  verified: boolean;
};

export const LEADERSHIP: TeamMember[] = [
  {
    slug: 'adam-gee',
    tier: 'public',
    displayName: 'Adam Gee',
    initials: 'AG',
    role: 'Co-Founder, OPENCREW Labs',
    credentials: [
      'Founder, ASEAN Labs',
      'Director, ENI Singapore Foundation',
      'Former CEO, Game Space',
      'Former Co-Founder, HGEX',
    ],
    capabilities: ['Web3 ecosystem', 'RWA', 'Project strategy', 'Institutional access'],
    markets: null,
    languages: null,
    links: {},
    // 1:1 crop from a fireside-panel stage photo (2560×1920 source).
    portrait: '/thumbnail/adam-square.jpg',
    verified: true,
  },
  {
    slug: 'amir-leo',
    tier: 'public',
    displayName: 'Amir Leo',
    initials: 'AL',
    role: 'Co-Founder, OPENCREW Labs',
    credentials: [
      'CEO, PAYGO',
      'COO, ASEAN Labs',
      'Eight years of experience in the digital asset industry',
      'Extensive experience across Malaysia and Southeast Asia',
    ],
    capabilities: [
      'Project strategy',
      'Ecosystem growth',
      'Global operations',
      'Regional execution',
    ],
    markets: null,
    languages: null,
    links: {},
    // 1:1 crop from the supplied conference stage photo (640×640 source).
    portrait: '/thumbnail/amir-square.jpg',
    verified: true,
  },
  {
    slug: 'ak',
    tier: 'public',
    displayName: 'AK',
    initials: 'AK',
    role: 'Co-Founder, OPENCREW Labs',
    credentials: [
      'CMO, ENIPAY',
      'Founder, Shenzhen CXA Investment Consulting Co., Ltd.',
      'Over 11 years of experience in finance and entrepreneurship',
      'Professional experience related to CICC and Guotai Junan International',
    ],
    capabilities: ['OTC derivatives', 'Business strategy', 'Cross-border BD', 'Web3 growth'],
    markets: null,
    languages: null,
    links: {},
    // 1:1 crop from the supplied studio portrait (828×1280 source).
    portrait: '/thumbnail/ak-square.jpg',
    verified: true,
  },
  {
    slug: 'dean',
    tier: 'public',
    displayName: 'Dean',
    initials: 'D',
    role: 'CMO, OPENCREW Labs',
    credentials: [
      'CMO, ASEAN Labs',
      'COO, PAYGO',
      'Five years of experience in crypto and Web3 (since 2021)',
      'UI/UX designer and front-end developer',
    ],
    capabilities: [
      'Brand & growth',
      'Product design',
      'Community communication',
      'Public representation',
    ],
    // Maps directly to the Global Representation capability — this is a member
    // who actually appears, which is the claim the whole service rests on.
    formats: ['AMA', 'Discord', 'X Spaces', 'Offline speaking'],
    markets: null,
    languages: null,
    links: {},
    // 1:1 crop from the Monster Gamers soft-launch stage photo (Bali, Aug 2025).
    // Source is 1080×720, so the square tops out at 268px — crisp to ~134px
    // displayed at 2×. Fine for the card; replace with a shot portrait when the
    // session happens. See docs/00-brand-identity.md §5.
    portrait: '/thumbnail/dean-square.jpg',
    verified: true,
  },
];

export const ADVISORS: TeamMember[] = [
  {
    slug: 'arion',
    tier: 'public',
    displayName: 'Arion',
    initials: 'A',
    role: 'Strategic Advisor, OPENCREW Labs',
    credentials: [
      'CEO, ENI Chain',
      'Former Director, Hong Kong Exchanges and Clearing',
      'Former Director, OSL Hong Kong',
    ],
    capabilities: [
      'Traditional finance',
      'Digital assets',
      'Exchanges',
      'Blockchain ecosystem',
      'Global strategy',
    ],
    markets: null,
    languages: null,
    links: {},
    // 1:1 crop from the supplied speaking photo (422×478 source, inset to
    // clear its rounded-corner alpha).
    portrait: '/thumbnail/arion-square.jpg',
    verified: true,
  },
];

/** V3 p19 — the five categories of the wider network, not headcount claims. */
export const TALENT_NETWORK_CATEGORIES = [
  'Executives',
  'Technology',
  'Finance & Payments',
  'Market & IP',
  'Regional Representatives',
] as const;
