import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';
import { INDEPENDENCE_DISCLAIMER } from '@/content/site';
import { VERIFICATION_EMAIL } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Verification & Engagement Policy',
  description:
    'How OPENCREW engages crew members, describes institutional relationships, and handles verification requests from exchanges, funds and other counterparties.',
};

/**
 * The load-bearing page. This is where a fund lands when it diligences a
 * project that lists an OPENCREW person, and it is the cheapest reputational
 * insurance the business can buy. Linked from every crew profile and the footer.
 */
const CLAUSES = [
  {
    n: '01',
    title: 'Real roles only',
    body: 'Every member listed on this site holds a genuine role and performs actual work in the projects shown. We do not provide nominee directors, nominee executives, or fabricated credentials.',
  },
  {
    n: '02',
    title: 'Verification on request',
    body: `Exchanges, funds, auditors and other counterparties may request written confirmation of any role shown on this site. Requests go to ${VERIFICATION_EMAIL} and we respond within five business days.`,
  },
  {
    n: '03',
    title: 'Named institutions',
    body: 'Institutions, partners and projects are named only where we are authorised to name them. Our institutional landscape reflects the cooperation, business engagements, ecosystem relationships and professional experience of the OPENCREW network. Where a relationship is not authorised for disclosure, we describe the category only, and we display third-party logos only with that party’s written permission.',
  },
  {
    n: '04',
    title: 'Engagement outcomes',
    body: `Milestones and outcomes are published only in wording the client has approved. We describe what was done (an application supported, an engagement initiated, an audit engagement begun) and we do not describe outcomes that belong to a third party as though they were ours. ${INDEPENDENCE_DISCLAIMER}`,
  },
  {
    n: '05',
    title: 'Confidential members',
    body: 'Some crew members are listed by role only. Their identity is disclosed under NDA once a brief is scoped, and always to a counterparty conducting diligence on an engagement they are part of.',
  },
];

export default function DisclosurePage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Legal</p>
        <h1 className="max-w-[20ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Verification and engagement policy
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          How OPENCREW engages crew members, describes institutional relationships, and handles
          verification requests.
        </p>
      </Section>

      <Section className="border-t border-border">
        <ol className="flex flex-col gap-7">
          {CLAUSES.map((c) => (
            <li key={c.n} className="grid gap-4 border-t border-border pt-6 lg:grid-cols-[80px_1fr] lg:gap-7">
              <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">{c.n}</span>
              <div>
                <h2 className="text-lg font-medium text-text">{c.title}</h2>
                <p className="mt-3 max-w-[var(--measure-prose)] text-secondary">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-border">
        <h2 className="section-title max-w-[22ch]">
          Conducting diligence on a project that lists an OPENCREW member?
        </h2>
        <p className="lead-measure mt-5 text-secondary">
          Write to us and we will confirm the role, the scope and the period of engagement in
          writing.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses('primary', 'lg')}>
            Request verification
          </Link>
          <Link href="/about" className={buttonClasses('secondary', 'lg')}>
            See the team
          </Link>
        </div>
      </Section>
    </>
  );
}
