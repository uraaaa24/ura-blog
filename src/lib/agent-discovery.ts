import { BASE_URL } from './envs'

export const discoveryLinks = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</docs/api.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/ai-catalog.json>; rel="describedby"; type="application/json"'
].join(', ')

// Explicit Markdown preference only; wildcards continue to receive HTML.
export function prefersMarkdown(accept: string): boolean {
  const ranges = accept
    .toLowerCase()
    .split(',')
    .map((range) => {
      const [type, ...parameters] = range.trim().split(';')
      const quality = parameters.find((parameter) => parameter.trim().startsWith('q='))
      const q = quality ? Number(quality.trim().slice(2)) : 1
      return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 }
    })
  const markdown = ranges.find(({ type }) => type === 'text/markdown')?.q ?? 0
  const html = ranges.find(({ type }) => type === 'text/html')?.q ?? 0
  return markdown > 0 && markdown >= html
}

export const apiCatalog = {
  linkset: [
    {
      anchor: BASE_URL,
      'service-desc': [
        { href: `${BASE_URL}/openapi.json`, type: 'application/vnd.oai.openapi+json' }
      ],
      'service-doc': [{ href: `${BASE_URL}/docs/api.md`, type: 'text/markdown' }]
    }
  ]
}
