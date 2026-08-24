'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SORT_LABELS, VIEW_LABELS, type SortKey, type ViewKey } from '@/content/crew';
import { cn } from '@/lib/utils';

const SORTS = Object.keys(SORT_LABELS) as SortKey[];
const VIEWS = Object.keys(VIEW_LABELS) as ViewKey[];

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
  const view = (searchParams.get('view') as ViewKey | null) ?? 'grid';

  const setParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value && value !== fallback) next.set(key, value);
    else next.delete(key);
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

      <div className="flex flex-wrap items-center gap-5">
        {/* View switch: same results, two layouts. The row is what makes a
            twenty-person roster readable on a phone. */}
        <div
          role="group"
          aria-label="Result layout"
          className="flex items-center gap-1 rounded-full border border-border p-1"
        >
          {VIEWS.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setParam('view', key, 'grid')}
              title={`${VIEW_LABELS[key]} view`}
              className={cn(
                'flex size-[32px] items-center justify-center rounded-full',
                'transition-[background-color,color] duration-[var(--dur-fast)] ease-hover',
                'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                '[@media(pointer:coarse)]:size-[44px]',
                view === key
                  ? 'bg-accent text-on-accent'
                  : 'text-muted hover:text-text',
              )}
            >
              <ViewIcon view={key} />
              <span className="sr-only">{VIEW_LABELS[key]} view</span>
            </button>
          ))}
        </div>

      <label className="flex items-center gap-4 text-sm text-muted">
        Sort by
        <span className="relative">
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value, 'featured')}
            className={cn(
              'appearance-none rounded-full border border-border bg-surface-raised py-2 pr-9 pl-5',
              // 16px on touch: iOS zooms the page when a focused field is
              // smaller than that, and it never zooms back out.
              'text-sm font-medium text-text [@media(pointer:coarse)]:h-[44px] [@media(pointer:coarse)]:text-base',
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
    </div>
  );
}

/** 16×16 glyphs: a card wall and a stack of rows. */
function ViewIcon({ view }: { view: ViewKey }) {
  if (view === 'grid') {
    return (
      <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor" aria-hidden="true">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" />
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" />
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" />
        <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor" aria-hidden="true">
      <rect x="1.5" y="2.5" width="3.5" height="3.5" rx="1" />
      <rect x="6.5" y="3.6" width="8" height="1.4" rx="0.7" />
      <rect x="1.5" y="10" width="3.5" height="3.5" rx="1" />
      <rect x="6.5" y="11.1" width="8" height="1.4" rx="0.7" />
    </svg>
  );
}
