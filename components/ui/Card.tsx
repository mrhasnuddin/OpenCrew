import * as React from 'react';
import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLElement> & {
  /** Adds hover affordance. Use only when the whole card is a link target. */
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
};

/**
 * Elevation on dark is lightness + ring, not shadow — a shadow on #080D12
 * is invisible. See docs/03-design-system.md §1.3.
 *
 * Interactive cards lift by translateY(-2px), never scale(1.02): scale blurs
 * text on non-integer device pixel ratios.
 */
export function Card({ interactive, as: Tag = 'div', className, children, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-lg border border-border bg-surface p-6',
        interactive && [
          'transition-[border-color,transform] duration-[var(--dur-base)] ease-out',
          '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]',
          '[@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong',
          'focus-within:border-border-strong',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Stretched link overlay. Keeps the whole card clickable while leaving the
 * text selectable and the accessible name coming from the heading.
 */
export function CardLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'after:absolute after:inset-0 after:content-[""] after:rounded-lg',
        'focus-visible:outline-none after:focus-visible:outline-2',
        'after:focus-visible:outline-focus after:focus-visible:outline-offset-2',
        className,
      )}
    >
      {children}
    </a>
  );
}
