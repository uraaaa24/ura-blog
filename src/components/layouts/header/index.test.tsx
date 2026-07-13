import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Header from './index'

const mockUsePathname = vi.hoisted(() => vi.fn<() => string>(() => '/'))

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname
}))

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

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

  it('marks Home as active on the initial root route render', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Posts' })).not.toHaveAttribute('aria-current')
  })

  it('marks the parent navigation item as active on a nested route', () => {
    mockUsePathname.mockReturnValue('/posts/some-post')

    render(<Header />)

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not render on game routes', () => {
    mockUsePathname.mockReturnValue('/games/some-game')

    render(<Header />)

    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })

  it('does not mark similarly prefixed routes as active', () => {
    mockUsePathname.mockReturnValue('/posts-archive')

    render(<Header />)

    expect(screen.getByRole('link', { name: 'Posts' })).not.toHaveAttribute('aria-current')
  })
})
