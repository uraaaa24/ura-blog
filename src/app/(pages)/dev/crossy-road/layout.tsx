import type { ReactNode } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/dev/crossy-road' },
  openGraph: { url: '/dev/crossy-road', images: ['/opengraph-image'] }
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
