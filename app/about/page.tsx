import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { PageBanner } from '@/components/ui/PageBanner';
import { ProfileCard } from '@/components/marketing/ProfileCard';
import { PillarBento } from '@/components/marketing/PillarBento';
import { Manifesto, TextLink } from '@/components/marketing/Blocks';
import { Reveal } from '@/components/motion/Reveal';
import { LEADERSHIP, ADVISORS, TALENT_NETWORK_CATEGORIES } from '@/lib/team';
import { PROBLEM } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'OPENCREW Labs is a global team and growth partner for Web3, AI and new finance, integrating international talent, representation, institutional access and market execution into one network.',
};

/**
 * About, on the reference's spine (Cuberto: goal → what makes us different →
 * global team → benefits → team → CTA). Ours: goal → the four pillars as a
 * bento (moved here from the home page, where it competed with the hero) →
 * why projects get stuck (the five findings, retired from home) → the people
 * → the wider network → CTA. Everything the client's diligence would look
 * for, on one page reachable from the primary nav.
 */
export default function AboutPage() {
  return (
    <>
      <Section className="pt-7 lg:pt-8">
        <Reveal variant="fade">
          <PageBanner
            motif="about"
            eyebrow="Who we are"
            title="Global team. Global access. Global execution."
            subtitle="OPENCREW supports Web3, AI and new finance projects through global talent deployment, international representation, institutional access and overseas market coordination."
            actionLabel="See the capabilities"
            actionHref="/#what-we-do"
          />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------- what we are, at a glance */}
      <Section id="pillars" eyebrow="Our goal" title="Four capabilities, one deployed system.">
        <Reveal>
          <PillarBento />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- why projects stall */}
      <Section
        id="problem"
        eyebrow={PROBLEM.eyebrow}
        title={PROBLEM.title}
        lead={PROBLEM.lead}
        className="border-t border-border"
      >
        <Reveal>
          <ol className="border-b border-border">
            {PROBLEM.items.map((item) => (
              <li
                key={item.index}
                className="grid gap-3 border-t border-border py-6 lg:grid-cols-[80px_1fr_1.618fr] lg:items-baseline lg:gap-7"
              >
                <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                  {item.index}
                </span>
                <h3 className="text-lg font-medium text-text">{item.title}</h3>
                <p className="max-w-[var(--measure-prose)] text-secondary">{item.body}</p>
              </li>
            ))}
          </ol>
          <Manifesto className="mt-8">{PROBLEM.closing}</Manifesto>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------------- the people */}
      <Section eyebrow="Core leadership" title="The crew behind OPENCREW" className="border-t border-border">
        <Reveal>
          <ul className="grid gap-6 lg:grid-cols-2">
            {LEADERSHIP.map((m) => (
              <ProfileCard key={m.slug} member={m} />
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section eyebrow="Advisors" title="Strategic advisory">
        <Reveal>
          <ul className="grid gap-6 lg:grid-cols-2">
            {ADVISORS.map((m) => (
              <ProfileCard key={m.slug} member={m} />
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        eyebrow="Global talent network"
        title="A network built across markets."
        lead="Professionals across major global markets who can participate publicly and perform clearly defined roles."
      >
        <Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TALENT_NETWORK_CATEGORIES.map((cat) => (
              <li key={cat} className="border-t border-border pt-5">
                <h3 className="font-medium text-text">{cat}</h3>
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[var(--measure-prose)] text-sm text-muted">
            Members are listed publicly where their role is public, and by role only where it is not.
            Either way, every listed member holds a genuine role and can be verified. See our{' '}
            <TextLink href="/legal/disclosure">verification and engagement policy</TextLink>.
          </p>
        </Reveal>
      </Section>

      {/* The closing ask (work with us / join the crew) is the footer CTA panel,
          shared by every route — no page-level duplicate. */}
    </>
  );
}
