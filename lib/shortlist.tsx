'use client';

import * as React from 'react';

/**
 * Crew Builder state.
 *
 * Persisted to localStorage so a shortlist survives a reload and the walk from
 * /crew to /start. Six is the practical maximum for one brief — past that the
 * brief stops being a shortlist and starts being a browse history.
 */

const KEY = 'oc-shortlist';
export const MAX_SHORTLIST = 6;

type Ctx = {
  slugs: string[];
  hydrated: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isFull: boolean;
};

const ShortlistContext = React.createContext<Ctx | null>(null);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  // Server renders empty; we only trust localStorage after mount. Without this
  // the tray would flash in with stale content during hydration.
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((s): s is string => typeof s === 'string').slice(0, MAX_SHORTLIST));
        }
      }
    } catch {
      // Corrupt or unavailable storage is not worth breaking the page over.
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {
      /* private mode / quota — the shortlist simply won't persist */
    }
  }, [slugs, hydrated]);

  const value = React.useMemo<Ctx>(
    () => ({
      slugs,
      hydrated,
      isFull: slugs.length >= MAX_SHORTLIST,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) =>
        setSlugs((cur) =>
          cur.includes(slug)
            ? cur.filter((s) => s !== slug)
            : cur.length >= MAX_SHORTLIST
              ? cur
              : [...cur, slug],
        ),
      remove: (slug) => setSlugs((cur) => cur.filter((s) => s !== slug)),
      clear: () => setSlugs([]),
    }),
    [slugs, hydrated],
  );

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const ctx = React.useContext(ShortlistContext);
  if (!ctx) throw new Error('useShortlist must be used within <ShortlistProvider>');
  return ctx;
}
