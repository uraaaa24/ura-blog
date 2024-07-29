import { StoryObj } from '@storybook/react'

import TagSidebar from '.'

const meta = {
  title: 'Elements/SideBar/TagSidebar',
  component: TagSidebar,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    )
  ]
}
