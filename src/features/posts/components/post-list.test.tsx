import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import type { LocalPostSummary } from '../types'
import PostList from './post-list'

const post: LocalPostSummary = {
  source: 'local',
  slug: 'testing',
  href: '/posts/testing',
  title: 'Testing post',
  thumbnail: null,
  publishedAt: '2026-07-18',
  formattedDate: '2026.07.18',
  excerpt: '',
  tags: []
}

describe('PostList', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows the read dog-ear after the post is clicked', () => {
    render(<PostList posts={[post]} />)

    expect(screen.queryByText('（既読）')).not.toBeInTheDocument()

    const link = screen.getByRole('link', { name: /Testing post/ })
    link.addEventListener('click', (event) => event.preventDefault())
    fireEvent.click(link)

    expect(screen.getByRole('link', { name: /Testing post.*既読/ })).toBeInTheDocument()
  })

  it('shows the dog-ear for a previously read post', () => {
    window.localStorage.setItem('gana-blog:read-posts', JSON.stringify(['local:/posts/testing']))

    render(<PostList posts={[post]} />)

    expect(screen.getByRole('link', { name: /Testing post.*既読/ })).toBeInTheDocument()
  })
})
