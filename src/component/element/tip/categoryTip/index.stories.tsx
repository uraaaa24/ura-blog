import { StoryObj } from '@storybook/react'

import CategoryTip from '.'

const meta = {
  title: 'Elements/CategoryTip',
  component: CategoryTip,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    id: '1',
    name: '文学'
  }
}
