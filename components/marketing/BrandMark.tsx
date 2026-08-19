'use client';

import * as React from 'react';
import type { Institution } from '@/content/site';
import { brandfetchLogoUrl, type BrandfetchType } from '@/lib/brandfetch';
import { initialsOf } from './InstitutionPlate';
import { cn } from '@/lib/utils';

/**
 * One institution's mark, resolved in priority order:
 *   1. a local `logo` file in content (artwork we hold, with permission)
 *   2. Brandfetch CDN by `domain` (when NEXT_PUBLIC_BRANDFETCH_CLIENT_ID is set)
 *   3. the designed monogram plate
 * A CDN miss (404) or load failure drops to 3 at runtime, so the wall never
 * shows a broken image. Client component only for that onError flip.
 *
 * Marks render greyscale at rest; the surfaces that want colour on hover add
 * `group` and the `group-hover` classes via `className`.
 */
export function BrandMark({
  item,
  type = 'logo',
  h = 64,
  className,
  monogramClassName,
  children,
}: {
  item: Institution;
  type?: BrandfetchType;
  /** Requested CDN height (px); display size is set by className. */
  h?: number;
  className?: string;
  monogramClassName?: string;
  /** Rendered next to the monogram only (e.g. the name in the marquee plate). */
  children?: React.ReactNode;
}) {
  const cdn = !item.logo && item.domain ? brandfetchLogoUrl(item.domain, { type, h }) : null;
  const src = item.logo ?? cdn;
  const [failed, setFailed] = React.useState(false);

  const isDarkThemed = item.logoTheme === 'dark';

  // Dark-themed logos (pure black/dark artwork) get masked/inverted to crisp white on dark background.
  // Color logos sit in clean grayscale at rest and smoothly reveal full brand color on hover.
  const themeFilter = isDarkThemed
    ? 'brightness-0 invert opacity-70 transition-[opacity] duration-[var(--dur-base)] ease-hover group-hover:opacity-100 group-hover:brightness-0 group-hover:invert'
    : 'grayscale opacity-75 brightness-110 transition-[filter,opacity] duration-[var(--dur-base)] ease-hover group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100';

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={item.name}
        loading="lazy"
        decoding="async"
        referrerPolicy="strict-origin-when-cross-origin"
        onError={() => setFailed(true)}
        className={cn('object-contain select-none', themeFilter, className)}
      />
    );
  }

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-sm border border-border-strong font-mono text-2xs text-secondary',
          monogramClassName,
        )}
      >
        {initialsOf(item.name)}
      </span>
      {children}
    </>
  );
}
