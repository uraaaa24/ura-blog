import type { Meta, StoryObj } from '@storybook/nextjs'

import MDStrong from './index'

const meta: Meta<typeof MDStrong> = {
  title: 'Markdown/Strong',
  component: MDStrong,
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
    children: 'これは太字のテキストです'
  }
}

export const English: Story = {
  args: {
    children: 'This is bold text'
  }
}

export const InSentence: Story = {
  args: {
    children: '重要な'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>これは<Story />情報を含む文章です。</p>
      </div>
    )
  ]
}

export const Mixed: Story = {
  args: {
    children: 'Important Information'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>Please pay attention to this <Story /> before proceeding.</p>
      </div>
    )
  ]
}