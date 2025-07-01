import '@testing-library/jest-dom'
import React from 'react'

import { vi } from 'vitest'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    return React.createElement('img', { src, alt, ...props })
  }
}))
