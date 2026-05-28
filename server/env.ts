export function getLumaApiKey(): string | undefined {
  const key = process.env.LUMA_API_KEY
  return key && key.length > 0 ? key : undefined
}
