import type { Meta, StoryObj } from '@storybook/nextjs'

import { Heading1, Heading2 } from './index'

const meta1: Meta<typeof Heading1> = {
  title: 'Typography/Heading1',
  component: Heading1,
  parameters: {
    layout: 'centered'
  }
}

const meta2: Meta<typeof Heading2> = {
  title: 'Typography/Heading2',
  component: Heading2,
  parameters: {
    layout: 'centered'
  }
}

export default meta1
type Story1 = StoryObj<typeof meta1>
type Story2 = StoryObj<typeof meta2>

export const Default: Story1 = {
  args: {
    children: 'メインタイトル'
  }
}

export const English: Story1 = {
  args: {
    children: 'Main Title'
  }
}

export const Heading2Default: Story2 = {
  args: {
    children: 'セクションタイトル'
  },
  parameters: {
    ...meta2.parameters
  },
  render: (args) => <Heading2 {...args} />
}

export const Heading2English: Story2 = {
  args: {
    children: 'Section Title'
  },
  parameters: {
    ...meta2.parameters
  },
  render: (args) => <Heading2 {...args} />
}
