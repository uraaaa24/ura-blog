import { StoryObj } from '@storybook/react'

import CardList from '.'

const meta = {
  title: 'Elements/CardList',
  component: CardList,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    articleList: [
      {
        id: '1',
        title: '文壇の、或る老大家が亡くなって、その告別式の終わり頃から、雨が降りはじめた。',
        body: 'test',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        eyeCatch: {
          url: 'https://placehold.jp/300x300.png'
        },
        tags: [
          {
            name: 'tag1'
          }
        ]
      },
      {
        id: '2',
        title: 'おわかれ致いたします。',
        body: 'test',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        eyeCatch: {
          url: 'https://placehold.jp/300x300.png'
        },
        tags: [
          {
            name: 'tag1'
          },
          {
            name: 'tag2'
          }
        ]
      }
    ]
  }
}
