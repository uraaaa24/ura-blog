import MDAnchor from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof MDAnchor> = {
  title: 'Markdown/Anchor',
  component: MDAnchor,
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

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    children: '外部リンク'
  }
}

export const HeadingLink: Story = {
  args: {
    href: '#heading',
    children: '見出しリンク'
  }
}

export const LongText: Story = {
  args: {
    href: 'https://example.com',
    children: 'これは長いリンクテキストの例です。ホバー時のスタイルを確認できます。'
  }
}
