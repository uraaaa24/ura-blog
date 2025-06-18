import '@testing-library/jest-dom'
import React from 'react'

import { vi } from 'vitest'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, ...props }: any) => {
    return React.createElement('img', { src, alt, ...props })
  }
}))
