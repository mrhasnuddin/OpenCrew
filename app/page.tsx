import Link from 'next/link';
import { Container, Section } from '@/components/primitives/Layout';
import { HeroSlideshow } from '@/components/marketing/HeroSlideshow';
import { CapabilityStack } from '@/components/marketing/CapabilityStack';
import { PartnerMarquee } from '@/components/marketing/PartnerMarquee';
import { ClientStories } from '@/components/marketing/ClientStories';
import { FeaturedCrew } from '@/components/marketing/FeaturedCrew';
import { CrewOrbit } from '@/components/marketing/CrewOrbit';
import { ModelsBento } from '@/components/marketing/ModelsBento';
import { Reveal } from '@/components/motion/Reveal';
import { buttonClasses } from '@/components/ui/Button';
import { HERO, PROBLEM, PARTICIPATION_STANDARDS, NETWORK } from '@/content/site';

/**
 * Home — restructured onto the reference's spine (Cuberto), minus the two
 * sections we have no honest content for (testimonials, FAQ):
 *
 *   hero → what we do → trusted by → selected work → why us → how we work → CTA
 *
 * Everything the retired subpages (/work, /roles, /engage) used to hold now
 * lives here in full, so the site is a home page with four real hubs behind
 * it (capabilities, crew, partners, about) rather than a landing page in
 * front of a dozen echoes. Section headers share one type style
 * (.section-title); every section arrives on a reveal.
 */
export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- 01 hero
          The reference's hero: one centred statement on the bare canvas, then
          the showreel as a media card whose top edge crosses the fold. The
          text block owns ~62% of the first viewport on tall screens (min-h
          below) and its own height on short ones, so the card starts between
          ~62% and ~80% and always runs past the fold — the scroll cue is the
          card itself. No scrim anywhere: nothing sits on the photography. */}
      <section className="relative">
        <Container>
          <div className="flex min-h-[calc(62svh-64px)] flex-col items-center justify-center py-7 text-center lg:py-8">
            <Reveal variant="fade">
              <p className="eyebrow mb-6">{HERO.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-[14ch] text-5xl font-bold tracking-[-0.03em] text-balance lg:text-6xl lg:tracking-[-0.032em] 2xl:text-7xl 2xl:tracking-[-0.035em]">
                {HERO.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="lead-measure mt-6 text-lg text-secondary lg:text-xl">{HERO.lead}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link href={HERO.primaryCta.href} className={buttonClasses('primary', 'lg', 'rounded-full')}>
                  {HERO.primaryCta.label}
                </Link>
                <Link href={HERO.secondaryCta.href} className={buttonClasses('ghost', 'lg', 'rounded-full')}>
                  {HERO.secondaryCta.label}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={420} threshold={0.05}>
            <HeroSlideshow />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------- 02 what we do
          The reference's split intro — eyebrow left, one strong paragraph
          right — then the stacked capability cards. The paragraph is the
          old "problem" section distilled to its thesis; the five findings
          live on the /services hub for anyone who wants them. */}
      <Section id="what-we-do">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.618fr] lg:gap-8">
          <Reveal>
            <p className="eyebrow">What we do</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-[var(--measure-lead)] text-xl text-text lg:text-2xl">
              {PROBLEM.lead}{' '}
              <span className="text-secondary">
                OPENCREW deploys the team, the representation, the institutional access and the market
                execution that carry a project beyond its original market.
              </span>
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-8 lg:mt-9" delay={120}>
          <CapabilityStack />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- 03 trusted by
          The reference's logo strip, at the ENI reference's scale: five
          marquee rows, all partners lumped, uniform plates. */}
      <Section id="partners" className="overflow-hidden">
        <Reveal>
          <header className="mb-7 flex flex-col gap-5 lg:mb-8">
            <p className="eyebrow">{NETWORK.eyebrow}</p>
            <h2 className="section-title">Trusted across capital, payments and infrastructure.</h2>
          </header>
        </Reveal>
        <Reveal variant="fade" delay={120}>
          <PartnerMarquee />
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-7 flex justify-center">
            <Link href="/partners" className={buttonClasses('secondary', 'md', 'rounded-full')}>
              View all partners
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- 04 selected work
          Problem → deployed → produced, all five visible. This IS the work
          hub now; /work and its subpages are retired. */}
      <Section
        id="work"
        eyebrow="Client stories"
        title="Problems we were engaged to solve."
        lead="Five engagements across payments, AI and Web3: the gap each client had, what OPENCREW deployed, and what it produced."
      >
        <Reveal>
          <ClientStories />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- 05 why us
          The reference's "Why Cuberto" slot. Ours is the claim the whole
          business rests on — deployed, not introduced — beside the five real
          faces that prove it, then the crew cards themselves. */}
      <Section id="why">
        <Reveal>
          <div className="on-inverse relative overflow-hidden rounded-xl bg-ink-1000">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(80% 90% at 82% 20%, color-mix(in oklab, var(--gold-500) 8%, transparent) 0%, transparent 62%)',
              }}
            />
            <div className="relative grid gap-9 p-7 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-9">
              <div>
                <p className="eyebrow mb-6">Why OPENCREW</p>
                <h2 className="section-title max-w-[16ch]">Deployed, not introduced.</h2>
                <p className="mt-5 max-w-[var(--measure-lead)] text-lg text-secondary">
                  Every member holds a genuine role, performs actual work, and can be verified by any
                  counterparty. That is the standard institutions actually test against.
                </p>

                <ul className="mt-7 flex flex-col gap-5">
                  {PARTICIPATION_STANDARDS.map((s, i) => (
                    <li key={s.title} className="flex items-start gap-5">
                      <span
                        aria-hidden="true"
                        className="flex size-[44px] shrink-0 items-center justify-center rounded-sm border border-ink-700 bg-ink-900 text-accent-text"
                      >
                        <StandardIcon index={i} />
                      </span>
                      <span>
                        <span className="block font-medium text-text">{s.title}</span>
                        <span className="mt-1 block text-sm text-muted">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/crew" className={buttonClasses('primary', 'lg', 'rounded-full')}>
                    Browse the crew
                  </Link>
                </div>
              </div>

              <CrewOrbit className="max-lg:mt-4" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 lg:mt-9" delay={100}>
          <header className="mb-7 flex flex-col gap-5">
            <p className="eyebrow">The crew</p>
            <h2 className="section-title">The people we deploy.</h2>
          </header>
          <FeaturedCrew />
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- 06 how we work
          The old /engage page in one bento: three models + the execution
          flow, with the intake CTA inside the composition. */}
      <Section
        id="how-we-work"
        eyebrow="How we work"
        title="The right level of engagement for each stage."
        lead="Three models, one execution flow: from a defined gap to a long-term mandate."
      >
        <Reveal>
          <ModelsBento />
        </Reveal>
      </Section>

      {/* 07 — the CTA is the full-viewport footer panel, on every route. */}
    </>
  );
}

/**
 * Minimal stroke icons for the four participation standards, drawn in-project
 * (20×20, 1.5 stroke). Order matches PARTICIPATION_STANDARDS: identity,
 * responsibilities, engagement, involvement.
 */
function StandardIcon({ index }: { index: number }) {
  const paths = [
    'M10 2.5 16 5v4.6c0 3.9-2.6 6.7-6 7.9-3.4-1.2-6-4-6-7.9V5l6-2.5Zm-2.6 7.3 1.9 1.9 3.4-3.6',
    'M4 5.5h7M4 10h7M4 14.5h4.5m3.4-1 2 2 3.6-3.9',
    'M10 10.1v.1M6.2 6.4a5.4 5.4 0 0 0 0 7.2M13.8 6.4a5.4 5.4 0 0 1 0 7.2M3.6 3.8a9 9 0 0 0 0 12.4M16.4 3.8a9 9 0 0 1 0 12.4',
    'M16 10a6 6 0 1 1-1.7-4.2M16.2 2.8v3.4h-3.4',
  ];
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[index]} />
    </svg>
  );
}
