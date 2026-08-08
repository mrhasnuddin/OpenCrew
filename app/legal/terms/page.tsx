import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { Disclaimer } from '@/components/marketing/Blocks';
import { INDEPENDENCE_DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  robots: { index: false, follow: true },
};

/**
 * DRAFT — structure and factual sections only. Same reasoning as the privacy
 * page: the sections describing how this site works are accurate; the
 * contractual and jurisdictional clauses are for counsel, not for a model.
 */
const SECTIONS = [
  {
    title: 'About this site',
    body: 'This website describes the services of OPENCREW Labs, 【registered entity name and number】. Nothing on it constitutes an offer, a contract, or a commitment to deliver a specific outcome. Engagements are governed by a separate written agreement.',
  },
  {
    title: 'No investment or financial advice',
    body: `Nothing on this site is investment, financial, legal or tax advice, and nothing here is a solicitation to buy or sell any asset, token or security. ${INDEPENDENCE_DISCLAIMER}`,
  },
  {
    title: 'Third-party names and marks',
    body: 'Institution, project and company names appear for identification only and remain the property of their owners. Their appearance describes the cooperation, business engagements, ecosystem relationships and professional experience of the OPENCREW network, and does not imply endorsement, partnership or any other relationship beyond what is stated.',
  },
  {
    title: 'Accuracy',
    body: 'We keep this site current, but stages, milestones and availability change. Anything material to a decision should be confirmed with us in writing.',
  },
  { title: 'Liability', body: '【Limitation of liability — to be set with counsel.】' },
  { title: 'Governing law', body: '【Governing law and jurisdiction — to be set with counsel.】' },
  { title: 'Contact', body: '【Contact email】' },
];

export default function TermsPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Legal</p>
        <h1 className="text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Terms of use
        </h1>
        <Disclaimer>
          Draft pending legal review. The sections describing this site and how third-party names
          are used are accurate and align with our verification and engagement policy; liability and
          governing-law clauses are not yet settled.
        </Disclaimer>
      </Section>

      <Section className="border-t border-border">
        <ol className="flex flex-col gap-7">
          {SECTIONS.map((s, i) => (
            <li key={s.title} className="grid gap-4 border-t border-border pt-6 lg:grid-cols-[80px_1fr] lg:gap-7">
              <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-lg font-medium text-text">{s.title}</h2>
                <p className="mt-3 max-w-[var(--measure-prose)] text-secondary">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
