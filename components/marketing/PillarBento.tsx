import Link from "next/link";
import Image from "next/image";
import { MarketFlags } from "./MarketFlags";
import { PILLARS, NETWORK } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The four pillars + markets as a bento grid — moved OUT of the hero (client
 * direction: the hero is immersive photography and one message; this is the
 * "what is OPENCREW at a glance" that used to crowd its bottom band).
 *
 * Grammar from the reference decks: soft-radius cells (radius-xl), mixed
 * surfaces — one photo-dominant anchor cell, one ink, one gold, one plain —
 * a big numeral per cell, and a circled ↗ affordance. Every cell is a real
 * link into the relevant page, so the grid doubles as the site's visual index.
 *
 * lg is a 4-column grid: the photo anchor spans 2×2, four 1×1 cells beside it.
 * The active markets sit BELOW the grid as a plain centred block — label over
 * the flags — not in a cell (client direction: the boxed strip is retired).
 * Cell anatomy is identical everywhere: index / arrow on the top row, title +
 * body bottom-aligned, the same padding, rows tall enough that a two-line
 * title and three-line body still clear the padding. Pillar titles and bodies
 * are V3's approved wording via PILLARS; the partner count is computed, not
 * typed, so it can't drift from the data.
 */

const PILLAR_LINKS = [
  '/crew',
  '/#cap-global-representation',
  '/#cap-institutional-access',
  '/#cap-market-execution',
];

function ArrowChip({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-[38px] shrink-0 items-center justify-center rounded-full border",
        "transition-transform duration-[var(--dur-base)] ease-out",
        "group-hover:translate-x-[2px] group-hover:-translate-y-[2px]",
        inverse
          ? "border-ink-600 text-ink-100"
          : "border-border-strong text-text",
      )}
    >
      <svg viewBox="0 0 12 12" className="size-[13px]">
        <path
          d="M3 9 9 3M4.5 3H9v4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const CELL = cn(
  "group relative flex flex-col overflow-hidden rounded-xl p-6 lg:p-7",
  "transition-[border-color,transform] duration-[var(--dur-base)] ease-out",
  "focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2",
  "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]",
);

export function PillarBento() {
  const partnerCount = NETWORK.categories.reduce(
    (n, c) => n + c.items.length,
    0,
  );
  const [crew, representation, access, execution] = PILLARS;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(264px,auto)] lg:gap-6">
        {/* ---------------------------------------- anchor: the crew, in photo */}
        <Link
          href={PILLAR_LINKS[0]}
          className={cn(
            CELL,
            "card-glass card-glass-hover min-h-[320px] md:col-span-2 lg:row-span-2",
          )}
        >
          <Image
            src="/showcase/web/team-group.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, color-mix(in oklab, var(--ink-1000) 90%, transparent) 0%, color-mix(in oklab, var(--ink-1000) 30%, transparent) 55%, transparent 100%)",
            }}
          />
          <span className="relative mt-auto flex items-end justify-between gap-6">
            <span>
              <span className="font-mono text-2xs tracking-[0.06em] text-gold-400">
                01
              </span>
              <span className="mt-2 block text-2xl font-bold text-ink-50 lg:text-3xl">
                {crew.title}
              </span>
              <span className="mt-2 block max-w-[38ch] text-sm text-ink-200">
                {crew.body}
              </span>
            </span>
            <ArrowChip inverse />
          </span>
        </Link>

        {/* ------------------------------------------------- representation, ink */}
        <Link
          href={PILLAR_LINKS[1]}
          className={cn(CELL, "card-glass card-glass-hover")}
        >
          <span className="flex items-start justify-between gap-5">
            <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
              02
            </span>
            <ArrowChip inverse />
          </span>
          <span className="mt-auto">
            <span className="block text-lg font-bold text-text xl:text-xl">
              {representation.title}
            </span>
            <span className="mt-2 block text-sm text-secondary">
              {representation.body}
            </span>
          </span>
        </Link>

        {/* ------------------------------------------------------- access, gold */}
        <Link
          href={PILLAR_LINKS[2]}
          className={cn(CELL, "card-glass card-glass-gold card-glass-hover")}
        >
          <span className="flex items-start justify-between gap-5">
            <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
              03
            </span>
            <ArrowChip />
          </span>
          <span className="mt-auto">
            <span className="block text-lg font-bold text-text xl:text-xl">
              {access.title}
            </span>
            <span className="mt-2 block text-sm text-secondary">
              {access.body}
            </span>
          </span>
        </Link>

        {/* --------------------------------------------------- execution, plain */}
        <Link
          href={PILLAR_LINKS[3]}
          className={cn(CELL, "card-glass card-glass-hover")}
        >
          <span className="flex items-start justify-between gap-5">
            <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
              04
            </span>
            <ArrowChip />
          </span>
          <span className="mt-auto">
            <span className="block text-lg font-bold text-text xl:text-xl">
              {execution.title}
            </span>
            <span className="mt-2 block text-sm text-secondary">
              {execution.body}
            </span>
          </span>
        </Link>

        {/* -------------------------------------------------- partners, counted */}
        <Link
          href="/partners"
          className={cn(CELL, "card-glass card-glass-hover")}
        >
          <span className="flex items-start justify-between gap-5">
            <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
              Institutional network
            </span>
            <ArrowChip inverse />
          </span>
          <span className="mt-auto">
            <span className="block text-4xl font-bold text-accent-text lg:text-5xl">
              {partnerCount}
            </span>
            <span className="mt-2 block text-sm text-secondary">
              Partner institutions across capital, payments, RWA and
              professional services
            </span>
          </span>
        </Link>
      </div>

      {/* --------------------------------------------- active markets, unboxed
          Label centred above the flags (client frame): no card, no border —
          the nine markets read as a caption to the grid, not a tenth cell. */}
      <div className="mt-8 flex flex-col items-center gap-6">
        <p className="eyebrow">Active markets</p>
        <MarketFlags align="center" />
      </div>
    </>
  );
}
