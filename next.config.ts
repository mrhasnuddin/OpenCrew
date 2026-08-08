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
    ];
  },
};

export default nextConfig;
