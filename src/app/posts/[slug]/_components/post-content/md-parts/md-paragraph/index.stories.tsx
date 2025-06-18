import type { Meta, StoryObj } from '@storybook/nextjs'

import MDParagraph from './index'

const meta: Meta<typeof MDParagraph> = {
  title: 'Markdown/Paragraph',
  component: MDParagraph,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'これは通常の段落です。日本語のテキストが含まれています。',
  },
}

export const English: Story = {
  args: {
    children: 'This is a regular paragraph with English text content.',
  },
}

export const Long: Story = {
  args: {
    children: `これは長い段落の例です。複数の文を含み、改行や空白の処理をテストすることができます。
    
Next.jsとTypeScriptを使用したブログ開発について、詳細な説明を提供します。この段落では、プロジェクトの構成、コンポーネントの設計、そしてStorybookの統合について説明しています。

長い文章でも適切に表示されることを確認するために、このような例を用意しました。`,
  },
}

export const WithLineBreaks: Story = {
  args: {
    children: `行1
行2
行3

空行の後の行4`,
  },
}