import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { prefersMarkdown } from '@/lib/agent-discovery'

export function proxy(request: NextRequest) {
  if (prefersMarkdown(request.headers.get('accept') ?? '')) {
    const destination = request.nextUrl.clone()
    destination.pathname = `/agent-markdown${request.nextUrl.pathname === '/' ? '/index' : request.nextUrl.pathname}`
    destination.search = ''
    const response = NextResponse.rewrite(destination)
    response.headers.set('Vary', 'Accept')
    return response
  }
  const response = NextResponse.next()
  response.headers.set('Vary', 'Accept')
  return response
}

export const config = { matcher: ['/', '/posts', '/posts/:slug'] }
