import type { SiteEventsPayload } from '../../server/luma'

export type { SiteEvent, SiteEventsPayload } from '../../server/luma'

type EventsApiError = { error: string }

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

async function parseEventsResponse(response: Response): Promise<SiteEventsPayload | EventsApiError | null> {
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) return null

  try {
    const data: unknown = await response.json()
    if (isEventsPayload(data)) return data
    if (
      typeof data === 'object' &&
      data !== null &&
      'error' in data &&
      typeof (data as EventsApiError).error === 'string'
    ) {
      return data as EventsApiError
    }
  } catch {
    return null
  }

  return null
}

export async function loadEvents(): Promise<SiteEventsPayload> {
  let apiError: string | null = null

  try {
    const response = await fetch('/api/events')
    const payload = await parseEventsResponse(response)

    if (payload && isEventsPayload(payload)) return payload
    if (payload && 'error' in payload) apiError = payload.error
  } catch {
    // Try static snapshot below.
  }

  try {
    const fallback = await fetch('/events.json')
    const payload = await parseEventsResponse(fallback)
    if (payload && isEventsPayload(payload)) return payload
  } catch {
    // Fall through to error below.
  }

  throw new Error(apiError ?? 'Could not load events')
}
