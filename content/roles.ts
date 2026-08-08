/**
 * Role pages — the acquisition surface.
 *
 * `engagement` and `valueToProject` are V3's own role-table columns (p7) and
 * ship verbatim. The remaining fields describe what a role does, not what any
 * individual has done — they are role definitions, never claims about people.
 * Anything asserting a person's record belongs in content/crew.ts.
 *
 * Commercial answers stay honest: no public pricing, no promised outcomes.
 */

import type { CrewRoleSlug } from './crew';

export type Role = {
  slug: CrewRoleSlug;
  name: string;
  /** Search-facing title. "Fractional" is the term the buyer actually types. */
  title: string;
  lead: string;
  /** V3 verbatim. */
  engagement: string;
  valueToProject: string;
  owns: string[];
  triggers: string[];
  first90: string[];
  shapes: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

const COMMON_FAQ = (role: string) => [
  {
    q: 'Is this a full-time hire?',
    a: `Usually not. Most ${role} deployments are fractional — a defined scope, a defined time commitment, and a defined set of responsibilities. Some deepen into full-time over the course of an engagement, and some stay advisory. The shape is set during project assessment, not assumed.`,
  },
  {
    q: 'Does this person appear publicly as part of our team?',
    a: 'Yes, where that is what the role requires — that is the point of deployment rather than introduction. Public engagement is one of our four participation standards. What we do not do is lend a name to a team page without the work behind it.',
  },
  {
    q: 'How quickly can someone start?',
    a: 'It depends on the seat and the market. A regional lead in a market we already cover moves faster than a specialised technical role. We would rather tell you a realistic date than an optimistic one.',
  },
  {
    q: 'What does it cost?',
    a: 'Commercials are scoped per project — the role, the time commitment and the engagement model all move the number. Tell us the stage and the markets and we will come back with a shape.',
  },
  {
    q: 'What happens if the fit is wrong?',
    a: 'We replace the member. A deployment that is not working is our problem to solve, and a mismatch caught early costs far less than one carried through an exchange application.',
  },
  {
    q: 'Can this person support an exchange application?',
    a: 'Where the role is relevant, yes — team structure, KYC documentation and English interview preparation are part of Exchange Readiness. Final review, investment and listing decisions are made independently by the relevant institutions.',
  },
];

export const ROLES_CONTENT: Role[] = [
  {
    slug: 'ceo-coo',
    name: 'CEO / COO',
    title: 'Deploy a global CEO or COO into your project.',
    lead: 'An executive who can hold strategic planning, sit in institutional meetings, and speak publicly for the project in international markets.',
    engagement: 'Strategic planning, institutional meetings and public speaking',
    valueToProject: 'Leadership and international credibility',
    owns: [
      'International strategy and organisational structure',
      'Institutional and investor meetings',
      'Public speaking and keynote representation',
      'Executive presence in due-diligence processes',
      'Long-term operating cadence',
    ],
    triggers: [
      'The team is strong technically but has no one who can carry an institutional room',
      'An exchange or fund has asked questions the current team cannot answer in English',
      'Decision-making sits in one region and the market reads it that way',
      'The project is entering a market where it has no operating presence',
    ],
    first90: [
      'Assessment of team structure, roles and gaps',
      'International organisational structure defined and documented',
      'Executive materials and public profile prepared',
      'First institutional and partner meetings taken',
      'Operating cadence established with the founding team',
    ],
    shapes: [
      { title: 'Advisory executive', body: 'Strategic input, key meetings, public representation at defined moments.' },
      { title: 'Fractional executive', body: 'A standing role with defined responsibilities and a recurring commitment.' },
      { title: 'Co-building executive', body: 'Deep involvement through a critical growth stage, with aligned incentives.' },
    ],
    faq: COMMON_FAQ('CEO / COO'),
  },
  {
    slug: 'cto-product',
    name: 'CTO / Product',
    title: 'Deploy a CTO or product lead who can communicate the technology.',
    lead: 'Technical credibility is not the same as technical capability. This role makes the second legible to auditors, exchanges and investors.',
    engagement: 'Technical communication, product review and due diligence responses',
    valueToProject: 'Credible technical and product communication',
    owns: [
      'Technical narrative and architecture explanation',
      'Product review and roadmap articulation',
      'Due-diligence and audit question responses',
      'Technical sections of exchange and institutional documentation',
      'Developer and partner technical conversations',
    ],
    triggers: [
      'Due-diligence questions are arriving faster than the team can answer them',
      'The technology is strong but no one outside the team can explain it',
      'An audit engagement needs a counterpart who can hold the conversation',
      'Technical documentation exists only in one language',
    ],
    first90: [
      'Technical narrative and architecture summary produced',
      'Due-diligence question bank drafted with responses',
      'Product and token documentation reviewed',
      'Audit and security partner conversations supported',
      'Technical materials prepared in English',
    ],
    shapes: [
      { title: 'Technical advisor', body: 'Review, documentation and diligence support at defined intervals.' },
      { title: 'Fractional CTO', body: 'A standing technical counterpart for institutional and partner conversations.' },
    ],
    faq: COMMON_FAQ('CTO / Product'),
  },
  {
    slug: 'cmo-growth',
    name: 'CMO / Growth',
    title: 'Hire a fractional global CMO for your Web3 or AI project.',
    lead: 'A marketing lead who owns international positioning, narrative and market communication — deployed into the project with a defined role, not a logo on a slide.',
    engagement: 'Brand positioning, market strategy and global communications',
    valueToProject: 'A consistent brand and global growth direction',
    owns: [
      'International brand positioning and narrative',
      'Market strategy and go-to-market sequencing',
      'Global communications and content system',
      'Founder and project public presence',
      'Community and campaign direction',
    ],
    triggers: [
      'The product is understood at home and nowhere else',
      'Announcements land without compounding into recognition',
      'The English narrative reads as a translation rather than a position',
      'Growth is happening but no one owns the direction of it',
    ],
    first90: [
      'Positioning and core narrative defined',
      'English brand and project materials rebuilt',
      'Communication system and channel cadence established',
      'Launch or campaign sequence planned for target markets',
      'Community and content operations handed a working playbook',
    ],
    shapes: [
      { title: 'Advisory CMO', body: 'Positioning, narrative and strategic direction without day-to-day execution.' },
      { title: 'Fractional CMO', body: 'A standing marketing lead with defined ownership and recurring involvement.' },
      { title: 'CMO plus execution', body: 'The role paired with Market Execution so direction and delivery are not split.' },
    ],
    faq: COMMON_FAQ('CMO / Growth'),
  },
  {
    slug: 'advisor',
    name: 'Advisor',
    title: 'Add a strategic advisor with real institutional reach.',
    lead: 'Strategic advice, resource connections and presence in the meetings that decide things — from someone whose involvement can be verified.',
    engagement: 'Strategic advice, resource connections and critical meetings',
    valueToProject: 'Professional endorsement and decision support',
    owns: [
      'Strategic guidance at decision points',
      'Introductions to relevant institutions',
      'Participation in critical meetings',
      'Governance and structural input',
      'Endorsement grounded in actual involvement',
    ],
    triggers: [
      'A decision needs judgement the team has not made before',
      'The right institutions are known but not reachable',
      'An advisory board reads thin under diligence',
      'A specific market or regulatory context is unfamiliar',
    ],
    first90: [
      'Advisory scope and cadence agreed',
      'Public profile and role documented',
      'Priority institutional introductions mapped',
      'First critical meetings attended',
    ],
    shapes: [
      { title: 'Named advisor', body: 'A public advisory role with a defined scope and regular involvement.' },
      { title: 'Institutional relations advisor', body: 'Focused on capital, exchange and ecosystem relationships.' },
    ],
    faq: COMMON_FAQ('advisor'),
  },
  {
    slug: 'consultant',
    name: 'Consultant',
    title: 'Deploy a consultant who can explain the project, repeatedly.',
    lead: 'Project presentations, community training and AMA sessions — the continuous explaining that turns a launch into understanding.',
    engagement: 'Project presentations, community training, AMA sessions and core market meetings',
    valueToProject: 'Clearer market understanding and continuous community communication',
    owns: [
      'Project presentations and pitch delivery',
      'Community training and education programmes',
      'AMA sessions, Spaces and online events',
      'Core market meetings',
      'Ongoing explanation as the product changes',
    ],
    triggers: [
      'Each announcement resets the market rather than building on the last',
      'The community asks the same questions every cycle',
      'AMAs and events need someone who can hold a room in English',
      'Understanding drops off outside the home market',
    ],
    first90: [
      'Core presentation and message set produced',
      'Community education programme drafted',
      'First AMA and event series delivered',
      'Question bank built from what the community actually asks',
    ],
    shapes: [
      { title: 'Project consultant', body: 'Presentations, AMAs and market meetings on a recurring cadence.' },
      { title: 'Education lead', body: 'A structured community education programme run over months.' },
    ],
    faq: COMMON_FAQ('consultant'),
  },
  {
    slug: 'regional-lead',
    name: 'Regional Lead',
    title: 'Put a regional lead on the ground in your target market.',
    lead: 'Local business development, community development, events and partnership follow-up — the work that only happens when someone is actually there.',
    engagement: 'Local BD, community development, events and partnership follow-up',
    valueToProject: 'Regional execution and continuous market advancement',
    owns: [
      'Local business development and partner pipeline',
      'Regional community development',
      'Events, meetups and local representation',
      'Partnership follow-up and relationship maintenance',
      'Market feedback into project strategy',
    ],
    triggers: [
      'A market is a priority on paper and unattended in practice',
      'Partnerships are signed and then go quiet',
      'Conferences happen in a region with no one to attend them',
      'Local community growth has stalled without local presence',
    ],
    first90: [
      'Market map and priority partner list built',
      'Local community channels established or revived',
      'First partner and ecosystem meetings taken',
      'Event and meetup calendar set for the region',
    ],
    shapes: [
      { title: 'Market entry lead', body: 'Establishing presence in a market the project has not operated in.' },
      { title: 'Standing regional lead', body: 'Continuous local execution and partnership maintenance.' },
    ],
    faq: COMMON_FAQ('regional lead'),
  },
];

export function getRole(slug: string) {
  return ROLES_CONTENT.find((r) => r.slug === slug);
}
