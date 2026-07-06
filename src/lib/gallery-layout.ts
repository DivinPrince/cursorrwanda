import type { GalleryPhoto } from './gallery-data'

export type MasonryTile = GalleryPhoto & {
  /** Position in the original list (for lightbox navigation). */
  index: number
  /** Aspect ratio (width / height). */
  ratio: number
}

/**
 * Pixieset-style masonry: a fixed number of equal-width columns where each
 * photo is dropped into the currently shortest column, preserving aspect
 * ratio. Balances column heights with no cropping and no wasted space.
 */
export function buildMasonryColumns(
  photos: readonly GalleryPhoto[],
  columnCount: number,
): MasonryTile[][] {
  const columns: MasonryTile[][] = Array.from({ length: columnCount }, () => [])
  const heights = new Array(columnCount).fill(0)

  photos.forEach((photo, index) => {
    const ratio = (photo.width || 3) / (photo.height || 2)

    // Find the shortest column.
    let target = 0
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[target]) target = i
    }

    columns[target].push({ ...photo, index, ratio })
    // At unit column width, a tile's height is 1 / ratio.
    heights[target] += 1 / ratio
  })

  return columns
}

/** Column count based on the available width (container is capped at 1200px). */
export function columnCountFor(containerWidth: number): number {
  if (containerWidth < 520) return 2
  if (containerWidth < 900) return 3
  if (containerWidth < 1400) return 4
  return 5
}

const SIZE_TOKEN = /-(?:thumb|small|medium|large|xlarge|xxlarge)\.jpg(\?.*)?$/i

/**
 * Swap a Pixieset image URL to a different size variant. Grid tiles use a
 * lighter size than the full-resolution src kept for the lightbox/download.
 */
export function pixiesetSize(
  src: string,
  size: 'thumb' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge',
): string {
  return src.replace(SIZE_TOKEN, `-${size}.jpg$1`)
}
