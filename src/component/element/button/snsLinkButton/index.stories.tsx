import { StoryObj } from '@storybook/react'

import { SNS_LINKS } from '@/constant/sns'

import SNSLinkButton from '.'

const meta = {
  title: 'Elements/Button/SNSLinkButton',
  component: SNSLinkButton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    sns: SNS_LINKS.Github
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-black w-12">
        <Story />
      </div>
    )
  ]
}
