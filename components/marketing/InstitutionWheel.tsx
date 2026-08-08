'use client';

import * as React from 'react';
import { NETWORK, type Institution } from '@/content/site';
import { LogoMark } from '@/components/brand/Logo';
import { TextLink } from '@/components/marketing/Blocks';
import { initialsOf } from './InstitutionPlate';
import { cn } from '@/lib/utils';

/**
 * Institutional landscape — full-viewport split: editorial rail left,
 * radial instrument right.
 *
 * The TATA brand wheel this references gets its sector clarity from three
 * structural devices, none of which is colour: real GAPS between filled
 * wedges, a bold segmented RIM, and an icon badge + label PER SECTOR on the
 * wheel itself. All three are reproduced here with ink doing the job their
 * five hues do:
 *
 *  - Each sector is a distinct annular wedge with a visible channel of canvas
 *    between it and its neighbours. Fills alternate two ink tints (derived
 *    with color-mix from the text colour, so they adapt to both themes).
 *  - The rim is a thick ink arc per sector — the strongest line on the page —
 *    turning gold when its sector is active.
 *  - At each sector's mid-angle: an ink badge with a category glyph, and the
 *    full category title set on a curved path hugging the rim. Curved text is
 *    what lets full titles fit without colliding with the board edge; bottom-
 *    half sectors reverse the path direction so their labels stay upright.
 *
 * Interaction model unchanged: hover/focus/pin (legend rows, badges, plates)
 * lights the sector — gold wedge tint, gold rim, gold hub-to-member lines —
 * and recedes everything else.
 */

/* ------------------------------------------------------------- geometry */

const HUB_R = 11;
const WEDGE_INNER = 13.5;
const WEDGE_OUTER = 40;
const RIM = 41.5;
const LABEL_R = 47;
const RING_RADII = [22.5, 33];
const WEDGE_GAP_DEG = 1.6; // per side — the visible channel between sectors

const RING_SPLIT: Record<number, [number, number]> = {
  4: [2, 2],
  5: [2, 3],
  6: [3, 3],
  7: [3, 4],
};

function polar(r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180; // 0° at 12 o'clock, clockwise
  return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)];
}

const pt = (p: [number, number]) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;

function arcPath(r: number, a0: number, a1: number, sweep = 1) {
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${pt(polar(r, a0))} A ${r} ${r} 0 ${large} ${sweep} ${pt(polar(r, a1))}`;
}

/** Annular sector: outer arc clockwise, inner arc back. */
function wedgePath(r0: number, r1: number, a0: number, a1: number) {
  const large = a1 - a0 > 180 ? 1 : 0;
  return [
    `M ${pt(polar(r1, a0))}`,
    `A ${r1} ${r1} 0 ${large} 1 ${pt(polar(r1, a1))}`,
    `L ${pt(polar(r0, a1))}`,
    `A ${r0} ${r0} 0 ${large} 0 ${pt(polar(r0, a0))}`,
    'Z',
  ].join(' ');
}

type Placed = { item: Institution; cat: number; x: number; y: number; ang: number; ring: number };
type Sector = { title: string; count: number; a0: number; a1: number; mid: number };

const LAYOUT = (() => {
  const total = NETWORK.categories.reduce((s, c) => s + c.items.length, 0);
  const sectors: Sector[] = [];
  const placed: Placed[] = [];
  let a = 0;

  NETWORK.categories.forEach((cat, ci) => {
    const span = (cat.items.length / total) * 360;
    const split = RING_SPLIT[cat.items.length] ?? [
      Math.floor(cat.items.length / 2),
      Math.ceil(cat.items.length / 2),
    ];
    const rings = [cat.items.slice(0, split[0]), cat.items.slice(split[0])];

    rings.forEach((ring, ri) =>
      ring.forEach((item, j) => {
        const ang = a + span * ((j + 0.5) / ring.length);
        const [x, y] = polar(RING_RADII[ri], ang);
        placed.push({ item, cat: ci, x, y, ang, ring: ri });
      }),
    );

    sectors.push({ title: cat.title, count: cat.items.length, a0: a, a1: a + span, mid: a + span / 2 });
    a += span;
  });

  return { sectors, placed, total };
})();

/* ------------------------------------------------ category glyphs (static)
   Tiny inline SVGs, not the animated icon library — these are wayfinding
   marks on an instrument, and pulling `motion` in for them would be waste. */
const CATEGORY_GLYPHS: React.ReactNode[] = [
  // Capital Markets & Exchanges — bank columns
  <g key="g0">
    <path d="M3 21h18M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9M3 8.5 12 4l9 4.5z" />
  </g>,
  // Payments & Fintech — card
  <g key="g1">
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10.5h18M6.5 15h4" />
  </g>,
  // RWA & Institutional Finance — vault
  <g key="g2">
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 8.5V6M12 18v-2.5M8.5 12H6M18 12h-2.5" />
  </g>,
  // Audit, Data & Professional Services — shield + check
  <g key="g3">
    <path d="M12 3.5 18.5 6v5c0 4.2-2.8 7-6.5 8.5C8.3 18 5.5 15.2 5.5 11V6z" />
    <path d="m9.5 11.5 2 2 3.5-4" />
  </g>,
  // Web3 & Global Industry Ecosystem — globe
  <g key="g4">
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c-2.8 2.7-2.8 13.3 0 16M12 4c2.8 2.7 2.8 13.3 0 16" />
  </g>,
];

/* ------------------------------------------------------------ component */

export function InstitutionWheel() {
  const [pinned, setPinned] = React.useState<number | null>(null);
  const [hoverCat, setHoverCat] = React.useState<number | null>(null);
  const [tip, setTip] = React.useState<Placed | null>(null);

  const activeCat = pinned ?? (tip ? tip.cat : hoverCat);
  const togglePin = (i: number) => setPinned((cur) => (cur === i ? null : i));

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.618fr] lg:gap-9">
      {/* ═══════════════════════════════════════════════════ editorial rail */}
      <div className="flex h-full flex-col">
        <p className="eyebrow mb-6">{NETWORK.eyebrow}</p>
        <h2 className="text-2xl tracking-[-0.015em] lg:text-3xl lg:tracking-[-0.02em]">
          {NETWORK.title}
        </h2>
        <p className="mt-5 max-w-[var(--measure-lead)] text-secondary">{NETWORK.lead}</p>

        <ul className="mt-6 hidden border-b border-border lg:block" aria-label="Categories">
          {LAYOUT.sectors.map((s, i) => {
            const isActive = activeCat === i;
            return (
              <li key={s.title} className="border-t border-border">
                <button
                  type="button"
                  aria-pressed={pinned === i}
                  onClick={() => togglePin(i)}
                  onMouseEnter={() => setHoverCat(i)}
                  onMouseLeave={() => setHoverCat(null)}
                  onFocus={() => setHoverCat(i)}
                  onBlur={() => setHoverCat(null)}
                  className={cn(
                    'grid w-full grid-cols-[44px_1fr_auto] items-baseline gap-4 py-3 text-left',
                    'transition-colors duration-[var(--dur-fast)] ease-hover',
                    'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-2xs tracking-[0.06em] transition-colors duration-[var(--dur-fast)]',
                      isActive ? 'text-accent-text' : 'text-disabled',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-[var(--dur-fast)]',
                      isActive ? 'text-text' : 'text-secondary',
                    )}
                  >
                    {s.title}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-2xs tracking-[0.06em] transition-colors duration-[var(--dur-fast)]',
                      isActive ? 'text-accent-text' : 'text-disabled',
                    )}
                  >
                    ({String(s.count).padStart(2, '0')})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 lg:mt-auto lg:pt-7">
          <TextLink href="/network">Explore the full network</TextLink>
          <p className="mt-5 hidden max-w-[44ch] text-2xs leading-relaxed text-muted lg:block">
            {NETWORK.qualifier}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ instrument */}
      <div className="hidden lg:block">
        <div
          className="@container relative mx-auto aspect-square"
          style={{ width: 'min(100%, calc(100svh - 200px), 720px)' }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              {/* Curved-label rails. Bottom-half sectors run the arc the other
                  way so their titles read upright. */}
              {LAYOUT.sectors.map((s, i) => {
                const bottom = s.mid > 90 && s.mid < 270;
                return (
                  <path
                    key={`rail-${i}`}
                    id={`oc-label-rail-${i}`}
                    d={
                      bottom
                        ? arcPath(LABEL_R + 1.4, s.a1, s.a0, 0)
                        : arcPath(LABEL_R, s.a0, s.a1, 1)
                    }
                    fill="none"
                  />
                );
              })}
            </defs>

            {/* ── wedges: the separation IS the structure ── */}
            {LAYOUT.sectors.map((s, i) => (
              <path
                key={`wedge-${s.title}`}
                d={wedgePath(WEDGE_INNER, WEDGE_OUTER, s.a0 + WEDGE_GAP_DEG, s.a1 - WEDGE_GAP_DEG)}
                fill={
                  activeCat === i
                    ? 'color-mix(in oklab, var(--gold-500) 14%, var(--color-canvas))'
                    : i % 2
                      ? 'color-mix(in oklab, var(--color-text) 8%, var(--color-canvas))'
                      : 'color-mix(in oklab, var(--color-text) 3.5%, var(--color-canvas))'
                }
                style={{ transition: 'fill var(--dur-base) var(--ease-hover)', cursor: 'pointer' }}
                onClick={() => togglePin(i)}
                onMouseEnter={() => setHoverCat(i)}
                onMouseLeave={() => setHoverCat(null)}
              />
            ))}

            {/* ── hub-to-member connection lines ── */}
            {LAYOUT.placed.map((p) => {
              const [x0, y0] = polar(HUB_R + 1, p.ang);
              const [x1, y1] = polar(RING_RADII[p.ring] - 4.8, p.ang);
              return (
                <line
                  key={`ln-${p.item.name}`}
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke="var(--gold-500)" strokeWidth={1.2} vectorEffect="non-scaling-stroke"
                  style={{
                    opacity: activeCat === p.cat ? 0.85 : 0,
                    transition: 'opacity var(--dur-base) var(--ease-hover)',
                  }}
                />
              );
            })}

            {/* ── segmented rim: the boldest line on the page ── */}
            {LAYOUT.sectors.map((s, i) => (
              <path
                key={`rim-${s.title}`}
                d={arcPath(RIM, s.a0 + WEDGE_GAP_DEG, s.a1 - WEDGE_GAP_DEG)}
                fill="none"
                stroke={activeCat === i ? 'var(--gold-500)' : 'var(--color-text)'}
                strokeWidth={4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ transition: 'stroke var(--dur-base) var(--ease-hover)' }}
              />
            ))}

            {/* ── curved category titles ── */}
            {LAYOUT.sectors.map((s, i) => (
              <text
                key={`label-${s.title}`}
                fill={activeCat === i ? 'var(--color-accent-text)' : 'var(--color-muted)'}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.1px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'fill var(--dur-base) var(--ease-hover)',
                }}
              >
                <textPath href={`#oc-label-rail-${i}`} startOffset="50%" textAnchor="middle">
                  {s.title}
                </textPath>
              </text>
            ))}

            {/* ── icon badges on the rim ── */}
            {LAYOUT.sectors.map((s, i) => {
              const [bx, by] = polar(RIM, s.mid);
              const active = activeCat === i;
              return (
                <g
                  key={`badge-${s.title}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => togglePin(i)}
                  onMouseEnter={() => setHoverCat(i)}
                  onMouseLeave={() => setHoverCat(null)}
                >
                  <circle
                    cx={bx} cy={by} r={4.1}
                    fill={active ? 'var(--gold-500)' : 'var(--color-text)'}
                    stroke="var(--color-canvas)"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    style={{ transition: 'fill var(--dur-base) var(--ease-hover)' }}
                  />
                  <g
                    transform={`translate(${bx - 2.55} ${by - 2.55}) scale(0.2125)`}
                    fill="none"
                    stroke={active ? 'var(--ink-1000)' : 'var(--color-canvas)'}
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'stroke var(--dur-base) var(--ease-hover)' }}
                  >
                    {CATEGORY_GLYPHS[i]}
                  </g>
                </g>
              );
            })}

            {/* ── hub ── */}
            <circle
              cx="50" cy="50" r={HUB_R}
              fill="var(--color-surface)" stroke="var(--color-text)"
              strokeWidth={2} vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* hub content */}
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[1.2cqw]">
            <div style={{ height: 'clamp(24px, 5cqw, 38px)' }}>
              <LogoMark height={38} className="h-full w-auto text-text" />
            </div>
            <p className="font-mono text-[max(9px,1.3cqw)] tracking-[0.06em] text-muted uppercase">
              {LAYOUT.total} institutions
            </p>
          </div>

          {/* plates */}
          <ul aria-label="Institutions">
            {LAYOUT.placed.map((p) => {
              const dimmed = activeCat !== null && activeCat !== p.cat;
              const href = p.item.domain ? `https://${p.item.domain}` : null;
              const sr = `${p.item.name} — ${p.item.industry}. ${p.item.blurb}${
                href ? ' Opens the official site in a new tab.' : ''
              }`;
              const shared = cn(
                'flex items-center justify-center rounded-md border bg-surface shadow-[var(--shadow-1)]',
                'transition-[opacity,border-color,transform] duration-[var(--dur-base)] ease-hover',
                'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                dimmed ? 'opacity-30' : 'opacity-100',
                tip?.item.name === p.item.name
                  ? 'z-10 scale-105 border-border-strong'
                  : 'border-border hover:border-border-strong',
              );
              const plateStyle = { width: 'clamp(44px, 8.4cqw, 64px)', aspectRatio: '1' } as const;
              const inner = (
                <>
                  {p.item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.item.logo} alt="" className="max-h-[55%] max-w-[72%] object-contain" />
                  ) : (
                    <span aria-hidden="true" className="font-mono text-[max(10px,1.5cqw)] text-secondary">
                      {initialsOf(p.item.name)}
                    </span>
                  )}
                  <span className="sr-only">{sr}</span>
                </>
              );

              return (
                <li
                  key={p.item.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {href ? (
                    <a
                      href={href} target="_blank" rel="noopener noreferrer"
                      className={shared} style={plateStyle}
                      onMouseEnter={() => setTip(p)} onMouseLeave={() => setTip(null)}
                      onFocus={() => setTip(p)} onBlur={() => setTip(null)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <span
                      tabIndex={0}
                      className={shared} style={plateStyle}
                      onMouseEnter={() => setTip(p)} onMouseLeave={() => setTip(null)}
                      onFocus={() => setTip(p)} onBlur={() => setTip(null)}
                    >
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {/* floating tooltip — visual duplicate of the inline sr-only text */}
          {tip ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-20 w-[264px] rounded-md border border-border-strong bg-surface-raised p-5 shadow-[var(--shadow-2)]"
              style={{
                left: `${Math.min(80, Math.max(20, tip.x))}%`,
                top: `${tip.y}%`,
                transform:
                  tip.y < 50 ? 'translate(-50%, 40px)' : 'translate(-50%, calc(-100% - 40px))',
              }}
            >
              <p className="font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
                {tip.item.industry}
              </p>
              <p className="mt-2 font-medium text-text">{tip.item.name}</p>
              <p className="mt-2 text-sm text-secondary">{tip.item.blurb}</p>
              {tip.item.domain ? (
                <p className="mt-3 flex items-center gap-2 font-mono text-2xs tracking-[0.06em] text-muted">
                  {tip.item.domain}
                  <svg viewBox="0 0 12 12" className="size-[10px]" aria-hidden="true">
                    <path
                      d="M3 9 9 3M4.5 3H9v4.5"
                      fill="none" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
