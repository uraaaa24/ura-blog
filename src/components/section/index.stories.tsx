import type { Meta, StoryObj } from '@storybook/nextjs'

import Section from './index'

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">セクションタイトル</h2>
        <p>このセクションにはコンテンツが含まれています。</p>
      </div>
    ),
  },
}

export const WithMultipleContent: Story = {
  args: {
    children: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">複数コンテンツ</h2>
        <p className="mb-4">最初のパラグラフです。</p>
        <p className="mb-4">2番目のパラグラフです。</p>
        <ul className="list-disc list-inside">
          <li>リストアイテム1</li>
          <li>リストアイテム2</li>
          <li>リストアイテム3</li>
        </ul>
      </div>
    ),
  },
}