import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const width = 1128
const height = 191
const background = '#14120b'
const leftGap = 232
const logoWidth = 108
const logoTop = 24

const textOverlay = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${background}" stop-opacity="1" />
      <stop offset="58%" stop-color="${background}" stop-opacity="0.98" />
      <stop offset="72%" stop-color="${background}" stop-opacity="0.5" />
      <stop offset="100%" stop-color="${background}" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="accentGlow" cx="12%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#f54e00" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#f54e00" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#accentGlow)" />
  <rect width="820" height="${height}" fill="url(#leftFade)" />
  <line x1="${leftGap + logoWidth + 10}" y1="${logoTop + 4}" x2="${leftGap + logoWidth + 10}" y2="${logoTop + 22}" stroke="rgba(237,236,236,0.14)" stroke-width="1" />
  <text x="${leftGap + logoWidth + 20}" y="${logoTop + 18}" fill="rgba(237,236,236,0.6)" font-family="system-ui, -apple-system, sans-serif" font-size="13">Rwanda</text>
  <text x="${leftGap}" y="98" fill="#edecec" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="400">Where Rwanda builds with AI.</text>
  <text x="${leftGap}" y="126" fill="rgba(237,236,236,0.62)" font-family="system-ui, -apple-system, sans-serif" font-size="14">Meetups, workshops, and build nights in Kigali.</text>
  <rect x="${leftGap}" y="140" width="48" height="2" fill="#f54e00" opacity="0.85" />
</svg>
`)

const hero = await sharp(resolve(root, 'public/kigali-convention-center-hero.png'))
  .resize({ width: 420, height: 191, fit: 'cover', position: 'right' })
  .png()
  .toBuffer()

const logo = await sharp(resolve(root, 'public/logos/LOCKUP_HORIZONTAL_2D_DARK.svg'))
  .resize({ width: logoWidth })
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
    { input: hero, left: width - 420, top: 0 },
    { input: textOverlay, left: 0, top: 0 },
    { input: logo, left: leftGap, top: logoTop },
  ])
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, 'public/banner-1128x191.png'))

console.log('Generated public/banner-1128x191.png (1128x191)')
