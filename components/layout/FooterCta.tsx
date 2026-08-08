'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AsciiMark } from '@/components/marketing/AsciiMark';
import { buttonClasses } from '@/components/ui/Button';
import { RESPONSE_TIME } from '@/content/contact';
import { CLOSING_CTA } from '@/content/site';

/**
 * Conversion panel above the footer.
 *
 * This now carries what used to be the home page's closing CTA. The footer
 * renders on every route, so keeping a near-identical CTA section directly
 * above it meant two stacked asks — home now closes on the sign-off line only.
 *
 * The reference template puts a newsletter here. We don't have a mailing list,
 * no send infrastructure, and no journal to promote, so an email box that
 * subscribes you to nothing would be the same lie as a success screen for a
 * POST that goes nowhere. The field is a shortcut INTO the intake we already
 * built: it hands the address to /start and prefills it there.
 */
export function FooterCta() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : '';
    router.push(`/start${q}`);
  };

  // `accent-subtle` is warm in BOTH themes — gold-50 cream on light, gold-950
  // deep brass on dark — so the panel reads as ours rather than as a default
  // grey card. Our ink is deliberately cool (hue 250); on a cool grey surface
  // that reads generic-tech, and the warm ground is what makes it read as
  // metal-on-paper instead.
  return (
    <div className="@container relative overflow-hidden rounded-lg border border-border bg-accent-subtle">
      <AsciiMark className="absolute -top-[10%] right-[-8%] text-accent opacity-[0.16]" />

      <div className="relative grid gap-8 p-7 lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-9 lg:p-9">
        {/* ------------------------------------------------------- left */}
        <div>
          <p className="eyebrow mb-6">{CLOSING_CTA.eyebrow}</p>
          <h2 className="max-w-[14ch] text-3xl tracking-[-0.02em] text-balance lg:text-4xl lg:tracking-[-0.025em]">
            {CLOSING_CTA.title}
          </h2>
          {/* What to send — the six fields, straight from V3's closing page. */}
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {CLOSING_CTA.fields.map((f) => (
              <li key={f} className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* --------------------------------------- ink card (.on-inverse) */}
        <form
          onSubmit={submit}
          className="on-inverse flex flex-col gap-7 rounded-md border border-gold-950 p-7 shadow-[0_24px_64px_-16px_rgb(2_3_5/0.22)]"
        >
          {/* Small mono label — brand tint, not a competing focal point. */}
          <p className="eyebrow text-accent-text">Start a brief</p>

          <div>
            <div className="flex items-center gap-4 border-b border-border-strong pb-4 transition-colors duration-[var(--dur-fast)] ease-hover focus-within:border-focus">
              <label htmlFor="cta-email" className="sr-only">
                Your work email
              </label>
              <input
                id="cta-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your work email"
                className="min-w-0 flex-1 bg-transparent text-base text-text placeholder:text-muted focus:outline-none"
              />
              {/* THE gold element of this viewport: the primary action, filled.
                  ink-1000 on gold-500 is 8.08:1. */}
              <button
                type="submit"
                aria-label="Continue to the project brief"
                className="flex size-[36px] shrink-0 items-center justify-center rounded-sm bg-accent text-on-accent transition-[background-color,transform] duration-[var(--dur-fast)] ease-hover hover:bg-accent-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                <svg viewBox="0 0 16 16" className="size-[16px]" aria-hidden="true">
                  <path
                    d="M2.5 8h11M9.5 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-5 text-sm text-muted">{RESPONSE_TIME}</p>
          </div>

          {/* Promoted from a quiet text link to a real target. Ghost, not gold —
              the filled arrow above stays the single accent, so this reads as
              the clear second option rather than a rival for the same slot. */}
          <Link
            href="/crew"
            className={buttonClasses('ghost', 'md', 'w-full justify-between')}
          >
            Browse the crew
            <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
              <path
                d="M3 9 9 3M4.5 3H9v4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </form>
      </div>
    </div>
  );
}
