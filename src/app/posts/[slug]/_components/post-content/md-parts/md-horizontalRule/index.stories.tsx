import MDHorizontalRule from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'


const meta: Meta<typeof MDHorizontalRule> = {
  title: 'Markdown/HorizontalRule',
  component: MDHorizontalRule,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <p>上のテキスト</p>
        <Story />
        <p>下のテキスト</p>
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
