import type { Post } from '@/lib/post'
import type { Meta, StoryObj } from '@storybook/nextjs'

import PostItems from './index'

const meta: Meta<typeof PostItems> = {
  title: 'Blog/PostItems',
  component: PostItems,
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

const mockPosts: Post[] = [
  {
    slug: '2025-06-15',
    title: 'ブログ始めました',
    thumbnail: '🏃‍♂️',
    date: '2025-03-11',
    formattedDate: '11 Mar 2025',
    content: 'Sample content',
    excerpt: 'Next.jsとApp Routerを使った個人ブログの作り方について解説します。',
    tags: ['Self']
  },
  {
    slug: 'https://zenn.dev/uraaaa24/articles/sample-article',
    title: 'Next.jsでブログを作る方法',
    thumbnail: '/zenn.svg',
    date: '2025-03-10',
    formattedDate: '10 Mar 2025',
    content: 'Sample Zenn content',
    excerpt: 'Zennの記事です',
    tags: ['Tech', 'Next.js']
  },
  {
    slug: '2025-06-10',
    title: 'TypeScriptの基礎を学ぶ',
    thumbnail: '📝',
    date: '2025-03-09',
    formattedDate: '9 Mar 2025',
    content: 'TypeScript learning content',
    excerpt: 'TypeScriptの基本的な型システムについて学習した内容をまとめました。',
    tags: ['Tech', 'TypeScript']
  }
]

export const Default: Story = {
  args: {
    totalPosts: mockPosts
  }
}

export const SinglePost: Story = {
  args: {
    totalPosts: [mockPosts[0]]
  }
}

export const Empty: Story = {
  args: {
    totalPosts: []
  }
}
