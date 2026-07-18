import type { PostSummary } from '../types'

export const createPostReadKey = (post: Pick<PostSummary, 'source' | 'href'>) =>
  `${post.source}:${post.href}`
