import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';
import { HeroWave } from '@/components/ui/dynamic-wave-canvas-background';
import { RESPONSE_TIME } from '@/content/contact';
import { CLOSING_CTA } from '@/content/site';

/**
 * Conversion panel above the footer — redesigned to the client's frame: a
 * BLACK card carrying the two-colour wave field, with the primary gold
 * blooming from the lower corners (the reference frame's two corner
 * gradients), so the panel pops against the canvas without leaving the
 * black-and-gold system. The light card it replaces is retired.
 *
 * Two asks, split left / right (client direction: the "Work with us, or join
 * the crew" sections the subpages carried are folded into this one card):
 *   left  — the project ask: headline, response-time line, primary pill;
 *   right — the crew ask: one line, secondary pill.
 * A hairline divides them at lg; below, they stack.
 *
 * Contrast: the field is capped at half-strength gold, a dark scrim sits
 * under the copy columns, and the corner blooms stay in the corners — the
 * copy and both CTAs sit on near-black.
 */
export function FooterCta() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-ink-1000">
      {/* the field */}
      <HeroWave />

      {/* corner blooms — the frame's lower-left / lower-right gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 88% at 0% 100%, color-mix(in oklab, var(--gold-500) 62%, transparent) 0%, color-mix(in oklab, var(--gold-500) 24%, transparent) 38%, transparent 72%),' +
            'radial-gradient(52% 88% at 100% 100%, color-mix(in oklab, var(--gold-500) 62%, transparent) 0%, color-mix(in oklab, var(--gold-500) 24%, transparent) 38%, transparent 72%)',
        }}
      />
      {/* copy scrim — keeps both columns on near-black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(0 0 0 / 0.55) 0%, rgb(0 0 0 / 0.35) 60%, rgb(0 0 0 / 0.1) 100%)',
        }}
      />

      <div className="relative grid gap-8 px-6 py-8 lg:grid-cols-[1.618fr_1fr] lg:gap-9 lg:px-9 lg:py-9">
        {/* ----------------------------------------------- left: the project */}
        <div className="flex flex-col items-start">
          <p className="eyebrow mb-6">{CLOSING_CTA.eyebrow}</p>
          <h2 className="section-title max-w-[16ch] text-balance">{CLOSING_CTA.title}</h2>
          <p className="lead-measure mt-6 mb-8 text-lg text-secondary">
            {RESPONSE_TIME} Bring the deck, the stage, the market and the roles you need.
          </p>
          <Link href="/contact" className={buttonClasses('primary', 'lg', 'mt-auto')}>
            Start a project
            <Arrow />
          </Link>
        </div>

        {/* ------------------------------------------------- right: the crew */}
        <div className="flex flex-col items-start border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-9">
          <p className="eyebrow mb-6">Or join the crew</p>
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-text lg:text-3xl">
            Be deployed, not listed.
          </h3>
          <p className="mt-5 mb-8 max-w-[36ch] text-secondary">
            Senior operators across major markets, placed into real roles with real work:
            executives, advisors, consultants, regional leaders and spokespersons.
          </p>
          <Link href="/join" className={buttonClasses('secondary', 'lg', 'mt-auto')}>
            Join the crew
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}
