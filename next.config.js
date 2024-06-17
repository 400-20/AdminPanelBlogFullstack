/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    // If you are using an older version of Next.js, use the domains property instead:
    // images: {
    //   domains: ['via.placeholder.com'],
    // },
  }
  
  module.exports = nextConfig;
  