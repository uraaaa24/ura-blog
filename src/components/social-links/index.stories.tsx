import SocialLinks from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof SocialLinks> = {
  title: 'UI Elements/SocialLinks',
  component: SocialLinks,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
