import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import LinkItem from './link-item'

const mockUsePathname = vi.hoisted(() => vi.fn(() => '/'))

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname
}))

describe('LinkItem', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  })

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

  it('preserves the scroll position on the initial render', () => {
    document.documentElement.scrollTop = 120
    document.body.scrollTop = 120

    render(<LinkItem isActive={true} href="/" label="Home" />)

    expect(document.documentElement.scrollTop).toBe(120)
    expect(document.body.scrollTop).toBe(120)
  })

  it('resets the scroll position when the pathname changes', () => {
    const { rerender } = render(<LinkItem isActive={true} href="/" label="Home" />)
    document.documentElement.scrollTop = 120
    document.body.scrollTop = 120
    mockUsePathname.mockReturnValue('/posts')

    rerender(<LinkItem isActive={false} href="/" label="Home" />)

    expect(document.documentElement.scrollTop).toBe(0)
    expect(document.body.scrollTop).toBe(0)
  })
})
