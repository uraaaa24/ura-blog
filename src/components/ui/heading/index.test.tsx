import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Heading1, Heading2 } from './index'

describe('Heading Components', () => {
  describe('Heading1', () => {
    it('renders as h1 element with correct content', () => {
      render(<Heading1>Test Heading 1</Heading1>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 1')
    })

    it('has correct CSS classes', () => {
      render(<Heading1>Test Heading</Heading1>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'mb-6')
    })
  })

  describe('Heading2', () => {
    it('renders as h2 element with correct content', () => {
      render(<Heading2>Test Heading 2</Heading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 2')
    })

    it('has correct CSS classes', () => {
      render(<Heading2>Test Heading</Heading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-2xl', 'font-semibold', 'mb-4')
    })
  })
})
