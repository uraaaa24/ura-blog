import type { Meta, StoryObj } from '@storybook/nextjs'
import AboutReadMore from './about-read-more'

const meta: Meta<typeof AboutReadMore> = {
  title: 'Pages/HeroContent/AboutReadMore',
  component: AboutReadMore,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
