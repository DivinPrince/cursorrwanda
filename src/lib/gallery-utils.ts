import type { GalleryPhoto } from './gallery-data'

function extensionFromSrc(src: string): string {
  const match = src.match(/\.(jpe?g|png|webp|gif|avif)(?:[?#]|$)/i)
  const ext = (match?.[1] ?? 'jpg').toLowerCase()
  return ext === 'jpeg' ? 'jpg' : ext
}

function filenameFromPhoto(photo: GalleryPhoto): string {
  const slug = photo.alt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${slug || 'photo'}.${extensionFromSrc(photo.src)}`
}

function triggerDownload(href: string, filename: string): void {
  const anchor = document.createElement('a')
  anchor.href = href
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export async function downloadGalleryPhoto(photo: GalleryPhoto): Promise<void> {
  const filename = filenameFromPhoto(photo)
  const resolved = new URL(photo.src, window.location.href)

  // Same-origin assets (e.g. the Cafe gallery) download directly.
  if (resolved.origin === window.location.origin) {
    triggerDownload(resolved.href, filename)
    return
  }

  // Cross-origin CDN images (Pixieset) send no CORS headers and serve inline,
  // so the download attribute is ignored and they open in a new tab. Route
  // them through our worker proxy, which re-serves with Content-Disposition.
  const proxied = `/api/download?src=${encodeURIComponent(photo.src)}&name=${encodeURIComponent(
    filename,
  )}`
  triggerDownload(proxied, filename)
}
