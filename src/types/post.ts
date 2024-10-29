export type BasePost = {
  slug: string
  content: string
  title: string
  date: string
  tags: string[]
}

export type Article = BasePost & {
  type: 'article'
}

export type Scrap = BasePost & {
  type: 'scrap'
}

export type Post = Article | Scrap
