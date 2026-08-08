'use client';

import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { buttonClasses } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Container } from '@/components/primitives/Layout';
import { CAPABILITIES, PRIMARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * The Header sits in every route's bundle, so `motion` must not be a static
 * import here — it would add ~46 kB to the shared chunk for a menu flourish.
 * Deferred, AND not mounted until the panel is opened for the first time: a
 * visitor who never touches Capabilities never fetches the icons at all.
 */
const CapabilityIcon = dynamic(() => import('@/components/marketing/CapabilityIcon'), {
  loading: () => <span className="block size-[26px]" aria-hidden="true" />,
});

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null);
  const [iconsMounted, setIconsMounted] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Only the home page opens on an inverse band. Keyed on the route rather than
  // measuring what's underneath — cheaper, and there is exactly one such page.
  const overInverseHero = pathname === '/' && !scrolled && !mobileOpen;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openPanel = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIconsMounted(true);
    setPanelOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setPanelOpen(false);
      setHoveredSlug(null);
    }, 120);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[200] h-[64px] border-b',
        'transition-[background-color,border-color,color] duration-[var(--dur-base)] ease-hover',
        overInverseHero
          ? // Solid ink, NOT transparent. `main` is offset by the 64px header,
            // so the hero starts below it — behind a transparent bar sits the
            // white body, which put `.on-inverse`'s white text on a white
            // strip. `bg-canvas` under `.on-inverse` resolves to the same
            // ink-950 as the hero, so the two read as one surface.
            // `.on-inverse` also flips the logo artwork automatically.
            'on-inverse border-transparent bg-canvas'
          : 'bg-[color-mix(in_oklab,var(--color-canvas)_72%,transparent)] backdrop-blur-[12px]',
        !overInverseHero && (scrolled ? 'border-border' : 'border-transparent'),
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="OPENCREW Labs — home" className="flex items-center">
          <Logo variant="horizontal" height={26} className="hidden md:block" label="OPENCREW Labs" />
          <Logo variant="mark" height={22} className="md:hidden" label="OPENCREW Labs" />
        </Link>

        {/* ---------- desktop nav ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {PRIMARY_NAV.map((item) =>
              item.hasPanel ? (
                <li key={item.href} onMouseEnter={openPanel} onMouseLeave={scheduleClose}>
                  <button
                    type="button"
                    aria-expanded={panelOpen}
                    aria-haspopup="true"
                    onClick={() => {
                      setIconsMounted(true);
                      setPanelOpen((v) => !v);
                    }}
                    className={cn(
                      'flex items-center gap-2 py-2 text-sm font-medium text-secondary',
                      'transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text',
                      'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                    )}
                  >
                    {item.label}
                    <svg viewBox="0 0 10 6" className="size-[10px]" aria-hidden="true">
                      <path
                        d="M1 1.5 5 5 9 1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="py-2 text-sm font-medium text-secondary transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* ---------- actions ---------- */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link href="/join" className={buttonClasses('ghost', 'sm')}>
            Join the Crew
          </Link>
          {/* The single gold element in the header. */}
          <Link href="/start" className={buttonClasses('primary', 'sm')}>
            Start a Project
          </Link>
        </div>

        <ThemeToggle className="ml-auto lg:hidden" />

        <button
          type="button"
          className="-mr-3 flex size-[44px] items-center justify-center text-text lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" className="size-[20px]" aria-hidden="true">
            {mobileOpen ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {/* ---------- capabilities mega-panel ---------- */}
      <div
        onMouseEnter={openPanel}
        onMouseLeave={scheduleClose}
        className={cn(
          'absolute inset-x-0 top-[64px] hidden origin-top lg:block',
          'transition-[opacity,transform] duration-[var(--dur-base)] ease-out',
          panelOpen
            ? 'pointer-events-auto opacity-100 [transform:scale(1)]'
            : 'pointer-events-none opacity-0 [transform:scale(0.97)]',
        )}
      >
        <Container>
          <div className="rounded-lg border border-border-strong bg-surface-raised p-7 shadow-[0_24px_64px_-16px_rgb(0_0_0/0.6)]">
            <p className="eyebrow mb-6">One team. Six capabilities.</p>
            {/* Hover/focus handlers live on each <li>, not on the <Link>.
                next/link wraps onMouseEnter for prefetching and did not forward
                ours, so the icon never activated. The capability cards work
                precisely because their handlers sit on a plain element — don't
                rely on a third party's event merging. */}
            <ul className="grid grid-cols-3 gap-x-7 gap-y-6">
              {CAPABILITIES.map((c) => (
                <li
                  key={c.slug}
                  onMouseEnter={() => setHoveredSlug(c.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => setHoveredSlug(c.slug)}
                  onBlur={() => setHoveredSlug(null)}
                >
                  <Link
                    href={`/services/${c.slug}`}
                    onClick={() => setPanelOpen(false)}
                    className="group flex gap-5 rounded-md p-4 transition-colors duration-[var(--dur-fast)] ease-hover hover:bg-surface-hover"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-muted transition-colors duration-[var(--dur-base)] ease-hover group-hover:text-accent-text group-focus-visible:text-accent-text"
                    >
                      {/* Not rendered until the panel has been opened once, so
                          the icon chunk is never fetched by visitors who don't
                          use the menu. */}
                      {iconsMounted ? (
                        <CapabilityIcon slug={c.slug} active={hoveredSlug === c.slug} />
                      ) : (
                        <span className="block size-[26px]" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="font-mono text-2xs tracking-[0.06em] text-muted">
                        {c.index}
                      </span>
                      <span className="mt-2 block font-medium text-text">{c.name}</span>
                      <span className="mt-2 block text-sm text-muted">{c.oneLiner}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* ---------- mobile sheet ---------- */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-[64px] bottom-0 z-[200] overflow-y-auto border-t border-border bg-canvas lg:hidden"
      >
        <Container className="flex flex-col gap-6 py-7">
          <Link href="/start" className={buttonClasses('primary', 'lg')} onClick={() => setMobileOpen(false)}>
            Start a Project
          </Link>
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-lg text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-border">
                <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-5 text-lg text-text">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/join" className={buttonClasses('ghost', 'lg')} onClick={() => setMobileOpen(false)}>
            Join the Crew
          </Link>
        </Container>
      </div>
    </header>
  );
}
