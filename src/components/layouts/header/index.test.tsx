import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Header from './index'

const mockUsePathname = vi.hoisted(() => vi.fn<() => string>(() => '/'))
const mockUseSelectedLayoutSegment = vi.hoisted(() => vi.fn<() => string | null>(() => null))

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname,
  useSelectedLayoutSegment: mockUseSelectedLayoutSegment
}))

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockClear()
    mockUseSelectedLayoutSegment.mockClear()
    mockUsePathname.mockReturnValue('/')
    mockUseSelectedLayoutSegment.mockReturnValue(null)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
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
    mockUseSelectedLayoutSegment.mockReturnValue('posts')

    render(<Header />)

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark similarly prefixed routes as active', () => {
    mockUsePathname.mockReturnValue('/posts-archive')
    mockUseSelectedLayoutSegment.mockReturnValue('posts-archive')

    render(<Header />)

    expect(screen.getByRole('link', { name: 'Posts' })).not.toHaveAttribute('aria-current')
  })

  it('reads the routing state once when rendering the navigation links', () => {
    render(<Header />)

    expect(mockUsePathname).toHaveBeenCalledTimes(1)
    expect(mockUseSelectedLayoutSegment).toHaveBeenCalledTimes(1)
  })

  it('preserves the scroll position on the initial render', () => {
    document.documentElement.scrollTop = 120
    document.body.scrollTop = 120

    render(<Header />)

    expect(document.documentElement.scrollTop).toBe(120)
    expect(document.body.scrollTop).toBe(120)
  })

  it('resets the scroll position once when the pathname changes', () => {
    const rootScrollTopSetter = vi.spyOn(document.documentElement, 'scrollTop', 'set')
    const bodyScrollTopSetter = vi.spyOn(document.body, 'scrollTop', 'set')
    const { rerender } = render(<Header />)
    document.documentElement.scrollTop = 120
    document.body.scrollTop = 120
    rootScrollTopSetter.mockClear()
    bodyScrollTopSetter.mockClear()
    mockUsePathname.mockReturnValue('/posts')
    mockUseSelectedLayoutSegment.mockReturnValue('posts')

    rerender(<Header />)

    expect(rootScrollTopSetter).toHaveBeenCalledTimes(1)
    expect(bodyScrollTopSetter).toHaveBeenCalledTimes(1)
    expect(document.documentElement.scrollTop).toBe(0)
    expect(document.body.scrollTop).toBe(0)
  })
})
