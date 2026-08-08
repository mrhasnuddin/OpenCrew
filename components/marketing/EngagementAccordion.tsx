'use client';

import * as React from 'react';
import { WORK, INDEPENDENCE_DISCLAIMER, type WorkItem } from '@/content/site';
import { initialsOf } from './InstitutionPlate';
import { cn } from '@/lib/utils';

/**
 * All five engagements as an exclusive horizontal accordion — one card open,
 * the rest collapsed to numbered strips. Everything the /work subpages carried
 * now lives inline, so the section needs no click-through.
 *
 * Cards use the institution wheel's surface language rather than a black
 * palette of their own: ink tints mixed into the canvas, so they read as raised
 * paper on the page, with gold marking the active card exactly as it marks the
 * active wedge. The open card also carries a soft gold radial in the top-right
 * — the same corner the client logo occupies, so the accent reads as lighting
 * the mark. Open-state only, which makes it a state signal and keeps the ~4%
 * gold budget intact (one card lit at a time, never five).
 *
 * Two artwork sizes, each doing a different job:
 *
 *  — the open card gets the full LOCKUP, standardised on WIDTH (140px) rather
 *    than a bounding box. Height-capping let the two tallest ratios (VINO 3.40,
 *    YAIB 3.45) settle 24px narrower than the rest; driving from width lands all
 *    five on one left-to-right measure, which is the edge the eye actually reads.
 *  — the collapsed strip is 76px wide, where a wordmark is a smear. It gets the
 *    LOGOMARK alone in a 30px square: recognisable at a glance, which a numeral
 *    never was. No 01–05 indices anywhere on the cards — the marks carry
 *    identity now, and the numbering carried nothing.
 *
 * Every project ships the lockup in both inks; the card surface follows the
 * theme, so the pair swaps via `.logo-on-light`/`.logo-on-dark` (the header
 * wordmark's mechanism). The colour logomarks are theme-proof and don't swap.
 * A third-party logo is never recoloured to fit a surface.
 *
 * Motion: width animates `flex-grow` (a plain animatable number), and the two
 * content layers cross-fade with the open layer delayed until the card has
 * mostly widened, masking text reflow. Pure CSS.
 *
 * A11y: collapsed faces are real buttons with aria-expanded/aria-controls; the
 * open card is a focusable region and focus follows the expansion. Below `lg`
 * the same state drives a vertical accordion.
 */

const OPEN_MS = 420;
/** 42px is the tallest of the five at 140px wide (VINO, ratio 3.40) — so the
 *  slot never clips and never shifts the heading below it. */
const LOGO_SLOT = 'flex h-[42px] w-[140px] shrink-0 items-center justify-end';

/**
 * Surfaces borrowed from the institution wheel, not invented again: ink tints
 * mixed into the CANVAS rather than a separate dark palette, so the cards sit
 * on the page as raised paper, and gold marks the active one exactly as it
 * marks the active wedge. Mixing against `--color-canvas` (not a fixed ink
 * value) is what makes this hold up in both themes.
 */
const CARD_BASE =
  'linear-gradient(160deg, color-mix(in oklab, var(--color-text) 6%, var(--color-canvas)) 0%, ' +
  'color-mix(in oklab, var(--color-text) 2.5%, var(--color-canvas)) 100%)';
const CARD_OPEN =
  'radial-gradient(110% 80% at 90% 4%, color-mix(in oklab, var(--gold-500) 20%, transparent) 0%, transparent 62%), ' +
  'linear-gradient(160deg, color-mix(in oklab, var(--gold-500) 7%, var(--color-canvas)) 0%, var(--color-canvas) 74%)';

/** Label the destination honestly — a Linktree or an X profile is not a site. */
function destination(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (host.endsWith('x.com') || host.endsWith('twitter.com')) return { label: 'View on X', host };
  if (host.endsWith('linktr.ee')) return { label: 'View links', host };
  return { label: 'Visit site', host };
}

function Logo({ item }: { item: WorkItem }) {
  if (!item.logo) {
    return (
      <span className={LOGO_SLOT}>
        <span
          aria-hidden="true"
          className="flex size-[34px] items-center justify-center rounded-sm border border-border-strong font-mono text-2xs text-secondary"
        >
          {initialsOf(item.name)}
        </span>
      </span>
    );
  }
  // Width-locked, height free: one common measure across all five. Each
  // project ships the lockup in both inks, and the card surface follows the
  // theme, so the pair swaps with `.logo-on-light`/`.logo-on-dark` — the same
  // mechanism as the header wordmark. No plate, no recolouring.
  return (
    <span className={LOGO_SLOT}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.logo}
        alt=""
        // Without a dark counterpart the light lockup shows in both themes —
        // wrong-ink beats vanished.
        className={cn(item.logoDark && 'logo-on-light', 'h-auto w-[140px] object-contain')}
      />
      {item.logoDark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.logoDark} alt="" className="logo-on-dark h-auto w-[140px] object-contain" />
      ) : null}
    </span>
  );
}

/**
 * The logomark alone, for surfaces too narrow for a wordmark. A 30px square with
 * object-contain evens out the mixed orientations — PAYGO/VINO/OMNI are wide,
 * ENIPAY/YAIB are tall — landing them within ~10% of each other by area.
 *
 * Full colour, unlike the institution plates: there are four on screen at once
 * rather than 27, and recognition is the entire reason the mark replaced a
 * numeral. Falls back to the numeral when a project has no mark on file.
 */
function Mark({ item, index, className }: { item: WorkItem; index: number; className?: string }) {
  if (!item.mark) {
    return (
      <span className={cn('font-mono text-2xs tracking-[0.06em] text-muted', className)}>
        {String(index + 1).padStart(2, '0')}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.mark}
      alt=""
      aria-hidden="true"
      className={cn('size-[30px] shrink-0 object-contain', className)}
    />
  );
}

function SiteLink({ item }: { item: WorkItem }) {
  if (!item.site) return null;
  const { label, host } = destination(item.site);
  return (
    <a
      href={item.site}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'mt-6 inline-flex items-center gap-3 rounded-sm border border-border px-5 py-3',
        'text-sm font-medium text-secondary',
        'transition-[color,border-color,background-color] duration-[var(--dur-fast)] ease-hover',
        'hover:border-border-strong hover:bg-surface hover:text-text',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
      )}
    >
      {label}
      <span className="font-mono text-2xs text-muted">{host}</span>
      <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
        <path
          d="M3 9 9 3M4.5 3H9v4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function PanelBody({ item, showHeader = true }: { item: WorkItem; showHeader?: boolean }) {
  return (
    <>
      {showHeader ? (
        <>
          {/* Lockup alone, top-right — the strips already carry the logomarks,
              so an 01–05 index here was numbering nobody needed. */}
          <div className="flex items-start justify-end gap-5">
            <Logo item={item} />
          </div>
          <h3 className="mt-5 text-xl font-medium text-text lg:text-2xl">{item.name}</h3>
          <p className="mt-2 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
            {item.projectType}
          </p>
        </>
      ) : (
        <div className="flex items-center justify-between gap-5">
          <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
            {item.projectType}
          </p>
          <Logo item={item} />
        </div>
      )}

      <p className="mt-5 max-w-[52ch] text-sm text-secondary">
        {item.background ?? item.deliverables[0]}
      </p>

      {/* The sharpest copy on the old subpages — it was invisible here. */}
      {item.mandate ? (
        <div className="mt-6 border-l border-accent pl-5">
          <p className="eyebrow mb-2">The mandate</p>
          <p className="max-w-[50ch] text-sm text-text">{item.mandate}</p>
        </div>
      ) : null}

      {item.milestones?.length ? (
        <div className="mt-6 border-t border-border pt-5">
          <p className="eyebrow mb-4">Milestones</p>
          {/* Numbered, not dashed: an ordered record reads as a log of what was
              achieved, and it matches the 01/02 index language used site-wide. */}
          <ol className="flex flex-col">
            {item.milestones.map((m, i) => (
              <li
                key={m}
                className="grid grid-cols-[28px_1fr] items-baseline gap-4 border-b border-border py-3 last:border-b-0"
              >
                <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-secondary">{m}</span>
              </li>
            ))}
          </ol>
          {/* Required wherever listings or diligence appear — brand §7.2(b). */}
          <p className="mt-5 max-w-[52ch] text-2xs leading-relaxed text-muted">
            {INDEPENDENCE_DISCLAIMER}
          </p>
        </div>
      ) : item.capability ? (
        <div className="mt-6 border-t border-border pt-5">
          <p className="eyebrow mb-4">Capability demonstrated</p>
          <p className="max-w-[52ch] text-sm text-secondary">{item.capability}</p>
        </div>
      ) : null}

      <SiteLink item={item} />
    </>
  );
}

export function EngagementAccordion() {
  const [open, setOpen] = React.useState(0);
  const panelRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const openCard = (i: number) => {
    setOpen(i);
    setTimeout(() => panelRefs.current[i]?.focus(), 60);
  };

  return (
    <div>
      {/* ═══════════════════════════════ horizontal accordion (lg and up) */}
      <div className="hidden h-[600px] gap-4 lg:flex">
        {WORK.map((item, i) => {
          const isOpen = i === open;
          return (
            <article
              key={item.slug}
              className={cn(
                'relative overflow-hidden rounded-lg border motion-reduce:transition-none',
                isOpen ? 'border-accent' : 'border-border',
              )}
              style={{
                flexBasis: 76,
                flexGrow: isOpen ? 1 : 0,
                flexShrink: 0,
                backgroundImage: isOpen ? CARD_OPEN : CARD_BASE,
                transition: `flex-grow ${OPEN_MS}ms var(--ease-in-out), background-image ${OPEN_MS}ms var(--ease-hover), border-color ${OPEN_MS}ms var(--ease-hover)`,
              }}
            >
              {/* collapsed face */}
              <div
                aria-hidden={isOpen}
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-between py-6',
                  'transition-opacity duration-[200ms] ease-hover motion-reduce:transition-none',
                  isOpen ? 'pointer-events-none opacity-0' : 'opacity-100',
                )}
              >
                <Mark item={item} index={i} />
                <span
                  className="font-mono text-2xs tracking-[0.1em] text-secondary uppercase"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {item.name}
                </span>
                <span aria-hidden="true" className="text-muted">
                  <svg viewBox="0 0 12 12" className="size-[12px]">
                    <path
                      d="M6 2v8M2 6h8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>

              {!isOpen ? (
                <button
                  type="button"
                  aria-expanded={false}
                  aria-controls={`eng-panel-${item.slug}`}
                  onClick={() => openCard(i)}
                  className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2"
                >
                  <span className="sr-only">
                    {item.name} — {item.projectType}. Expand.
                  </span>
                </button>
              ) : null}

              <div
                id={`eng-panel-${item.slug}`}
                role="region"
                aria-label={item.name}
                tabIndex={-1}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={cn(
                  'absolute inset-0 overflow-y-auto p-7 focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2',
                  'transition-opacity ease-hover motion-reduce:transition-none',
                  isOpen
                    ? 'opacity-100 delay-[180ms] duration-[240ms]'
                    : 'pointer-events-none opacity-0 delay-0 duration-[120ms]',
                )}
              >
                <PanelBody item={item} />
              </div>
            </article>
          );
        })}
      </div>

      {/* ═══════════════════════════════════ vertical accordion (below lg) */}
      <ul className="flex flex-col gap-4 lg:hidden">
        {WORK.map((item, i) => {
          const isOpen = i === open;
          return (
            <li
              key={item.slug}
              className={cn(
                'overflow-hidden rounded-lg border',
                isOpen ? 'border-accent' : 'border-border',
              )}
              style={{ backgroundImage: isOpen ? CARD_OPEN : CARD_BASE }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`eng-m-panel-${item.slug}`}
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-focus focus-visible:-outline-offset-2"
                >
                  <Mark item={item} index={i} className="size-[26px]" />
                  <span className="flex-1 font-medium text-text">{item.name}</span>
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className={cn(
                      'size-[12px] text-muted transition-transform duration-[var(--dur-base)] ease-out motion-reduce:transition-none',
                      isOpen && 'rotate-45',
                    )}
                  >
                    <path
                      d="M6 2v8M2 6h8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </h3>
              <div
                id={`eng-m-panel-${item.slug}`}
                className="grid motion-reduce:transition-none"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: `grid-template-rows ${OPEN_MS}ms var(--ease-in-out)`,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6">
                    <PanelBody item={item} showHeader={false} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
