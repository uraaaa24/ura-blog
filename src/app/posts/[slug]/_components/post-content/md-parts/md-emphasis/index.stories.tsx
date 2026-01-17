import MDEmphasis from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'


const meta: Meta<typeof MDEmphasis> = {
  title: 'Markdown/Emphasis',
  component: MDEmphasis,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'これは斜体のテキストです'
  }
}

export const English: Story = {
  args: {
    children: 'This is emphasized text'
  }
}

export const InSentence: Story = {
  args: {
    children: '強調したい'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>
          この文章には
          <Story />
          部分があります。
        </p>
      </div>
    )
  ]
}

export const Technical: Story = {
  args: {
    children: 'variable name'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>
          The <Story /> should be defined before use.
        </p>
      </div>
    )
  ]
}
