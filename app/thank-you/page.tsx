import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';
import { CONTACT, RESPONSE_TIME } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your message is with the OPENCREW team.',
  robots: { index: false, follow: false },
};

/**
 * Post-submission destination for the project brief and crew application.
 * A real page, not an inline card: it survives a refresh, can be linked from
 * a confirmation email later, and is where the response-time promise lives.
 * Noindex — a thank-you page in search results is an orphan.
 */
export default function ThankYouPage() {
  return (
    <Section className="pt-9 pb-10">
      <p className="eyebrow mb-6">Received</p>
      <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
        Thank you. It&rsquo;s with the team.
      </h1>
      <p className="lead-measure mt-6 text-lg text-secondary">
        {RESPONSE_TIME} If it&rsquo;s urgent, the channels below reach us faster.
      </p>

      <ul className="mt-7 flex max-w-[420px] flex-col gap-3 border-t border-border pt-6">
        {CONTACT.map((c) => (
          <li key={c.key} className="flex gap-4 text-sm">
            <span className="w-[96px] shrink-0 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
              {c.label}
            </span>
            <span className="text-text">{c.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className={buttonClasses('primary', 'lg')}>
          Back to home
        </Link>
        <Link href="/#work" className={buttonClasses('ghost', 'lg')}>
          See our engagements
        </Link>
      </div>
    </Section>
  );
}
