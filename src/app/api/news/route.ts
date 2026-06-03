import { NextResponse } from 'next/server'
import { getNews } from '@/features/news/api/get-news'

export async function GET() {
  try {
    const newsData = await getNews()
    return NextResponse.json(newsData)
  } catch (error) {
    console.error('Error in /api/news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
