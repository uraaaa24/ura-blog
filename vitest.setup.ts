import '@testing-library/jest-dom';
import React from 'react';

import { vi } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // next/image 固有の props がDOM属性として出るとテストで警告になるので除外する
    const { unoptimized: _unoptimized, priority: _priority, fill: _fill, ...rest } = props
    return React.createElement('img', { src, alt, ...rest })
  }
}))
