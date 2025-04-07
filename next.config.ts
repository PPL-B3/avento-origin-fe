import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/:path*`, // update with your backend URL
    },
  ],
  env: {
    LOGROCKET_ID: process.env.LOGROCKET_ID,
  },
};

export default nextConfig;
