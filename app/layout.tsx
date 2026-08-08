import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Instrument_Serif } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CrewBuilderTray } from '@/components/crew/CrewBuilderTray';
import { ShortlistProvider } from '@/lib/shortlist';
import { SITE, organizationSchema } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#080D12' },
  ],
  colorScheme: 'light dark',
};

/**
 * Light is the default: the buyer is judged BY institutions, and institutions
 * are light while every Web3 protocol is dark — so light differentiates rather
 * than conforms. Dark ships as an equal alternate via the header toggle.
 *
 * We deliberately do NOT follow prefers-color-scheme; polarity is a brand
 * decision, not an OS setting. Only an explicit stored choice is applied, and
 * it is applied before paint so there is no flash.
 */
const THEME_SCRIPT = `(function(){try{if(localStorage.getItem('oc-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
        <ShortlistProvider>
          <Header />
          <main id="main" className="pt-[64px]">
            {children}
          </main>
          <Footer />
          <CrewBuilderTray />
        </ShortlistProvider>
        {/* Cookieless and PII-free, so no consent gate is required. Named
            explicitly in /legal/privacy — analytics you don't disclose is the
            kind of detail that undermines a page about verification. */}
        <Analytics />
      </body>
    </html>
  );
}
