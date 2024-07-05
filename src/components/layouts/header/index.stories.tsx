import { StoryObj } from '@storybook/react'

import Header from '.'

const meta = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {}
}
