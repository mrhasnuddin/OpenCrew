import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { IntakeForm } from '@/components/start/IntakeForm';
import { TextLink } from '@/components/marketing/Blocks';
import { CLOSING_CTA } from '@/content/site';
import { CONTACT } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project: stage, target market, role needs, resource needs and timeline. We reply within two business days.',
};

/**
 * The named door — the reference has /contacts with a form; ours carries the
 * four-step brief plus the direct channels. Formerly /start (301 kept).
 */
export default function ContactPage() {
  return (
    <>
      <Section className="pt-8 pb-7 lg:pt-9">
        <p className="eyebrow mb-6">{CLOSING_CTA.eyebrow}</p>
        <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          {CLOSING_CTA.title}
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Four short steps. If you have already shortlisted crew members, they attach automatically.
        </p>
      </Section>

      <Section className="border-t border-border">
        <div className="max-w-[var(--container-content)]">
          <IntakeForm />
        </div>
      </Section>

      <Section eyebrow="Prefer to write directly?" className="border-t border-border">
        <ul className="flex flex-col gap-4">
          {CONTACT.map((c) => (
            <li key={c.key} className="flex flex-wrap gap-4 border-t border-border pt-4">
              <span className="w-[120px] shrink-0 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                {c.label}
              </span>
              {c.href ? (
                <TextLink href={c.href}>{c.value}</TextLink>
              ) : (
                <span className="text-text">{c.value}</span>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
