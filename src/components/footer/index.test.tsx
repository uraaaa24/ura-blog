import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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

  it('contains only the expected text content', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toHaveTextContent(
      `© ${new Date().getFullYear()} Ura Blog. All rights reserved.`
    )
    expect(footerElement).not.toHaveTextContent('Unexpected Text')
  })
})
