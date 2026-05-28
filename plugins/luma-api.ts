import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getLumaApiKey } from '../server/env'
import { getSiteEvents } from '../server/luma'

const EMPTY_EVENTS = {
  upcoming: [],
  past: [],
  fetchedAt: new Date(0).toISOString(),
}

function attachEventsHandler(
  server: ViteDevServer | PreviewServer,
  apiKey: string | undefined,
) {
  server.middlewares.use('/api/events', async (_req, res) => {
    res.setHeader('content-type', 'application/json')

    if (!apiKey) {
      const snapshotPath = resolve(process.cwd(), 'public/events.json')
      if (existsSync(snapshotPath)) {
        res.statusCode = 200
        res.end(readFileSync(snapshotPath, 'utf8'))
        return
      }

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
  return {
    name: 'luma-api',
    configureServer(server) {
      attachEventsHandler(server, getLumaApiKey())
    },
    configurePreviewServer(server) {
      attachEventsHandler(server, getLumaApiKey())
    },
    async buildStart() {
      const outputPath = resolve(process.cwd(), 'public/events.json')
      const apiKey = getLumaApiKey()

      if (!apiKey) {
        this.warn(
          'LUMA_API_KEY is not set — using the committed public/events.json snapshot for this build.',
        )
        if (!existsSync(outputPath)) {
          writeFileSync(outputPath, JSON.stringify(EMPTY_EVENTS, null, 2))
        }
        return
      }

      try {
        const payload = await getSiteEvents(apiKey)
        writeFileSync(outputPath, JSON.stringify(payload, null, 2))
      } catch (error) {
        this.warn(
          `Could not prefetch Luma events: ${error instanceof Error ? error.message : error}`,
        )
      }
    },
  }
}
