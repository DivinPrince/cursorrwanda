<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_LOCATION, HACKATHON_TITLE } from '../config'
  import { FEATURED_GALLERY_PHOTOS } from '../gallery-data'
  import GalleryLightbox from './GalleryLightbox.svelte'

  let activeIndex = $state<number | null>(null)

  function openLightbox(index: number) {
    activeIndex = index
  }

  function closeLightbox() {
    activeIndex = null
  }

  function showPrevious() {
    if (activeIndex === null) return
    activeIndex = (activeIndex - 1 + FEATURED_GALLERY_PHOTOS.length) % FEATURED_GALLERY_PHOTOS.length
  }

  function showNext() {
    if (activeIndex === null) return
    activeIndex = (activeIndex + 1) % FEATURED_GALLERY_PHOTOS.length
  }
</script>

<section id="gallery" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Gallery</p>
      <h2>{HACKATHON_TITLE} highlights.</h2>
      <p class="section-intro">
        {HACKATHON_DATE_LABEL} · {HACKATHON_LOCATION}. Tap any photo to view it larger.
      </p>
    </div>

    <div class="feature-grid">
      {#each FEATURED_GALLERY_PHOTOS as photo, index}
        <button
          type="button"
          class="photo"
          class:wide={photo.width > photo.height}
          aria-label={`View photo ${index + 1}: ${photo.alt}`}
          onclick={() => openLightbox(index)}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        </button>
      {/each}
    </div>
  </div>
</section>

<GalleryLightbox
  photos={FEATURED_GALLERY_PHOTOS}
  {activeIndex}
  onClose={closeLightbox}
  onPrevious={showPrevious}
  onNext={showNext}
/>

<style>
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 0.875rem;
  }

  .photo {
    margin: 0;
    grid-column: span 4;
    grid-row: span 2;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--card);
    padding: 0;
    cursor: zoom-in;
    min-height: 180px;
  }

  .photo:nth-child(1) {
    grid-column: span 5;
    grid-row: span 3;
  }

  .photo:nth-child(2) {
    grid-column: span 7;
    grid-row: span 2;
  }

  .photo:nth-child(3) {
    grid-column: span 4;
    grid-row: span 2;
  }

  .photo:nth-child(4) {
    grid-column: span 3;
    grid-row: span 2;
  }

  .photo:nth-child(n + 5) {
    grid-column: span 3;
    grid-row: span 2;
  }

  .photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .photo:hover img,
  .photo:focus-visible img {
    transform: scale(1.04);
  }

  .photo:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    .feature-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .photo,
    .photo:nth-child(n) {
      grid-column: auto;
      grid-row: auto;
      aspect-ratio: 4 / 5;
      min-height: 0;
    }

    .photo.wide,
    .photo:nth-child(2) {
      aspect-ratio: 16 / 10;
      grid-column: span 2;
    }
  }

  @media (max-width: 540px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }

    .photo,
    .photo:nth-child(n),
    .photo.wide,
    .photo:nth-child(2) {
      grid-column: auto;
      aspect-ratio: 4 / 3;
    }
  }
</style>
