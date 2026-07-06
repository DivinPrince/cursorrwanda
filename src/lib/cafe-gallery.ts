import type { GalleryPhoto } from './gallery-data'

export const CAFE_DATE_LABEL = 'Tuesday, 17 March 2026'
export const CAFE_TITLE = 'Cafe Cursor Kigali'
export const CAFE_LOCATION = 'Rubia Coffee Roasters, Kigali'

export const CAFE_GALLERY_PHOTOS = [
  {
    src: '/gallery/38129.jpg',
    alt: 'Community meetup at Cafe Cursor Kigali',
    width: 1200,
    height: 1600,
    layout: 'portrait-main',
  },
  {
    src: '/gallery/38133.jpg',
    alt: 'Developers collaborating at Cafe Cursor Kigali',
    width: 1600,
    height: 1200,
    layout: 'landscape-top',
  },
  {
    src: '/gallery/38135.jpg',
    alt: 'Conversation and coffee at the Cursor community cafe',
    width: 1200,
    height: 1600,
    layout: 'portrait-side',
  },
  {
    src: '/gallery/38319.jpg',
    alt: 'Group photo from Cafe Cursor Kigali',
    width: 1600,
    height: 1200,
    layout: 'landscape-bottom',
  },
] as const satisfies readonly (GalleryPhoto & { layout: string })[]
