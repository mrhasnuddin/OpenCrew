import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';
import { Disclaimer } from '@/components/marketing/Blocks';
import { InstitutionGrid } from '@/components/marketing/InstitutionGrid';
import { NETWORK, INDEPENDENCE_DISCLAIMER } from '@/content/site';

export const metadata: Metadata = {
  title: 'Institutional Landscape',
  description:
    'The institutions across capital, payments, RWA, professional services and global industries that the OPENCREW network engages with.',
};

/**
 * Typographic list, not a logo wall. Naming an institution in text and
 * displaying its trademark are different permissions — see brand doc §7.2(d).
 * It is also the better design: 27 third-party logos would swamp a palette
 * built on one quiet accent.
 */
export default function NetworkPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">{NETWORK.eyebrow}</p>
        <h1 className="max-w-[18ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          {NETWORK.title}
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">{NETWORK.lead}</p>
      </Section>

      <Section className="border-t border-border">
        <InstitutionGrid />

        <Disclaimer>{NETWORK.qualifier}</Disclaimer>
        <Disclaimer>{INDEPENDENCE_DISCLAIMER}</Disclaimer>
      </Section>

      <Section className="border-t border-border">
        <h2 className="max-w-[20ch] text-3xl tracking-[-0.02em] lg:text-4xl lg:tracking-[-0.025em]">
          Access is matched to your stage, not sprayed at every contact.
        </h2>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/services/institutional-access" className={buttonClasses('ghost', 'lg')}>
            How institutional access works
          </Link>
        </div>
      </Section>
    </>
  );
}
