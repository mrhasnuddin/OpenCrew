import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { Disclaimer } from '@/components/marketing/Blocks';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How OPENCREW Labs handles personal data across this site, the crew directory and project intake. Draft pending legal review.',
  robots: { index: false, follow: true },
};

/**
 * DRAFT — structure and factual sections only.
 *
 * The factual parts (what this site actually collects) are accurate and written
 * from the implementation. The entity, jurisdiction, retention periods and
 * statutory rights are NOT filled in, because a privacy policy that looks
 * complete but has not been reviewed by counsel is worse than one that is
 * visibly a draft: it creates a representation the business cannot stand behind.
 * ALLO Lawyers is already in the network — this is a short review for them.
 */
const SECTIONS = [
  {
    title: 'Who we are',
    body: 'OPENCREW Labs, 【registered entity name and number】, 【registered address】. Contact: 【privacy contact email】.',
  },
  {
    title: 'What we collect',
    body: 'Information you send us directly when you contact us about a project or about joining the network: your name, role, organisation, email address, messaging handle, and anything you choose to include in your message or attachments. We do not collect payment information through this website.',
  },
  {
    title: 'Analytics',
    body: 'We use Vercel Web Analytics to count page views and understand which pages are useful. It is cookieless, sets no persistent identifier, and does not collect personal data or build a profile of you, which is why this site shows no cookie banner. If we ever adopt a provider that sets cookies, we will add a consent gate before it loads and update this page first.',
  },
  {
    title: 'Why we use it',
    body: 'To respond to your enquiry, to scope an engagement, and to keep a record of our correspondence. We do not sell personal data, and we do not use it for advertising.',
  },
  {
    title: 'Who we share it with',
    body: 'Crew members and institutions relevant to your enquiry, where sharing is necessary to answer it, and our service providers. Current sub-processors: Vercel (hosting and analytics) and Resend (transactional email for briefs and applications). 【Confirm and add any others before publishing.】',
  },
  {
    title: 'How long we keep it',
    body: '【Retention periods: to be set with counsel.】',
  },
  {
    title: 'Your rights',
    body: '【Statutory rights and how to exercise them, per the governing jurisdiction: to be set with counsel. Note that the audience spans Malaysia, Singapore, Hong Kong, the EU and the US, so more than one regime may apply.】',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Legal</p>
        <h1 className="text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Privacy policy
        </h1>
        <Disclaimer>
          Draft pending legal review. The sections describing what this website collects are
          accurate; entity details, retention periods and statutory rights are not yet settled and
          are marked as such.
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
