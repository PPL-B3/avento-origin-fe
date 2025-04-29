import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/:path*`, // update with your backend URL
    },
  ],
  env: {
    LOGROCKET_ID: process.env.LOGROCKET_ID,
    DO_SPACES_ACCESS_KEY: process.env.DO_SPACES_ACCESS_KEY,
    DO_SPACES_SECRET_KEY: process.env.DO_SPACES_SECRET_KEY,
    DO_SPACES_ENDPOINT: process.env.DO_SPACES_ENDPOINT,
    DO_SPACES_REGION: process.env.DO_SPACES_REGION,
    DO_SPACES_BUCKET: process.env.DO_SPACES_BUCKET,
  },
};

export default nextConfig;
