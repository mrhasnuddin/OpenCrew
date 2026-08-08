import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { Disclaimer } from '@/components/marketing/Blocks';
import { WORK, INDEPENDENCE_DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: 'Selected Engagements',
  description:
    'PAYGO and ENIPAY in depth, plus supporting engagements across Web3, AI and infrastructure.',
};

export default function WorkPage() {
  const featured = WORK.filter((w) => w.tier === 'featured');
  const supporting = WORK.filter((w) => w.tier === 'supporting');

  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Selected engagements</p>
        <h1 className="max-w-[20ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Two engagements. One global growth system.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Across Web3, AI and infrastructure — team, readiness, institutional access and market
          execution, deployed together.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-col gap-7">
          {featured.map((p) => (
            <Card key={p.slug} interactive className="flex flex-col gap-7">
              <div>
                <h2 className="text-2xl font-medium">
                  <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0">
                    {p.name}
                  </Link>
                </h2>
                <p className="mt-3 text-secondary">{p.projectType}</p>
              </div>
              <div className="grid gap-7 border-t border-border pt-6 lg:grid-cols-2">
                <div>
                  <h3 className="eyebrow mb-5">OPENCREW core deliverables</h3>
                  <ul className="flex flex-col gap-3">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex gap-4 text-sm text-secondary">
                        <span aria-hidden="true" className="text-disabled">
                          —
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow mb-5">Milestones</h3>
                  <ul className="flex flex-col gap-3">
                    {p.milestones?.map((m) => (
                      <li key={m} className="flex gap-4 text-sm text-secondary">
                        <span aria-hidden="true" className="text-accent-text">
                          —
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Disclaimer>{INDEPENDENCE_DISCLAIMER}</Disclaimer>
      </Section>

      <Section eyebrow="Across Web3, AI & infrastructure" title="Supporting engagements">
        <ul className="grid gap-6 lg:grid-cols-3">
          {supporting.map((p) => (
            <Card as="li" key={p.slug} interactive className="flex flex-col gap-5">
              <div>
                <h3 className="text-lg font-medium">
                  <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-2 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                  {p.projectType}
                </p>
              </div>
              <p className="text-sm text-secondary">{p.deliverables[0]}</p>
              {p.capability ? (
                <p className="mt-auto border-t border-border pt-5 text-sm text-muted">
                  <span className="text-secondary">Capability demonstrated:</span> {p.capability}
                </p>
              ) : null}
            </Card>
          ))}
        </ul>
        <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
          Additional project engagements and customised service experience can be provided according
          to specific cooperation requirements.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-wrap gap-4">
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
