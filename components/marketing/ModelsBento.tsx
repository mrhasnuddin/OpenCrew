import Link from 'next/link';
import { ENGAGEMENT_MODELS, EXECUTION_FLOW } from '@/content/site';
import { buttonClasses } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/**
 * "How we work" as a bento — the three engagement models as cells with a big
 * numeral and their commercial shape, plus a wide cell carrying the five-step
 * execution flow as its own row of stepped surfaces. Replaces the old /engage page in
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
          <Link href="/contact" className={buttonClasses('primary', 'md')}>
            Start a project
          </Link>
        </div>
        {/* Execution flow. Five cells rather than labels hung off a hairline:
            each stage is a surface of its own, the rail runs between them at
            the node line, and the numeral is repeated as a watermark so the
            order reads before any of the words do. The last cell is gold —
            it is the one the whole sequence is for, and the reference decks
            always resolve a composition on one accent, never five.

            Below lg the cells stack and the rail turns vertical, drawn down
            the left through the same nodes. */}
        <Reveal className="mt-7 border-t border-border pt-8">
          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-5">
            {EXECUTION_FLOW.map((step, i) => {
              const last = i === EXECUTION_FLOW.length - 1;
              return (
                <li key={step.index} className="relative pl-8 lg:pt-6 lg:pl-0">
                  {/* rail: to the next cell on lg, down to it below */}
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bg-[linear-gradient(180deg,color-mix(in_oklab,var(--gold-500)_55%,transparent),color-mix(in_oklab,var(--gold-500)_20%,transparent))]',
                        'top-[26px] left-[13px] w-px h-[calc(100%-4px)]',
                        'lg:top-[13px] lg:left-[26px] lg:h-px lg:w-[calc(100%-6px)]',
                        'lg:bg-[linear-gradient(90deg,color-mix(in_oklab,var(--gold-500)_55%,transparent),color-mix(in_oklab,var(--gold-500)_20%,transparent))]',
                      )}
                    />
                  ) : null}

                  {/* node, sitting on the cell's edge */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 left-0 z-10 flex size-[27px] items-center justify-center rounded-full',
                      'font-label text-2xs font-semibold tracking-[0.04em] tabular-nums',
                      'border bg-canvas',
                      last
                        ? 'border-accent bg-accent text-on-accent shadow-[0_0_0_5px_color-mix(in_oklab,var(--gold-500)_16%,transparent)]'
                        : 'border-[color-mix(in_oklab,var(--gold-500)_55%,transparent)] text-accent-text',
                      'lg:left-[13px]',
                    )}
                  >
                    {step.index}
                  </span>

                  <div
                    className={cn(
                      'relative h-full overflow-hidden rounded-md border p-6 lg:pt-7',
                      last
                        ? 'border-[color-mix(in_oklab,var(--gold-500)_38%,transparent)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--gold-500)_12%,var(--ink-950)),var(--ink-1000))]'
                        : 'border-border bg-[linear-gradient(160deg,var(--ink-950),var(--ink-1000))]',
                    )}
                  >
                    {/* the order, readable before the words */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -bottom-4 font-label text-[64px] leading-none font-bold text-[rgb(255_255_255/0.04)] tabular-nums"
                    >
                      {step.index}
                    </span>
                    <h4 className="relative font-medium text-text">{step.title}</h4>
                    <p className="relative mt-3 text-sm text-muted">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </div>
  );
}
