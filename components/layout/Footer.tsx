import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/primitives/Layout';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { FooterCta } from '@/components/layout/FooterCta';
import { BackToTop } from '@/components/layout/BackToTop';
import { CAPABILITIES } from '@/lib/nav';
import { CONTACT } from '@/content/contact';

/**
 * Footer — conversion panel, five-column wayfinding, oversized wordmark, base bar.
 *
 * The wordmark is the official SVG scaled fluid, never type set in a webfont
 * (docs/00-brand-identity.md §2.3). The reference template draws its giant
 * wordmark in a display face; we can't, and shouldn't — ours is artwork.
 */

const COLUMNS = [
  {
    title: 'Pages',
    links: [
      { label: 'The Crew', href: '/crew' },
      { label: 'Partners', href: '/partners' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Capabilities',
    links: CAPABILITIES.map((c) => ({ label: c.name, href: `/#cap-${c.slug}` })),
  },
  {
    title: 'Home',
    links: [
      { label: 'Selected engagements', href: '/#work' },
      { label: 'How we work', href: '/#how-we-work' },
      { label: 'Why OPENCREW', href: '/#why' },
      { label: 'Join the Crew', href: '/join' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Disclosure', href: '/legal/disclosure' },
    ],
  },
];

export function Footer() {
  return (
    // Full viewport (reference): the CTA panel takes the upper block and
    // centres in it; wayfinding, the wordmark and the base bar sit at the
    // bottom. min-h-svh not h-svh — content wins if the viewport is short.
    <footer className="flex min-h-svh flex-col border-t border-border pt-7 pb-6 lg:pt-8">
      <Container className="flex flex-1 items-center py-6">
        <div className="w-full">
          <FooterCta />
        </div>
      </Container>

      {/* ───────────────────────────────── wayfinding */}
      <Container className="mt-7">
        <div className="grid grid-cols-2 gap-7 border-t border-border pt-7 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <p className="eyebrow mb-5">Our social</p>
            <SocialIcons links={{}} size="lg" tone="accent" />
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow mb-5">Contact us</p>
            <ul className="flex flex-col gap-3">
              {/* Same anatomy as the wayfinding links. A placeholder value
                  renders as the channel LABEL — no bracketed tokens on a
                  public page; once a value lands in content/contact.ts the
                  value shows instead. */}
              {CONTACT.map((c) => {
                const placeholder = c.value.startsWith('\u3010');
                const text = placeholder ? c.label : c.value;
                return (
                  <li key={c.key}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-sm text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
                      >
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm text-muted">{text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>

      {/* ───────────────────────────────── brand — the OPENCREW wordmark, oversized */}
      <Container className="mt-8">
        <Logo variant="horizontal" fluid label="OPENCREW Labs" />
      </Container>

      {/* ───────────────────────────────── base bar */}
      <Container className="mt-7">
        <div className="flex flex-col gap-5 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
            © {new Date().getFullYear()} OPENCREW Labs · Global Team. Global Access. Global
            Execution.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
