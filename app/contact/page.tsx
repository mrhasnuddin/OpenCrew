import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { PageBanner } from '@/components/ui/PageBanner';
import { IntakeForm } from '@/components/start/IntakeForm';
import { CLOSING_CTA } from '@/content/site';
import { CONTACT, RESPONSE_TIME, isPlaceholder } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project: stage, target market, role needs, resource needs and timeline. We reply within two business days.',
};

/**
 * The named door. Built on the same spine as every other subpage — banner,
 * then the work, then the rail beside it — because a contact page that looks
 * like a different site is the moment a reader starts wondering who they are
 * writing to.
 *
 * The brief is the page: it takes the wide column, with the things a sender
 * wants to know while filling it in (what happens next, how fast we answer,
 * the direct channels) held in a sticky rail rather than stacked underneath
 * where nobody scrolls to find them.
 */
export default function ContactPage() {
  return (
    <>
      <Section className="pt-7 pb-0 lg:pt-8">
        <PageBanner
          motif="contact"
          eyebrow={CLOSING_CTA.eyebrow}
          title={CLOSING_CTA.title}
          subtitle="Four short steps. If you have already shortlisted crew members, they attach to the brief automatically."
        />
      </Section>

      <Section className="pt-8 lg:pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.618fr_1fr] lg:gap-7">
          <div className="min-w-0">
            <IntakeForm />
          </div>

          <aside className="lg:sticky lg:top-[calc(64px+var(--spacing-6))] lg:self-start">
            <div className="flex flex-col gap-5">
              <div className="card-glass card-glass-open rounded-lg p-6">
                <p className="eyebrow mb-5">What happens next</p>
                <ol className="flex flex-col gap-5">
                  {[
                    ['01', 'We read the brief', 'Stage, market, roles and timeline — the four things that decide whether we are the right fit.'],
                    ['02', 'We come back with a shape', 'Which capability, which members, and the engagement model that fits the stage.'],
                    ['03', 'We scope it properly', 'A written proposal with the people named, before anything is committed.'],
                  ].map(([index, title, body]) => (
                    <li key={index} className="flex gap-5">
                      <span className="font-label text-2xs font-semibold tracking-[0.06em] text-accent-text tabular-nums">
                        {index}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium text-text">{title}</span>
                        <span className="mt-2 block text-sm text-muted">{body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-border pt-5 text-sm text-secondary">
                  {RESPONSE_TIME}
                </p>
              </div>

              <div className="card-glass rounded-lg p-6">
                <p className="eyebrow mb-5">Prefer to write directly?</p>
                <ul className="flex flex-col gap-4">
                  {CONTACT.map((c) => (
                    <li
                      key={c.key}
                      className="flex items-baseline justify-between gap-5 border-t border-border pt-4 first:border-t-0 first:pt-0"
                    >
                      <span className="font-label text-2xs font-semibold tracking-[0.06em] text-muted uppercase">
                        {c.label}
                      </span>
                      {/* A bracketed placeholder is a broken page, not a
                          channel: until a real value lands the row says so
                          plainly. Same rule as the footer. */}
                      {isPlaceholder(c.value) ? (
                        <span className="text-sm text-muted">On request</span>
                      ) : c.href ? (
                        <a
                          href={c.href}
                          className="text-sm text-link underline decoration-from-font underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-hover hover:text-link-hover"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-sm text-text">{c.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
