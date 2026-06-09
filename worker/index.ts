import { getSiteEvents } from '../server/luma'
import { handleSponsorInquiryRequest } from './sponsor-inquiry'

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

const EVENTS_CACHE_HEADERS = {
  'content-type': 'application/json',
  'cache-control': 'public, max-age=300',
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
    headers: EVENTS_CACHE_HEADERS,
  })
}

async function serveLiveEvents(env: Env): Promise<Response | null> {
  if (!env.LUMA_API_KEY) return null

  try {
    const payload = await getSiteEvents(env.LUMA_API_KEY)
    return Response.json(payload, { headers: EVENTS_CACHE_HEADERS })
  } catch {
    return null
  }
}

async function serveEvents(request: Request, env: Env): Promise<Response> {
  const live = await serveLiveEvents(env)
  if (live) return live

  const snapshot = await serveStaticEvents(request, env)
  if (snapshot) return snapshot

  return Response.json({ error: 'Events snapshot is not available' }, { status: 503 })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = normalizePathname(new URL(request.url).pathname)

    if (pathname === '/api/events' || pathname === '/events.json') {
      return serveEvents(request, env)
    }

    if (pathname === '/api/sponsor-inquiry') {
      return handleSponsorInquiryRequest(request, env)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
