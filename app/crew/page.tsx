import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { CrewCard } from '@/components/crew/CrewCard';
import { CrewFilters } from '@/components/crew/CrewFilters';
import { TextLink } from '@/components/marketing/Blocks';
import { CREW, buildFacets, filterCrew, type CrewQuery, type FacetKey } from '@/content/crew';

export const metadata: Metadata = {
  title: 'The Crew',
  description:
    'International executives, advisors, consultants, regional leaders and spokespersons available for deployment. Filter by role and sector, then send us a shortlist.',
};

const FACET_KEYS: FacetKey[] = ['role', 'sector', 'market', 'language', 'availability'];

export default async function CrewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const query: CrewQuery = { q: typeof params.q === 'string' ? params.q : undefined };
  FACET_KEYS.forEach((key) => {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw.join(',') : raw;
    if (value) query[key] = value.split(',').filter(Boolean);
  });

  const facets = buildFacets(CREW);
  const results = filterCrew(CREW, query);

  return (
    <>
      <Section className="pt-8 pb-7 lg:pt-9">
        <p className="eyebrow mb-6">The crew</p>
        <h1 className="max-w-[18ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Browse the people you can deploy.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Executives, advisors, consultants, regional leaders and global spokespersons. Add members
          to a shortlist and send it to us as a brief.
        </p>
        <p className="mt-5 max-w-[var(--measure-prose)] text-sm text-muted">
          Senior operators are often listed by role only. Where a profile shows initials, the name
          and full background are shared under NDA on request. See our{' '}
          <TextLink href="/legal/disclosure">verification and engagement policy</TextLink>.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-7">
          <aside className="lg:sticky lg:top-[calc(64px+var(--spacing-6))] lg:self-start">
            <Suspense fallback={<div className="h-[320px]" aria-hidden="true" />}>
              <CrewFilters facets={facets} resultCount={results.length} />
            </Suspense>
          </aside>

          {results.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((member) => (
                <CrewCard key={member.slug} member={member} />
              ))}
            </ul>
          ) : (
            <Card className="flex flex-col items-start gap-5">
              <h2 className="text-xl font-medium">No crew match these filters.</h2>
              <p className="max-w-[var(--measure-prose)] text-secondary">
                If the role you need isn&rsquo;t listed, we can source it; most deployments involve
                at least one placement made specifically for the project.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/crew" className={buttonClasses('secondary', 'md')}>
                  Clear filters
                </Link>
                <Link href="/contact" className={buttonClasses('primary', 'md')}>
                  Tell us what you need
                </Link>
              </div>
            </Card>
          )}
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="section-title max-w-[22ch]">
          The network is larger than the directory.
        </h2>
        <p className="lead-measure mt-5 text-secondary">
          Members are listed publicly where their role is public, and by role only where it is not.
          Beyond the listed members, OPENCREW draws on a wider network across executives,
          technology, finance and payments, market and IP, and regional representatives.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses('primary', 'lg')}>
            Tell us the role you need
          </Link>
          <Link href="/services/global-crew" className={buttonClasses('ghost', 'lg')}>
            How deployment works
          </Link>
        </div>
      </Section>
    </>
  );
}
