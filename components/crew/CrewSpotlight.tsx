import Link from 'next/link';
import Image from 'next/image';
import { CrewBadge } from './CrewBadge';
import { CREW, type CrewMember } from '@/content/crew';
import { cn } from '@/lib/utils';

/**
 * Top performing crew — the roster's front row, given a layout of its own so
 * it never reads as three lucky cards in the grid: landscape, portrait on the
 * left, gold-lit surface, credentials in full rather than clamped.
 *
 * Membership is editorial and lives in the data (`topPerforming` in
 * lib/team.ts), not in this component — a card cannot promote itself, and the
 * badge on it means the same thing everywhere it appears.
 */
export function CrewSpotlight() {
  const featured = CREW.filter((m) => m.topPerforming);
  if (!featured.length) return null;

  return (
    <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {featured.map((m) => (
        <SpotlightCard key={m.slug} member={m} />
      ))}
    </ul>
  );
}

function SpotlightCard({ member }: { member: CrewMember }) {
  return (
    <li className="min-w-0">
      <Link
        href={`/crew/${member.slug}`}
        className={cn(
          'card-glass card-glass-open card-glass-hover group relative flex h-full overflow-hidden rounded-lg',
          'transition-[border-color,transform] duration-[var(--dur-base)] ease-out',
          '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]',
          'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
        )}
      >
        {/* A percentage portrait leaves the copy column too narrow on a phone,
            where these cards go full width: a fixed 130px there, back to a
            share of the card once there is room. */}
        <span className="relative block w-[130px] shrink-0 overflow-hidden sm:w-[34%]">
          {member.portrait ? (
            <Image
              src={member.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 200px, 40vw"
              className="object-cover object-[50%_18%] transition-transform duration-[var(--dur-slow)] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-ink-800 text-2xl font-medium text-ink-300">
              {member.initials}
            </span>
          )}
        </span>

        <span className="flex min-w-0 flex-1 flex-col p-6">
          <CrewBadge kind="top-performing" className="self-start" />
          <span className="mt-5 block text-xl font-bold text-text lg:text-2xl">
            {member.displayName}
          </span>
          <span className="mt-1 block text-sm text-secondary">{member.role}</span>

          <span className="mt-5 flex flex-col gap-2">
            {member.credentials.slice(0, 3).map((c) => (
              <span key={c} className="flex gap-3 text-sm text-secondary">
                <span aria-hidden="true" className="marker-dot" />
                <span className="line-clamp-2 sm:line-clamp-1">{c}</span>
              </span>
            ))}
          </span>

          <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-secondary transition-colors duration-[var(--dur-fast)] ease-hover group-hover:text-text">
            View profile
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
        </span>
      </Link>
    </li>
  );
}
