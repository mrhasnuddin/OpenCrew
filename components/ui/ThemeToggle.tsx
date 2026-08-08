'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Light is the default; dark is the alternate. The stored preference is applied
 * before paint by the inline script in app/layout.tsx, so there is no flash.
 *
 * Deliberately NOT following prefers-color-scheme: the polarity here is a brand
 * decision, and most machines report light anyway. An explicit toggle beats a
 * silent guess.
 *
 * No transition on the swap. Cross-fading an entire page's colours reads as lag,
 * not craft — this is a keyboard-reachable control people may hit repeatedly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.setItem('oc-theme', next);
    } catch {
      /* private mode — the preference just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // Rendered server-side as light; suppress until mounted so the label
      // never contradicts the actual theme for a frame.
      aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Switch theme'}
      className={cn(
        'inline-flex size-[36px] items-center justify-center rounded-sm text-muted',
        'transition-colors duration-[var(--dur-fast)] ease-hover hover:bg-surface-hover hover:text-text',
        'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
        className,
      )}
    >
      <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" aria-hidden="true">
        {mounted && theme === 'dark' ? (
          // Sun — click to go light
          <>
            <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 1.6v2.2M10 16.2v2.2M18.4 10h-2.2M3.8 10H1.6M15.9 4.1l-1.6 1.6M5.7 14.3l-1.6 1.6M15.9 15.9l-1.6-1.6M5.7 5.7 4.1 4.1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          // Moon — click to go dark
          <path
            d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
