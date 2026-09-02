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

/** How an applicant can be engaged — their own answer on the application. */
export type EngagementMode = 'monthly' | 'one_off' | 'both';
/** Self-declared Web3 familiarity, verbatim from the application. */
export type Web3Level = 'low' | 'moderate' | 'high';

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
  /**
   * OPENCREW has checked this person's identity and stated positions.
   * NEVER set true for a member we have only received an application from —
   * the badge is the whole proposition (docs/00-brand-identity.md §7.2).
   */
  verified: boolean;
  topPerforming?: boolean;

  /* --- representation-network attributes (from the application file) ------
     Present only for members who applied through the representation intake;
     the core crew carry credentials instead. Every value below is the
     applicant's own answer, normalised in wording only (e.g. the nationality
     field's "United Kingdom" is rendered as the demonym "British"). Age is
     deliberately NOT stored: it is on the application, it is not a
     professional credential, and this repository is public. */
  nationality?: string;
  baseCity?: string;
  /** Willing to travel outside their base market for an engagement. */
  outstation?: boolean;
  engagement?: EngagementMode;
  web3Level?: Web3Level;
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
    topPerforming: true,
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
    // 1:1 crop from the Monster Gamers soft-launch stage photo (Bali, Aug 2025),
    // re-cut from the taller source at 640px. Replace with a shot portrait when
    // the session happens. See docs/00-brand-identity.md §5.
    portrait: '/thumbnail/dean-square.jpg',
    verified: true,
    topPerforming: true,
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

export const NETWORK: TeamMember[] = [
  {
    slug: 'timothy-marvelous',
    tier: 'public',
    displayName: 'Timothy Marvelous',
    initials: 'TM',
    role: 'Web3 Marketing & Growth Professional',
    credentials: [
      'Marketing & Growth at HGEN, Game Space, PayGo',
      'Web3 promotion and community growth',
      'X/Twitter marketing campaigns',
    ],
    capabilities: [
      'Web3 Marketing',
      'X/Twitter Marketing',
      'Community Management',
      'Growth Marketing',
      'Content Strategy',
      'Ambassador Programs',
    ],
    markets: null,
    languages: null,
    links: {
      linkedin: 'https://www.linkedin.com/in/timothy-marvelous-28796833a',
      x: 'https://x.com/MarvTimoth58362',
    },
    portrait: '/thumbnail/timothy-square.jpg',
    verified: true,
  },
  {
    slug: 'deepak-sharma',
    tier: 'public',
    displayName: 'Deepak Sharma',
    initials: 'DS',
    role: 'Community & Ecosystem Contributor',
    credentials: [
      'Community Leader at EraX.io',
      'Contributor at StartFi.io',
      'Web3 VC at HGenDAO',
      'GameFi Contributor at Gamespace',
    ],
    capabilities: [
      'Community building',
      'Token launches',
      'Web3 ecosystems',
      'Venture capital',
      'Market cycles',
    ],
    markets: null,
    languages: null,
    links: {
      linkedin: 'https://www.linkedin.com/in/deepak-sharma-542b6477/',
    },
    portrait: '/thumbnail/deepak-sharma.jpg',
    verified: true,
  },
];

/**
 * Representation network — applicants from the representation intake
 * (crews.docx, received Aug 2026). These are people OPENCREW can deploy as
 * international spokespersons and public representatives; they are NOT core
 * crew and carry `verified: false` until OPENCREW has run its own check, so
 * neither the Verified nor the Top Performing badge shows on them. The whole
 * site rests on that distinction being honest.
 *
 * Every field is the applicant's own answer. Where the form was left blank
 * the value is null — the house rule (see the file header) does not relax
 * because the roster got bigger.
 */
export const REPRESENTATION: TeamMember[] = [
  {
    slug: 'richard-feynman',
    tier: 'public',
    displayName: 'Richard Feynman',
    initials: 'RF',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['German', 'English'],
    links: {},
    portrait: '/thumbnail/richard-feynman-square.jpg',
    verified: false,
    nationality: 'German',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'moderate',
  },
  {
    slug: 'nickson-taylor',
    tier: 'public',
    displayName: 'Nickson Taylor',
    initials: 'NT',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/nickson-taylor-square.jpg',
    verified: false,
    nationality: 'British',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'james-bernard',
    tier: 'public',
    displayName: 'James Bernard',
    initials: 'JB',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Philippines'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/james-bernard-square.jpg',
    verified: false,
    nationality: 'American',
    baseCity: 'Philippines',
    outstation: true,
    engagement: 'both',
    web3Level: 'high',
  },
  {
    slug: 'derek-williams',
    tier: 'public',
    displayName: 'Derek Williams',
    initials: 'DW',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/derek-williams-square.jpg',
    verified: false,
    nationality: 'British',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'moderate',
  },
  {
    slug: 'brad-johnson',
    tier: 'public',
    displayName: 'Brad Johnson',
    initials: 'BJ',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English', 'Arabic'],
    links: {},
    portrait: '/thumbnail/brad-johnson-square.jpg',
    verified: false,
    nationality: 'Australian',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'moderate',
  },
  {
    slug: 'charles-smith',
    tier: 'public',
    displayName: 'Charles Smith',
    initials: 'CS',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Philippines'],
    languages: ['French', 'English'],
    links: {},
    portrait: '/thumbnail/charles-smith-square.jpg',
    verified: false,
    nationality: 'Belgian',
    baseCity: 'Bohol, Philippines',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'rad-miller',
    tier: 'public',
    displayName: 'Rad Miller',
    initials: 'RM',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/rad-miller-square.jpg',
    verified: false,
    nationality: 'German',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'jack-garcia',
    tier: 'public',
    displayName: 'Jack Garcia',
    initials: 'JG',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/jack-garcia-square.jpg',
    verified: false,
    nationality: 'Irish',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'luke-robinson',
    tier: 'public',
    displayName: 'Luke Robinson',
    initials: 'LR',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English'],
    links: {},
    portrait: '/thumbnail/luke-robinson-square.jpg',
    verified: false,
    nationality: 'British',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'candy-lim',
    tier: 'public',
    displayName: 'Candy Lim',
    initials: 'CL',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['English', 'Mandarin'],
    links: {},
    portrait: '/thumbnail/candy-lim-square.jpg',
    verified: false,
    nationality: 'Malaysian Chinese',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'ning-chan',
    tier: 'public',
    displayName: 'Ning Chan',
    initials: 'NC',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    languages: ['French', 'English'],
    links: {},
    portrait: '/thumbnail/ning-chan-square.jpg',
    verified: false,
    nationality: 'Malaysian Chinese',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'filipa',
    tier: 'public',
    displayName: 'Filipa',
    initials: 'F',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Malaysia'],
    // The application's language field was left blank — null, never guessed.
    languages: null,
    links: {},
    portrait: '/thumbnail/filipa-square.jpg',
    verified: false,
    nationality: 'Filipino',
    baseCity: 'Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
  },
  {
    slug: 'kristina',
    tier: 'public',
    displayName: 'Kristina',
    initials: 'K',
    role: 'International Spokesperson',
    // No credential lines: the representation intake does not ask for
    // positions. The attributes below are what the application supplies, and
    // they are what a client actually selects a representative on.
    credentials: [],
    capabilities: [],
    markets: ['Indonesia', 'Malaysia'],
    languages: ['Russian', 'English'],
    links: {},
    portrait: '/thumbnail/kristina-square.jpg',
    verified: false,
    nationality: 'Russian',
    baseCity: 'Bali, Indonesia and Kuala Lumpur',
    outstation: true,
    engagement: 'both',
    web3Level: 'low',
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
