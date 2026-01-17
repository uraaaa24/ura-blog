import Header from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const HomePage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/'
      }
    }
  }
}

export const PostsPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/posts'
      }
    }
  }
}

export const AboutPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about'
      }
    }
  }
}
