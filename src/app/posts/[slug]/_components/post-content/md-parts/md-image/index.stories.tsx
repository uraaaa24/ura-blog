import type { Meta, StoryObj } from '@storybook/nextjs'

import MDImage from './index'

const meta: Meta<typeof MDImage> = {
  title: 'Markdown/Image',
  component: MDImage,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300?text=Sample+Image',
    alt: 'サンプル画像'
  }
}

export const LargeImage: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600?text=Large+Image',
    alt: '大きな画像'
  }
}

export const SmallImage: Story = {
  args: {
    src: 'https://via.placeholder.com/200x150?text=Small+Image',
    alt: '小さな画像'
  }
}

export const NoAlt: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300?text=No+Alt+Text'
  }
}
