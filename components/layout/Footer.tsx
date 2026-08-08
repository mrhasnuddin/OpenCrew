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
      { label: 'Work', href: '/work' },
      { label: 'Network', href: '/network' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Capabilities',
    links: CAPABILITIES.map((c) => ({ label: c.name, href: `/services/${c.slug}` })),
  },
  {
    title: 'Engage',
    links: [
      { label: 'How We Work', href: '/engage' },
      { label: 'Deploy by Role', href: '/roles' },
      { label: 'Start a Project', href: '/start' },
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
    <footer className="border-t border-border pt-7 pb-6 lg:pt-8">
      <Container>
        <FooterCta />
      </Container>

      {/* ───────────────────────────────── wayfinding */}
      <Container className="mt-8 lg:mt-9">
        <div className="grid grid-cols-2 gap-7 border-t border-border pt-7 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <p className="eyebrow mb-5">Our social</p>
            <SocialIcons links={{}} />
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
              {CONTACT.map((c) =>
                c.href ? (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      className="text-sm text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
                    >
                      {c.value}
                    </a>
                  </li>
                ) : (
                  <li key={c.key} className="text-sm text-muted">
                    {c.value}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Container>

      {/* ───────────────────────────────── brand */}
      <Container className="mt-9">
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
