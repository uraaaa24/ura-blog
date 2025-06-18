import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Section from './index'

describe('Section', () => {
  it('renders children content correctly', () => {
    const testContent = 'Test section content'
    const { container } = render(<Section>{testContent}</Section>)
    
    expect(container.textContent).toBe(testContent)
  })

  it('renders as a section element', () => {
    const { container } = render(<Section>Content</Section>)
    const sectionElement = container.querySelector('section')
    
    expect(sectionElement).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Section>Content</Section>)
    const sectionElement = container.querySelector('section')
    
    expect(sectionElement).toHaveClass('pb-6', 'mb-6')
  })

  it('renders with nested elements', () => {
    const { container } = render(
      <Section>
        <h2>Title</h2>
        <p>Paragraph content</p>
      </Section>
    )
    
    expect(container.querySelector('h2')).toHaveTextContent('Title')
    expect(container.querySelector('p')).toHaveTextContent('Paragraph content')
  })
})