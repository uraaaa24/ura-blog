import { StoryObj } from '@storybook/react'

import SearchForm from '.'

const meta = {
  title: 'Elements/SearchForm',
  component: SearchForm,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {}
