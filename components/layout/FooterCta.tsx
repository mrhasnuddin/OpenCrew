import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';
import { RESPONSE_TIME } from '@/content/contact';
import { CLOSING_CTA } from '@/content/site';

/**
 * Conversion panel above the footer — a LIGHT card on the black canvas
 * (client direction: it must contrast with the background; reference is a
 * white card with a soft gradient bloom and one centred call to action).
 *
 * `.on-light` re-declares the semantic tokens for the subtree, so the copy,
 * button and focus rings inside need no special classes. The bloom is the
 * gold system, not the reference's lavender: a radial from the top-right
 * corner, held faint so the white stays white.
 *
 * One ask, centred: headline, one line, the pill CTA with its arrow chip
 * (reference's two-part button). The email quick-field is retired — a single
 * strong action reads cleaner, and /contact is one click away.
 */
export function FooterCta() {
  return (
    <div className="on-light relative overflow-hidden rounded-xl">
      {/* bloom — top-right, gold, faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 80% at 88% 10%, color-mix(in oklab, var(--gold-500) 26%, transparent) 0%, transparent 62%),' +
            'radial-gradient(40% 60% at 100% 100%, color-mix(in oklab, var(--gold-500) 12%, transparent) 0%, transparent 60%)',
        }}
      />

      <div className="relative flex flex-col items-center px-6 py-9 text-center lg:px-9 lg:py-10">
        <p className="eyebrow mb-6">{CLOSING_CTA.eyebrow}</p>
        <h2 className="section-title max-w-[16ch] text-balance">{CLOSING_CTA.title}</h2>
        <p className="lead-measure mt-6 text-lg text-secondary">
          {RESPONSE_TIME} Bring the deck, the stage, the market and the roles you need.
        </p>

        {/* Two-part pill (reference): arrow chip + label, one link. */}
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-4 rounded-full"
        >
          <span
            aria-hidden="true"
            className="flex size-[52px] items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-[var(--dur-base)] ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
          >
            <svg viewBox="0 0 16 16" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12 12 4M6 4h6v6" />
            </svg>
          </span>
          <span className={buttonClasses('primary', 'lg', 'rounded-full px-8 pointer-events-none')}>
            Start a project
          </span>
        </Link>
      </div>
    </div>
  );
}
