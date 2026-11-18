'use client'

import { useEffect } from 'react'

type Article = { title: string; href: string; excerpt: string; tags: string[] }
type ModelContext = {
  registerTool: (
    tool: {
      name: string
      description: string
      inputSchema: object
      execute: (input: { query?: unknown }) => Promise<unknown>
    },
    options: { signal: AbortSignal }
  ) => Promise<void>
}

// Fetched on tool use so article data stays out of every page's HTML; repeat calls hit the HTTP cache.
const loadArticles = async (): Promise<Article[]> => {
  const response = await fetch('/articles.json')
  if (!response.ok) throw new Error('Failed to load articles')
  return response.json()
}

export default function AgentTools() {
  useEffect(() => {
    const context =
      (document as Document & { modelContext?: ModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: ModelContext }).modelContext
    if (!context) return
    const controller = new AbortController()
    // Registration failure must not interrupt the page in experimental browsers.
    void Promise.resolve()
      .then(() =>
        context.registerTool(
          {
            name: 'search_articles',
            description:
              "Search public articles on ura's notes by title, excerpt, or tag. Returns source URLs.",
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  maxLength: 200,
                  description: 'Search words; empty returns recent articles.'
                }
              },
              additionalProperties: false
            },
            execute: async ({ query = '' }) => {
              if (typeof query !== 'string' || query.length > 200) throw new Error('Invalid query')
              const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
              const results = (await loadArticles())
                .filter((article) => {
                  const text =
                    `${article.title} ${article.excerpt} ${article.tags.join(' ')}`.toLowerCase()
                  return words.every((word) => text.includes(word))
                })
                .slice(0, 20)
              return { content: [{ type: 'text', text: JSON.stringify(results) }] }
            }
          },
          { signal: controller.signal }
        )
      )
      .catch(() => {})
    return () => controller.abort()
  }, [])
  return null
}
