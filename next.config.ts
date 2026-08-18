import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // V1 deck slugs are already circulating in decks and emails.
    return [
      { source: '/services/team-deployment', destination: '/services/global-crew', permanent: true },
      { source: '/services/brand-narrative', destination: '/services/consultants-education', permanent: true },
      { source: '/services/representation', destination: '/services/global-representation', permanent: true },
      { source: '/services/growth-operations', destination: '/services/market-execution', permanent: true },
      // The institutional landscape moved when the by-industry wheel was
      // retired for the flat partner directory.
      { source: '/network', destination: '/partners', permanent: true },
      // IA collapse onto the home page (Cuberto restructure). Hubs whose
      // content is now fully on the landing page redirect to their section;
      // the intake engine got a named door.
      { source: '/start', destination: '/contact', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/work/:slug', destination: '/#work', permanent: true },
      { source: '/engage', destination: '/#how-we-work', permanent: true },
      { source: '/roles', destination: '/crew', permanent: true },
      { source: '/roles/:slug', destination: '/crew?role=:slug', permanent: true },
    ];
  },
};

export default nextConfig;
