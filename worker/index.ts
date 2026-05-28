import { getSiteEvents } from '../server/luma'

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

async function eventsResponse(apiKey: string | undefined): Promise<Response> {
  if (!apiKey) {
    return Response.json({ error: 'LUMA_API_KEY is not configured' }, { status: 500 })
  }

  try {
    const payload = await getSiteEvents(apiKey)
    return Response.json(payload, {
      headers: {
        'cache-control': 'public, max-age=300',
      },
    })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch Luma events',
      },
      { status: 502 },
    )
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = normalizePathname(new URL(request.url).pathname)

    if (pathname === '/api/events' || pathname === '/events.json') {
      return eventsResponse(env.LUMA_API_KEY)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
