import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Section banner for the dense subpages — the marketplace reference's
 * category header, rebuilt in this system: a contained panel that states
 * where you are before the page starts, with drawn geometry holding the two
 * ends and the statement centred between them.
 *
 * Ours is black and gold rather than a colour field, and it is quiet: one
 * hairline grid, one glyph per side at low opacity, a gold bloom under the
 * type. No photography (that is the home page's job) and no motion — this is
 * a signpost, and a signpost that performs is a distraction.
 *
 * The banner owns the page's <h1>, so a page that uses it must not set its
 * own. Reserve it for pages with real depth behind them; on a thin page it is
 * a lid on an empty box.
 */
export type BannerMotif = 'crew' | 'partners' | 'about' | 'join';

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  actionHref,
  motif,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
  motif: BannerMotif;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-xl border border-border bg-ink-950',
        className,
      )}
    >
      {/* hairline grid, faded out towards the centre so type sits on calm ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--gold-500) 9%, transparent) 1px, transparent 1px),' +
            'linear-gradient(to bottom, color-mix(in oklab, var(--gold-500) 9%, transparent) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(120% 100% at 50% 50%, transparent 22%, #000 78%)',
          WebkitMaskImage: 'radial-gradient(120% 100% at 50% 50%, transparent 22%, #000 78%)',
        }}
      />

      {/* gold bloom under the statement + a lit top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 120% at 50% 118%, color-mix(in oklab, var(--gold-500) 22%, transparent) 0%, transparent 62%),' +
            'linear-gradient(180deg, color-mix(in oklab, var(--gold-500) 7%, transparent) 0%, transparent 34%)',
        }}
      />

      {/* the drawn ends — hidden on phones, where they would only crowd */}
      <Motif motif={motif} side="left" />
      <Motif motif={motif} side="right" />

      <div className="relative flex flex-col items-center px-6 py-8 text-center lg:px-9 lg:py-9">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="max-w-[20ch] text-4xl font-bold tracking-[-0.03em] text-balance lg:text-5xl">
          {title}
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">{subtitle}</p>
        {actionLabel && actionHref ? (
          <Link href={actionHref} className={buttonClasses('secondary', 'md', 'mt-7')}>
            {actionLabel}
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
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/**
 * One glyph per page, drawn from the same vocabulary as the capability
 * artwork — concentric geometry in gold hairlines. The right side is the
 * mirror of the left, so the panel is symmetrical without drawing twice.
 */
function Motif({ motif, side }: { motif: BannerMotif; side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 hidden w-[34%] max-w-[420px] text-accent md:block',
        side === 'left' ? 'left-0' : 'right-0 -scale-x-100',
      )}
      style={{
        maskImage: 'linear-gradient(90deg, #000 0%, #000 45%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, #000 0%, #000 45%, transparent 100%)',
      }}
    >
      <svg
        viewBox="0 0 400 260"
        preserveAspectRatio="xMinYMid slice"
        className="h-full w-full opacity-[0.28]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <Glyph motif={motif} />
      </svg>
    </div>
  );
}

function Glyph({ motif }: { motif: BannerMotif }) {
  if (motif === 'crew') {
    // orbits with members on them — the roster, drawn
    return (
      <g>
        <circle cx="120" cy="130" r="46" />
        <circle cx="120" cy="130" r="80" strokeDasharray="3 7" />
        <circle cx="120" cy="130" r="114" />
        <circle cx="120" cy="50" r="7" fill="currentColor" stroke="none" />
        <circle cx="200" cy="130" r="6" fill="currentColor" stroke="none" />
        <circle cx="63" cy="187" r="5" fill="currentColor" stroke="none" />
        <circle cx="34" cy="130" r="5" fill="currentColor" stroke="none" />
      </g>
    );
  }
  if (motif === 'partners') {
    // a wall of uniform plates — the institutional grid
    return (
      <g>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 92}
              y={34 + row * 52}
              width="76"
              height="38"
              rx="6"
              opacity={((row + col) % 3) * 0.28 + 0.35}
            />
          )),
        )}
      </g>
    );
  }
  if (motif === 'about') {
    // stacked capability layers, seen edge-on
    return (
      <g>
        <path d="M120 42 214 130 120 218 26 130Z" />
        <path d="M120 78 178 130 120 182 62 130Z" strokeDasharray="3 7" />
        <path
          d="M120 108 148 130 120 152 92 130Z"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
        <path d="M232 130h150M-10 130h20" opacity="0.35" />
      </g>
    );
  }
  // join — a path forward, chevrons converging on the roster
  return (
    <g>
      <path d="M40 60 96 130 40 200" strokeWidth="1.4" />
      <path d="M104 60 160 130 104 200" opacity="0.6" />
      <path d="M168 60 224 130 168 200" opacity="0.3" />
      <circle cx="300" cy="130" r="34" strokeDasharray="3 7" />
      <circle cx="300" cy="130" r="10" fill="currentColor" stroke="none" />
    </g>
  );
}
