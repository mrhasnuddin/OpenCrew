import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, GoldenSplit } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ListGroup, Stepper, Disclaimer, TextLink } from '@/components/marketing/Blocks';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SERVICES, getService } from '@/content/services';
import { ROLES } from '@/lib/nav';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.lead };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const adjacent = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 2);
  const roleNames = service.relatedRoles
    .map((r) => ROLES.find((role) => role.slug === r)?.name)
    .filter(Boolean) as string[];

  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <Breadcrumbs
          className="mb-6"
          items={[{ label: 'Capabilities', href: '/services' }, { label: service.name }]}
        />
        <h1 className="max-w-[20ch] text-3xl tracking-[-0.02em] lg:text-5xl lg:tracking-[-0.03em]">
          {service.title}
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">{service.lead}</p>
      </Section>

      <Section eyebrow="The problem" className="border-t border-border">
        <GoldenSplit>
          <p className="max-w-[var(--measure-prose)] text-xl text-text">{service.problem}</p>
          <div />
        </GoldenSplit>
      </Section>

      {service.process ? (
        <Section eyebrow="How it runs" title="A defined process, not an introduction.">
          <Stepper
            steps={service.process.map((p) => ({ index: p.index, title: p.title }))}
          />
          {service.disclaimer ? <Disclaimer>{service.disclaimer}</Disclaimer> : null}
        </Section>
      ) : null}

      <Section eyebrow="What we do">
        <div className="grid gap-7 md:grid-cols-2">
          {service.groups.map((g) => (
            <ListGroup key={g.title} title={g.title} items={g.items} />
          ))}
        </div>
        {service.disclaimer && !service.process ? (
          <Disclaimer>{service.disclaimer}</Disclaimer>
        ) : null}
      </Section>

      {roleNames.length ? (
        <Section eyebrow="Who delivers it" title="Roles typically deployed">
          <ul className="flex flex-wrap gap-4">
            {roleNames.map((name) => (
              <li
                key={name}
                className="rounded-xs border border-border px-4 py-3 font-mono text-2xs tracking-[0.06em] text-secondary uppercase"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Members are configured per project. <TextLink href="/crew">Browse the crew</TextLink> or{' '}
            <TextLink href="/contact">tell us the seat you need to fill</TextLink>.
          </p>
        </Section>
      ) : null}

      <Section eyebrow="Adjacent capabilities" className="border-t border-border">
        <ul className="grid gap-6 md:grid-cols-2">
          {adjacent.map((s) => (
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
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/services" className={buttonClasses('ghost', 'lg')}>
            All capabilities
          </Link>
        </div>
      </Section>
    </>
  );
}
