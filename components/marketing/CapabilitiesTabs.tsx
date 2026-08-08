'use client';

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/content/services';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Capabilities as a vertical tablist inside a single panel.
 *
 * One box, two zones, no internal rule — the split is carried by space alone,
 * which is why the outer border is the only line in the composition.
 *
 * The pill column stretches to the panel height and each pill takes an equal
 * share (`flex-1`), so pill 01 aligns to the top of the copy and pill 06 to its
 * baseline. That alignment is the whole reason this reads as one object rather
 * than a card with a list bolted beside it.
 *
 * Pills carry only index + icon + name; the one-liner and detail live on the
 * left, so repeating them here would say the same thing twice in one viewport.
 *
 * Implemented as a real tablist (roles, aria-selected, roving tabindex, arrow /
 * Home / End). Six controls that change a region IS a tabset; faking it strands
 * keyboard users on a control that gives no indication of what it did.
 */
const CapabilityIcon = dynamic(() => import('./CapabilityIcon'), {
  loading: () => <span className="block size-[26px]" aria-hidden="true" />,
});

export function CapabilitiesTabs() {
  const [selected, setSelected] = React.useState(0);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const active = SERVICES[selected];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = SERVICES.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = selected === last ? 0 : selected + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = selected === 0 ? last : selected - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-7 lg:p-8">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.618fr_1fr] lg:gap-9">
        {/* ----------------------------------------------------- detail zone */}
        <div
          role="tabpanel"
          id={`cap-panel-${active.slug}`}
          aria-labelledby={`cap-tab-${active.slug}`}
          tabIndex={0}
          className="flex flex-col rounded-sm focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-4"
        >
          <p className="eyebrow">
            {active.index} · {active.name}
          </p>
          <h3 className="mt-6 max-w-[18ch] text-2xl tracking-[-0.015em] text-balance lg:text-3xl lg:tracking-[-0.02em]">
            {active.title}
          </h3>
          <p className="mt-6 max-w-[var(--measure-prose)] text-secondary">{active.lead}</p>

          <div className="mt-7 border-t border-border pt-6">
            <p className="eyebrow mb-5">{active.groups[0]?.title}</p>
            <ul className="flex flex-wrap gap-3">
              {active.groups[0]?.items.slice(0, 7).map((item) => (
                <li
                  key={item}
                  className="rounded-xs border border-border px-3 py-1 font-mono text-2xs tracking-[0.06em] text-muted uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/services/${active.slug}`}
            className={buttonClasses('secondary', 'md', 'mt-auto self-start pt-0 lg:mt-7')}
          >
            See {active.name}
          </Link>
        </div>

        {/* ------------------------------------------------------- pill zone */}
        <ul
          role="tablist"
          aria-orientation="vertical"
          aria-label="Capabilities"
          onKeyDown={onKeyDown}
          className="flex h-full flex-col gap-3"
        >
          {SERVICES.map((s, i) => {
            const isActive = i === selected;
            return (
              <li
                key={s.slug}
                // flex-1 is what makes 01 and 06 land on the copy's top and
                // bottom edges instead of clustering at the top.
                className="lg:flex-1"
                onMouseEnter={() => setHovered(s.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`cap-tab-${s.slug}`}
                  aria-selected={isActive}
                  aria-controls={`cap-panel-${s.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(i)}
                  className={cn(
                    'flex h-full w-full items-center gap-5 rounded-md border px-5 py-4 text-left',
                    'transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] ease-hover',
                    'active:scale-[0.99] active:duration-[var(--dur-instant)]',
                    'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                    isActive
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-border bg-transparent text-secondary hover:border-border-strong hover:bg-surface-hover',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-2xs tracking-[0.06em]',
                      isActive ? 'text-on-accent/70' : 'text-muted',
                    )}
                  >
                    {s.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'shrink-0 transition-colors duration-[var(--dur-base)] ease-hover',
                      isActive ? 'text-on-accent' : 'text-muted',
                    )}
                  >
                    <CapabilityIcon slug={s.slug} active={isActive || hovered === s.slug} />
                  </span>
                  <span className="min-w-0 flex-1 font-medium">{s.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
