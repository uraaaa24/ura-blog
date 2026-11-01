import type { NextConfig } from 'next'

import { BASE_URL } from './src/lib/envs'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${new URL(BASE_URL).hostname}` }],
        destination: `${BASE_URL}/:path*`,
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net'
      },
      {
        protocol: 'https',
        hostname: 'gdb.voanews.com'
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk'
      },
      {
        protocol: 'https',
        hostname: 'sprudge.com'
      },
      {
        protocol: 'https',
        hostname: 'www.perfectdailygrind.com'
      }
    ]
  },
  transpilePackages: ['three']
}

export default nextConfig
