import type { Meta, StoryObj } from '@storybook/nextjs'

import MDBlockquote from './index'

const meta: Meta<typeof MDBlockquote> = {
  title: 'Markdown/Blockquote',
  component: MDBlockquote,
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
    children: 'これは引用文です。重要なポイントを強調するために使用されます。'
  }
}

export const English: Story = {
  args: {
    children:
      'This is a blockquote. It is used to highlight important points or quotes from other sources.'
  }
}

export const Long: Story = {
  args: {
    children: `長い引用文の例です。
    
複数の段落を含む引用文もサポートされています。このような場合、適切なスタイリングが適用されることを確認できます。

引用文内で改行や段落分けが正しく処理されることも重要なポイントです。`
  }
}
