import { StoryObj } from '@storybook/react'

import NavItem from '.'

const meta = {
  title: 'Layouts/Header/NavItem',
  component: NavItem,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    href: '/about',
    label: 'About',
    isActive: true
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    )
  ]
}

export const Inactive: Story = {
  args: {
    href: '/blog',
    label: 'Blog',
    isActive: false
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    )
  ]
}
