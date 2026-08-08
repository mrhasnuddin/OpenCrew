import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { buttonClasses } from '@/components/ui/Button';
import { ProfileCard } from '@/components/marketing/ProfileCard';
import { Manifesto, TextLink } from '@/components/marketing/Blocks';
import { LEADERSHIP, ADVISORS, TALENT_NETWORK_CATEGORIES } from '@/lib/team';
import { PARTICIPATION_STANDARDS } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'OPENCREW Labs is a global team and growth partner for Web3, AI and new finance — integrating international talent, representation, institutional access and market execution into one network.',
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Who we are</p>
        <h1 className="max-w-[18ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Global team. Global access. Global execution.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          OPENCREW supports Web3, AI and new finance projects through global talent deployment,
          international representation, institutional access and overseas market coordination.
        </p>
      </Section>

      <Section eyebrow="Participation standards" title="What deployment actually means." className="border-t border-border">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PARTICIPATION_STANDARDS.map((s) => (
            <Card as="li" key={s.title}>
              <h3 className="font-medium text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-muted">{s.body}</p>
            </Card>
          ))}
        </ul>
        <Manifesto className="mt-8">
          We do not simply introduce global resources. We deploy them into the project.
        </Manifesto>
      </Section>

      <Section eyebrow="Core leadership" title="The crew behind OPENCREW">
        <ul className="grid gap-6 lg:grid-cols-2">
          {LEADERSHIP.map((m) => (
            <ProfileCard key={m.slug} member={m} />
          ))}
        </ul>
      </Section>

      <Section eyebrow="Advisors" title="Strategic advisory">
        <ul className="grid gap-6 lg:grid-cols-2">
          {ADVISORS.map((m) => (
            <ProfileCard key={m.slug} member={m} />
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Global talent network"
        title="A network built across markets"
        lead="Professionals across major global markets who can participate publicly and perform clearly defined roles."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {TALENT_NETWORK_CATEGORIES.map((cat) => (
            <li key={cat} className="border-t border-border pt-5">
              <h3 className="font-medium text-text">{cat}</h3>
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
          Members are listed publicly where their role is public, and by role only where it is not.
          Either way, every listed member holds a genuine role and can be verified — see our{' '}
          <TextLink href="/legal/disclosure">verification and engagement policy</TextLink>.
        </p>
      </Section>

      <Section className="border-t border-border">
        <h2 className="max-w-[18ch] text-3xl tracking-[-0.02em] lg:text-4xl lg:tracking-[-0.025em]">
          Work with us, or join the crew.
        </h2>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/join" className={buttonClasses('ghost', 'lg')}>
            Join the crew
          </Link>
        </div>
      </Section>
    </>
  );
}
