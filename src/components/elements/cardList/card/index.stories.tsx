import { StoryObj } from '@storybook/react'

import Card from '.'

const meta = {
  title: 'Elements/CardList/Card',
  component: Card,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    id: '1',
    title: '文壇の、或る老大家が亡くなって、その告別式の終わり頃から、雨が降りはじめた。',
    body: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
    createdAt: '2021-01-01T00:00:00.000Z',
    eyeCatch: {
      url: 'https://placehold.jp/300x300.png'
    }
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    )
  ]
}
