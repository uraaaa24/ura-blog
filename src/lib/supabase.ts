import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase server env vars (SUPABASE_URL, SUPABASE_*_KEY).')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export type PostLikeRecord = {
  id: number
  post_slug: string
  likes_count: number
  created_at: string
  updated_at: string
}
