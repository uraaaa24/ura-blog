import MDCodeBlock from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'


const meta: Meta<typeof MDCodeBlock> = {
  title: 'Markdown/CodeBlock',
  component: MDCodeBlock,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const JavaScript: Story = {
  args: {
    className: 'language-javascript',
    children: `const greeting = 'Hello, World!';
console.log(greeting);

function add(a, b) {
  return a + b;
}

const result = add(2, 3);
console.log(result);`
  }
}

export const TypeScript: Story = {
  args: {
    className: 'language-typescript',
    children: `interface User {
  id: number;
  name: string;
  email?: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...userData,
  };
};

const user = createUser({ name: 'John Doe' });`
  }
}

export const InlineCode: Story = {
  args: {
    children: 'npm install'
  }
}

export const Bash: Story = {
  args: {
    className: 'language-bash',
    children: `npm install
npm run dev
git add .
git commit -m "Add new feature"`
  }
}
