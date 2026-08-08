'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShortlist, MAX_SHORTLIST } from '@/lib/shortlist';
import { CREW, ROLE_LABELS } from '@/content/crew';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Crew Builder tray — the site's one differentiating interaction.
 *
 * Appears only on crew surfaces and only when the shortlist is non-empty.
 * Expands from bottom-right with transform-origin at the trigger, so it grows
 * out of the pill rather than materialising over it.
 */
const SURFACES = ['/crew', '/roles'];

export function CrewBuilderTray() {
  const pathname = usePathname();
  const { slugs, hydrated, remove, clear } = useShortlist();
  const [open, setOpen] = React.useState(false);

  const onSurface = SURFACES.some((s) => pathname === s || pathname.startsWith(`${s}/`));
  const members = slugs
    .map((slug) => CREW.find((m) => m.slug === slug))
    .filter((m): m is (typeof CREW)[number] => Boolean(m));

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Never render server-side content that localStorage might contradict.
  if (!hydrated || !onSurface || members.length === 0) return null;

  const roleCount = new Set(members.flatMap((m) => m.roles)).size;
  const sectorCount = new Set(members.flatMap((m) => m.sectors)).size;

  return (
    <div className="fixed right-5 bottom-5 z-[300] flex flex-col items-end gap-4 md:right-6 md:bottom-6">
      <div
        id="crew-tray-panel"
        hidden={!open}
        className={cn(
          'w-[min(360px,calc(100vw-2rem))] origin-bottom-right rounded-lg border border-border-strong',
          'bg-surface-raised p-6 shadow-[0_24px_64px_-16px_rgb(0_0_0/0.6)]',
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="eyebrow">Your crew</h2>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
          >
            Clear
          </button>
        </div>

        <p className="mt-4 text-sm text-muted">
          {members.length} {members.length === 1 ? 'member' : 'members'} · {roleCount}{' '}
          {roleCount === 1 ? 'role' : 'roles'} · {sectorCount}{' '}
          {sectorCount === 1 ? 'sector' : 'sectors'}
        </p>

        <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
          {members.map((m) => (
            <li key={m.slug} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm text-text">
                  {m.tier === 'public' ? m.displayName : 'Named on request'}
                </p>
                <p className="truncate font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                  {ROLE_LABELS[m.roles[0]]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(m.slug)}
                aria-label={`Remove ${m.tier === 'public' ? m.displayName : 'member'} from your crew`}
                className="shrink-0 rounded-xs p-2 text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-danger focus-visible:outline-2 focus-visible:outline-focus"
              >
                <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
                  <path
                    d="M3 3l6 6M9 3L3 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {members.length >= MAX_SHORTLIST ? (
          <p className="mt-5 text-sm text-muted">
            Six is the practical maximum for one brief. Remove someone to add another.
          </p>
        ) : null}

        <Link
          href="/start?from=shortlist"
          onClick={() => setOpen(false)}
          className={buttonClasses('primary', 'md', 'mt-6 w-full')}
        >
          Request this crew
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="crew-tray-panel"
        className={buttonClasses('secondary', 'md', 'shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]')}
      >
        <span className="flex size-[20px] items-center justify-center rounded-full bg-accent font-mono text-2xs text-on-accent">
          {members.length}
        </span>
        {open ? 'Close' : 'Your crew'}
      </button>
    </div>
  );
}
