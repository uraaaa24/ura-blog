import type { Meta, StoryObj } from '@storybook/nextjs'

import { MDHeading2, MDHeading3 } from './index'

const meta2: Meta<typeof MDHeading2> = {
  title: 'Markdown/Heading2',
  component: MDHeading2,
  parameters: {
    layout: 'centered'
  }
}

const meta3: Meta<typeof MDHeading3> = {
  title: 'Markdown/Heading3',
  component: MDHeading3,
  parameters: {
    layout: 'centered'
  }
}

export default meta2
type Story2 = StoryObj<typeof meta2>
type Story3 = StoryObj<typeof meta3>

export const Heading2Default: Story2 = {
  args: {
    children: 'メインセクション'
  }
}

export const Heading2English: Story2 = {
  args: {
    children: 'Main Section'
  }
}

export const Heading3Default: Story3 = {
  args: {
    children: 'サブセクション'
  },
  parameters: {
    ...meta3.parameters
  },
  render: (args) => <MDHeading3 {...args} />
}

export const Heading3English: Story3 = {
  args: {
    children: 'Sub Section'
  },
  parameters: {
    ...meta3.parameters
  },
  render: (args) => <MDHeading3 {...args} />
}
