import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Post } from '@/lib/post'

import PostItem from './index'

const mockLocalPost: Post = {
  slug: '2025-06-15',
  title: 'ブログ始めました',
  thumbnail: '/test-thumbnail.png',
  date: '2025-03-11',
  formattedDate: '11 Mar 2025',
  content: 'Sample content',
  excerpt: 'Next.jsとApp Routerを使った個人ブログの作り方について解説します。',
  tags: ['Self']
}

const mockZennPost: Post = {
  slug: 'https://zenn.dev/uraaaa24/articles/sample-article',
  title: 'Next.jsでブログを作る方法',
  thumbnail: '/zenn.svg',
  date: '2025-03-10',
  formattedDate: '10 Mar 2025',
  content: 'Sample Zenn content',
  excerpt: 'Zennの記事です',
  tags: ['Tech', 'Next.js']
}

describe('PostItem', () => {
  it('renders local post with correct internal link', () => {
    render(<PostItem post={mockLocalPost} />)

    const link = screen.getByRole('link')
    const title = screen.getByText('ブログ始めました')
    const date = screen.getByText('11 Mar 2025')

    expect(link).toHaveAttribute('href', '/posts/2025-06-15')
    expect(link).not.toHaveAttribute('target')
    expect(title).toBeInTheDocument()
    expect(date).toBeInTheDocument()
  })

  it('renders external Zenn post with correct external link', () => {
    render(<PostItem post={mockZennPost} />)

    const link = screen.getByRole('link')
    const title = screen.getByText('Next.jsでブログを作る方法')

    expect(link).toHaveAttribute('href', 'https://zenn.dev/uraaaa24/articles/sample-article')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(title).toBeInTheDocument()
  })

  it('renders thumbnail image with correct alt text', () => {
    render(<PostItem post={mockLocalPost} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'ブログ始めました')
    expect(image).toHaveAttribute('src', '/test-thumbnail.png')
  })

  it('renders post with article semantic markup', () => {
    render(<PostItem post={mockLocalPost} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
  })

  it('renders date with correct datetime attribute', () => {
    render(<PostItem post={mockLocalPost} />)

    const timeElement = screen.getByText('11 Mar 2025')
    expect(timeElement.tagName).toBe('TIME')
    expect(timeElement).toHaveAttribute('dateTime', '2025-03-11T00:00:00.000Z')
  })
})
