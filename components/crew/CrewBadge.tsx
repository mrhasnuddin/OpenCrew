import { cn } from '@/lib/utils';
import type { CrewMember } from '@/content/crew';

/**
 * Roster badges, in the reference marketplace's manner (a small, loud pill on
 * the card) but tied to something real rather than to a sales tier:
 *
 *  TOP PERFORMING — the three members OPENCREW puts forward first.
 *  VERIFIED       — identity and stated positions checked by OPENCREW.
 *
 * A member with neither badge shows neither. That is the point: a badge that
 * everyone carries says nothing, and on a site whose whole proposition is
 * verifiable people, an unearned badge is the one thing we cannot ship
 * (docs/00-brand-identity.md §7.2). The representation roster is listed
 * openly and carries no badge until it has been checked.
 */
export type BadgeKind = 'top-performing' | 'verified';

export function badgeFor(member: CrewMember): BadgeKind | null {
  if (member.topPerforming) return 'top-performing';
  if (member.verified) return 'verified';
  return null;
}

const LABEL: Record<BadgeKind, string> = {
  'top-performing': 'Top performing',
  verified: 'Verified',
};

export function CrewBadge({ kind, className }: { kind: BadgeKind; className?: string }) {
  const gold = kind === 'top-performing';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-1',
        'font-label text-2xs font-semibold tracking-[0.06em] whitespace-nowrap uppercase',
        gold
          ? 'bg-accent text-on-accent'
          : 'border border-[color-mix(in_oklab,var(--gold-500)_45%,transparent)] bg-[color-mix(in_oklab,var(--ink-1000)_72%,transparent)] text-accent-text backdrop-blur-[6px]',
        className,
      )}
    >
      {gold ? <Diamonds /> : <Check />}
      {LABEL[kind]}
    </span>
  );
}

function Diamonds() {
  return (
    <svg viewBox="0 0 22 8" className="h-[7px] w-[19px]" fill="currentColor" aria-hidden="true">
      <path d="M4 0 8 4 4 8 0 4z" />
      <path d="M11 0 15 4 11 8 7 4z" />
      <path d="M18 0 22 4 18 8 14 4z" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="size-[11px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 6.4 4.9 8.8 9.6 3.4" />
    </svg>
  );
}
