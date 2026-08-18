import * as React from 'react';
import { cn } from '@/lib/utils';

/** Container caps at 1320px; `content` narrows to 1064px for reading-weight pages. */
export function Container({
  size = 'max',
  className,
  children,
}: {
  size?: 'max' | 'content';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Dropped the xl:px-8 (68px) step. Past 1480 the auto-centring already
        // supplies the margin, so the extra padding only ate content width.
        'mx-auto w-full px-5 md:px-7',
        size === 'max' ? 'max-w-[var(--container-max)]' : 'max-w-[var(--container-content)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section rhythm is space-7 (42px) mobile / space-9 (110px) desktop.
 * Anything between those two is a mistake, not a decision.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('py-7 lg:py-9', className)}>
      <Container>
        {(eyebrow || title || lead) && (
          <header className="mb-7 flex flex-col gap-5 lg:mb-8">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section-title">{title}</h2> : null}
            {lead ? <p className="lead-measure text-lg text-secondary">{lead}</p> : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

/** The 61.8 / 38.2 editorial split — not 50/50, not 66/33. */
export function GoldenSplit({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn('grid gap-7 lg:gap-8 lg:[grid-template-columns:1.618fr_1fr]', className)}
    >
      {children}
    </div>
  );
}
