import { getSiteEvents } from '../server/luma'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/events') {
      if (!env.LUMA_API_KEY) {
        return Response.json({ error: 'LUMA_API_KEY is not configured' }, { status: 500 })
      }

      try {
        const payload = await getSiteEvents(env.LUMA_API_KEY)
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

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
