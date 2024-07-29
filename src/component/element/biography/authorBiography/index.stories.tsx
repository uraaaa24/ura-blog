import { StoryObj } from '@storybook/react'

import AuthorBiography from '.'

const meta = {
  title: 'Elements/AuthorBiography',
  component: AuthorBiography,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {}
