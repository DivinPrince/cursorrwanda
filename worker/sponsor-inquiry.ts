import { SPONSOR_INQUIRY_EMAIL, SPONSOR_INQUIRY_FROM, SPONSOR_INQUIRY_RECIPIENTS } from './email-config'

export type SponsorInquiryPayload = {
  name: string
  organization: string
  email: string
  tier: string
  contributionType: string
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSponsorInquiry(body: unknown): SponsorInquiryPayload | null {
  if (!body || typeof body !== 'object') return null

  const record = body as Record<string, unknown>
  const name = typeof record.name === 'string' ? record.name.trim() : ''
  const organization = typeof record.organization === 'string' ? record.organization.trim() : ''
  const email = typeof record.email === 'string' ? record.email.trim() : ''
  const tier = typeof record.tier === 'string' ? record.tier.trim() : ''
  const contributionType =
    typeof record.contributionType === 'string' ? record.contributionType.trim() : ''
  const message = typeof record.message === 'string' ? record.message.trim() : ''

  if (!name || !organization || !email || !tier || !contributionType || !message) {
    return null
  }

  if (!EMAIL_PATTERN.test(email) || name.length > 120 || organization.length > 160) {
    return null
  }

  if (message.length > 4000) {
    return null
  }

  return { name, organization, email, tier, contributionType, message }
}

export function formatSponsorInquiryEmail(payload: SponsorInquiryPayload): {
  subject: string
  text: string
  html: string
} {
  const subject = `Cursor Kigali Hackathon sponsorship inquiry — ${payload.organization}`

  const text = [
    'New sponsorship inquiry for the Cursor Kigali Hackathon',
    '',
    `Name: ${payload.name}`,
    `Organization: ${payload.organization}`,
    `Email: ${payload.email}`,
    `Preferred level: ${payload.tier}`,
    `Support type: ${payload.contributionType}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const html = [
    '<p>New sponsorship inquiry for the Cursor Kigali Hackathon</p>',
    '<ul>',
    `<li><strong>Name:</strong> ${escapeHtml(payload.name)}</li>`,
    `<li><strong>Organization:</strong> ${escapeHtml(payload.organization)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>`,
    `<li><strong>Preferred level:</strong> ${escapeHtml(payload.tier)}</li>`,
    `<li><strong>Support type:</strong> ${escapeHtml(payload.contributionType)}</li>`,
    '</ul>',
    '<p><strong>Message:</strong></p>',
    `<p>${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p>`,
  ].join('')

  return { subject, text, html }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function sendSponsorInquiryEmail(
  payload: SponsorInquiryPayload,
  env: Pick<Env, 'EMAIL'>,
): Promise<boolean> {
  if (!env.EMAIL) {
    return false
  }

  const { subject, text, html } = formatSponsorInquiryEmail(payload)

  try {
    await env.EMAIL.send({
      to: [...SPONSOR_INQUIRY_RECIPIENTS],
      from: SPONSOR_INQUIRY_FROM,
      replyTo: { email: payload.email, name: payload.name },
      subject,
      text,
      html,
    })
    return true
  } catch {
    return false
  }
}

export async function handleSponsorInquiryRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const payload = validateSponsorInquiry(body)
  if (!payload) {
    return Response.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  const sent = await sendSponsorInquiryEmail(payload, env)
  if (!sent) {
    return Response.json(
      {
        error: `Sponsorship requests are not configured yet. Please email ${SPONSOR_INQUIRY_EMAIL} directly.`,
      },
      { status: 503 },
    )
  }

  return Response.json({ ok: true })
}
