import type { SiteEventsPayload } from '../../server/luma'

export type { SiteEvent, SiteEventsPayload } from '../../server/luma'

export async function loadEvents(): Promise<SiteEventsPayload> {
  try {
    const response = await fetch('/api/events')
    if (response.ok) {
      return (await response.json()) as SiteEventsPayload
    }
  } catch {
    // Fall back to build-time snapshot on static hosts.
  }

  const fallback = await fetch('/events.json')
  if (!fallback.ok) {
    throw new Error('Could not load events')
  }

  return (await fallback.json()) as SiteEventsPayload
}
