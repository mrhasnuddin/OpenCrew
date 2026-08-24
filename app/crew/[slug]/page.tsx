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
import { CrewBadge, badgeFor } from '@/components/crew/CrewBadge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CREW, getCrewMember, ROLE_LABELS, ENGAGEMENT_LABELS, WEB3_LABELS } from '@/content/crew';
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

export default async function CrewProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getCrewMember(slug);
  if (!member) notFound();

  const isPublic = member.tier === 'public';
  const badge = badgeFor(member);
  // Contact values are still placeholders in content/contact.ts. A bracketed
  // token rendered on a public page reads as a broken build, so the sentence
  // that would carry it is dropped until a real address lands (the footer
  // does the same thing with its channels).
  const verificationEmail = VERIFICATION_EMAIL.startsWith('【') ? null : VERIFICATION_EMAIL;
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
                {badge ? <CrewBadge kind={badge} className="mt-5" /> : null}
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
                <Link href="/crew" className={buttonClasses('secondary', 'md')}>
                  Back to the crew
                </Link>
              </div>
            </div>
          </aside>

          {/* ---------------------------------------------------- content */}
          <div className="flex flex-col gap-8">
            {member.track === 'core' ? (
              <div>
                <h2 className="eyebrow mb-5">Positioning</h2>
                <p className="max-w-[var(--measure-prose)] text-xl text-text">{member.headline}</p>
              </div>
            ) : null}

            {/* Each block renders only where the member has that data. The
                representation intake does not ask for positions or scope, so
                those profiles show attributes instead of empty headings. */}
            {member.credentials.length ? (
              <ListGroup title="Experience" items={member.credentials} />
            ) : null}
            {member.deploymentScope.length ? (
              <ListGroup title="Deployment scope" items={member.deploymentScope} />
            ) : null}
            {member.sectors.length ? <ListGroup title="Sectors" items={member.sectors} /> : null}

            {member.track === 'representation' ? (
              <div className="border-t border-border pt-5">
                <h2 className="eyebrow mb-5">Profile</h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['Nationality', member.nationality],
                    ['Based in', member.baseCity],
                    ['Languages', member.languages?.join(', ') ?? 'Shared on request'],
                    ['Engagement', member.engagement ? ENGAGEMENT_LABELS[member.engagement] : null],
                    ['Web3 knowledge', member.web3Level ? WEB3_LABELS[member.web3Level] : null],
                    ['Travel', member.outstation ? 'Available to travel' : null],
                  ].map(([label, value]) =>
                    value ? (
                      <div key={label} className="flex flex-col gap-2 border-t border-border pt-4">
                        <dt className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                          {label}
                        </dt>
                        <dd className="text-secondary">{value}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </div>
            ) : null}

            {member.formats?.length ? <ListGroup title="Formats" items={member.formats} /> : null}

            {member.track === 'core' && member.markets?.length ? (
              <ListGroup title="Markets" items={member.markets} />
            ) : null}

            {member.track === 'core' && member.languages?.length ? (
              <ListGroup title="Languages" items={member.languages} />
            ) : null}

            {member.capabilities.length ? (
              <div className="border-t border-border pt-5">
                <h2 className="eyebrow mb-5">Capabilities</h2>
                <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                  {member.capabilities.join(' · ')}
                </p>
              </div>
            ) : null}

            {/* The block a fund lands on when it diligences a project. It
                states what is actually true of THIS member: a verified member
                has been checked, an applicant has not been yet. Claiming the
                first for the second is the one failure the business cannot
                recover from (docs/00-brand-identity.md §7.2). */}
            <Card className="flex flex-col gap-4">
              <h2 className="eyebrow">Verification</h2>
              {member.verified ? (
                <p className="max-w-[var(--measure-prose)] text-secondary">
                  <strong className="font-medium text-text">Role verified by OPENCREW.</strong> This
                  member holds a genuine role and performs actual work in the projects listed.
                  {verificationEmail
                    ? ` Exchanges, funds and other counterparties may request written confirmation of any role shown here at ${verificationEmail}.`
                    : ' Exchanges, funds and other counterparties may request written confirmation of any role shown here.'}
                </p>
              ) : (
                <p className="max-w-[var(--measure-prose)] text-secondary">
                  <strong className="font-medium text-text">Listed from an application.</strong> The
                  details on this profile are as supplied by the member. OPENCREW verifies identity
                  and any stated position before a placement is confirmed, and written confirmation
                  is available to counterparties
                  {verificationEmail ? ` at ${verificationEmail}.` : ' on request.'}
                </p>
              )}
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
        <Section
          eyebrow="Related crew"
          title="Others in this role"
          className="border-t border-border"
        >
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
