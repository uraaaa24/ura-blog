import type { Post } from '@/lib/post'

import LatestPosts from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'


const meta: Meta<typeof LatestPosts> = {
  title: 'Blog/LatestPosts',
  component: LatestPosts,
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
    thumbnail:
      'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c3-200d-2642-fe0f.svg',
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
    thumbnail:
      'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c3-200d-2642-fe0f.svg',
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

export const FewPosts: Story = {
  args: {
    totalPosts: mockPosts.slice(0, 2)
  }
}

export const Empty: Story = {
  args: {
    totalPosts: []
  }
}
