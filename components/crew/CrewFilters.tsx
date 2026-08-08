'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import {
  ROLE_LABELS,
  AVAILABILITY_LABELS,
  type FacetKey,
  type CrewRoleSlug,
  type Availability,
} from '@/content/crew';

/**
 * Filter state lives in the URL, so every combination is shareable, survives
 * the back button, and is server-rendered. Nothing about the result set is
 * held in component state.
 *
 * Only facets with values render — see the note in content/crew.ts. A filter
 * group for a field no member has is a dead end, not a feature.
 */

const GROUP_LABELS: Record<FacetKey, string> = {
  role: 'Role',
  sector: 'Sector',
  market: 'Market',
  language: 'Language',
  availability: 'Availability',
};

function optionLabel(key: FacetKey, value: string) {
  if (key === 'role') return ROLE_LABELS[value as CrewRoleSlug] ?? value;
  if (key === 'availability') return AVAILABILITY_LABELS[value as Availability] ?? value;
  return value;
}

export function CrewFilters({
  facets,
  resultCount,
}: {
  facets: Record<FacetKey, string[]>;
  resultCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = React.useState(searchParams.get('q') ?? '');

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

  const activeKeys = (Object.keys(GROUP_LABELS) as FacetKey[]).filter((k) => facets[k]?.length);
  const activeCount = activeKeys.reduce((n, k) => n + selected(k).length, 0) + (term ? 1 : 0);

  const clearAll = () => {
    setTerm('');
    router.replace(pathname, { scroll: false });
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

      {activeKeys.map((key) => (
        <fieldset key={key} className="border-0 p-0">
          <legend className="eyebrow mb-5">{GROUP_LABELS[key]}</legend>
          <ul className="flex flex-wrap gap-3">
            {facets[key].map((value) => (
              <li key={value}>
                <FilterChip
                  selected={selected(key).includes(value)}
                  onClick={() => toggle(key, value)}
                >
                  {optionLabel(key, value)}
                </FilterChip>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}

      <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
        <p aria-live="polite" className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
          {resultCount} {resultCount === 1 ? 'member' : 'members'}
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
  );
}
