import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SocialLinks from './index'

describe('SocialLinks', () => {
  it('renders all social media links', () => {
    render(<SocialLinks />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    const zennLink = screen.getByRole('link', { name: 'Zenn' })
    const twitterLink = screen.getByRole('link', { name: 'X(Twitter)' })

    expect(githubLink).toBeInTheDocument()
    expect(zennLink).toBeInTheDocument()
    expect(twitterLink).toBeInTheDocument()
  })

  it('has correct href attributes', () => {
    render(<SocialLinks />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    const zennLink = screen.getByRole('link', { name: 'Zenn' })
    const twitterLink = screen.getByRole('link', { name: 'X(Twitter)' })

    expect(githubLink).toHaveAttribute('href', 'https://github.com/uraaaa24')
    expect(zennLink).toHaveAttribute('href', 'https://zenn.dev/uraaaa24')
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/__ars____24')
  })

  it('opens links in new tab', () => {
    render(<SocialLinks />)

    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders with correct container styling', () => {
    const { container } = render(<SocialLinks />)
    const socialContainer = container.firstChild

    expect(socialContainer).toHaveClass('flex', 'space-x-6')
  })
})
