import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import LinkItem from './link-item'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/')
}))

describe('LinkItem', () => {
  it('renders active link with correct styling', () => {
    render(<LinkItem isActive={true} href="/" label="Home" />)

    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveClass('text-gray-900', 'font-bold')
  })

  it('renders inactive link with correct styling', () => {
    render(<LinkItem isActive={false} href="/posts" label="Posts" />)

    const link = screen.getByRole('link', { name: 'Posts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/posts')
    expect(link).toHaveClass('text-gray-400')
  })

  it('applies hover styles', () => {
    render(<LinkItem isActive={false} href="/about" label="About" />)

    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveClass('hover:text-gray-800', 'transition-colors')
  })
})
