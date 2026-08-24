'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AvailabilityDot } from '@/components/ui/Chip';
import { CrewBadge, badgeFor } from './CrewBadge';
import { useShortlist } from '@/lib/shortlist';
import { cn } from '@/lib/utils';
import {
  ROLE_LABELS,
  AVAILABILITY_LABELS,
  ENGAGEMENT_LABELS,
  WEB3_SHORT,
  type CrewMember,
  type ViewKey,
} from '@/content/crew';

/**
 * A roster entry, in the two layouts the directory offers.
 *
 *  card — the wall: square portrait, badge over it, credentials or attributes,
 *         tags, and a base row. For browsing.
 *  row  — the compact line: 92px thumbnail, identity, save. About a third of
 *         the card's height, which is what makes twenty people readable on a
 *         phone; on a wide screen the row keeps a detail line, so it also
 *         serves as the scan-and-compare view for building a shortlist.
 *
 * One component, one DOM, and the layout is decided on the server from the URL
 * — switching duplicates no markup and never flashes. The two arrangements
 * differ in what they can afford to show, never in what is true: a row drops
 * detail, it does not invent any.
 *
 * A11y: exactly one stretched link (the name), so the whole entry is a single
 * target and its accessible name comes from the heading. The save control sits
 * above that link and stops propagation, which is why it is not a second link.
 */
export function CrewCard({ member, view = 'grid' }: { member: CrewMember; view?: ViewKey }) {
  const isList = view === 'list';
  const { has, toggle, isFull } = useShortlist();
  const added = has(member.slug);
  const blocked = !added && isFull;
  const isPublic = member.tier === 'public';
  const badge = badgeFor(member);
  const name = isPublic ? member.displayName : 'Named on request';

  // One control, placed by layout: over the portrait in the card, on the rail
  // in the row, where a 92px thumbnail has no room for it.
  const saveControl = (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(member.slug);
      }}
      disabled={blocked}
      aria-pressed={added}
      aria-label={added ? `Remove ${name} from your crew` : `Add ${name} to your crew`}
      className={cn(
        'z-10 flex size-[36px] shrink-0 items-center justify-center rounded-full',
        '[@media(pointer:coarse)]:size-[44px]',
        isList ? 'relative' : 'absolute top-5 right-5',
        'border backdrop-blur-[6px] transition-[color,border-color,background-color] duration-[var(--dur-fast)] ease-hover',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
        added
          ? 'border-accent bg-accent text-on-accent'
          : 'border-ink-600 bg-[color-mix(in_oklab,var(--ink-1000)_65%,transparent)] text-ink-100 hover:border-accent hover:text-accent-text',
        blocked && 'cursor-not-allowed opacity-45',
      )}
    >
      <Bookmark filled={added} />
    </button>
  );

  const portrait = member.portrait ? (
    <Image
      src={member.portrait}
      alt=""
      fill
      sizes={isList ? '112px' : '(min-width: 1280px) 340px, (min-width: 640px) 45vw, 100vw'}
      // Top-biased anchor still matters for any non-square source.
      className="object-cover object-[50%_15%] transition-transform duration-[var(--dur-slow)] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
    />
  ) : (
    <span className="flex h-full w-full items-center justify-center bg-ink-800 text-3xl font-medium text-ink-300">
      {member.initials}
    </span>
  );

  const nameLink = (
    <Link
      href={`/crew/${member.slug}`}
      className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-focus after:focus-visible:outline-offset-2"
    >
      {name}
    </Link>
  );

  const shell = cn(
    'crew-card card-glass card-glass-hover group relative flex overflow-hidden rounded-lg p-0',
    'transition-[border-color,transform] duration-[var(--dur-base)] ease-out',
    '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]',
  );

  /* ------------------------------------------------------------------ row */
  if (isList) {
    return (
      <li className={cn(shell, 'h-auto flex-row items-stretch')}>
        <div className="relative aspect-square w-[92px] shrink-0 overflow-hidden border-r border-border bg-ink-900 sm:w-[112px]">
          {portrait}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-5">
          <p className="flex items-center gap-3 font-label text-2xs font-semibold tracking-[0.06em] text-muted uppercase">
            <span className="truncate">{member.roleCode}</span>
            {badge ? <CrewBadge kind={badge} className="shrink-0 max-sm:hidden" /> : null}
          </p>
          <h3 className="truncate text-base font-bold text-text sm:text-lg">{nameLink}</h3>
          <p className="truncate text-sm text-secondary">{member.role}</p>
          {/* A wide screen has room to compare on, so the row carries the line
              a shortlist is actually built from. */}
          <p className="mt-1 hidden truncate text-sm text-muted lg:block">{rowDetail(member)}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center gap-4 border-l border-border px-5 py-5 text-right">
          {saveControl}
          <span className="hidden sm:block">
            <AvailabilityDot state={member.availability} />
          </span>
        </div>
      </li>
    );
  }

  /* ----------------------------------------------------------------- card */
  return (
    <li className={cn(shell, 'h-full flex-col')}>
      {/* Square, because every portrait in the roster is a 1:1 crop: a
          landscape cover would crop a face that is already framed, and on a
          people directory the face is the content. */}
      <div className="relative aspect-square w-full overflow-hidden border-b border-border bg-ink-900">
        {portrait}

        {/* keeps the badge legible over any photograph */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(180deg,rgb(0_0_0/0.6),transparent)]"
        />

        {badge ? <CrewBadge kind={badge} className="absolute top-5 left-5 z-10" /> : null}
        {saveControl}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="font-label text-2xs font-semibold tracking-[0.06em] text-muted uppercase">
          {member.roleCode}
        </p>
        <h3 className="mt-3 text-lg font-bold text-text">{nameLink}</h3>
        <p className="mt-1 text-sm text-secondary">{member.role}</p>

        {/* One substance block, never both: a core member's credentials
            already say what their headline says, and a representation
            member's headline is composed from the very attributes listed
            below it. Printing both was the same sentence twice. */}
        {member.track === 'core' ? (
          <ul className="mt-5 flex flex-col gap-2">
            {member.credentials.slice(0, 3).map((c) => (
              <li key={c} className="flex gap-3 text-sm text-secondary">
                <span aria-hidden="true" className="marker-dot" />
                <span className="line-clamp-1">{c}</span>
              </li>
            ))}
          </ul>
        ) : (
          <dl className="mt-5 flex flex-col gap-2 text-sm">
            <Attribute label="Nationality" value={member.nationality} />
            <Attribute label="Based in" value={member.baseCity} />
            <Attribute
              label="Languages"
              value={member.languages?.length ? member.languages.join(', ') : 'On request'}
            />
            <Attribute
              label="Engagement"
              value={member.engagement ? ENGAGEMENT_LABELS[member.engagement] : null}
            />
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-2 pt-1">
          {member.roles.slice(0, 1).map((r) => (
            <Tag key={r}>{ROLE_LABELS[r]}</Tag>
          ))}
          {member.web3Level ? <Tag>Web3 · {WEB3_SHORT[member.web3Level]}</Tag> : null}
          {member.sectors.slice(0, 1).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {member.outstation ? <Tag>Will travel</Tag> : null}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border px-6 py-5">
        <AvailabilityDot state={member.availability} />
        <span className="flex items-center gap-2 text-sm font-medium text-secondary transition-colors duration-[var(--dur-fast)] ease-hover group-hover:text-text">
          {isPublic ? 'View profile' : 'Request intro'}
          <Arrow />
        </span>
      </div>
    </li>
  );
}

/** The one line a row can afford: what this member is picked on. */
function rowDetail(member: CrewMember) {
  if (member.track === 'core') return member.credentials.slice(0, 2).join(' · ');
  return [
    member.baseCity,
    member.languages?.join(', '),
    member.engagement ? ENGAGEMENT_LABELS[member.engagement] : null,
    AVAILABILITY_LABELS[member.availability],
  ]
    .filter(Boolean)
    .join(' · ');
}

function Attribute({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-4">
      <dt className="w-[86px] shrink-0 text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 truncate text-secondary">{value}</dd>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border px-3 py-1 font-label text-2xs tracking-[0.04em] text-muted">
      {children}
    </span>
  );
}

function Bookmark({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-[15px]"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 2.5h8v11l-4-3-4 3z" />
    </svg>
  );
}

function Arrow() {
  return (
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
  );
}
