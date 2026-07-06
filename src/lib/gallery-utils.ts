import type { GalleryPhoto } from './gallery-data'

function filenameFromPhoto(photo: GalleryPhoto): string {
  try {
    const pathname = new URL(photo.src).pathname
    const basename = pathname.split('/').pop()
    if (basename) return basename
  } catch {
    // fall through to alt-based name
  }

  const slug = photo.alt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${slug || 'photo'}.jpg`
}

export async function downloadGalleryPhoto(photo: GalleryPhoto): Promise<void> {
  const filename = filenameFromPhoto(photo)

  try {
    const response = await fetch(photo.src)
    if (!response.ok) throw new Error(`Download failed (${response.status})`)

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = objectUrl
    anchor.download = filename
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    const anchor = document.createElement('a')
    anchor.href = photo.src
    anchor.download = filename
    anchor.target = '_blank'
    anchor.rel = 'noopener noreferrer'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }
}
