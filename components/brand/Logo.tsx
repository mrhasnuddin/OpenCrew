import { cn } from '@/lib/utils';

/**
 * OPENCREW logo.
 *
 * The six SVGs in /public/logo are the ONLY official artwork. The wordmark is
 * never re-typed in a webfont — see docs/00-brand-identity.md §2.3.
 *
 * Odd-numbered files carry dark artwork (for light surfaces); even-numbered
 * carry light artwork (for dark surfaces). Both are rendered and toggled by
 * CSS on [data-theme] — two tiny requests, zero JS, no hydration flash.
 */

type Variant = 'mark' | 'horizontal' | 'combine';

/** Native aspect ratios. The mark is 1.82:1 — it is NOT square. */
const RATIO: Record<Variant, number> = {
  mark: 634 / 349, // 1.8166
  horizontal: 1201 / 162, // 7.4136
  combine: 1055 / 162, // 6.5123
};

/** Below these heights the artwork stops being legible (brand §2.5). */
const MIN_HEIGHT: Record<Variant, number> = {
  mark: 20,
  horizontal: 17, // ≈120px wide
  combine: 37, // ≈240px wide — below this the descriptor closes up
};

type LogoProps = {
  variant?: Variant;
  /** Height in px. Width is derived — passing both invites a squash. */
  height?: number;
  className?: string;
  /** Set on the linked instance in the header; omit where the logo repeats. */
  label?: string;
  /**
   * Fill the container width, height derived from the intrinsic ratio. For the
   * oversized footer wordmark — the brand rule is that the wordmark is artwork
   * and is never re-typed in a webfont, so scaling the official SVG is how we
   * get a display-size wordmark. See docs/00-brand-identity.md §2.3.
   */
  fluid?: boolean;
};

export function Logo({ variant = 'horizontal', height = 26, className, label, fluid }: LogoProps) {
  if (fluid) {
    const shared = { alt: label ?? '', draggable: false } as const;
    return (
      <span
        className={cn('block w-full', className)}
        style={{ aspectRatio: String(RATIO[variant]) }}
        role={label ? undefined : 'presentation'}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...shared} src={`/logo/${variant}-2.svg`} className="logo-on-dark w-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...shared} src={`/logo/${variant}-1.svg`} className="logo-on-light w-full" />
      </span>
    );
  }

  if (process.env.NODE_ENV !== 'production' && height < MIN_HEIGHT[variant]) {
    throw new Error(
      `Logo variant "${variant}" must be at least ${MIN_HEIGHT[variant]}px tall (got ${height}). ` +
        `See docs/00-brand-identity.md §2.5.`,
    );
  }

  const width = Math.round(height * RATIO[variant]);
  const alt = label ?? '';
  const shared = { width, height, alt, draggable: false } as const;

  return (
    <span
      className={cn('inline-block shrink-0', className)}
      style={{ width, height }}
      role={label ? undefined : 'presentation'}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...shared} src={`/logo/${variant}-2.svg`} className="logo-on-dark" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...shared} src={`/logo/${variant}-1.svg`} className="logo-on-light" />
    </span>
  );
}

/**
 * Inline mark. Use only where the body must inherit currentColor — loading
 * and empty states, partner lockups, generated OG cards. The gold arcs are
 * hard-coded and never inherit: the two-tone split IS the mark.
 */
export function LogoMark({
  height = 24,
  className,
  title,
}: {
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 634 349"
      height={height}
      width={Math.round(height * RATIO.mark)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M368.499 120.899C370.113 108.799 359.088 87.6228 353.373 78.5474C461.472 -55.3658 585.301 13.3387 633.704 64.4301L602.444 84.5977C510.681 -15.2322 384.633 61.4049 368.499 120.899Z"
        fill="var(--logo-gold)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M602.444 263.081L633.704 284.257C605.805 318.206 525.807 375.617 429.002 333.668V292.324C457.237 311.82 531.454 333.265 602.444 263.081Z"
        fill="var(--logo-gold)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M429.002 292.324V333.668C335.223 302.408 316.063 198.545 317.072 194.511C317.878 191.284 313.374 158.882 311.021 143.084C286.013 67.2535 224.637 42.2456 197.074 39.2204C83.3286 26.3131 44.1362 116.53 38.7582 163.251C33.1112 244.729 94.8914 289.299 126.487 301.4C220.872 336.088 282.787 266.779 301.946 227.788C302.753 245.535 313.71 264.762 319.088 272.157C256.972 359.281 158.083 352.827 116.404 338.71C14.7586 299.988 -3.25779 205.604 0.439615 163.251C7.66288 44.9705 103.009 14.0039 130.115 5.20042C133.281 4.17202 135.516 3.44606 136.571 2.91869C144.638 -1.11484 177.579 -0.106458 193.041 0.901924C323.122 15.0193 350.348 125.941 356.399 192.495C363.457 248.964 407.49 280.896 429.002 292.324Z"
        fill="currentColor"
      />
    </svg>
  );
}
