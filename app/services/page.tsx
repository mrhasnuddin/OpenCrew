import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { Card } from '@/components/ui/Card';
import { Manifesto } from '@/components/marketing/Blocks';
import { buttonClasses } from '@/components/ui/Button';
import { SERVICES } from '@/content/services';

export const metadata: Metadata = {
  title: 'Core Capabilities',
  description:
    'Six capabilities (Global Crew, Consultants & Education, Exchange Readiness, Global Representation, Institutional Access and Market Execution), deployed in the combination a project actually needs.',
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Our core capabilities</p>
        <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          One team. Six capabilities.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Deployed in the combination your project actually needs, according to its stage and target
          markets.
        </p>
      </Section>

      {/* Full-width rows rather than a grid: rows let each capability carry a
          real sentence, a grid forces fragments. */}
      <Section className="pt-0">
        <ul className="flex flex-col">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-t border-border">
              <Link
                href={`/services/${s.slug}`}
                className="group grid gap-4 py-6 transition-colors duration-[var(--dur-base)] ease-hover hover:bg-surface lg:grid-cols-[80px_1fr_1.618fr] lg:items-baseline lg:gap-7 lg:px-5"
              >
                <span className="font-mono text-2xs tracking-[0.06em] text-muted">{s.index}</span>
                <h2 className="text-xl font-medium text-text">{s.name}</h2>
                <p className="text-secondary">{s.oneLiner}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Manifesto>
          We combine and deploy the right talent, resources and operating capabilities according to
          each project&rsquo;s development stage.
        </Manifesto>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/#how-we-work" className={buttonClasses('secondary', 'lg')}>
            How we work
          </Link>
          <Link href="/contact" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
        </div>
      </Section>

      <Section eyebrow="Not sure which you need?" title="Most projects need three." className="border-t border-border">
        <Card className="max-w-[var(--measure-prose)]">
          <p className="text-secondary">
            A typical first engagement combines Global Crew, Exchange Readiness and Global
            Representation: a credible team, the documentation to survive diligence, and someone
            who shows up. Tell us the stage and the markets and we will come back with a shape.
          </p>
        </Card>
      </Section>
    </>
  );
}
