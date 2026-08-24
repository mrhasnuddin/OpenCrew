'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip } from '@/components/ui/Chip';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { FACET_LABELS, facetLabel, type FacetKey } from '@/content/crew';

/**
 * Filter state lives in the URL, so every combination is shareable, survives
 * the back button, and is server-rendered. Nothing about the result set is
 * held in component state.
 *
 * Only facets with values render — see the note in content/crew.ts. A filter
 * group for a field no member has is a dead end, not a feature.
 */

export function CrewFilters({ facets }: { facets: Record<FacetKey, string[]> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = React.useState(searchParams.get('q') ?? '');
  // Seven facet groups stacked above the grid is a long scroll on a phone, so
  // below lg they live behind a toggle. Desktop is unaffected: the panel is
  // always open there (lg:block wins over the mobile hidden state).
  const [openOnMobile, setOpenOnMobile] = React.useState(false);

  const selected = React.useCallback(
    (key: FacetKey) => searchParams.get(key)?.split(',').filter(Boolean) ?? [],
    [searchParams],
  );

  const commit = React.useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const toggle = (key: FacetKey, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = selected(key);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    if (updated.length) next.set(key, updated.join(','));
    else next.delete(key);
    commit(next);
  };

  // Debounced so the URL isn't rewritten on every keystroke.
  React.useEffect(() => {
    const current = searchParams.get('q') ?? '';
    if (term === current) return;
    const id = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (term.trim()) next.set('q', term.trim());
      else next.delete('q');
      commit(next);
    }, 250);
    return () => clearTimeout(id);
  }, [term, searchParams, commit]);

  const activeKeys = (Object.keys(FACET_LABELS) as FacetKey[]).filter((k) => facets[k]?.length);
  const activeCount = activeKeys.reduce((n, k) => n + selected(k).length, 0) + (term ? 1 : 0);

  const clearAll = () => {
    setTerm('');
    // Sort is not a filter — clearing the filters keeps the chosen order.
    const next = new URLSearchParams();
    const sort = searchParams.get('sort');
    if (sort) next.set('sort', sort);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-7">
      <div>
        <label htmlFor="crew-search" className="sr-only">
          Search the crew
        </label>
        <Input
          id="crew-search"
          type="search"
          placeholder="Search by name, role or background"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={() => setOpenOnMobile((v) => !v)}
        aria-expanded={openOnMobile}
        aria-controls="crew-facets"
        className={cn(
          'flex items-center justify-between gap-4 rounded-full border border-border px-6 py-3 lg:hidden',
          'text-sm font-medium text-text transition-[border-color] duration-[var(--dur-fast)] ease-hover hover:border-border-strong',
          'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
        )}
      >
        <span>
          Filters
          {activeCount > 0 ? <span className="text-accent-text"> · {activeCount}</span> : null}
        </span>
        <svg
          viewBox="0 0 12 12"
          className={cn(
            'size-[11px] transition-transform duration-[var(--dur-base)] ease-hover',
            openOnMobile && 'rotate-180',
          )}
          aria-hidden="true"
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
      </button>

      <div
        id="crew-facets"
        className={cn('flex-col gap-7 lg:flex', openOnMobile ? 'flex' : 'hidden')}
      >
        {activeKeys.map((key) => (
          <fieldset key={key} className="border-0 p-0">
            <legend className="eyebrow mb-5">{FACET_LABELS[key]}</legend>
            <ul className="flex flex-wrap gap-3">
              {facets[key].map((value) => (
                <li key={value}>
                  <FilterChip
                    selected={selected(key).includes(value)}
                    onClick={() => toggle(key, value)}
                  >
                    {facetLabel(key, value)}
                  </FilterChip>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}

        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
            {activeCount > 0
              ? `${activeCount} filter${activeCount === 1 ? '' : 's'}`
              : 'No filters'}
          </p>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-secondary underline decoration-from-font underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
