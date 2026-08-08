import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, GoldenSplit } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { ListGroup, Stepper, Disclaimer, TextLink } from '@/components/marketing/Blocks';
import { CrewCard } from '@/components/crew/CrewCard';
import { ROLES_CONTENT, getRole } from '@/content/roles';
import { CREW } from '@/content/crew';
import { INDEPENDENCE_DISCLAIMER } from '@/content/site';

export function generateStaticParams() {
  return ROLES_CONTENT.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  return { title: role.name, description: role.lead };
}

export default async function RoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const available = CREW.filter((m) => m.roles.includes(role.slug));
  const others = ROLES_CONTENT.filter((r) => r.slug !== role.slug).slice(0, 3);

  // FAQPage schema — these pages target "hire a fractional CMO web3" and the
  // question set is the acquisition surface, so it should be eligible for rich
  // results. Answers must match the visible copy exactly.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: role.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Deploy by role · {role.name}</p>
        <h1 className="max-w-[20ch] text-3xl tracking-[-0.02em] lg:text-5xl lg:tracking-[-0.03em]">
          {role.title}
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">{role.lead}</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Request this role
          </Link>
          <Link href="/crew" className={buttonClasses('ghost', 'lg')}>
            Browse the crew
          </Link>
        </div>
      </Section>

      <Section className="border-t border-border">
        <GoldenSplit>
          <div className="grid gap-7 md:grid-cols-2">
            <ListGroup title="What this role owns" items={role.owns} />
            <ListGroup title="When projects need it" items={role.triggers} />
          </div>
          <Card className="flex flex-col gap-5">
            <div>
              <p className="eyebrow mb-3">Engagement</p>
              <p className="text-secondary">{role.engagement}</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="eyebrow mb-3">Value to the project</p>
              <p className="text-accent-text">{role.valueToProject}</p>
            </div>
          </Card>
        </GoldenSplit>
      </Section>

      <Section eyebrow="First 90 days" title="What the role delivers early.">
        <Stepper
          steps={role.first90.map((title, i) => ({
            index: String(i + 1).padStart(2, '0'),
            title,
          }))}
        />
      </Section>

      <Section eyebrow="Engagement shapes" title="How the role is structured.">
        <ul className="grid gap-6 md:grid-cols-3">
          {role.shapes.map((s) => (
            <Card as="li" key={s.title}>
              <h3 className="font-medium text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-muted">{s.body}</p>
            </Card>
          ))}
        </ul>
        <p className="mt-6 max-w-[var(--measure-prose)] text-sm text-muted">
          Commercials are scoped per project. See <TextLink href="/engage">how we work</TextLink>.
        </p>
      </Section>

      {available.length ? (
        <Section
          eyebrow="Available crew"
          title={`In the crew for ${role.name}`}
          className="border-t border-border"
        >
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {available.map((m) => (
              <CrewCard key={m.slug} member={m} />
            ))}
          </ul>
          <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
            The network is larger than the directory. Where a seat needs someone not listed, we
            source specifically for the project.
          </p>
        </Section>
      ) : null}

      <Section eyebrow="Questions" title="What projects usually ask.">
        <dl className="flex flex-col">
          {role.faq.map((f) => (
            <div key={f.q} className="grid gap-4 border-t border-border py-6 lg:grid-cols-[1fr_1.618fr] lg:gap-7">
              <dt className="font-medium text-text">{f.q}</dt>
              <dd className="max-w-[var(--measure-prose)] text-secondary">{f.a}</dd>
            </div>
          ))}
        </dl>
        <Disclaimer>{INDEPENDENCE_DISCLAIMER}</Disclaimer>
      </Section>

      <Section eyebrow="Other roles" className="border-t border-border">
        <ul className="grid gap-6 md:grid-cols-3">
          {others.map((r) => (
            <Card as="li" key={r.slug} interactive>
              <h3 className="text-lg font-medium">
                <Link href={`/roles/${r.slug}`} className="after:absolute after:inset-0">
                  {r.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-muted">{r.valueToProject}</p>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  );
}
