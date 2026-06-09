export const LUMA_CALENDAR_URL = 'https://luma.com/cursor-kigali-rwanda'
export const LUMA_CALENDAR_ID = 'cal-94zoOAtNpqPIIHm'
export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/E9Am2vHdrLj77WLj8FsNV1'

export const HACKATHON_SLUG = 'cursor-kigali-hackathon-2026-06-27'
export const HACKATHON_PATH = `/${HACKATHON_SLUG}`
export const HACKATHON_DATE_ISO = '2026-06-27'
export const HACKATHON_DATE_LABEL = 'Saturday, 27 June 2026'
export const HACKATHON_LOCATION = 'Kigali, Rwanda'
export const HACKATHON_TITLE = 'Cursor Kigali Hackathon'
export const HACKATHON_PARTNERSHIP_PDF = '/documents/cursor-kigali-hackathon-partnership-opportunities.pdf'
export const SPONSOR_INQUIRY_EMAIL = 'partnerships@cursorrwanda.com'
export const SPONSOR_INQUIRY_RECIPIENTS = [
  'partnerships@cursorrwanda.com',
  'divin@cursorrwanda.com',
] as const
export const SPONSOR_INQUIRY_FROM = {
  email: 'noreply@cursorrwanda.com',
  name: 'Cursor Community Rwanda',
} as const
export const SITE_ORIGIN = 'https://cursorrwanda.com'

export function hackathonUrl(origin = SITE_ORIGIN): string {
  return `${origin}${HACKATHON_PATH}`
}
