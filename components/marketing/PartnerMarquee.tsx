import { NETWORK, type Institution } from '@/content/site';
import { BrandMark } from './BrandMark';
import { cn } from '@/lib/utils';

/**
 * Partner marquee in the ENI reference's manner: three continuous rows of
 * uniform logo plates on black (client direction: three is enough),
 * alternating direction, edges faded into the canvas so the strip reads as
 * passing beneath a mask. All institutions lumped together (no category
 * split), dealt round-robin across rows so no row is "the exchanges row" and
 * NO institution appears in more than one row — each row is its own set,
 * repeated only for the loop.
 *
 * Every plate is the SAME box — 168×64 — regardless of what's inside. That's
 * the rule that makes a wall of mixed-ratio logos read as one system, and it
 * holds when the monograms are swapped for artwork: the mark is object-contain
 * inside a fixed frame, so a wide wordmark and a square icon occupy identical
 * real estate. Marks come from a local file, else Brandfetch's CDN by domain
 * when NEXT_PUBLIC_BRANDFETCH_CLIENT_ID is set (see lib/brandfetch.ts), else
 * the monogram. Either way, displaying a third party's mark needs that
 * party's permission before launch (brand §7.2d).
 *
 * Motion is the CSS marquee from tokens.css — runs on the compositor, pauses
 * on hover, and under reduced-motion becomes a hand-scrollable strip. Each
 * row's set is rendered twice so the -50% translate loops seamlessly.
 *
 * Decorative (aria-hidden); the sr-only line and the parent's "View all"
 * CTA carry the accessible content.
 */

const ROWS = 3;
const DURATIONS = [58, 72, 50]; // seconds — never in step
// A row must cover the 1600px container before it loops (plate 168 + gap 16
// = 184px → 9 plates). Short rows repeat THEIR OWN items, never borrow from
// another row, so the three rows stay distinct.
const MIN_PER_ROW = 9;

function deal(): Institution[][] {
  const all = NETWORK.categories.flatMap((c) => c.items);
  const rows: Institution[][] = Array.from({ length: ROWS }, () => []);
  all.forEach((item, i) => rows[i % ROWS].push(item));
  return rows.map((row) => {
    if (!row.length) return row;
    const out = [...row];
    while (out.length < MIN_PER_ROW) out.push(row[out.length % row.length]);
    return out;
  });
}

function Plate({ item }: { item: Institution }) {
  return (
    <li
      className={cn(
        'group flex h-[64px] w-[168px] shrink-0 items-center justify-center gap-3 rounded-md px-5',
        // Lighter-than-canvas plate (client direction: the black plates
        // swallowed dark marks). A soft top-lit gradient two steps above the
        // canvas, a strong border and a hairline top sheen give every mark a
        // ground to sit on; marks measured dark are additionally inverted to
        // white via logoTheme (content/site.ts).
        'border border-ink-700 bg-[linear-gradient(180deg,#222222_0%,#161616_58%,#111111_100%)]',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.07)]',
        'transition-[transform,border-color] duration-[var(--dur-base)] ease-out',
        '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px] hover:border-ink-600',
      )}
    >
      {/* Local file → Brandfetch by domain (if configured) → monogram + name.
          Marks sit greyscale at slightly reduced opacity: 27 brand palettes
          at full strength would fight a system built on one gold. */}
      <BrandMark
        item={item}
        type="logo"
        h={56}
        className="max-h-[28px] max-w-[128px]"
        monogramClassName="size-[28px]"
      >
        <span className="truncate text-xs font-medium text-secondary">{item.name}</span>
      </BrandMark>
    </li>
  );
}

export function PartnerMarquee({ className }: { className?: string }) {
  const rows = deal();
  const total = NETWORK.categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className={cn('relative', className)}>
      <p className="sr-only">
        {total} partner institutions across capital markets, payments, RWA, professional services
        and global industries.
      </p>

      {/* Edge masks — the strip passes under the canvas, ENI-style. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%]"
        style={{ background: 'linear-gradient(90deg, var(--color-canvas), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%]"
        style={{ background: 'linear-gradient(270deg, var(--color-canvas), transparent)' }}
      />

      <div aria-hidden="true" className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <div key={i} className="marquee">
            <ul
              className="marquee-track gap-4 pr-4"
              data-direction={i % 2 ? 'reverse' : undefined}
              style={{ '--marquee-duration': `${DURATIONS[i]}s` } as React.CSSProperties}
            >
              {[...row, ...row].map((item, j) => (
                <Plate key={`${item.name}-${j}`} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
