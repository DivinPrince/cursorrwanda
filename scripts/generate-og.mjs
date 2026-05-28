import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const width = 1200
const height = 630
const background = '#14120b'

const textOverlay = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${background}" stop-opacity="1" />
      <stop offset="62%" stop-color="${background}" stop-opacity="0.98" />
      <stop offset="78%" stop-color="${background}" stop-opacity="0.55" />
      <stop offset="100%" stop-color="${background}" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="accentGlow" cx="18%" cy="78%" r="28%">
      <stop offset="0%" stop-color="#f54e00" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#f54e00" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#accentGlow)" />
  <rect width="820" height="${height}" fill="url(#leftFade)" />
  <text x="72" y="118" fill="rgba(237,236,236,0.58)" font-family="system-ui, -apple-system, sans-serif" font-size="15" letter-spacing="3.2">CURSOR COMMUNITY · RWANDA</text>
  <text x="72" y="214" fill="#edecec" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="400">Where Rwanda</text>
  <text x="72" y="284" fill="#edecec" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="400">builds with AI.</text>
  <text x="72" y="352" fill="rgba(237,236,236,0.62)" font-family="system-ui, -apple-system, sans-serif" font-size="22">Meetups, workshops, and build nights in Kigali.</text>
  <rect x="72" y="548" width="72" height="2" fill="#f54e00" opacity="0.85" />
</svg>
`)

const hero = await sharp(resolve(root, 'public/kigali-convention-center-hero.png'))
  .resize({ width: 860, height: 574, fit: 'contain', background: { r: 20, g: 18, b: 11, alpha: 0 } })
  .png()
  .toBuffer()

const logo = await sharp(resolve(root, 'public/logos/LOCKUP_HORIZONTAL_2D_DARK.svg'))
  .resize({ width: 220 })
  .png()
  .toBuffer()

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 20, g: 18, b: 11, alpha: 1 },
  },
})
  .composite([
    { input: hero, left: 430, top: 28 },
    { input: textOverlay, left: 0, top: 0 },
    { input: logo, left: 72, top: 468 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, 'public/og.png'))

console.log('Generated public/og.png')
