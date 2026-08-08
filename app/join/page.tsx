import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { JoinForm } from '@/components/join/JoinForm';
import { ListGroup, Manifesto, TextLink } from '@/components/marketing/Blocks';
import { PARTICIPATION_STANDARDS } from '@/content/site';
import { TALENT_NETWORK_CATEGORIES } from '@/lib/team';

export const metadata: Metadata = {
  title: 'Join the Crew',
  description:
    'OPENCREW deploys senior operators into Web3, AI and new finance projects as executives, advisors, consultants, regional leaders and global spokespersons.',
};

export default function JoinPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Join the crew</p>
        <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Be deployed, not listed.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          OPENCREW places senior operators into Web3, AI and new finance projects — as executives,
          advisors, consultants, regional leaders and global spokespersons, in defined roles doing
          actual work.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-7 md:grid-cols-3">
          <ListGroup
            title="What deployment involves"
            items={[
              'A defined role in a real project',
              'Actual work, meetings and decisions',
              'Public representation where the role requires it',
              'Engagements from part-time advisory to executive placement',
            ]}
          />
          <ListGroup
            title="What we look for"
            items={[
              'Senior operating or institutional experience',
              'A market you genuinely own',
              'Working English plus at least one Asian-market language',
              'Willingness to be verified by counterparties',
            ]}
          />
          <ListGroup title="Network categories" items={[...TALENT_NETWORK_CATEGORIES]} />
        </div>
      </Section>

      <Section eyebrow="Participation standards" title="What we hold members to.">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PARTICIPATION_STANDARDS.map((s) => (
            <Card as="li" key={s.title}>
              <h3 className="font-medium text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-muted">{s.body}</p>
            </Card>
          ))}
        </ul>

        {/* The line that filters the applicant pool, stated plainly. */}
        <Manifesto className="mt-8">
          We do not place nominee roles, and we do not list anyone who is not doing the work.
        </Manifesto>
        <p className="mt-6 max-w-[var(--measure-prose)] text-sm text-muted">
          Exchanges, funds and auditors may request written confirmation of any role we list. Read
          our <TextLink href="/legal/disclosure">verification and engagement policy</TextLink>{' '}
          before applying.
        </p>
      </Section>

      <Section eyebrow="Apply" title="Tell us where you operate." className="border-t border-border">
        <div className="max-w-[var(--container-content)]">
          <JoinForm />
        </div>
      </Section>
    </>
  );
}
