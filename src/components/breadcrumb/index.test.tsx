import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Breadcrumb from './index'

describe('Breadcrumb', () => {
  it('renders breadcrumb navigation', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    const nav = screen.getByRole('navigation', { name: 'Breadcrumbs' })
    expect(nav).toBeInTheDocument()
  })

  it('renders all breadcrumb items', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Sample Article')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    const postsLink = screen.getByRole('link', { name: 'Posts' })
    expect(postsLink).toBeInTheDocument()
    expect(postsLink).toHaveAttribute('href', '/posts')
  })

  it('renders span for items without href', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    const currentPage = screen.getByText('Sample Article')
    expect(currentPage).toBeInTheDocument()
    expect(currentPage.tagName).toBe('SPAN')
  })

  it('renders separators between items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Posts', href: '/posts' },
      { label: 'Sample Article' }
    ]

    render(<Breadcrumb items={items} />)

    const separators = screen.getAllByText('/')
    expect(separators).toHaveLength(2)
  })

  it('applies correct CSS classes to links', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    const link = screen.getByRole('link', { name: 'Posts' })
    expect(link).toHaveClass(
      'text-gray-400',
      'font-medium',
      'hover:text-gray-600',
      'transition-colors'
    )
  })

  it('applies correct CSS classes to current page', () => {
    const items = [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article' }]

    render(<Breadcrumb items={items} />)

    const currentPage = screen.getByText('Sample Article')
    expect(currentPage).toHaveClass('text-black', 'font-bold')
  })

  it('handles single item breadcrumb', () => {
    const items = [{ label: 'Current Page' }]

    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Current Page')).toBeInTheDocument()
    expect(screen.queryByText('/')).not.toBeInTheDocument()
  })
})
