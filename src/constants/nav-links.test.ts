import { describe, expect, it } from 'vitest'

import { navLinks } from './nav-links'

describe('navLinks', () => {
  it('contains expected navigation items', () => {
    expect(navLinks).toHaveLength(4)

    const [home, posts, dev, about] = navLinks

    expect(home).toMatchObject({
      href: '/',
      label: 'Home'
    })

    expect(posts).toMatchObject({
      href: '/posts',
      label: 'Posts'
    })

    expect(dev).toMatchObject({
      href: '/dev',
      label: 'Dev'
    })

    expect(about).toMatchObject({
      href: '/about',
      label: 'About'
    })
  })

  it('all nav items have required properties', () => {
    for (const link of navLinks) {
      expect(link).toHaveProperty('href')
      expect(link).toHaveProperty('label')
      expect(typeof link.href).toBe('string')
      expect(typeof link.label).toBe('string')
    }
  })
})
