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
 * Marks render in their OWN colours, on the light `.logo-plate` chip the
 * surfaces provide. The previous greyscale-and-invert treatment existed only
 * because the marks sat on black, where 11 of the 26 fell below 3:1 — and an
 * inverted mark is not that company's mark. The chip solves the contrast, so
 * the filters are gone.
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
        className={cn('object-contain select-none', className)}
      />
    );
  }

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          // `logo-monogram` takes its colours from the chip it sits on
          // (tokens.css .logo-plate), because the ink steps a light surface
          // needs are not exposed as utilities — only the dark-surface ones are.
          'logo-monogram flex shrink-0 items-center justify-center rounded-sm border font-mono text-2xs',
          monogramClassName,
        )}
      >
        {initialsOf(item.name)}
      </span>
      {children}
    </>
  );
}
