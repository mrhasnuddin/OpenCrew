'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SORT_LABELS, type SortKey } from '@/content/crew';
import { cn } from '@/lib/utils';

const SORTS = Object.keys(SORT_LABELS) as SortKey[];

/**
 * The row above the grid, as on the reference listing page: how many people
 * matched on the left, how they are ordered on the right.
 *
 * Sort lives in the URL like every filter does, so an ordered, filtered view
 * is one link. A native <select> is deliberate — it is one tab stop, it opens
 * as the platform's own control on a phone, and a custom popover would buy
 * nothing but bugs here.
 */
export function CrewToolbar({
  resultCount,
  totalCount,
  className,
}: {
  resultCount: number;
  totalCount: number;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = (searchParams.get('sort') as SortKey | null) ?? 'featured';

  const onChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value && value !== 'featured') next.set('sort', value);
    else next.delete('sort');
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = resultCount !== totalCount;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-5 border-b border-border pb-5',
        className,
      )}
    >
      <p aria-live="polite" className="text-sm text-secondary">
        <span className="font-bold text-text">{resultCount}</span>{' '}
        {resultCount === 1 ? 'member' : 'members'}
        {filtered ? <span className="text-muted"> of {totalCount}</span> : null}
      </p>

      <label className="flex items-center gap-4 text-sm text-muted">
        Sort by
        <span className="relative">
          <select
            value={sort}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'appearance-none rounded-full border border-border bg-surface-raised py-2 pr-9 pl-5',
              'text-sm font-medium text-text',
              'transition-[border-color] duration-[var(--dur-fast)] ease-hover hover:border-border-strong',
              'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
            )}
          >
            {SORTS.map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 12 12"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 size-[11px] -translate-y-1/2 text-muted"
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
  );
}
