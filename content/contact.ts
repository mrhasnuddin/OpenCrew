/**
 * Contact details — PLACEHOLDERS.
 *
 * Every channel the site exposes is defined here and nowhere else, so going
 * live is a single edit to this file. `href: null` renders the value as plain
 * text rather than a dead link — a mailto: that goes nowhere is worse than a
 * label that is honestly not yet a link.
 */

export type Channel = {
  key: string;
  label: string;
  value: string;
  href: string | null;
};

export const CONTACT: Channel[] = [
  { key: 'email', label: 'Email', value: '【contact email】', href: null },
  { key: 'telegram', label: 'Telegram', value: '【telegram handle】', href: null },
  { key: 'whatsapp', label: 'WhatsApp', value: '【whatsapp number】', href: null },
];

/** Where counterparties send role-verification requests (legal/disclosure). */
export const VERIFICATION_EMAIL = '【verification email】';

/** Social presence. Same rule: null href renders unlinked. */
export const SOCIAL: Channel[] = [
  { key: 'linkedin', label: 'LinkedIn', value: '【linkedin】', href: null },
  { key: 'x', label: 'X', value: '【x handle】', href: null },
];

/**
 * Target for a composed brief. Until a form endpoint exists, the intake engine
 * hands the brief to the user as a mailto draft and a copyable block rather
 * than showing a success screen for a submission that went nowhere.
 */
export const BRIEF_EMAIL: string | null = null;

export const RESPONSE_TIME = 'We reply to every project within two business days.';
