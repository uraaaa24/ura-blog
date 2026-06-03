import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
  experimental: {
    viewTransition: true
  },
  transpilePackages: ['three']
}

export default nextConfig
