import { StoryObj } from '@storybook/react'

import { SNS_SHARE_LINKS } from '@/constant/sns'

import SNSShareButton from '.'

const meta = {
  title: 'Elements/Button/SNSShareButton',
  component: SNSShareButton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    icon: SNS_SHARE_LINKS.X.icon,
    alt: SNS_SHARE_LINKS.X.alt,
    url: SNS_SHARE_LINKS.X.href,
    description: SNS_SHARE_LINKS.X.description
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-black w-12">
        <Story />
      </div>
    )
  ]
}
