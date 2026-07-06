import type { GalleryPhoto } from './gallery-data'

export type MosaicSize = 'feature' | 'wide' | 'tall' | 'standard'

export type MosaicPhoto = GalleryPhoto & {
  mosaic: MosaicSize
  rowSpan: number
}

const ROW_UNIT_PX = 48

export function buildMosaicLayout(photos: readonly GalleryPhoto[]): MosaicPhoto[] {
  return photos.map((photo, index) => {
    const ratio = photo.width / photo.height
    const mosaic = pickMosaicSize(ratio, index)
    const rowSpan = rowSpanFor(mosaic, ratio)
    return { ...photo, mosaic, rowSpan }
  })
}

function pickMosaicSize(ratio: number, index: number): MosaicSize {
  if (index % 9 === 0) return 'feature'
  if (ratio >= 1.35) return 'wide'
  if (ratio <= 0.82) return 'tall'
  return 'standard'
}

function rowSpanFor(size: MosaicSize, ratio: number): number {
  switch (size) {
    case 'feature':
      return Math.max(7, Math.round(8 / ratio))
    case 'wide':
      return Math.max(4, Math.round(5 / ratio))
    case 'tall':
      return Math.max(6, Math.round(7 * (1 / ratio) * 0.55))
    case 'standard':
      return Math.max(5, Math.round(6 / ratio))
    default: {
      const _exhaustive: never = size
      return _exhaustive
    }
  }
}

export const MOSAIC_ROW_UNIT = `${ROW_UNIT_PX}px`
