import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { writeFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getSiteEvents } from '../server/luma'

function attachEventsHandler(
  server: ViteDevServer | PreviewServer,
  apiKey: string | undefined,
) {
  server.middlewares.use('/api/events', async (_req, res) => {
    res.setHeader('content-type', 'application/json')

    if (!apiKey) {
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'LUMA_API_KEY is not configured' }))
      return
    }

    try {
      const payload = await getSiteEvents(apiKey)
      res.statusCode = 200
      res.end(JSON.stringify(payload))
    } catch (error) {
      res.statusCode = 502
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Failed to fetch Luma events',
        }),
      )
    }
  })
}

export function lumaApiPlugin(): Plugin {
  let apiKey: string | undefined

  return {
    name: 'luma-api',
    config() {
      apiKey = process.env.LUMA_API_KEY
    },
    configureServer(server) {
      attachEventsHandler(server, apiKey)
    },
    configurePreviewServer(server) {
      attachEventsHandler(server, apiKey)
    },
    async buildStart() {
      if (!apiKey) {
        this.warn('LUMA_API_KEY is not set — events.json will not be generated at build time.')
        return
      }

      try {
        const payload = await getSiteEvents(apiKey)
        const json = JSON.stringify(payload, null, 2)
        writeFileSync(resolve(process.cwd(), 'public/events.json'), json)
      } catch (error) {
        this.warn(
          `Could not prefetch Luma events: ${error instanceof Error ? error.message : error}`,
        )
      }
    },
    writeBundle() {
      if (!apiKey) return

      try {
        const publicPath = resolve(process.cwd(), 'public/events.json')
        const distPath = resolve(process.cwd(), 'dist/events.json')
        writeFileSync(distPath, readFileSync(publicPath, 'utf8'))
      } catch {
        // buildStart already warned if prefetch failed.
      }
    },
  }
}
