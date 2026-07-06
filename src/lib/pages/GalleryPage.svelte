<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_LOCATION, HACKATHON_TITLE } from '../config'
  import { HACKATHON_GALLERY_PHOTOS } from '../gallery-data'
  import GalleryGrid from '../components/GalleryGrid.svelte'
  import GalleryLightbox from '../components/GalleryLightbox.svelte'

  let activeIndex = $state<number | null>(null)

  function openLightbox(index: number) {
    activeIndex = index
  }

  function closeLightbox() {
    activeIndex = null
  }

  function showPrevious() {
    if (activeIndex === null) return
    activeIndex = (activeIndex - 1 + HACKATHON_GALLERY_PHOTOS.length) % HACKATHON_GALLERY_PHOTOS.length
  }

  function showNext() {
    if (activeIndex === null) return
    activeIndex = (activeIndex + 1) % HACKATHON_GALLERY_PHOTOS.length
  }
</script>

<svelte:head>
  <title>{HACKATHON_TITLE} Gallery · Cursor Community Rwanda</title>
  <meta
    name="description"
    content="Photos from the Cursor Kigali Hackathon on {HACKATHON_DATE_LABEL} at {HACKATHON_LOCATION}."
  />
</svelte:head>

<section class="gallery-page section">
  <div class="container">
    <div class="page-header">
      <a href="/" class="back-link">← Back to home</a>
      <p class="section-label">Gallery</p>
      <h1>{HACKATHON_TITLE}</h1>
      <p class="section-intro">
        {HACKATHON_DATE_LABEL} · {HACKATHON_LOCATION}. {HACKATHON_GALLERY_PHOTOS.length} photos from
        the hackathon.
      </p>
    </div>

    <GalleryGrid photos={HACKATHON_GALLERY_PHOTOS} onPhotoClick={openLightbox} />
  </div>
</section>

<GalleryLightbox
  photos={HACKATHON_GALLERY_PHOTOS}
  {activeIndex}
  onClose={closeLightbox}
  onPrevious={showPrevious}
  onNext={showNext}
/>

<style>
  .gallery-page {
    padding-top: clamp(2rem, 5vw, 3rem);
  }

  .page-header {
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }

  .back-link {
    display: inline-flex;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
    color: var(--fg-secondary);
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--fg);
  }

  h1 {
    margin-top: 0.25rem;
  }

  .section-intro {
    margin-top: 1rem;
  }
</style>
