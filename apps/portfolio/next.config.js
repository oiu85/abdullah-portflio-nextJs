/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/ui', '@portfolio/lib', '@portfolio/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
