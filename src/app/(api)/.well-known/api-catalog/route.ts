import { apiCatalog } from '@/lib/agent-discovery'

export function GET() {
  return Response.json(apiCatalog, { headers: { 'Content-Type': 'application/linkset+json' } })
}
