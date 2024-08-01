import { StoryObj } from '@storybook/react'

import Breadcrumb from '.'

const meta = {
  title: 'Elements/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    categoryName: 'Category'
  }
}
