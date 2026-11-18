import { BASE_URL } from '@/lib/envs'

export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: ${BASE_URL}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  )
}
