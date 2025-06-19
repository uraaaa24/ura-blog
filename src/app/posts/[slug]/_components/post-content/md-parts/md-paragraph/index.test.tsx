import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import MDParagraph from './index'

describe('MDParagraph', () => {
  it('renders text content correctly', () => {
    const content = 'This is a test paragraph.'
    const { container } = render(<MDParagraph>{content}</MDParagraph>)

    expect(container.textContent).toBe(content)
  })

  it('renders as a paragraph element', () => {
    const { container } = render(<MDParagraph>Content</MDParagraph>)
    const paragraphElement = container.querySelector('p')

    expect(paragraphElement).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<MDParagraph>Content</MDParagraph>)
    const paragraphElement = container.querySelector('p')

    expect(paragraphElement).toHaveClass('leading-8', 'break-words', 'whitespace-pre-wrap', 'mb-6')
  })

  it('handles Japanese text correctly', () => {
    const japaneseText = 'これは日本語のテキストです。'
    const { container } = render(<MDParagraph>{japaneseText}</MDParagraph>)

    expect(container.textContent).toBe(japaneseText)
  })

  it('preserves line breaks with whitespace-pre-wrap', () => {
    const textWithLineBreaks = 'Line 1\nLine 2\nLine 3'
    const { container } = render(<MDParagraph>{textWithLineBreaks}</MDParagraph>)
    const paragraphElement = container.querySelector('p')

    expect(paragraphElement).toHaveClass('whitespace-pre-wrap')
    expect(container.textContent).toBe(textWithLineBreaks)
  })
})
