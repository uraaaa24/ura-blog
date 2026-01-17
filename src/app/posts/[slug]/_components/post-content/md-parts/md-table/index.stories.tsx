import {
  MDTable,
  MDTableBody,
  MDTableCell,
  MDTableHead,
  MDTableHeadCell,
  MDTableRow
} from './index'

import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof MDTable> = {
  title: 'Markdown/Table',
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl overflow-x-auto">
        <Story />
      </div>
    )
  ]
}

export default meta

export const SimpleTable: StoryObj<typeof MDTable> = {
  render: () => (
    <MDTable>
      <MDTableHead>
        <MDTableRow>
          <MDTableHeadCell>名前</MDTableHeadCell>
          <MDTableHeadCell>年齢</MDTableHeadCell>
          <MDTableHeadCell>職業</MDTableHeadCell>
        </MDTableRow>
      </MDTableHead>
      <MDTableBody>
        <MDTableRow>
          <MDTableCell>田中太郎</MDTableCell>
          <MDTableCell>30</MDTableCell>
          <MDTableCell>エンジニア</MDTableCell>
        </MDTableRow>
        <MDTableRow>
          <MDTableCell>佐藤花子</MDTableCell>
          <MDTableCell>25</MDTableCell>
          <MDTableCell>デザイナー</MDTableCell>
        </MDTableRow>
      </MDTableBody>
    </MDTable>
  )
}

export const LargeTable: StoryObj<typeof MDTable> = {
  render: () => (
    <MDTable>
      <MDTableHead>
        <MDTableRow>
          <MDTableHeadCell>項目1</MDTableHeadCell>
          <MDTableHeadCell>項目2</MDTableHeadCell>
          <MDTableHeadCell>項目3</MDTableHeadCell>
          <MDTableHeadCell>項目4</MDTableHeadCell>
          <MDTableHeadCell>項目5</MDTableHeadCell>
        </MDTableRow>
      </MDTableHead>
      <MDTableBody>
        <MDTableRow>
          <MDTableCell>データ1-1</MDTableCell>
          <MDTableCell>データ1-2</MDTableCell>
          <MDTableCell>データ1-3</MDTableCell>
          <MDTableCell>データ1-4</MDTableCell>
          <MDTableCell>データ1-5</MDTableCell>
        </MDTableRow>
        <MDTableRow>
          <MDTableCell>データ2-1</MDTableCell>
          <MDTableCell>データ2-2</MDTableCell>
          <MDTableCell>データ2-3</MDTableCell>
          <MDTableCell>データ2-4</MDTableCell>
          <MDTableCell>データ2-5</MDTableCell>
        </MDTableRow>
        <MDTableRow>
          <MDTableCell>データ3-1</MDTableCell>
          <MDTableCell>データ3-2</MDTableCell>
          <MDTableCell>データ3-3</MDTableCell>
          <MDTableCell>データ3-4</MDTableCell>
          <MDTableCell>データ3-5</MDTableCell>
        </MDTableRow>
      </MDTableBody>
    </MDTable>
  )
}

export const SingleRowTable: StoryObj<typeof MDTable> = {
  render: () => (
    <MDTable>
      <MDTableHead>
        <MDTableRow>
          <MDTableHeadCell>プロパティ</MDTableHeadCell>
          <MDTableHeadCell>値</MDTableHeadCell>
        </MDTableRow>
      </MDTableHead>
      <MDTableBody>
        <MDTableRow>
          <MDTableCell>タイトル</MDTableCell>
          <MDTableCell>サンプルタイトル</MDTableCell>
        </MDTableRow>
      </MDTableBody>
    </MDTable>
  )
}
