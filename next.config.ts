import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net'
      }
    ]
  },
  experimental: {
    viewTransition: true
  },
  transpilePackages: ['three']
}

export default nextConfig
