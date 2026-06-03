import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { navLinks } from '@/constants/nav-links'

import Footer from '.'

describe('Footer Component', () => {
  it('renders the footer as a <footer> element', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement.tagName).toBe('FOOTER')
  })

  it('contains a container div', () => {
    render(<Footer />)
    const containerDiv = screen.getByRole('contentinfo').querySelector('.container')
    expect(containerDiv).toBeInTheDocument()
  })

  it('renders footer navigation links', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: 'Footer navigation' })
    expect(nav).toBeInTheDocument()

    for (const { label, href } of navLinks) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('contains the copyright text', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toHaveTextContent(
      `© ${new Date().getFullYear()} Uralog. All rights reserved.`
    )
  })
})
