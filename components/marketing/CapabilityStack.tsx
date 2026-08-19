'use client';

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/content/services';
import { CapabilityArt } from './CapabilityArt';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * "What we do" as a stacked accordion — the reference's exact pattern: one
 * card open (dark, tall, full description), the rest collapsed to a title row
 * with its numeral at the far right. Click a row to open it; the previously
 * open card collapses.
 *
 * The capability SUBPAGES are retired (client direction): each open card now
 * carries the capability's full approved content — lead, the V3 groups, the
 * process where one exists, and the independence disclaimer where required —
 * so this stack IS the capability documentation. Cards are deep-linkable as
 * /#cap-<slug> (header panel, footer and internal CTAs point there); the
 * component listens for the hash, opens the right card and scrolls to it.
 *
 * Each open card carries the client-supplied artwork for that capability
 * (public/What/{index}.svg — gold line illustrations, one per capability),
 * centred in the right column inside one fixed-ratio box shared by every card,
 * with the open-state glow at the lower-left (`.card-glass-open`).
 *
 * Kokonut's `card-stack` does the same thing structurally, but its styling is
 * written against Tailwind's default palette (cleared in this theme) so it
 * would render bare — this is the same pattern re-expressed in our tokens and
 * the site's glass surface. Open card = ink-1000 with the gold hover wash
 * pinned on; collapsed = card-glass.
 *
 * Height animates via grid-template-rows 0fr→1fr — pure CSS, no measuring.
 * A11y: real buttons with aria-expanded/aria-controls; arrow keys move
 * between rows. The whole thing is one <ul>.
 */
const CapabilityIcon = dynamic(() => import('./CapabilityIcon'), {
  loading: () => <span className="block size-[26px]" aria-hidden="true" />,
});

/**
 * The six artwork files are not drawn to the same fill. Files 1–5 carry a
 * transparent margin inside their viewBox for the outer glow (the drawn
 * figure is ~55% of the file now that the canvas has been widened so the
 * glow is no longer cut at the edge — see public/What/*.svg, filter0_d);
 * file 6 has no outer glow and fills its viewBox edge to edge. Rendering 1–5
 * at 180% of the box puts every DRAWN figure at the same size as 6's. The box
 * (and so the row height) is the same on every card; the overflow is glow.
 * Measured with getBBox over each file's shapes, not guessed.
 */
const ART_SCALE = [1.8, 1.8, 1.8, 1.8, 1.8, 1] as const;

export function CapabilityStack() {
  const [open, setOpen] = React.useState(0);
  // Which card's panel has FINISHED opening. While a panel animates its
  // wrapper clips (the grid-rows trick needs it); once settled, the open
  // panel's wrapper releases the clip so the artwork's outer glow can run up
  // behind the title row instead of ending in a hard line at the panel top.
  // The card itself (the li) still clips at its rounded edge.
  const [settled, setSettled] = React.useState(0);
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number) => {
    if (i === open) return;
    setSettled(-1);
    setOpen(i);
  };

  // /#cap-<slug> deep links (header panel, footer, other pages): open the
  // card and bring it under the header. Runs on mount for full loads and on
  // hashchange for same-page navigation.
  React.useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#cap-(.+)$/);
      if (!m) return;
      const i = SERVICES.findIndex((sv) => sv.slug === m[1]);
      if (i < 0) return;
      setSettled(-1);
      setOpen(i);
      // Scroll AFTER the accordion settles (480ms grid-rows transition):
      // opening this card collapses whichever was open above it, and a
      // scroll started before that shift lands hundreds of px off target.
      window.setTimeout(() => {
        document.getElementById(`cap-${m[1]}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 520);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = SERVICES.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
    if (e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <ul className="flex flex-col gap-4">
      {SERVICES.map((s, i) => {
        const isOpen = i === open;
        return (
          <li
            key={s.slug}
            id={`cap-${s.slug}`}
            className={cn(
              'scroll-mt-[84px] card-glass overflow-hidden rounded-xl transition-[border-color] duration-[var(--dur-base)] ease-hover',
              isOpen && 'card-glass-open',
            )}
          >
            <h3>
              <button
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`cap-stack-${s.slug}`}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'flex w-full items-center justify-between gap-6 px-6 py-6 text-left lg:px-8 lg:py-7',
                  'focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2',
                )}
              >
                <span className="flex min-w-0 items-center gap-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'shrink-0 transition-colors duration-[var(--dur-base)] ease-hover',
                      isOpen ? 'text-accent-text' : 'text-muted',
                    )}
                  >
                    <CapabilityIcon slug={s.slug} active={isOpen} />
                  </span>
                  <span
                    className={cn(
                      // Wraps below sm (a 343px card truncated "Global Repre…");
                      // single line with an ellipsis once there is room.
                      'block text-lg leading-tight font-bold tracking-[-0.015em] sm:truncate sm:text-xl lg:text-2xl',
                      isOpen ? 'text-text' : 'text-secondary',
                    )}
                  >
                    {s.name}
                  </span>
                </span>
                <span
                  className={cn(
                    'shrink-0 font-mono text-lg tabular-nums transition-colors duration-[var(--dur-base)] ease-hover lg:text-xl',
                    isOpen ? 'text-accent-text' : 'text-disabled',
                  )}
                >
                  {s.index}
                </span>
              </button>
            </h3>

            <div
              id={`cap-stack-${s.slug}`}
              className="grid motion-reduce:transition-none"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 480ms var(--ease-in-out)',
              }}
              onTransitionEnd={(e) => {
                if (e.propertyName === 'grid-template-rows' && isOpen) setSettled(i);
              }}
            >
              <div className={isOpen && settled === i ? 'overflow-visible' : 'overflow-hidden'}>
                {/* Row 1 — lead left, artwork right (one shared square box
                    per card, see CapabilityArt / ART_SCALE). Row 2 — the
                    capability's V3 groups, full width, compact columns; the
                    process joins them as a numbered column where one exists.
                    This replaces the retired subpage in full. */}
                <div className="grid gap-7 px-6 pb-7 lg:px-8 lg:pb-8">
                  <div className="grid gap-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                    <div className="relative z-10">
                      <p className="text-lg font-medium text-text">{s.title}</p>
                      <p className="mt-4 max-w-[var(--measure-lead)] text-secondary">{s.lead}</p>
                      <Link
                        href="/contact"
                        tabIndex={isOpen ? 0 : -1}
                        className={buttonClasses('secondary', 'md', 'mt-6')}
                      >
                        Start a project
                      </Link>
                    </div>
                    <div className="flex items-center justify-center">
                      <div
                        className={cn(
                          'relative aspect-square w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]',
                          'transition-opacity duration-[560ms] ease-out',
                          isOpen ? 'opacity-100' : 'opacity-0',
                        )}
                      >
                        {/* ART_SCALE compensates for the files' glow margins
                            so the DRAWN figure matches across all six cards. */}
                        <CapabilityArt
                          index={i + 1}
                          active={isOpen}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: `${(ART_SCALE[i] ?? 1) * 100}%`,
                            height: `${(ART_SCALE[i] ?? 1) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    {s.groups.map((g) => (
                      <div key={g.title}>
                        <h4 className="eyebrow mb-4">{g.title}</h4>
                        <ul className="flex flex-col gap-2">
                          {g.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-secondary">
                              <span aria-hidden="true" className="marker-dot" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {s.process ? (
                      <div>
                        <h4 className="eyebrow mb-4">How it runs</h4>
                        <ol className="flex flex-col gap-2">
                          {s.process.map((step) => (
                            <li key={step.index} className="flex gap-3 text-sm text-secondary">
                              <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                                {step.index}
                              </span>
                              <span>{step.title}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </div>

                  {s.disclaimer ? (
                    <p className="max-w-[var(--measure-prose)] rounded-md border border-border bg-surface p-5 text-sm text-muted">
                      {s.disclaimer}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
