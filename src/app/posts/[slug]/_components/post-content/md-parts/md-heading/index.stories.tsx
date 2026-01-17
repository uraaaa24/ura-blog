import { MDHeading } from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'


const meta: Meta<typeof MDHeading> = {
  title: 'Markdown/Heading',
  component: MDHeading,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Heading2Default: Story = {
  args: {
    level: 2,
    children: 'メインセクション'
  }
}

export const Heading2English: Story = {
  args: {
    level: 2,
    children: 'Main Section'
  }
}

export const Heading3Default: Story = {
  args: {
    level: 3,
    children: 'サブセクション'
  }
}

export const Heading3English: Story = {
  args: {
    level: 3,
    children: 'Sub Section'
  }
}

export const Heading4: Story = {
  args: {
    level: 4,
    children: '小見出し'
  }
}

export const Heading5: Story = {
  args: {
    level: 5,
    children: '詳細見出し'
  }
}

export const Heading6: Story = {
  args: {
    level: 6,
    children: '最小見出し'
  }
}
