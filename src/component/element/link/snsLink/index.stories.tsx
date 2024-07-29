import { StoryObj } from '@storybook/react'

import SNSLink from '.'

const meta = {
  title: 'Elements/SNSLink',
  component: SNSLink,
  tags: ['autodocs']
}

const github = {
  name: '@uraaaa24',
  href: 'https://github.com/uraaaa24',
  iconSrc: '/icons/github.svg',
  alt: 'GitHub'
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    sns: github
  },
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-black w-12">
        <Story />
      </div>
    )
  ]
}
