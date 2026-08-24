import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Container, Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { PageBanner } from '@/components/ui/PageBanner';
import { buttonClasses } from '@/components/ui/Button';
import { CrewCard } from '@/components/crew/CrewCard';
import { CrewFilters } from '@/components/crew/CrewFilters';
import { CrewSpotlight } from '@/components/crew/CrewSpotlight';
import { CrewToolbar } from '@/components/crew/CrewToolbar';
import { RoleBrowse } from '@/components/crew/RoleBrowse';
import {
  CREW,
  buildFacets,
  filterCrew,
  sortCrew,
  type CrewQuery,
  type FacetKey,
  type SortKey,
} from '@/content/crew';

export const metadata: Metadata = {
  title: 'The Crew',
  description:
    'International executives, advisors, consultants, regional leaders and spokespersons available for deployment. Filter by role, market, language and availability, then send us a shortlist.',
};

const FACET_KEYS: FacetKey[] = [
  'role',
  'sector',
  'market',
  'language',
  'nationality',
  'web3',
  'availability',
];

/**
 * The directory, on the marketplace pattern the client referenced: a category
 * banner, the front row, a browse-by-role rail, then filters beside a grid
 * with a count and a sort above it.
 *
 * Everything that changes the result set is a URL parameter, so the page stays
 * a server component: the grid is rendered on the server for every
 * combination, and only the controls are client code.
 */
export default async function CrewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const query: CrewQuery = {
    q: typeof params.q === 'string' ? params.q : undefined,
  };
  FACET_KEYS.forEach((key) => {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw.join(',') : raw;
    if (value) query[key] = value.split(',').filter(Boolean);
  });
  const sort = (typeof params.sort === 'string' ? params.sort : 'featured') as SortKey;

  const facets = buildFacets(CREW);
  const results = sortCrew(filterCrew(CREW, query), sort);

  return (
    <>
      <Section className="pt-7 pb-0 lg:pt-8">
        <PageBanner
          motif="crew"
          eyebrow="The crew"
          title="The people you can deploy."
          subtitle="Executives, advisors, consultants, regional leaders and international spokespersons. Shortlist the ones you want and send it to us as a brief."
          actionLabel="How deployment works"
          actionHref="/#cap-global-crew"
        />
      </Section>

      {/* --------------------------------------------------------- front row */}
      <Section className="pt-8 pb-0 lg:pt-8">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Top performing</p>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-text lg:text-3xl">
              The three we put forward first.
            </h2>
          </div>
          <p className="max-w-[46ch] text-sm text-muted">
            Verified members with the longest record of deployed work across our engagements.
          </p>
        </header>
        <CrewSpotlight />
      </Section>

      {/* ------------------------------------------------------------ browse */}
      <Section className="pt-8 pb-0 lg:pt-8">
        <p className="eyebrow mb-5">Browse by role</p>
        <Suspense fallback={<div className="h-[64px]" aria-hidden="true" />}>
          <RoleBrowse roles={facets.role} active={query.role} />
        </Suspense>
      </Section>

      {/* ---------------------------------------------------------- the grid */}
      <Section className="pt-8 lg:pt-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-7">
          <aside className="lg:sticky lg:top-[calc(64px+var(--spacing-6))] lg:self-start">
            <Suspense fallback={<div className="h-[320px]" aria-hidden="true" />}>
              <CrewFilters facets={facets} />
            </Suspense>
          </aside>

          <div className="min-w-0">
            <Suspense fallback={<div className="h-[54px]" aria-hidden="true" />}>
              <CrewToolbar resultCount={results.length} totalCount={CREW.length} className="mb-7" />
            </Suspense>

            {results.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {results.map((member) => (
                  <CrewCard key={member.slug} member={member} />
                ))}
              </ul>
            ) : (
              <Card className="flex flex-col items-start gap-5">
                <h2 className="text-xl font-medium">No crew match these filters.</h2>
                <p className="max-w-[var(--measure-prose)] text-secondary">
                  If the role you need isn&rsquo;t listed, we can source it; most deployments
                  involve at least one placement made specifically for the project.
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
        </div>
      </Section>

      {/* ----------------------------------------------------- what a badge means */}
      <Container>
        <div className="grid gap-6 border-t border-border py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          <p className="eyebrow">What the badges mean</p>
          <p className="text-sm text-muted">
            <span className="font-medium text-secondary">Top performing.</span> Put forward first on
            new engagements, on the strength of work already delivered.
          </p>
          <p className="text-sm text-muted">
            <span className="font-medium text-secondary">Verified.</span> Identity and stated
            positions checked by OPENCREW.
          </p>
          <p className="text-sm text-muted">
            <span className="font-medium text-secondary">No badge.</span> Listed from an application
            and available to deploy; verification runs before any placement.
          </p>
        </div>
      </Container>

      <Section className="border-t border-border">
        <h2 className="section-title max-w-[22ch]">The network is larger than the directory.</h2>
        <p className="lead-measure mt-5 text-secondary">
          Members are listed publicly where their role is public, and by role only where it is not.
          Beyond the listed members, OPENCREW draws on a wider network across executives,
          technology, finance and payments, market and IP, and regional representatives.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses('primary', 'lg')}>
            Tell us the role you need
          </Link>
          <Link href="/#cap-global-crew" className={buttonClasses('secondary', 'lg')}>
            How deployment works
          </Link>
        </div>
      </Section>
    </>
  );
}
