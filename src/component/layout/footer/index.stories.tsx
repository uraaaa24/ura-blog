import { StoryObj } from '@storybook/react'

import Footer from '.'

const meta = {
  title: 'Layouts/Footer',
  component: Footer,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {}
}
