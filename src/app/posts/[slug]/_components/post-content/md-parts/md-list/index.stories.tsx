import type { Meta, StoryObj } from '@storybook/nextjs'

import { MDUnorderedList, MDOrderedList, MDListItem } from './index'

const meta: Meta<typeof MDUnorderedList> = {
  title: 'Markdown/List',
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

export const UnorderedList: StoryObj<typeof MDUnorderedList> = {
  render: () => (
    <MDUnorderedList>
      <MDListItem>最初のリスト項目</MDListItem>
      <MDListItem>2番目のリスト項目</MDListItem>
      <MDListItem>3番目のリスト項目</MDListItem>
    </MDUnorderedList>
  )
}

export const OrderedList: StoryObj<typeof MDOrderedList> = {
  render: () => (
    <MDOrderedList>
      <MDListItem>最初の項目</MDListItem>
      <MDListItem>2番目の項目</MDListItem>
      <MDListItem>3番目の項目</MDListItem>
    </MDOrderedList>
  )
}

export const NestedList: StoryObj<typeof MDUnorderedList> = {
  render: () => (
    <MDUnorderedList>
      <MDListItem>
        親リスト項目1
        <MDUnorderedList>
          <MDListItem>子リスト項目1</MDListItem>
          <MDListItem>子リスト項目2</MDListItem>
        </MDUnorderedList>
      </MDListItem>
      <MDListItem>親リスト項目2</MDListItem>
    </MDUnorderedList>
  )
}

export const LongTextList: StoryObj<typeof MDUnorderedList> = {
  render: () => (
    <MDUnorderedList>
      <MDListItem>
        これは長いテキストを含むリスト項目の例です。複数行にわたるテキストがどのように表示されるかを確認できます。
      </MDListItem>
      <MDListItem>
        別の長いテキスト項目。リスト項目内でのテキストの折り返しや行間隔が適切に設定されているかを確認できます。
      </MDListItem>
    </MDUnorderedList>
  )
}
