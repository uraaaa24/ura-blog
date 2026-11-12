import type { NextConfig } from 'next'

import { discoveryLinks } from './src/lib/agent-discovery'

import { BASE_URL } from './src/lib/envs'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Link', value: discoveryLinks },
          { key: 'Vary', value: 'Accept' }
        ]
      },
      { source: '/posts/:path*', headers: [{ key: 'Vary', value: 'Accept' }] },
      {
        source: '/:path*.md',
        headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }]
      },
      {
        source: '/.well-known/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      }
    ]
  },
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
