import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { Stepper } from '@/components/marketing/Blocks';
import { ENGAGEMENT_MODELS, EXECUTION_FLOW } from '@/content/site';

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'Project Engagement, Global Growth Mandate or Venture Co-Building — three levels of engagement for different project stages, and the five-step execution flow behind them.',
};

export default function EngagePage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">How we work</p>
        <h1 className="max-w-[20ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          The right level of engagement for each project stage.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          From a single deployed executive to a long-term co-building partnership.
        </p>
      </Section>

      <Section className="border-t border-border">
        <ul className="grid gap-6 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m) => (
            <Card as="li" key={m.slug} className="flex flex-col gap-5">
              <span className="font-mono text-2xs tracking-[0.06em] text-muted">{m.index}</span>
              <h2 className="text-xl font-medium">{m.title}</h2>
              <p className="text-sm text-secondary">{m.body}</p>
              <div className="mt-auto flex flex-col gap-4 border-t border-border pt-5">
                <div>
                  <p className="eyebrow mb-2">Best for</p>
                  <p className="text-sm text-muted">{m.bestFor}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Commercial shape</p>
                  <p className="text-sm text-accent-text">{m.shape}</p>
                </div>
              </div>
            </Card>
          ))}
        </ul>
        <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
          Commercials are scoped per project. Tell us the stage and the markets, and we will come
          back with a shape.
        </p>
      </Section>

      <Section eyebrow="Execution flow" title="From project assessment to expansion.">
        <Stepper steps={EXECUTION_FLOW} />
      </Section>

      <Section className="border-t border-border">
        <h2 className="max-w-[18ch] text-3xl tracking-[-0.02em] lg:text-4xl lg:tracking-[-0.025em]">
          Tell us about your project.
        </h2>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/services" className={buttonClasses('ghost', 'lg')}>
            See the capabilities
          </Link>
        </div>
      </Section>
    </>
  );
}
