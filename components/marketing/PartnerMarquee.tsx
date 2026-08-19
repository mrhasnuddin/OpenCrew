import { NETWORK, type Institution } from '@/content/site';
import { BrandMark } from './BrandMark';
import { cn } from '@/lib/utils';

/**
 * Partner marquee in the ENI reference's manner: five continuous rows of
 * uniform logo plates on black, alternating direction, edges faded into the
 * canvas so the strip reads as passing beneath a mask. All 27 institutions
 * lumped together (client direction — no category split), dealt round-robin
 * across rows so no row is "the exchanges row".
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

const ROWS = 5;
const DURATIONS = [52, 64, 48, 70, 56]; // seconds — never in step

function deal(): Institution[][] {
  const all = NETWORK.categories.flatMap((c) => c.items);
  const rows: Institution[][] = Array.from({ length: ROWS }, () => []);
  all.forEach((item, i) => rows[i % ROWS].push(item));
  // Rows with fewer plates get padded from the front of the list so every
  // row is long enough to loop without a visible gap at 1600px.
  return rows.map((row) => (row.length < 8 ? [...row, ...all.slice(0, 8 - row.length)] : row));
}

function Plate({ item }: { item: Institution }) {
  return (
    <li className="card-glass flex h-[64px] w-[168px] shrink-0 items-center justify-center gap-3 rounded-md px-5">
      {/* Local file → Brandfetch by domain (if configured) → monogram + name.
          Marks sit greyscale at slightly reduced opacity: 27 brand palettes
          at full strength would fight a system built on one gold. */}
      <BrandMark
        item={item}
        type="logo"
        h={56}
        className="max-h-[28px] max-w-[128px] opacity-80 grayscale"
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
