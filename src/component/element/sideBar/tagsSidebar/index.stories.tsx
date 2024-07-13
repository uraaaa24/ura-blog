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
  args: {
    tags: [
      {
        id: '1',
        name: 'tag1',
        createdAt: '2024-07-08T13:44:04.589Z',
        updatedAt: '2024-07-08T13:44:04.589Z'
      },
      {
        id: '2',
        name: 'tag2',
        createdAt: '2024-07-08T13:44:04.589Z',
        updatedAt: '2024-07-08T13:44:04.589Z'
      }
    ]
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    )
  ]
}
