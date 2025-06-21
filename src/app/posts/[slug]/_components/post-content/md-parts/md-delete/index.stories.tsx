import type { Meta, StoryObj } from '@storybook/nextjs'

import MDDelete from './index'

const meta: Meta<typeof MDDelete> = {
  title: 'Markdown/Delete',
  component: MDDelete,
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
    children: 'この文字は削除されました'
  }
}

export const English: Story = {
  args: {
    children: 'This text has been deleted'
  }
}

export const InSentence: Story = {
  args: {
    children: '古い情報'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>これは<Story />新しい情報に更新されました。</p>
      </div>
    )
  ]
}

export const Correction: Story = {
  args: {
    children: 'incorrect data'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>The report contained <Story /> correct information after review.</p>
      </div>
    )
  ]
}