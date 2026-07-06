<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_LOCATION, HACKATHON_TITLE } from '../config'
  import { CAFE_DATE_LABEL, CAFE_GALLERY_PHOTOS, CAFE_LOCATION, CAFE_TITLE } from '../cafe-gallery'
  import { FEATURED_HACKATHON_PHOTOS } from '../gallery-data'
  import GalleryGrid from './GalleryGrid.svelte'
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
            <span class="photo-shade" aria-hidden="true"></span>
            <span class="photo-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M6.5 2.5h7v7M13.5 2.5 7 9M9.5 6.5H3.5v7h7v-3.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        {/each}
      </div>
    </div>

    <div class="event-block hackathon-block">
      <div class="event-heading">
        <h3>{HACKATHON_TITLE}</h3>
        <p>{HACKATHON_DATE_LABEL} · {HACKATHON_LOCATION}</p>
      </div>

      <GalleryGrid photos={FEATURED_HACKATHON_PHOTOS} onPhotoClick={openHackathonLightbox} />
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
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.3s ease,
      box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
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

  .photo-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(20, 18, 11, 0.6));
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  .photo-icon {
    position: absolute;
    right: 0.875rem;
    bottom: 0.875rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(237, 236, 236, 0.18);
    background: rgba(20, 18, 11, 0.72);
    color: var(--fg);
    opacity: 0;
    transform: translateY(6px);
    transition:
      opacity 0.35s ease,
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  .photo-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .photo:hover,
  .photo:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(245, 78, 0, 0.3);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
  }

  .photo:hover .photo-shade,
  .photo:focus-visible .photo-shade,
  .photo:hover .photo-icon,
  .photo:focus-visible .photo-icon {
    opacity: 1;
    transform: translateY(0);
  }

  .photo:focus-visible {
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
  }
</style>
