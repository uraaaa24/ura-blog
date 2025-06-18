import { describe, expect, it } from 'vitest'

import { SOCIAL_LINKS } from './sns'

describe('SOCIAL_LINKS', () => {
  it('contains expected social media links', () => {
    expect(SOCIAL_LINKS).toHaveLength(3)
    
    const [github, zenn, twitter] = SOCIAL_LINKS
    
    expect(github).toMatchObject({
      href: 'https://github.com/uraaaa24',
      src: '/github.svg',
      alt: 'GitHub'
    })
    
    expect(zenn).toMatchObject({
      href: 'https://zenn.dev/uraaaa24',
      src: '/zenn.svg',
      alt: 'Zenn'
    })
    
    expect(twitter).toMatchObject({
      href: 'https://twitter.com/__ars____24',
      src: '/x.svg',
      alt: 'X(Twitter)'
    })
  })

  it('all links have valid URLs', () => {
    SOCIAL_LINKS.forEach(link => {
      expect(() => new URL(link.href)).not.toThrow()
      expect(link.href).toMatch(/^https:\/\//)
    })
  })

  it('all links have required properties', () => {
    SOCIAL_LINKS.forEach(link => {
      expect(link).toHaveProperty('href')
      expect(link).toHaveProperty('src')
      expect(link).toHaveProperty('alt')
      expect(typeof link.href).toBe('string')
      expect(typeof link.src).toBe('string')
      expect(typeof link.alt).toBe('string')
    })
  })

  it('image sources point to SVG files', () => {
    SOCIAL_LINKS.forEach(link => {
      expect(link.src).toMatch(/\.svg$/)
      expect(link.src).toMatch(/^\//)
    })
  })

  it('alt texts are descriptive', () => {
    SOCIAL_LINKS.forEach(link => {
      expect(link.alt.length).toBeGreaterThan(0)
      expect(link.alt).not.toBe('')
    })
  })
})