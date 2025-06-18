import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Header from './index'

// Mock usePathname
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/')
}))

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders navigation in header element', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
