import Link from 'next/link';
import { Container, Section } from '@/components/primitives/Layout';
import { AsciiMarkHero } from '@/components/marketing/AsciiMarkHero';
import { MarketFlags } from '@/components/marketing/MarketFlags';
import { InstitutionWheel } from '@/components/marketing/InstitutionWheel';
import { InstitutionGrid } from '@/components/marketing/InstitutionGrid';
import { EngagementAccordion } from '@/components/marketing/EngagementAccordion';
import { FeaturedCrew } from '@/components/marketing/FeaturedCrew';
import { buttonClasses } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stepper, Manifesto, TextLink } from '@/components/marketing/Blocks';
import { CapabilitiesTabs } from '@/components/marketing/CapabilitiesTabs';
import {
  HERO,
  PILLARS,
  PROBLEM,
  PARTICIPATION_STANDARDS,
  ENGAGEMENT_MODELS,
  EXECUTION_FLOW,
  NETWORK,
  WORK,
  CLOSING_CTA,
} from '@/content/site';

export default function HomePage() {

  return (
    <>
      {/* ---------------------------------------------------------------- 01 hero
          Full viewport minus the 64px header. `svh` not `vh`: on mobile Safari
          `100vh` includes the retracting toolbar, so the CTAs would sit under
          the fold on first paint. `.on-inverse` re-declares the semantic tokens
          for the subtree, so nothing inside needs theme-aware classes. */}
      {/* Padding is the tightest lever here: at py-9 the section spent 220px on
          air alone and pushed the flag row off the fold. */}
      <section className="on-inverse flex min-h-[calc(100svh-64px)] items-center py-7 lg:py-8">
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
            <div>
              <p className="eyebrow mb-6">{HERO.eyebrow}</p>
              {/* Capped at 5xl rather than 6xl: the 86px step cost 32px of
                  height over two lines, which was the difference between the
                  flags sitting above or below the fold. */}
              <h1 className="max-w-[13ch] text-4xl tracking-[-0.025em] text-balance lg:text-5xl lg:tracking-[-0.03em]">
                {HERO.title}
              </h1>
              <p className="lead-measure mt-5 text-lg text-secondary">{HERO.lead}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link href={HERO.primaryCta.href} className={buttonClasses('primary', 'lg')}>
                  {HERO.primaryCta.label}
                </Link>
                <Link href={HERO.secondaryCta.href} className={buttonClasses('ghost', 'lg')}>
                  {HERO.secondaryCta.label}
                </Link>
              </div>
            </div>

            <AsciiMarkHero className="order-first lg:order-none" />
          </div>

          {/* Bottom band — the four pillars now live above the fold rather than
              stranded as their own strip below it, so the first screen answers
              "what is OPENCREW" as well as "who is it for". Full-viewport height
              gave us the room; nothing else had to shrink except the H1 step. */}
          <div className="mt-7 border-t border-border pt-5">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p, i) => (
                <li key={p.title}>
                  <span className="font-mono text-2xs tracking-[0.06em] text-accent-text">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-3 font-medium text-text">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted">{p.body}</p>
                </li>
              ))}
            </ul>

            <MarketFlags className="mt-5 border-t border-border pt-5" />
          </div>
        </Container>
      </section>

      {/* 02 pillars moved into the hero band above — a separate strip below the
          fold read as an orphan, and the first screen needed the context. */}

      {/* ------------------------------------------------------------- 03 problem */}
      <Section id="problem" eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} lead={PROBLEM.lead}>
        {/* Full-width hairline rows, same anatomy as the /services hub — the two
            "list of findings" surfaces now read as one system.

            The 2-up grid this replaces had five items, so row three orphaned a
            single card beside an empty half; and pairing it with a one-line
            quote in the 38.2% column stranded that quote in a column of air.
            Five rows have no orphan and the indices form a clean ladder. */}
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

        {/* Now a conclusion under the findings, rather than a sidebar. */}
        <Manifesto className="mt-8">{PROBLEM.closing}</Manifesto>
      </Section>

      {/* -------------------------------------------------------- 04 capabilities */}
      <Section
        id="capabilities"
        eyebrow="Our core capabilities"
        title="One team. Six capabilities."
        lead="We combine and deploy the right people, resources and operating capability for the project's stage — not a standard package."
      >
        <CapabilitiesTabs />
      </Section>

      {/* ------------------------------------------------------------ 05 standards */}
      <Section
        id="standards"
        eyebrow="Participation standards"
        title="Deployed, not introduced."
        lead="Every member holds a genuine role, performs actual work, and can be verified by any counterparty. That is the only way a project withstands ongoing institutional review."
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PARTICIPATION_STANDARDS.map((s) => (
            <Card as="li" key={s.title}>
              <h3 className="font-medium text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-muted">{s.body}</p>
            </Card>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Read our <TextLink href="/legal/disclosure">verification and engagement policy</TextLink>.
        </p>
      </Section>

      {/* ----------------------------------------------------------- 05b crew
          Directly after the standards on purpose: the section above claims
          every member holds a verifiable seat, and this is the claim applied
          to ourselves — leadership and advisors under their own names and
          faces. The full directory (filters, shortlist) stays on /crew. */}
      <Section
        id="crew"
        eyebrow="The crew"
        title="The standard, applied to ourselves first."
        lead="OPENCREW's leadership and advisors are listed publicly under their own names, in roles any counterparty can verify."
      >
        <FeaturedCrew />
        <p className="mt-6 text-sm text-muted">
          <TextLink href="/crew">Browse the full crew</TextLink>
        </p>
      </Section>

      {/* ---------------------------------------------------------------- 06 work
          All five engagements inline as an exclusive accordion — the section
          answers everything /work does, so no click-through is needed. */}
      <Section
        id="work"
        eyebrow="Selected engagements"
        title="Five engagements. One growth system."
      >
        <EngagementAccordion />
      </Section>

      {/* ------------------------------------------------------------- 07 network */}
      {/* ------------------------------------------------------------- network
          Full-viewport split mirroring the hero: editorial rail left,
          instrument right. The wheel renders its own header, legend and
          qualifier; below lg the board hides and the category grid takes
          over, with the qualifier repeated for that breakpoint. */}
      <section id="network" className="flex items-center py-7 lg:min-h-[calc(100svh-64px)]">
        <Container className="w-full">
          <InstitutionWheel />
          <div className="mt-7 lg:hidden">
            <InstitutionGrid />
            <p className="mt-7 max-w-[var(--measure-prose)] text-2xs leading-relaxed text-muted">
              {NETWORK.qualifier}
            </p>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- 08 models */}
      <Section
        id="models"
        eyebrow="How we work"
        title="The right level of engagement for each project stage."
      >
        <ul className="grid gap-6 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m) => (
            <Card as="li" key={m.slug} interactive className="flex flex-col">
              <span className="font-mono text-2xs tracking-[0.06em] text-muted">{m.index}</span>
              <h3 className="mt-4 text-lg font-medium">{m.title}</h3>
              <p className="mt-3 text-sm text-muted">{m.body}</p>
              <p className="mt-5 border-t border-border pt-5 font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
                {m.shape}
              </p>
            </Card>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          <TextLink href="/engage">Compare the models</TextLink>
        </p>
      </Section>

      {/* ---------------------------------------------------------------- 09 flow */}
      <Section id="flow" eyebrow="Execution flow" title="From project assessment to expansion.">
        <Stepper steps={EXECUTION_FLOW} />
      </Section>

      {/* ----------------------------------------------------------------- 10 close
          The ask itself moved into the footer panel, which renders on every
          route — keeping it here too meant two near-identical CTAs stacked.
          Home now closes on the sign-off alone. */}
      <Section id="close" className="border-t border-border">
        <p className="manifesto max-w-[20ch] text-3xl text-text text-balance lg:text-4xl">
          {CLOSING_CTA.signoff.join(' ')}
        </p>
      </Section>
    </>
  );
}
