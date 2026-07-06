import {
  getSiteEvents,
  isEventsPayloadEmpty,
  normalizeLumaApiKey,
  type SiteEventsPayload,
} from '../server/luma'

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

function isEventsPayload(value: unknown): value is SiteEventsPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'upcoming' in value &&
    'past' in value &&
    Array.isArray((value as SiteEventsPayload).upcoming) &&
    Array.isArray((value as SiteEventsPayload).past)
  )
}

async function readStaticEventsSnapshot(
  request: Request,
  env: Env,
): Promise<SiteEventsPayload | null> {
  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL('/events.json', request.url), request),
  )
  const contentType = assetResponse.headers.get('content-type') ?? ''

  if (!assetResponse.ok || !contentType.includes('json')) {
    return null
  }

  try {
    const payload: unknown = await assetResponse.json()
    if (isEventsPayload(payload)) return payload
  } catch {
    return null
  }

  return null
}

function jsonEventsResponse(payload: SiteEventsPayload): Response {
  return Response.json(payload, { headers: EVENTS_CACHE_HEADERS })
}

// Hosts we're willing to proxy downloads from (prevents open-proxy / SSRF).
const DOWNLOAD_ALLOWED_HOSTS = new Set(['images.pixieset.com'])

/**
 * Force-download a remote gallery image. The Pixieset CDN sends no CORS
 * headers and serves images inline, so the browser can't download them
 * client-side. Re-serve the bytes from our own origin with an attachment
 * disposition so the anchor's download actually saves a file.
 */
async function serveDownload(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const src = url.searchParams.get('src')
  if (!src) return new Response('Missing src', { status: 400 })

  let target: URL
  try {
    target = new URL(src)
  } catch {
    return new Response('Invalid src', { status: 400 })
  }

  if (target.protocol !== 'https:' || !DOWNLOAD_ALLOWED_HOSTS.has(target.hostname)) {
    return new Response('Forbidden source', { status: 403 })
  }

  const upstream = await fetch(target.toString(), {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' },
  })
  if (!upstream.ok || !upstream.body) {
    return new Response('Upstream fetch failed', { status: 502 })
  }

  const rawName = url.searchParams.get('name') ?? 'photo.jpg'
  const safeName = rawName.replace(/[^\w.-]+/g, '-').slice(0, 120) || 'photo.jpg'

  const headers = new Headers()
  headers.set('content-type', upstream.headers.get('content-type') ?? 'application/octet-stream')
  const contentLength = upstream.headers.get('content-length')
  if (contentLength) headers.set('content-length', contentLength)
  headers.set('content-disposition', `attachment; filename="${safeName}"`)
  headers.set('cache-control', 'public, max-age=31536000, immutable')

  return new Response(upstream.body, { status: 200, headers })
}

async function serveEvents(request: Request, env: Env): Promise<Response> {
  const snapshot = await readStaticEventsSnapshot(request, env)
  const apiKey = normalizeLumaApiKey(env.LUMA_API_KEY)

  if (apiKey) {
    try {
      const live = await getSiteEvents(apiKey)
      if (!isEventsPayloadEmpty(live)) {
        return jsonEventsResponse(live)
      }

      console.warn('Luma API returned no events; using committed events.json snapshot.')
    } catch (error) {
      console.error(
        'Luma API fetch failed; using committed events.json snapshot.',
        error instanceof Error ? error.message : error,
      )
    }
  }

  if (snapshot) return jsonEventsResponse(snapshot)

  return Response.json({ error: 'Events snapshot is not available' }, { status: 503 })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = normalizePathname(new URL(request.url).pathname)

    if (pathname === '/api/events' || pathname === '/events.json') {
      return serveEvents(request, env)
    }

    if (pathname === '/api/download') {
      return serveDownload(request)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
