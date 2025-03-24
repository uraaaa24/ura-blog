import { NextResponse } from 'next/server'

import { NOTION_DATABASE_ID } from '@/lib/envs'
import { notion } from '@/lib/notion'

export const GET = async () => {
  try {
    // Notionデータベースからデータをクエリして取得
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID
    })

    // データベースから取得したデータをJSONレスポンスとして返す
    return new NextResponse(JSON.stringify(response), {
      status: 200
    })
  } catch (error) {
    console.error('データの取得に失敗しました:', error)

    // エラーレスポンスを返す
    return new NextResponse(JSON.stringify({ error: 'データの取得に失敗しました。' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
