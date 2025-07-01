import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: ['Layout', 'Typography', 'UI Elements', 'Markdown', 'Blog', 'Pages', '*']
      }
    }
  }
}

export default preview
