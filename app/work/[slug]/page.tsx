import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, GoldenSplit } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { ListGroup, Disclaimer, TextLink } from '@/components/marketing/Blocks';
import { WORK, INDEPENDENCE_DISCLAIMER } from '@/content/site';
import { SERVICES } from '@/content/services';

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = WORK.find((w) => w.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.background ?? project.projectType,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = WORK.find((w) => w.slug === slug);
  if (!project) notFound();

  const others = WORK.filter((w) => w.slug !== project.slug).slice(0, 3);
  // Capabilities most visibly exercised on a featured engagement.
  const related = SERVICES.filter((s) =>
    project.tier === 'featured'
      ? ['global-crew', 'exchange-readiness', 'institutional-access'].includes(s.slug)
      : ['consultants-education', 'market-execution'].includes(s.slug),
  );

  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">
          {project.tier === 'featured' ? 'Featured engagement' : 'Engagement'}
        </p>
        <h1 className="text-4xl tracking-[-0.025em] lg:text-6xl lg:tracking-[-0.032em]">
          {project.name}
        </h1>
        <p className="mt-5 font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
          {project.projectType}
        </p>
        {project.background ? (
          <p className="lead-measure mt-6 text-lg text-secondary">{project.background}</p>
        ) : null}
      </Section>

      {project.mandate ? (
        <Section eyebrow="The mandate" className="border-t border-border">
          <GoldenSplit>
            <p className="max-w-[var(--measure-prose)] text-xl text-text">{project.mandate}</p>
            <div />
          </GoldenSplit>
        </Section>
      ) : null}

      <Section eyebrow="What we deployed" className={project.mandate ? undefined : 'border-t border-border'}>
        <div className="grid gap-7 lg:grid-cols-2">
          <ListGroup title="OPENCREW core deliverables" items={project.deliverables} />
          {project.milestones?.length ? (
            <div className="border-t border-border pt-5">
              <h3 className="eyebrow mb-5">Milestones</h3>
              <ul className="flex flex-col gap-3">
                {project.milestones.map((m) => (
                  <li key={m} className="flex gap-4 text-secondary">
                    <span aria-hidden="true" className="text-accent-text">
                      —
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : project.capability ? (
            <div className="border-t border-border pt-5">
              <h3 className="eyebrow mb-5">Capability demonstrated</h3>
              <p className="text-secondary">{project.capability}</p>
            </div>
          ) : null}
        </div>

        {/* Required wherever listings, applications or diligence are mentioned. */}
        {project.milestones?.length ? <Disclaimer>{INDEPENDENCE_DISCLAIMER}</Disclaimer> : null}
      </Section>

      <Section eyebrow="Capabilities exercised" className="border-t border-border">
        <ul className="grid gap-6 md:grid-cols-3">
          {related.map((s) => (
            <Card as="li" key={s.slug} interactive>
              <span className="font-mono text-2xs tracking-[0.06em] text-muted">{s.index}</span>
              <h3 className="mt-4 text-lg font-medium">
                <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                  {s.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-muted">{s.oneLiner}</p>
            </Card>
          ))}
        </ul>
        <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
          Every engagement is configured differently. See{' '}
          <TextLink href="/engage">how we work</TextLink> for the three models.
        </p>
      </Section>

      <Section eyebrow="Other engagements" className="border-t border-border">
        <ul className="grid gap-6 md:grid-cols-3">
          {others.map((w) => (
            <Card as="li" key={w.slug} interactive>
              <h3 className="text-lg font-medium">
                <Link href={`/work/${w.slug}`} className="after:absolute after:inset-0">
                  {w.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-muted">{w.projectType}</p>
            </Card>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/work" className={buttonClasses('ghost', 'lg')}>
            All engagements
          </Link>
        </div>
      </Section>
    </>
  );
}
