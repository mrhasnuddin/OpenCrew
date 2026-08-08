import * as React from 'react';
import { cn } from '@/lib/utils';

export type ChipTone = 'neutral' | 'accent' | 'success' | 'outline';

const TONES: Record<ChipTone, string> = {
  neutral: 'bg-surface-raised border-border text-secondary',
  accent: 'bg-accent-subtle border-gold-950 text-accent-text',
  success: 'bg-success-subtle border-success-subtle text-success',
  outline: 'bg-transparent border-border text-muted',
};

export function Chip({
  tone = 'neutral',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: ChipTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-xs border px-3 py-1',
        'font-mono text-2xs uppercase tracking-[0.06em] whitespace-nowrap',
        TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Toggleable filter pill. The check fades in — it never scales from 0
 * (docs/03-design-system.md §2). Target height clears 44px via py + line-height
 * where it is used as a primary control.
 */
export function FilterChip({
  selected = false,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex min-h-[32px] items-center gap-3 rounded-xs border px-4',
        'font-mono text-2xs uppercase tracking-[0.06em] whitespace-nowrap',
        'transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] ease-hover',
        'active:scale-[0.97] active:duration-[var(--dur-instant)]',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
        selected
          ? 'border-gold-950 bg-accent-subtle text-accent-text'
          : 'border-border bg-transparent text-muted hover:border-border-strong hover:text-secondary',
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        className={cn(
          'size-[12px] transition-opacity duration-[var(--dur-fast)] ease-hover',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      >
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </button>
  );
}

/** Availability indicator. Colour is never the only signal — the label ships too. */
export function AvailabilityDot({ state }: { state: 'available' | 'limited' | 'by_introduction' }) {
  const map = {
    available: { color: 'bg-success', label: 'Available now', pulse: true },
    limited: { color: 'bg-accent', label: 'Limited availability', pulse: false },
    by_introduction: { color: 'bg-ink-400', label: 'By introduction', pulse: false },
  } as const;
  const { color, label, pulse } = map[state];

  return (
    <span className="inline-flex items-center gap-3 font-mono text-2xs uppercase tracking-[0.06em] text-muted">
      <span
        aria-hidden="true"
        className={cn(
          'size-[8px] rounded-full',
          color,
          /* The one ambient animation in the system. */
          pulse && 'motion-safe:animate-pulse',
        )}
        style={pulse ? { animationDuration: '2s' } : undefined}
      />
      {label}
    </span>
  );
}
