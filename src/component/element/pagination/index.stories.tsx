import { StoryObj } from '@storybook/react'

import Pagination from '.'

const meta = {
  title: 'Elements/Pagination',
  component: Pagination,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    currentPage: 1,
    totalPage: 10
  }
}
