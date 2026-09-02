import Link from 'next/link';
import Image from 'next/image';
import { CREW, getCrewMember } from '@/content/crew';
import { cn } from '@/lib/utils';

/**
 * Portrait mosaic for the "Deployed, not introduced" panel — replaces the
 * rotating orbit (client annotation: no animation here; creative and
 * professional). Static, visual-dominant, in the deck's bento language.
 *
 * A 3×3 square grid: the first-listed lead as a 2×2 tile, the other four as
 * singles, and the OC mark in the last cell so the composition closes on the
 * brand. Every tile is a real, listed member with their name and role code on
 * a plate — the same claim the panel copy makes, made visible: these are the
 * people, in the roles, verifiable. Tiles link to the profiles.
 *
 * Portraits are 1:1 crops with the head high in the frame, so the tiles are
 * square (native ratio, no re-cropping) and cover from a top-biased anchor
 * where a browser rounds the cell off-square. Scales with the column: the
 * grid is `aspect-square w-full`.
 * No motion beyond the hover state.
 */
const PLATE = 'absolute inset-x-0 bottom-0 flex flex-col p-4';

export function CrewMosaic({ className }: { className?: string }) {
  // Explicitly pick Amir, Dean, and three overseas members with professional pictures
  const selectedSlugs = ['amir-leo', 'dean', 'deepak-sharma', 'timothy-marvelous', 'brad-johnson'];
  const mosaicMembers = selectedSlugs.map(slug => getCrewMember(slug)!).filter(Boolean);
  
  const [lead, ...rest] = mosaicMembers;
  
  // Cell map for the four singles: [column, row] on the 3×3 grid.
  const cells: [number, number][] = [
    [3, 1],
    [3, 2],
    [1, 3],
    [2, 3],
  ];

  return (
    <ul
      className={cn(
        'grid aspect-square w-full grid-cols-3 grid-rows-3 gap-3 sm:gap-4',
        className,
      )}
    >
      {/* the lead, 2×2 */}
      <li className="col-span-2 row-span-2 min-w-0">
        <Tile m={lead} large sizes="(min-width: 1024px) 380px, 66vw" />
      </li>

      {rest.slice(0, 4).map((m, i) => (
        <li
          key={m.slug}
          className="min-w-0"
          style={{ gridColumn: cells[i][0], gridRow: cells[i][1] }}
        >
          <Tile m={m} sizes="(min-width: 1024px) 180px, 33vw" />
        </li>
      ))}

      {/* the brand closes the grid: bottom-right */}
      <li
        aria-hidden="true"
        className="relative min-w-0 overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--gold-500)_40%,transparent)] bg-ink-1000"
        style={{ gridColumn: 3, gridRow: 3 }}
      >
        <span
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 70% at 50% 55%, color-mix(in oklab, var(--gold-500) 22%, transparent) 0%, transparent 70%)',
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mark-2.svg" alt="" className="h-auto w-[62%]" />
        </span>
      </li>
    </ul>
  );
}

function Tile({
  m,
  sizes,
  large = false,
}: {
  m: (typeof CREW)[number];
  sizes: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/crew/${m.slug}`}
      className={cn(
        'group relative block h-full w-full overflow-hidden rounded-lg border border-ink-700 bg-ink-900',
        'transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-hover',
        'hover:border-[color-mix(in_oklab,var(--gold-500)_60%,transparent)] hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold-500)_12%,transparent)]',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
      )}
    >
      {m.portrait ? (
        <Image
          src={m.portrait}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-[50%_18%] transition-transform duration-[var(--dur-slow)] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-ink-800 text-2xl font-medium text-ink-300">
          {m.initials}
        </span>
      )}

      {/* legibility gradient behind the plate only, never on the face */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgb(0_0_0/0.9),rgb(0_0_0/0.45)_50%,transparent)]"
      />

      {large ? (
        <span className={cn(PLATE, 'gap-1 sm:p-5')}>
          <span className="eyebrow text-accent-text">{m.roleCode}</span>
          <span className="text-lg font-bold text-text sm:text-2xl">{m.displayName}</span>
          <span className="hidden text-sm text-secondary sm:block">{m.role}</span>
        </span>
      ) : (
        <span className={cn(PLATE, 'gap-1')}>
          <span className="hidden truncate font-label text-2xs font-semibold tracking-[0.06em] text-accent-text uppercase sm:block">
            {m.roleCode}
          </span>
          <span className="truncate text-xs font-semibold text-text sm:text-sm">
            {m.displayName}
          </span>
        </span>
      )}
    </Link>
  );
}
