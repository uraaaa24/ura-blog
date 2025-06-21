import type { Post } from '@/lib/post'
import type { Meta, StoryObj } from '@storybook/nextjs'

import PostItem from './index'

const meta: Meta<typeof PostItem> = {
  title: 'Blog/PostItem',
  component: PostItem,
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

const mockLocalPost: Post = {
  slug: '2025-06-15',
  title: 'ブログ始めました',
  thumbnail:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c3-200d-2642-fe0f.svg',
  date: '2025-03-11',
  formattedDate: '11 Mar 2025',
  content: 'Sample content',
  excerpt: 'Next.jsとApp Routerを使った個人ブログの作り方について解説します。',
  tags: ['Self']
}

const mockZennPost: Post = {
  slug: 'https://zenn.dev/uraaaa24/articles/sample-article',
  title: 'Next.jsでブログを作る方法',
  thumbnail: '/zenn.svg',
  date: '2025-03-10',
  formattedDate: '10 Mar 2025',
  content: 'Sample Zenn content',
  excerpt: 'Zennの記事です',
  tags: ['Tech', 'Next.js']
}

export const LocalPost: Story = {
  args: {
    post: mockLocalPost
  }
}

export const ZennPost: Story = {
  args: {
    post: mockZennPost
  }
}
