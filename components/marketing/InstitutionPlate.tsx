import Image from 'next/image';
import type { Institution } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * A single institution plate, used by the /network category grid (and as the
 * wheel's fallback styling reference).
 *
 * Renders as an external link when a verified domain exists, otherwise as a
 * plain plate — a dead anchor is worse than no anchor. The box is reserved
 * whether or not a logo exists, so swapping `logo: null` for a path is a data
 * edit, not a layout change. The monogram fallback is a designed state: a wall
 * of empty rectangles would read as broken while logo permissions are
 * outstanding.
 *
 * Marks sit greyscale at rest and resolve to colour on hover — 27 third-party
 * brand colours at once would overwhelm a palette built on one quiet accent.
 */
export function initialsOf(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export function InstitutionPlate({ item, className }: { item: Institution; className?: string }) {
  const href = item.domain ? `https://${item.domain}` : null;

  const body = (
    <>
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={120}
          height={48}
          className={cn(
            'max-h-[36px] w-auto object-contain',
            'opacity-70 grayscale transition-[filter,opacity] duration-[var(--dur-base)] ease-hover',
            'group-hover:opacity-100 group-hover:grayscale-0',
          )}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-[36px] items-center justify-center rounded-sm border border-border-strong font-mono text-2xs text-muted"
        >
          {initialsOf(item.name)}
        </span>
      )}
      <span className="text-sm leading-tight text-secondary">{item.name}</span>
      <span className="sr-only">
        {item.industry}. {item.blurb}
      </span>
    </>
  );

  const shared = cn(
    'card-glass group flex flex-col items-center justify-center gap-4 rounded-md',
    'p-5 text-center',
    'transition-[border-color,transform] duration-[var(--dur-base)] ease-out',
    '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]',
    '[@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong',
    className,
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${item.name}: ${item.blurb}`}
      className={cn(shared, 'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2')}
    >
      {body}
    </a>
  ) : (
    <div className={shared}>{body}</div>
  );
}
