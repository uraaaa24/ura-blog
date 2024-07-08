import { StoryObj } from '@storybook/react'

import RichEditor from '.'

const meta = {
  title: 'Elements/RichEditor',
  component: RichEditor,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    body: `
      <h2>Heading</h2>
      <p>Paragraph</p>
      <ul>
        <li>Unordered list item</li>
      </ul>
      <ol>
        <li>Ordered list item</li>
      </ol>
      <blockquote>Blockquote</blockquote>
      <pre>Preformatted text</pre>
      <a href="https://example.com">Link</a>
      <img src="https://placehold.jp/300x300.png" alt="Image">
    `
  }
}
