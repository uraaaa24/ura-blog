import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Post } from '@/lib/post'

import PostItems from './index'

const mockPosts: Post[] = [
  {
    slug: '2025-06-15',
    title: 'ブログ始めました',
    thumbnail: '/test-thumbnail.png',
    date: '2025-03-11',
    formattedDate: '11 Mar 2025',
    content: 'Sample content',
    excerpt: 'Next.jsとApp Routerを使った個人ブログの作り方について解説します。',
    tags: ['Self']
  },
  {
    slug: 'https://zenn.dev/uraaaa24/articles/sample-article',
    title: 'Next.jsでブログを作る方法',
    thumbnail: '/zenn.svg',
    date: '2025-03-10',
    formattedDate: '10 Mar 2025',
    content: 'Sample Zenn content',
    excerpt: 'Zennの記事です',
    tags: ['Tech', 'Next.js']
  }
]

describe('PostItems', () => {
  it('renders all posts', () => {
    render(<PostItems posts={mockPosts} />)

    expect(screen.getByText('ブログ始めました')).toBeInTheDocument()
    expect(screen.getByText('Next.jsでブログを作る方法')).toBeInTheDocument()
  })

  it('renders correct number of links', () => {
    render(<PostItems posts={mockPosts} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('renders with empty posts array', () => {
    const { container } = render(<PostItems posts={[]} />)

    expect(container.firstChild).toHaveProperty('tagName', 'UL')
  })

  it('renders single post correctly', () => {
    render(<PostItems posts={[mockPosts[0]]} />)

    expect(screen.getByText('ブログ始めました')).toBeInTheDocument()
    expect(screen.queryByText('Next.jsでブログを作る方法')).not.toBeInTheDocument()
  })

  it('passes correct props to PostItem components', () => {
    render(<PostItems posts={mockPosts} />)

    // Check that both internal and external links are handled correctly
    const internalLink = screen.getByRole('link', { name: /ブログ始めました/ })
    const externalLink = screen.getByRole('link', { name: /Next.jsでブログを作る方法/ })

    expect(internalLink).toHaveAttribute('href', '/posts/2025-06-15')
    expect(externalLink).toHaveAttribute(
      'href',
      'https://zenn.dev/uraaaa24/articles/sample-article'
    )
  })
})
