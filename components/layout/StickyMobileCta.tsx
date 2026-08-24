'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Mobile-only sticky CTA bar. Appears after the reader has scrolled past the
 * hero (they've seen the pitch; keep the next step one thumb away) and stays
 * for the rest of the page.
 *
 * Hidden on /start and /join — a "start a project" bar on top of the intake
 * form is a hall of mirrors — and on md+ where the header CTA is always
 * visible. Bottom padding respects the home-indicator safe area.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/contact' || pathname === '/join' || pathname === '/thank-you') return null;

  return (
    <>
      {/* Reserves the bar's height at the end of the document. Without it the
          bar — which is fixed, and permanent once you have scrolled — sits on
          top of the last rows of the footer for the whole visit. */}
      <div aria-hidden="true" className="h-[84px] md:hidden" />
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-[250] border-t border-border bg-canvas/95 backdrop-blur-sm md:hidden',
          'px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]',
          'transition-transform duration-[var(--dur-drawer)] ease-drawer motion-reduce:transition-none',
          visible ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!visible}
      >
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className={buttonClasses('primary', 'lg', 'w-full justify-center')}
        >
          Start a project
        </Link>
      </div>
    </>
  );
}
