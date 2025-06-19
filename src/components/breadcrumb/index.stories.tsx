import type { Meta, StoryObj } from '@storybook/nextjs'

import Breadcrumb from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI Elements/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Posts', href: '/posts' }, { label: 'Sample Article Title' }]
  }
}

export const ThreeItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Posts', href: '/posts' },
      { label: 'How to Build React Applications' }
    ]
  }
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page' }]
  }
}

export const LongTitle: Story = {
  args: {
    items: [
      { label: 'Posts', href: '/posts' },
      { label: 'This is a Very Long Article Title That Might Wrap to Multiple Lines in Some Cases' }
    ]
  }
}
