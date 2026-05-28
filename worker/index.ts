function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

async function serveStaticEvents(request: Request, env: Env): Promise<Response | null> {
  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL('/events.json', request.url), request),
  )
  const contentType = assetResponse.headers.get('content-type') ?? ''

  if (!assetResponse.ok || !contentType.includes('json')) {
    return null
  }

  return new Response(assetResponse.body, {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=300',
    },
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = normalizePathname(new URL(request.url).pathname)

    if (pathname === '/api/events' || pathname === '/events.json') {
      const snapshot = await serveStaticEvents(request, env)
      if (snapshot) return snapshot

      return Response.json({ error: 'Events snapshot is not available' }, { status: 503 })
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
