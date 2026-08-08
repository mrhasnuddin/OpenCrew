import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Motion contract (docs/03-design-system.md §2):
 *  - named properties only, never `transition: all`
 *  - :active scale(0.97) at 100ms — every pressable element responds
 *  - loading locks the label so the button never resizes mid-action
 *
 * Note on sizing: Tailwind's default spacing scale is cleared in tokens.css,
 * so `h-8` would resolve against the φ scale (68px). Control heights are not
 * spacing tokens — they are explicit px.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active',
  secondary:
    'bg-surface-raised text-text border border-border hover:bg-surface-hover hover:border-border-strong',
  ghost: 'bg-transparent text-text border border-border hover:border-border-strong hover:bg-surface',
  quiet: 'bg-transparent text-secondary hover:text-text',
  danger: 'bg-danger text-ink-0 hover:opacity-90',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-[32px] px-5 text-sm gap-3 rounded-sm',
  md: 'h-[40px] px-6 text-sm gap-3 rounded-md',
  lg: 'h-[48px] px-6 text-base gap-4 rounded-md',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap font-medium select-none',
    'transition-[background-color,border-color,color,opacity,transform]',
    'duration-[var(--dur-fast)] ease-hover',
    'active:scale-[0.97] active:duration-[var(--dur-instant)] active:ease-out',
    'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-45',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-[16px] animate-spin"
      /* A faster spinner makes the app feel faster at identical load times. */
      style={{ animationDuration: '600ms' }}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
