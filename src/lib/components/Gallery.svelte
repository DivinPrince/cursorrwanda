<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_LOCATION, HACKATHON_TITLE } from '../config'
  import { CAFE_DATE_LABEL, CAFE_GALLERY_PHOTOS, CAFE_LOCATION, CAFE_TITLE } from '../cafe-gallery'
  import { FEATURED_HACKATHON_PHOTOS } from '../gallery-data'
  import GalleryLightbox from './GalleryLightbox.svelte'

  let cafeActiveIndex = $state<number | null>(null)
  let hackathonActiveIndex = $state<number | null>(null)

  function openCafeLightbox(index: number) {
    cafeActiveIndex = index
  }

  function closeCafeLightbox() {
    cafeActiveIndex = null
  }

  function showCafePrevious() {
    if (cafeActiveIndex === null) return
    cafeActiveIndex = (cafeActiveIndex - 1 + CAFE_GALLERY_PHOTOS.length) % CAFE_GALLERY_PHOTOS.length
  }

  function showCafeNext() {
    if (cafeActiveIndex === null) return
    cafeActiveIndex = (cafeActiveIndex + 1) % CAFE_GALLERY_PHOTOS.length
  }

  function openHackathonLightbox(index: number) {
    hackathonActiveIndex = index
  }

  function closeHackathonLightbox() {
    hackathonActiveIndex = null
  }

  function showHackathonPrevious() {
    if (hackathonActiveIndex === null) return
    hackathonActiveIndex =
      (hackathonActiveIndex - 1 + FEATURED_HACKATHON_PHOTOS.length) % FEATURED_HACKATHON_PHOTOS.length
  }

  function showHackathonNext() {
    if (hackathonActiveIndex === null) return
    hackathonActiveIndex = (hackathonActiveIndex + 1) % FEATURED_HACKATHON_PHOTOS.length
  }
</script>

<section id="gallery" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Gallery</p>
      <h2>Moments from the community.</h2>
      <p class="section-intro">
        Photos from meetups, workshops, and build nights across Kigali.
      </p>
    </div>

    <div class="event-block">
      <div class="event-heading">
        <h3>{CAFE_TITLE}</h3>
        <p>{CAFE_DATE_LABEL} · {CAFE_LOCATION}</p>
      </div>

      <div class="bento">
        {#each CAFE_GALLERY_PHOTOS as photo, index}
          <button
            type="button"
            class="photo {photo.layout}"
            aria-label={`View photo ${index + 1}: ${photo.alt}`}
            onclick={() => openCafeLightbox(index)}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </button>
        {/each}
      </div>
    </div>

    <div class="event-block hackathon-block">
      <div class="event-heading">
        <h3>{HACKATHON_TITLE}</h3>
        <p>{HACKATHON_DATE_LABEL} · {HACKATHON_LOCATION}</p>
      </div>

      <div class="hackathon-grid">
        {#each FEATURED_HACKATHON_PHOTOS as photo, index}
          <button
            type="button"
            class="hackathon-photo"
            class:wide={photo.width > photo.height}
            aria-label={`View hackathon photo ${index + 1}: ${photo.alt}`}
            onclick={() => openHackathonLightbox(index)}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<GalleryLightbox
  photos={CAFE_GALLERY_PHOTOS}
  activeIndex={cafeActiveIndex}
  onClose={closeCafeLightbox}
  onPrevious={showCafePrevious}
  onNext={showCafeNext}
/>

<GalleryLightbox
  photos={FEATURED_HACKATHON_PHOTOS}
  activeIndex={hackathonActiveIndex}
  onClose={closeHackathonLightbox}
  onPrevious={showHackathonPrevious}
  onNext={showHackathonNext}
/>

<style>
  .event-block + .event-block {
    margin-top: clamp(2.5rem, 5vw, 3.5rem);
  }

  .event-heading {
    margin-bottom: 1.25rem;
  }

  .event-heading h3 {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 0.35rem;
  }

  .event-heading p {
    font-size: 0.875rem;
    color: var(--fg-secondary);
    margin: 0;
  }

  .bento {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: repeat(12, minmax(0, 1fr));
    gap: 0.875rem;
    height: clamp(420px, 52vw, 560px);
  }

  .photo {
    margin: 0;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--card);
    padding: 0;
    cursor: zoom-in;
  }

  .portrait-main {
    grid-column: 1 / 6;
    grid-row: 1 / 13;
  }

  .landscape-top {
    grid-column: 6 / 13;
    grid-row: 1 / 6;
  }

  .portrait-side {
    grid-column: 6 / 9;
    grid-row: 6 / 13;
  }

  .landscape-bottom {
    grid-column: 9 / 13;
    grid-row: 6 / 13;
  }

  .photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .portrait-main img {
    object-position: center 20%;
  }

  .portrait-side img {
    object-position: center top;
  }

  .photo:hover img,
  .photo:focus-visible img {
    transform: scale(1.04);
  }

  .photo:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .hackathon-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.875rem;
  }

  .hackathon-photo {
    margin: 0;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--card);
    padding: 0;
    cursor: zoom-in;
  }

  .hackathon-photo.wide {
    aspect-ratio: 16 / 10;
  }

  .hackathon-photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .hackathon-photo:hover img,
  .hackathon-photo:focus-visible img {
    transform: scale(1.04);
  }

  .hackathon-photo:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    .bento {
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-template-rows: repeat(10, minmax(0, 1fr));
      height: clamp(520px, 120vw, 680px);
      gap: 0.75rem;
    }

    .portrait-main {
      grid-column: 1 / 4;
      grid-row: 1 / 7;
    }

    .landscape-top {
      grid-column: 4 / 7;
      grid-row: 1 / 4;
    }

    .portrait-side {
      grid-column: 4 / 7;
      grid-row: 4 / 7;
    }

    .landscape-bottom {
      grid-column: 1 / 7;
      grid-row: 7 / 11;
    }

    .hackathon-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 540px) {
    .bento {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      height: auto;
    }

    .portrait-main,
    .landscape-top,
    .portrait-side,
    .landscape-bottom {
      grid-column: auto;
      grid-row: auto;
      aspect-ratio: 3 / 4;
    }

    .landscape-top,
    .landscape-bottom {
      aspect-ratio: 4 / 3;
    }

    .portrait-main {
      grid-column: 1 / 3;
    }

    .landscape-bottom {
      grid-column: 1 / 3;
    }

    .hackathon-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
