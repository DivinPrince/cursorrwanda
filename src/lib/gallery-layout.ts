import type { GalleryPhoto } from './gallery-data'

export type MosaicSize = 'feature' | 'wide' | 'tall' | 'standard'

export type MosaicPhoto = GalleryPhoto & {
  mosaic: MosaicSize
  rowSpan: number
  aspectRatio: number
}

const ROW_UNIT_PX = 42

const FEATURE_INDICES = new Set([0, 8, 17, 27, 38])

export function buildMosaicLayout(photos: readonly GalleryPhoto[]): MosaicPhoto[] {
  return photos.map((photo, index) => {
    const ratio = photo.width / photo.height
    const mosaic = pickMosaicSize(ratio, index)
    const rowSpan = rowSpanFor(mosaic, ratio)
    return { ...photo, mosaic, rowSpan, aspectRatio: ratio }
  })
}

function pickMosaicSize(ratio: number, index: number): MosaicSize {
  if (FEATURE_INDICES.has(index)) return 'feature'
  if (ratio >= 1.4) return 'wide'
  if (ratio <= 0.78) return 'tall'
  if (ratio >= 1.15 && index % 4 === 2) return 'wide'
  if (ratio <= 0.92 && index % 5 === 3) return 'tall'
  return 'standard'
}

function rowSpanFor(size: MosaicSize, ratio: number): number {
  switch (size) {
    case 'feature':
      return Math.max(8, Math.round(9 / ratio))
    case 'wide':
      return Math.max(4, Math.round(4.5 / ratio))
    case 'tall':
      return Math.max(7, Math.round(8 * (1 / ratio) * 0.5))
    case 'standard':
      return Math.max(4, Math.round(5 / ratio))
    default: {
      const _exhaustive: never = size
      return _exhaustive
    }
  }
}

export const MOSAIC_ROW_UNIT = `${ROW_UNIT_PX}px`
