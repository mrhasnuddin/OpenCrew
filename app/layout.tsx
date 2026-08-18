import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CrewBuilderTray } from '@/components/crew/CrewBuilderTray';
import { StickyMobileCta } from '@/components/layout/StickyMobileCta';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { AnnotationToolbar } from '@/components/dev/AnnotationToolbar';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ShortlistProvider } from '@/lib/shortlist';
import { SITE, organizationSchema } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

/**
 * Type system, third generation — a designed pair, chosen from a 214-font
 * survey (client direction: clean, professional):
 *  - Instrument Sans, variable: the primary face. Neo-grotesque with a hint
 *    of warmth; bold holds a 114px headline, regular reads clean at 15px, and
 *    the variable weight axis carries hierarchy from one file. It also takes
 *    over every label, index and eyebrow in tracked small caps — the mono
 *    voice is retired, so the site is a true two-font system.
 *  - Instrument Serif: the secondary face — same designer, same foundry,
 *    drawn to sit with the sans. Manifesto lines and editorial accents.
 */
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.title,
    description:
      'Global talent deployment and institutional access for Web3, AI and new finance projects.',
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-5 focus:left-5 focus:z-[600] focus:rounded-md focus:bg-surface-raised focus:px-6 focus:py-4 focus:text-sm focus:outline-2 focus:outline-focus"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ShortlistProvider>
          <Header />
          <main id="main" className="pt-[64px]">
            {children}
          </main>
          <Footer />
          <CrewBuilderTray />
          <StickyMobileCta />
        </ShortlistProvider>
        {/* Dev-only visual annotation toolbar (Agentation); renders null in production. */}
        <AnnotationToolbar />
        {/* Cookieless and PII-free, so no consent gate is required. Named
            explicitly in /legal/privacy — analytics you don't disclose is the
            kind of detail that undermines a page about verification. */}
        <Analytics />
        {/* GA4 only when an ID is configured. ⚠️ GA sets cookies — before
            going live with this, /legal/privacy must disclose it (the page
            currently claims cookieless analytics only). */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
