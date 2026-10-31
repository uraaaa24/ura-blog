import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import TableOfContents from './index'

describe('TableOfContents', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.querySelectorAll('[data-test-heading]').forEach((heading) => {
      heading.remove()
    })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  })

  it('keeps the H2 active while scrolling past an H3', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })

    for (const [id, top] of [
      ['first', 0],
      ['nested', 150],
      ['second', 300]
    ] as const) {
      const heading = document.createElement('h2')
      heading.id = id
      heading.dataset.testHeading = 'true'
      vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect)
      document.body.appendChild(heading)
    }

    render(
      <TableOfContents
        items={[
          { id: 'first', text: 'First', level: 2 },
          { id: 'nested', text: 'Nested', level: 3 },
          { id: 'second', text: 'Second', level: 2 }
        ]}
      />
    )

    expect(screen.queryByRole('link', { name: 'Nested' })).not.toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 200 })
    fireEvent.scroll(window)
    expect(screen.getByRole('link', { name: 'First' })).toHaveAttribute('aria-current', 'location')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 350 })
    fireEvent.scroll(window)
    expect(screen.getByRole('link', { name: 'Second' })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: 'First' })).not.toHaveAttribute('aria-current')
  })

  it('activates the last heading at the page bottom when it cannot reach the top', () => {
    const originalScrollHeight = Object.getOwnPropertyDescriptor(
      document.documentElement,
      'scrollHeight'
    )
    const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight')

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1000
    })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 400 })

    try {
      for (const [id, top] of [
        ['first', 0],
        ['last', 800]
      ] as const) {
        const heading = document.createElement('h2')
        heading.id = id
        heading.dataset.testHeading = 'true'
        vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect)
        document.body.appendChild(heading)
      }

      render(
        <TableOfContents
          items={[
            { id: 'first', text: 'First', level: 2 },
            { id: 'last', text: 'Last', level: 2 }
          ]}
        />
      )

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 598 })
      fireEvent.scroll(window)
      expect(screen.getByRole('link', { name: 'Last' })).toHaveAttribute('aria-current', 'location')

      Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 })
      fireEvent.scroll(window)
      expect(screen.getByRole('link', { name: 'First' })).toHaveAttribute(
        'aria-current',
        'location'
      )
    } finally {
      if (originalScrollHeight) {
        Object.defineProperty(document.documentElement, 'scrollHeight', originalScrollHeight)
      } else {
        Reflect.deleteProperty(document.documentElement, 'scrollHeight')
      }
      if (originalInnerHeight) Object.defineProperty(window, 'innerHeight', originalInnerHeight)
    }
  })
})
