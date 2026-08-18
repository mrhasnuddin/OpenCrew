import Link from 'next/link';
import { ENGAGEMENT_MODELS, EXECUTION_FLOW } from '@/content/site';
import { buttonClasses } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/**
 * "How we work" as a bento — the three engagement models as cells with a big
 * numeral and their commercial shape, plus a wide cell carrying the five-step
 * execution flow as a horizontal ladder. Replaces the old /engage page in
 * full: everything that page said is here, at a glance, with the intake CTA
 * one cell away.
 *
 * Model 02 (Global Growth Mandate) is the gold cell — it's the retained
 * relationship the business is built around, and the reference decks always
 * pick one accent cell per composition, not three.
 */
export function ModelsBento() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {ENGAGEMENT_MODELS.map((m, i) => (
        <article
          key={m.slug}
          className={cn(
            'card-glass flex min-h-[300px] flex-col rounded-xl p-6 lg:p-7',
            i === 1 && 'card-glass-gold',
          )}
        >
          <span className="font-mono text-4xl font-bold text-accent-text tabular-nums lg:text-5xl">
            {m.index}
          </span>
          <h3 className="mt-6 text-xl font-bold text-text lg:text-2xl">{m.title}</h3>
          <p className="mt-3 text-sm text-secondary">{m.body}</p>
          <p className="mt-4 text-sm text-muted">
            <span className="text-secondary">Best for:</span> {m.bestFor}
          </p>
          <p className="mt-auto border-t border-border pt-5 font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
            {m.shape}
          </p>
        </article>
      ))}

      {/* -------------------------------------------------- flow, full width */}
      <div className="card-glass rounded-xl p-6 lg:col-span-3 lg:p-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Execution flow</p>
            <p className="mt-3 text-lg font-bold text-text lg:text-xl">
              From project assessment to expansion.
            </p>
          </div>
          <Link href="/contact" className={buttonClasses('primary', 'md', 'rounded-full')}>
            Start a project
          </Link>
        </div>
        {/* Timeline (client annotation): a track across the top with one node
            per step. The sequence AUTO-LOOPS on a 3s cycle — fill runs left to
            right, nodes light in turn (0 / 0.6 / 1.2 / 1.8 / 2.4s), a short
            fade, repeat. Pure CSS (tokens.css .flow-*), no scroll trigger.
            Reduced motion: static, all lit. */}
        <Reveal className="mt-7 border-t border-border pt-7">
          <div className="relative flow-loop">
            <span aria-hidden="true" className="flow-track" />
            <span aria-hidden="true" className="flow-fill" />
            <ol className="grid gap-6 lg:grid-cols-5">
              {EXECUTION_FLOW.map((step, i) => (
                <li key={step.index} className="relative pt-7">
                  <span aria-hidden="true" className="flow-node" data-i={i} />
                  <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                    {step.index}
                  </span>
                  <span className="mt-3 block font-medium text-text">{step.title}</span>
                  <span className="mt-2 block text-sm text-muted">{step.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
