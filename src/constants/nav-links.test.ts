import { describe, expect, it } from 'vitest'

import { navLinks } from './nav-links'

describe('navLinks', () => {
  it('contains expected navigation items', () => {
    expect(navLinks).toHaveLength(4)

    const [home, posts, books, about] = navLinks

    expect(home).toMatchObject({
      href: '/',
      label: 'Home'
    })

    expect(posts).toMatchObject({
      href: '/posts',
      label: 'Posts'
    })

    expect(books).toMatchObject({
      href: '/books',
      label: 'Books'
    })

    expect(about).toMatchObject({
      href: '/about',
      label: 'About'
    })
  })

  it('has working match functions', () => {
    const [home, posts, books, about] = navLinks

    // Test home match function
    expect(home.match('/')).toBe(true)
    expect(home.match('/posts')).toBe(false)
    expect(home.match('/about')).toBe(false)

    // Test posts match function
    expect(posts.match('/posts')).toBe(true)
    expect(posts.match('/posts/some-post')).toBe(true)
    expect(posts.match('/')).toBe(false)
    expect(posts.match('/about')).toBe(false)

    // Test books match function
    expect(books.match('/books')).toBe(true)
    expect(books.match('/')).toBe(false)
    expect(books.match('/posts')).toBe(false)

    // Test about match function
    expect(about.match('/about')).toBe(true)
    expect(about.match('/')).toBe(false)
    expect(about.match('/posts')).toBe(false)
  })

  it('posts match function works with nested paths', () => {
    const postsMatch = navLinks[1].match

    expect(postsMatch('/posts')).toBe(true)
    expect(postsMatch('/posts/')).toBe(true)
    expect(postsMatch('/posts/blog-post-1')).toBe(true)
    expect(postsMatch('/posts/blog-post-1/edit')).toBe(true)
    expect(postsMatch('/posts-archive')).toBe(false)
  })

  it('all nav items have required properties', () => {
    for (const link of navLinks) {
      expect(link).toHaveProperty('href')
      expect(link).toHaveProperty('label')
      expect(link).toHaveProperty('match')
      expect(typeof link.href).toBe('string')
      expect(typeof link.label).toBe('string')
      expect(typeof link.match).toBe('function')
    }
  })
})
