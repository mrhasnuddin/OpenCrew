'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { AvailabilityDot } from '@/components/ui/Chip';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { useShortlist } from '@/lib/shortlist';
import { cn } from '@/lib/utils';
import { ROLE_LABELS, type CrewMember } from '@/content/crew';

/**
 * Crew card — four stacked blocks separated by hairlines: identity, experience,
 * niche, actions. Fixed structure so a grid never ragged-edges.
 *
 * The thumbnail is a SQUARE, not a circle. Circles crop a non-headshot badly
 * (an event photo loses its context), squares sit better in an editorial grid,
 * and they match the flat-terminal logic of the mark. Portraits are 1:1 at
 * source so `object-cover` never has to guess.
 */

const THUMB = 120;

function Thumbnail({ member }: { member: CrewMember }) {
  if (member.portrait) {
    return (
      <Image
        src={member.portrait}
        alt=""
        width={THUMB}
        height={THUMB}
        sizes="120px"
        className="size-[120px] shrink-0 rounded-md border border-border object-cover"
      />
    );
  }
  // Designed fallback, and the permanent treatment for role-only listings.
  return (
    <span
      aria-hidden="true"
      className="flex size-[120px] shrink-0 items-center justify-center rounded-md border border-gold-950 bg-ink-800 text-2xl font-medium text-ink-300"
    >
      {member.initials}
    </span>
  );
}

export function CrewCard({ member }: { member: CrewMember }) {
  const { has, toggle, isFull } = useShortlist();
  const added = has(member.slug);
  const blocked = !added && isFull;
  const isPublic = member.tier === 'public';

  return (
    <Card as="li" interactive className="flex flex-col gap-0 p-0">
      {/* ---------------------------------------------------- identity */}
      <div className="flex items-start gap-5 p-6">
        <Thumbnail member={member} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
              {member.roleCode}
            </p>
            <AvailabilityDot state={member.availability} />
          </div>
          <h3 className="mt-3 truncate text-lg font-medium text-text">
            <Link
              href={`/crew/${member.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {isPublic ? member.displayName : 'Named on request'}
            </Link>
          </h3>
          <p className="mt-1 truncate text-sm text-muted">{member.role}</p>
          {/* Relative + z so the icons stay clickable above the card overlay. */}
          <SocialIcons links={member.links} className="relative z-10 mt-4" />
        </div>
      </div>

      {/* ------------------------------------------- experience + niche
          One block, not two: a hairline between three credential lines and
          five chips made the card read as a form. Experience leads because
          it is the verifiable part; the chips scan as classification. */}
      <div className="border-t border-border px-6 py-5">
        <ul className="flex flex-col gap-2">
          {member.credentials.slice(0, 3).map((c) => (
            <li key={c} className="flex gap-3 text-sm text-secondary">
              <span aria-hidden="true" className="marker-dot" />
              <span className="line-clamp-1">{c}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-2">
          {member.roles.slice(0, 2).map((r) => (
            <li
              key={r}
              className="rounded-xs border border-gold-950 bg-accent-subtle px-3 py-1 font-mono text-2xs tracking-[0.06em] text-accent-text uppercase"
            >
              {ROLE_LABELS[r]}
            </li>
          ))}
          {member.sectors.slice(0, 3).map((s) => (
            <li
              key={s}
              className="rounded-xs border border-border px-3 py-1 font-mono text-2xs tracking-[0.06em] text-muted uppercase"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------------------- actions */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border px-6 py-4">
        <button
          type="button"
          onClick={() => toggle(member.slug)}
          disabled={blocked}
          aria-pressed={added}
          aria-label={added ? `Remove ${isPublic ? member.displayName : 'member'} from your crew` : `Add ${isPublic ? member.displayName : 'member'} to your crew`}
          className={cn(
            'relative z-10 -ml-3 inline-flex min-h-[36px] items-center gap-3 rounded-sm px-3 text-sm font-medium',
            'transition-[color,background-color,transform] duration-[var(--dur-fast)] ease-hover',
            'active:scale-[0.97] active:duration-[var(--dur-instant)]',
            'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-45',
            added ? 'text-success' : 'text-secondary hover:bg-surface-hover hover:text-text',
          )}
        >
          {/* Both glyphs share a box so the label never shifts on toggle. */}
          <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
            {added ? (
              <path
                d="M2.5 6.2 4.8 8.5 9.5 3.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M6 2v8M2 6h8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
          {added ? 'Added' : 'Add to crew'}
        </button>

        <span className="flex items-center gap-2 text-sm font-medium text-muted">
          {isPublic ? 'View profile' : 'Request intro'}
          <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
            <path
              d="M3 9 9 3M4.5 3H9v4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Card>
  );
}
