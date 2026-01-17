import HeroContent from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof HeroContent> = {
  title: 'Pages/HeroContent',
  component: HeroContent,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
