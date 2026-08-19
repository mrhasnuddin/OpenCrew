import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Section className="pt-9 pb-10">
      <p className="eyebrow mb-6">404</p>
      <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
        This page isn&rsquo;t on the map.
      </h1>
      <p className="lead-measure mt-6 text-lg text-secondary">
        The link may have moved, or the page may not exist yet.
      </p>
      <div className="mt-7 flex flex-wrap gap-4">
        <Link href="/" className={buttonClasses('primary', 'lg')}>
          Back to home
        </Link>
        <Link href="/crew" className={buttonClasses('secondary', 'lg')}>
          Browse the crew
        </Link>
      </div>
    </Section>
  );
}
