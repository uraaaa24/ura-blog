import { StoryObj } from '@storybook/react'

import { RichHeading1, RichHeading2, RichHeading3, RichHeading4 } from '../../richEditor/richHtmlComponent/richHeading'
import RichParagraph from '../../richEditor/richHtmlComponent/richParagraph'

import TableOfContents from '.'

const meta = {
  title: 'Elements/SideBar/ContentsSidebar',
  component: TableOfContents,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  decorators: [
    (Story) => (
      <div className="flex gap-8 max-w-4xl w-full">
        <div className="js-toc-content w-3/4">
          <RichHeading1>test</RichHeading1>
          <RichParagraph>
            この文章はダミーテキストです。コンテンツの配置やレイアウトを確認するために使用されます。実際の内容が入力される前に、文章の長さや配置を確認するのに役立ちます。
          </RichParagraph>
          <RichHeading2>test</RichHeading2>
          <RichParagraph>
            ここに表示されている文章は仮のものであり、実際の文章が決定するまでの間使用されます。デザインやレイアウトの検討において、適切なボリュームを確認するために活用されます。
          </RichParagraph>
          <RichHeading3>test</RichHeading3>
          <RichParagraph>
            サンプルテキストとして、この文章を使用しています。これにより、ページの構成や見栄えを事前に確認することができます。最終的な文章が決定する前に、このようなダミーテキストが使用されます。
          </RichParagraph>
          <RichHeading4>test</RichHeading4>
          <RichParagraph>
            仮の文章をここに配置しています。最終的な内容が入るまでの間、このダミーテキストでスペースを埋めています。これにより、デザインのバランスや文章の流れを確認することが可能です。
          </RichParagraph>
        </div>
        <div className="w-1/4">
          <Story />
        </div>
      </div>
    )
  ]
}
