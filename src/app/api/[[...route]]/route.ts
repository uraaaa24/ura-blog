import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// GET /api/likes/:slug - like数を取得
app.get('/likes/:slug', async (c) => {
  const slug = c.req.param('slug')

  try {
    // slugに該当するレコードを取得
    const { data, error } = await supabase
      .from('post_likes')
      .select('likes_count')
      .eq('post_slug', slug)
      .single()

    if (error) {
      // レコードが存在しない場合は0を返す
      if (error.code === 'PGRST116') {
        return c.json({ likes: 0 })
      }
      console.error('Error fetching likes:', error)
      return c.json({ error: 'Failed to fetch likes' }, 500)
    }

    return c.json({ likes: data.likes_count })
  } catch (error) {
    console.error('Unexpected error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// POST /api/likes/:slug - like数をインクリメント
app.post('/likes/:slug', async (c) => {
  const slug = c.req.param('slug')

  // リクエストボディからインクリメント量を取得（デフォルトは1）
  let increment = 1
  try {
    const body = await c.req.json()
    increment = body.increment || 1
  } catch {
    // bodyがない場合はデフォルト値を使用
  }

  try {
    // slugに該当するレコードを取得
    const { data: existingData, error: fetchError } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_slug', slug)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching likes:', fetchError)
      return c.json({ error: 'Failed to fetch likes' }, 500)
    }

    let newLikes: number

    if (!existingData) {
      // レコードが存在しない場合は新規作成
      const { data: insertData, error: insertError } = await supabase
        .from('post_likes')
        .insert({ post_slug: slug, likes_count: increment })
        .select('likes_count')
        .single()

      if (insertError) {
        console.error('Error inserting likes:', insertError)
        return c.json({ error: 'Failed to create likes' }, 500)
      }

      newLikes = insertData.likes_count
    } else {
      // レコードが存在する場合はインクリメント
      const { data: updateData, error: updateError } = await supabase
        .from('post_likes')
        .update({ likes_count: existingData.likes_count + increment })
        .eq('post_slug', slug)
        .select('likes_count')
        .single()

      if (updateError) {
        console.error('Error updating likes:', updateError)
        return c.json({ error: 'Failed to update likes' }, 500)
      }

      newLikes = updateData.likes_count
    }

    return c.json({ likes: newLikes })
  } catch (error) {
    console.error('Unexpected error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export const GET = handle(app)
export const POST = handle(app)
