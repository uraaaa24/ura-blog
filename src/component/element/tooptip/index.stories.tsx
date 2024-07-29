import { StoryObj } from '@storybook/react'

import Tooltip from '.'

const meta = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    children: <div>Hover me</div>,
    label: 'Tooltip'
  }
}
