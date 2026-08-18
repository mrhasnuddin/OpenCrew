import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { AvailabilityDot } from '@/components/ui/Chip';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { buttonClasses } from '@/components/ui/Button';
import { ListGroup, TextLink } from '@/components/marketing/Blocks';
import { CrewCard } from '@/components/crew/CrewCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CREW, getCrewMember, ROLE_LABELS } from '@/content/crew';
import { VERIFICATION_EMAIL } from '@/content/contact';

export function generateStaticParams() {
  // Only public-tier profiles are prerendered; the rest stay out of the index.
  return CREW.filter((m) => m.tier === 'public').map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getCrewMember(slug);
  if (!member) return {};
  const isPublic = member.tier === 'public';
  return {
    title: isPublic ? member.displayName : 'Crew member',
    description: member.headline,
    robots: isPublic ? undefined : { index: false, follow: false },
  };
}

export default async function CrewProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getCrewMember(slug);
  if (!member) notFound();

  const isPublic = member.tier === 'public';
  const related = CREW.filter(
    (m) => m.slug !== member.slug && m.roles.some((r) => member.roles.includes(r)),
  ).slice(0, 3);

  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.618fr] lg:gap-7">
          {/* ------------------------------------------------- sticky rail */}
          <aside className="lg:sticky lg:top-[calc(64px+var(--spacing-6))] lg:self-start">
            <div className="flex flex-col gap-6">
              <Breadcrumbs
                items={[
                  { label: 'The Crew', href: '/crew' },
                  { label: isPublic ? member.displayName : 'Member' },
                ]}
              />
              {member.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.portrait}
                  alt={`Portrait of ${member.displayName}, ${member.role}`}
                  className="size-[96px] rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-[96px] items-center justify-center rounded-full border border-gold-950 bg-ink-800 text-2xl font-medium text-ink-300"
                >
                  {member.initials}
                </span>
              )}

              <div>
                <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                  {member.roleCode}
                </p>
                <h1 className="mt-3 text-3xl tracking-[-0.02em]">
                  {isPublic ? member.displayName : 'Named on request'}
                </h1>
                <p className="mt-3 text-secondary">{member.role}</p>
              </div>

              <AvailabilityDot state={member.availability} />

              <ul className="flex flex-wrap gap-2">
                {member.roles.map((r) => (
                  <li
                    key={r}
                    className="rounded-xs border border-border px-3 py-1 font-mono text-2xs tracking-[0.06em] text-secondary uppercase"
                  >
                    {ROLE_LABELS[r]}
                  </li>
                ))}
              </ul>

              <SocialIcons links={member.links} />

              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <Link href="/contact" className={buttonClasses('primary', 'md')}>
                  {isPublic ? 'Request this member' : 'Request introduction'}
                </Link>
                <Link href="/crew" className={buttonClasses('ghost', 'md')}>
                  Back to the crew
                </Link>
              </div>
            </div>
          </aside>

          {/* ---------------------------------------------------- content */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="eyebrow mb-5">Positioning</h2>
              <p className="max-w-[var(--measure-prose)] text-xl text-text">{member.headline}</p>
            </div>

            <ListGroup title="Experience" items={member.credentials} />
            <ListGroup title="Deployment scope" items={member.deploymentScope} />
            <ListGroup title="Sectors" items={member.sectors} />

            {member.formats?.length ? (
              <ListGroup title="Formats" items={member.formats} />
            ) : null}

            {member.markets?.length ? (
              <ListGroup title="Markets" items={member.markets} />
            ) : null}

            {member.languages?.length ? (
              <ListGroup title="Languages" items={member.languages} />
            ) : null}

            <div className="border-t border-border pt-5">
              <h2 className="eyebrow mb-5">Capabilities</h2>
              <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                {member.capabilities.join(' · ')}
              </p>
            </div>

            {/* The block a fund lands on when it diligences a project. */}
            <Card className="flex flex-col gap-4">
              <h2 className="eyebrow">Verification</h2>
              <p className="max-w-[var(--measure-prose)] text-secondary">
                <strong className="font-medium text-text">Role verified by OPENCREW.</strong> This
                member holds a genuine role and performs actual work in the projects listed.
                Exchanges, funds and other counterparties may request written confirmation of any
                role shown here at {VERIFICATION_EMAIL}.
              </p>
              <p className="text-sm text-muted">
                <TextLink href="/legal/disclosure">How verification works</TextLink>
              </p>
            </Card>

            {!isPublic ? (
              <p className="max-w-[var(--measure-prose)] text-sm text-muted">
                Full name, background and references are shared under NDA once a brief is scoped.
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section eyebrow="Related crew" title="Others in this role" className="border-t border-border">
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((m) => (
              <CrewCard key={m.slug} member={m} />
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
