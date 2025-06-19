import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import MDBlockquote from './index'

describe('MDBlockquote', () => {
  it('renders quote content correctly', () => {
    const content = 'This is a blockquote.'
    const { container } = render(<MDBlockquote>{content}</MDBlockquote>)

    expect(container.textContent).toBe(content)
  })

  it('renders as a blockquote element', () => {
    const { container } = render(<MDBlockquote>Quote content</MDBlockquote>)
    const blockquoteElement = container.querySelector('blockquote')

    expect(blockquoteElement).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<MDBlockquote>Content</MDBlockquote>)
    const blockquoteElement = container.querySelector('blockquote')

    expect(blockquoteElement).toHaveClass('border-l-4', 'text-gray-500', 'border-gray-300', 'pl-6')
  })

  it('handles nested content', () => {
    const { container } = render(
      <MDBlockquote>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </MDBlockquote>
    )

    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs).toHaveLength(2)
    expect(paragraphs[0]).toHaveTextContent('First paragraph')
    expect(paragraphs[1]).toHaveTextContent('Second paragraph')
  })

  it('handles Japanese content', () => {
    const japaneseQuote = 'これは重要な引用文です。'
    const { container } = render(<MDBlockquote>{japaneseQuote}</MDBlockquote>)

    expect(container.textContent).toBe(japaneseQuote)
  })
})
