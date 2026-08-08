import Link from 'next/link';
import { Card, CardLink } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

/* CapabilityCard now lives in ./CapabilityCard.tsx — it needs a client
   boundary for the animated icons and shouldn't drag this module with it. */

/**
 * Numbered flow. Horizontal from lg, vertical below — a five-step horizontal
 * stepper on a phone is unreadable, and shrinking the type to make it fit is
 * the wrong trade.
 */
export function Stepper({
  steps,
}: {
  steps: { index: string; title: string; body?: string }[];
}) {
  return (
    <ol className="grid gap-6 lg:grid-cols-5 lg:gap-5">
      {steps.map((step) => (
        <li key={step.index} className="border-t border-border pt-5">
          <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">{step.index}</span>
          <h3 className="mt-3 font-medium text-text">{step.title}</h3>
          {step.body ? <p className="mt-3 text-sm text-muted">{step.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}

/** Label + list. The workhorse of the capability pages. */
export function ListGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-border pt-5">
      <h3 className="eyebrow mb-5">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-secondary">
            <span aria-hidden="true" className="text-disabled">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Manifesto line. One per page maximum — the serif is what stops the site
 * reading like a dev-tools landing page, and it only works because it is rare.
 */
export function Manifesto({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'manifesto border-l border-accent pl-6 text-2xl text-text lg:text-3xl',
        'max-w-[var(--measure-lead)]',
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Mandatory independence notice. Quiet, present, never buried in a footnote. */
export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-[var(--measure-prose)] rounded-md border border-border bg-surface p-5 text-sm text-muted">
      {children}
    </p>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-link underline decoration-from-font underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-hover hover:text-link-hover"
    >
      {children}
    </Link>
  );
}
