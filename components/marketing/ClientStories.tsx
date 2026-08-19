'use client';

import * as React from 'react';
import { WORK, type WorkItem } from '@/content/site';
import { initialsOf } from './InstitutionPlate';
import { cn } from '@/lib/utils';

/**
 * Client stories — the reference's layout (logo selector left, one wide
 * story panel right) in our system.
 *
 * LEFT: five selector tiles, one per engagement — logomark + name. CLICK
 * switches the story (client direction: hover no longer changes the panel —
 * hover is feedback only, the gold ring); keyboard arrows move between them.
 * Active tile is the lit `.card-glass-open` register.
 *
 * RIGHT: the panel. The reference leads with a client quote in an italic
 * serif; we don't have quotes, so the PROBLEM line takes that slot in
 * Instrument Serif italic — the client's situation, stated as the story's
 * opening line. Beneath: what OPENCREW deployed (dot list) and what it
 * produced (numbered record, verbatim milestones), then the lockup and the
 * outbound link on the base row, with prev/next arrows top-right.
 *
 * Supporting engagements have less data (no milestones); the panel drops the
 * empty column and lets the deployed list breathe. Cross-fade between stories
 * is opacity-only.
 *
 * The independence disclaimer was removed from this section at the client's
 * direction; it remains on /legal/disclosure. Below lg the selector becomes a
 * horizontal tile row above the panel.
 */

const FADE_MS = 260;

function Mark({ item, className }: { item: WorkItem; className?: string }) {
  if (item.mark) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.mark} alt="" className={cn('size-[28px] object-contain', className)} />;
  }
  return (
    <span className={cn('flex size-[28px] items-center justify-center rounded-sm border border-border-strong font-mono text-2xs text-secondary', className)}>
      {initialsOf(item.name)}
    </span>
  );
}

function Lockup({ item }: { item: WorkItem }) {
  if (!item.logoDark && !item.logo) return <Mark item={item} />;
  // Dark surface → the on-dark lockup.
  const src = item.logoDark ?? item.logo!;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="h-auto w-[140px] object-contain" />;
}

function ArrowBtn({ dir, onClick, label }: { dir: 'prev' | 'next'; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-[40px] items-center justify-center rounded-full border border-border-strong text-secondary',
        'transition-[color,border-color,background-color] duration-[var(--dur-fast)] ease-hover',
        'hover:border-accent hover:bg-accent-subtle hover:text-text',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
      )}
    >
      <svg viewBox="0 0 16 16" className="size-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev' ? <path d="M10 3 5 8l5 5" /> : <path d="m6 3 5 5-5 5" />}
      </svg>
    </button>
  );
}

function siteLabel(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (host.endsWith('x.com')) return { label: 'View on X', host };
  if (host.endsWith('linktr.ee')) return { label: 'View links', host };
  return { label: 'Visit site', host };
}

export function ClientStories() {
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const tileRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const item = WORK[active];

  // Cross-fade: fade out, swap, fade in.
  const [rendered, setRendered] = React.useState(item);
  React.useEffect(() => {
    if (rendered.slug === item.slug) return;
    setVisible(false);
    const t = setTimeout(() => {
      setRendered(item);
      setVisible(true);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [item, rendered.slug]);

  const go = (i: number) => setActive((i + WORK.length) % WORK.length);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % WORK.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + WORK.length) % WORK.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = WORK.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tileRefs.current[next]?.focus();
  };

  const link = rendered.site ? siteLabel(rendered.site) : null;
  const hasRecord = Boolean(rendered.milestones?.length);

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-6">
        {/* ------------------------------------------------------ selector */}
        <ul
          role="tablist"
          aria-label="Client stories"
          aria-orientation="vertical"
          className="flex gap-3 overflow-x-auto pb-1 lg:h-[clamp(520px,calc(100svh-180px),720px)] lg:flex-col lg:overflow-visible lg:pb-0 [@media(max-height:820px)]:lg:h-auto"
        >
          {WORK.map((w, i) => {
            const isActive = i === active;
            const isShown = isActive;
            return (
              <li key={w.slug} className="shrink-0 lg:min-h-0 lg:flex-1">
                <button
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`story-tab-${w.slug}`}
                  aria-selected={isActive}
                  aria-controls="story-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    // card-glass-hover: hover keeps its gold-ring feedback,
                    // but only a CLICK switches the story.
                    'card-glass card-glass-hover flex h-[76px] w-[200px] items-center gap-4 rounded-lg px-5 text-left lg:h-full lg:w-full lg:py-6',
                    'transition-[border-color,background-color] duration-[var(--dur-base)] ease-hover',
                    'focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2',
                    isShown && 'card-glass-open',
                  )}
                >
                  <Mark item={w} className={cn('transition-opacity', isShown ? 'opacity-100' : 'opacity-70')} />
                  <span className="min-w-0">
                    <span className={cn('block truncate font-bold', isShown ? 'text-text' : 'text-secondary')}>
                      {w.name}
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted lg:line-clamp-2 lg:whitespace-normal">{w.projectType}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* --------------------------------------------------------- panel */}
        <div
          id="story-panel"
          role="tabpanel"
          aria-labelledby={`story-tab-${rendered.slug}`}
          // FIXED height, sized to the viewport (client annotation): the panel
          // never changes size between stories and fits on one screen. On short
          // viewports (≤820px tall, e.g. 1280×720 laptops) it relaxes to
          // content height instead of forcing an internal scrollbar; the
          // scroller stays as a safety net.
          className="card-glass card-glass-open relative flex h-[clamp(520px,calc(100svh-180px),720px)] flex-col overflow-hidden rounded-xl p-6 lg:p-7 [@media(max-height:820px)]:h-auto [@media(max-height:820px)]:min-h-[520px]"
        >
          <div
            className="flex min-h-0 flex-1 flex-col overflow-y-auto transition-opacity ease-hover motion-reduce:transition-none"
            style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
          >
            {/* header row: type left, arrows right — arrows out of the copy's way */}
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-accent-text">{rendered.projectType}</p>
              <div className="flex shrink-0 gap-3">
                <ArrowBtn dir="prev" label="Previous story" onClick={() => go(active - 1)} />
                <ArrowBtn dir="next" label="Next story" onClick={() => go(active + 1)} />
              </div>
            </div>

            {/* the opening line: the client's situation, in the serif voice, full width */}
            {rendered.problem ? (
              <p className="manifesto mt-5 w-full text-2xl text-text text-balance xl:text-3xl">
                <span className="text-accent-text">“</span>
                {rendered.problem}
                <span className="text-accent-text">”</span>
              </p>
            ) : null}

            <div
              className={cn(
                'mt-6 grid gap-6 border-t border-border pt-6',
                hasRecord ? 'lg:grid-cols-2 lg:gap-8' : 'lg:grid-cols-[1.2fr_1fr]',
              )}
            >
              <div>
                <p className="eyebrow mb-4">What OPENCREW deployed</p>
                <ul className="flex flex-col gap-3">
                  {rendered.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm text-secondary">
                      <span aria-hidden="true" className="marker-dot" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {hasRecord ? (
                <div className="lg:border-l lg:border-border lg:pl-8">
                  <p className="eyebrow mb-4">What it produced</p>
                  <ol className="flex flex-col">
                    {rendered.milestones!.map((m, i) => (
                      <li
                        key={m}
                        className="grid grid-cols-[28px_1fr] items-baseline gap-4 border-b border-border py-2 first:pt-0 last:border-b-0"
                      >
                        <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-secondary">{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : rendered.capability ? (
                <div className="lg:border-l lg:border-border lg:pl-8">
                  <p className="eyebrow mb-4">Capability demonstrated</p>
                  <p className="text-sm text-text">{rendered.capability}</p>
                </div>
              ) : null}
            </div>

            {/* base row: lockup + link */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t border-border pt-5">
              <Lockup item={rendered} />
              {link && rendered.site ? (
                <a
                  href={rendered.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-secondary',
                    'transition-[color,border-color,background-color] duration-[var(--dur-fast)] ease-hover',
                    'hover:border-accent hover:bg-accent-subtle hover:text-text',
                    'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                  )}
                >
                  {link.label}
                  <span className="font-mono text-2xs text-muted">{link.host}</span>
                  <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
                    <path d="M3 9 9 3M4.5 3H9v4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
