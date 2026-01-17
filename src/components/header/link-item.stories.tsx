import type { Meta, StoryObj } from '@storybook/nextjs'
import LinkItem from './link-item'

const meta: Meta<typeof LinkItem> = {
  title: 'Layout/Header/LinkItem',
  component: LinkItem,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isActive: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    isActive: true,
    href: '/',
    label: 'Home'
  }
}

export const Inactive: Story = {
  args: {
    isActive: false,
    href: '/posts',
    label: 'Posts'
  }
}

export const About: Story = {
  args: {
    isActive: false,
    href: '/about',
    label: 'About'
  }
}
