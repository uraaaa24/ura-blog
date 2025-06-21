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
    src: '/dog1.png',
    alt: 'サンプル画像'
  }
}

export const NoAlt: Story = {
  args: {
    src: '/dog1.png'
  }
}
