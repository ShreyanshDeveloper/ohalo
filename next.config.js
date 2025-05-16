/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp'],
    domains: [
      'ohalo-cms.test',
      'ohalo.frb.io',
      'dogshare.host4india.in',
      'cms.ohalo.co',
      process.env.CRAFT_BASE_URL?.replace(/https?:\/\//i, ''),
    ],
  },
  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    GRAPHQL_ACCESS_TOKEN: process.env.GRAPHQL_ACCESS_TOKEN,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: `${process.env.CRAFT_BASE_URL}/sitemaps-1-sitemap.xml`,
        permanent: true,
      },
      {
        source: '/sitemaps-:slug',
        destination: `${process.env.CRAFT_BASE_URL}/sitemaps-:slug`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
