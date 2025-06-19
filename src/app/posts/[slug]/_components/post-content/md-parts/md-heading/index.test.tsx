import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MDHeading2, MDHeading3 } from './index'

describe('MD Heading Components', () => {
  describe('MDHeading2', () => {
    it('renders as h2 element with correct content', () => {
      render(<MDHeading2>Test Heading 2</MDHeading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 2')
    })

    it('has correct CSS classes', () => {
      render(<MDHeading2>Test Heading</MDHeading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('relative', 'text-2xl', 'font-bold', 'mt-14', 'mb-10', 'w-fit')
    })

    it('sets id attribute based on content', () => {
      render(<MDHeading2>Section Title</MDHeading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveAttribute('id', 'Section Title')
    })

    it('handles Japanese content', () => {
      const japaneseTitle = 'セクションタイトル'
      render(<MDHeading2>{japaneseTitle}</MDHeading2>)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent(japaneseTitle)
      expect(heading).toHaveAttribute('id', japaneseTitle)
    })
  })

  describe('MDHeading3', () => {
    it('renders as h3 element with correct content', () => {
      render(<MDHeading3>Test Heading 3</MDHeading3>)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 3')
    })

    it('has correct CSS classes', () => {
      render(<MDHeading3>Test Heading</MDHeading3>)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveClass('relative', 'text-xl', 'font-semibold', 'mt-10', 'mb-6', 'w-fit')
    })

    it('handles nested content', () => {
      render(<MDHeading3>Sub Section</MDHeading3>)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Sub Section')
    })
  })
})
