'use client';

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/content/services';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * "What we do" as a stacked accordion — the reference's exact pattern: one
 * card open (dark, tall, full description), the rest collapsed to a title row
 * with its numeral at the far right. Click a row to open it; the previously
 * open card collapses. Every card also links to its capability page.
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
 * The six artwork files are not drawn to the same fill: 1–5 carry a 50px
 * transparent margin inside their viewBox (the drawn figure is ~70% of the
 * file, the rest is room for the glow), 6 fills its viewBox edge to edge. In
 * one shared box that made Market Execution's art ~1.4× the others (client
 * annotation). Scaling 1–5 up by the inverse of their fill puts every DRAWN
 * figure at the same size; the box (and so the row height) is unchanged, and
 * the scaled-out margin is transparent glow, so nothing is clipped that
 * matters. Measured, not guessed: getBBox over each file's shapes.
 */
const ART_SCALE = [1.4, 1.4, 1.4, 1.4, 1.4, 1] as const;

export function CapabilityStack() {
  const [open, setOpen] = React.useState(0);
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = SERVICES.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
    if (e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setOpen(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <ul className="flex flex-col gap-4">
      {SERVICES.map((s, i) => {
        const isOpen = i === open;
        return (
          <li
            key={s.slug}
            className={cn(
              'card-glass overflow-hidden rounded-xl transition-[border-color] duration-[var(--dur-base)] ease-hover',
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
                onClick={() => setOpen(i)}
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
            >
              <div className="overflow-hidden">
                {/* Copy left, artwork right. The art is ONE square box, the
                    same on every card, sized from the column width (so it
                    scales with the container and steps at the breakpoints)
                    and capped at 400px on lg. Every SVG is object-contain
                    inside that box, so all six render at the same visual size
                    regardless of the copy length or the SVG's own viewBox
                    (client annotation: earlier the art was sized from the row
                    height, so the card with the longest lead had the biggest
                    art). Row height therefore follows the art, not the copy;
                    the copy sits centred against it. */}
                <div className="grid gap-7 px-6 pb-7 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8 lg:pb-8">
                  <div className="relative z-10">
                    <p className="max-w-[var(--measure-lead)] text-lg text-secondary">{s.lead}</p>
                    <Link
                      href={`/services/${s.slug}`}
                      tabIndex={isOpen ? 0 : -1}
                      className={buttonClasses('secondary', 'md', 'mt-6 rounded-full')}
                    >
                      Explore {s.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/What/${i + 1}.svg`}
                      alt=""
                      aria-hidden="true"
                      // ART_SCALE compensates for the files' own margins so the
                      // DRAWN figure is the same size on every card (see const).
                      style={{ scale: String(ART_SCALE[i] ?? 1) }}
                      className={cn(
                        'pointer-events-none block aspect-square h-auto w-full select-none object-contain',
                        'max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]',
                        'transition-[opacity,translate] duration-[560ms] ease-out',
                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
