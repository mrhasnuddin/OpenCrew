import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/primitives/Layout';
import { buttonClasses } from '@/components/ui/Button';
import { TextLink } from '@/components/marketing/Blocks';
import { ROLES_CONTENT } from '@/content/roles';
import { CREW } from '@/content/crew';

export const metadata: Metadata = {
  title: 'Deploy by Role',
  description:
    'CEO / COO, CTO / Product, CMO / Growth, Advisor, Consultant and Regional Lead — what each role owns, what it delivers in the first 90 days, and how deployment works.',
};

export default function RolesPage() {
  return (
    <>
      <Section className="pt-8 lg:pt-9">
        <p className="eyebrow mb-6">Deploy by role</p>
        <h1 className="max-w-[18ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
          Start with the seat you need to fill.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Six roles, each with a defined engagement and a defined value to the project. Members are
          configured per project — the role is the starting point, not the package.
        </p>
      </Section>

      <Section className="pt-0">
        <ul className="flex flex-col">
          {ROLES_CONTENT.map((role) => {
            const count = CREW.filter((m) => m.roles.includes(role.slug)).length;
            return (
              <li key={role.slug} className="border-t border-border">
                <Link
                  href={`/roles/${role.slug}`}
                  className="group grid gap-4 py-6 transition-colors duration-[var(--dur-base)] ease-hover hover:bg-surface lg:grid-cols-[200px_1.618fr_1fr] lg:items-baseline lg:gap-7 lg:px-5"
                >
                  <h2 className="text-xl font-medium text-text">{role.name}</h2>
                  <p className="text-secondary">{role.engagement}</p>
                  <p className="font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
                    {role.valueToProject}
                    {count ? (
                      <span className="mt-2 block text-muted normal-case">
                        {count} in the crew
                      </span>
                    ) : null}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="border-t border-border">
        <h2 className="max-w-[22ch] text-2xl tracking-[-0.015em] lg:text-3xl lg:tracking-[-0.02em]">
          Not sure which seat you are filling?
        </h2>
        <p className="lead-measure mt-5 text-secondary">
          Describe the problem instead — that is usually faster, and it is how most engagements
          start. You can also{' '}
          <TextLink href="/crew">browse the crew</TextLink> and shortlist directly.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/start" className={buttonClasses('primary', 'lg')}>
            Start a project
          </Link>
          <Link href="/services/global-crew" className={buttonClasses('ghost', 'lg')}>
            How deployment works
          </Link>
        </div>
      </Section>
    </>
  );
}
