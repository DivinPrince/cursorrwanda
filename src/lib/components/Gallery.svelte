<script lang="ts">
  import {
    HACKATHON_DATE_LABEL,
    HACKATHON_LOCATION,
    HACKATHON_TITLE,
    PIXIESET_GALLERY_URL,
    SOMAPIX_ACCESS_CODE,
    SOMAPIX_GALLERY_URL,
  } from '../config'

  const photos = [
    {
      src: '/gallery/38129.jpg',
      alt: 'Builders collaborating during the Cursor Kigali Hackathon',
      layout: 'portrait-main',
    },
    {
      src: '/gallery/38133.jpg',
      alt: 'Hackathon teams working through build sessions',
      layout: 'landscape-top',
    },
    {
      src: '/gallery/38135.jpg',
      alt: 'Workshop and mentoring at the hackathon venue',
      layout: 'portrait-side',
    },
    {
      src: '/gallery/38319.jpg',
      alt: 'Group photo from the Cursor Kigali Hackathon',
      layout: 'landscape-bottom',
    },
  ] as const

  const albums = [
    {
      href: PIXIESET_GALLERY_URL,
      label: 'Full album',
      title: 'Pixieset gallery',
      description: 'Browse the complete curated photo set from the hackathon.',
      cta: 'Open Pixieset',
    },
    {
      href: SOMAPIX_GALLERY_URL,
      label: 'Find your photos',
      title: 'SomaPix gallery',
      description: `Use AI face search to find every shot you appear in. Access code: ${SOMAPIX_ACCESS_CODE}`,
      cta: 'Open SomaPix',
    },
  ] as const

  let activeIndex = $state<number | null>(null)

  function openLightbox(index: number) {
    activeIndex = index
  }

  function closeLightbox() {
    activeIndex = null
  }

  function showPrevious() {
    if (activeIndex === null) return
    activeIndex = (activeIndex - 1 + photos.length) % photos.length
  }

  function showNext() {
    if (activeIndex === null) return
    activeIndex = (activeIndex + 1) % photos.length
  }

  function handleKeydown(event: KeyboardEvent) {
    if (activeIndex === null) return

    switch (event.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        showPrevious()
        break
      case 'ArrowRight':
        showNext()
        break
      default:
        break
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<section id="gallery" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Gallery</p>
      <h2>{HACKATHON_TITLE} highlights.</h2>
      <p class="section-intro">
        {HACKATHON_DATE_LABEL} · {HACKATHON_LOCATION}. Preview moments below, then open the full
        albums on Pixieset or find your photos with SomaPix.
      </p>
    </div>

    <div class="bento">
      {#each photos as photo, index}
        <button
          type="button"
          class="photo {photo.layout}"
          aria-label={`View photo ${index + 1} of ${photos.length}: ${photo.alt}`}
          onclick={() => openLightbox(index)}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          <span class="photo-overlay" aria-hidden="true">
            <span class="photo-overlay-icon">
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
          </span>
        </button>
      {/each}
    </div>

    <div class="albums">
      {#each albums as album}
        <a href={album.href} target="_blank" rel="noreferrer" class="album-card">
          <div class="album-top">
            <span class="album-label">{album.label}</span>
            <span class="album-link-icon" aria-hidden="true">
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
          </div>
          <h3>{album.title}</h3>
          <p>{album.description}</p>
          <span class="album-cta">{album.cta}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

{#if activeIndex !== null}
  {@const activePhoto = photos[activeIndex]}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
    <button type="button" class="lightbox-backdrop" aria-label="Close preview" onclick={closeLightbox}></button>

    <div class="lightbox-panel">
      <button type="button" class="lightbox-close" aria-label="Close preview" onclick={closeLightbox}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m4 4 8 8M12 4l-8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <button type="button" class="lightbox-nav prev" aria-label="Previous photo" onclick={showPrevious}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 3 5 8l5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <figure class="lightbox-figure">
        <img src={activePhoto.src} alt={activePhoto.alt} />
        <figcaption>
          <span>{activePhoto.alt}</span>
          <span class="lightbox-count">{activeIndex + 1} / {photos.length}</span>
        </figcaption>
      </figure>

      <button type="button" class="lightbox-nav next" aria-label="Next photo" onclick={showNext}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m6 3 5 5-5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
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
    text-align: left;
  }

  .photo::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
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

  .photo-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.875rem;
    background: linear-gradient(180deg, transparent 45%, rgba(20, 18, 11, 0.72));
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .photo-overlay-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(237, 236, 236, 0.18);
    background: rgba(20, 18, 11, 0.72);
    color: var(--fg);
  }

  .photo-overlay-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .photo:hover img,
  .photo:focus-visible img {
    transform: scale(1.04);
  }

  .photo:hover .photo-overlay,
  .photo:focus-visible .photo-overlay {
    opacity: 1;
  }

  .photo:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .albums {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.875rem;
    margin-top: 0.875rem;
  }

  .album-card {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    padding: 1.5rem;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--card-01);
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .album-card:hover {
    background: var(--card-02);
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }

  .album-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .album-label {
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .album-link-icon {
    color: var(--fg-secondary);
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .album-link-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .album-card:hover .album-link-icon {
    color: var(--fg);
    transform: translate(2px, -2px);
  }

  .album-card h3 {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3;
  }

  .album-card p {
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--fg-secondary);
    margin: 0;
    flex: 1;
  }

  .album-cta {
    font-size: 0.875rem;
    color: var(--fg);
  }

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    padding: 1.5rem;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    border: none;
    background: rgba(8, 7, 5, 0.88);
    backdrop-filter: blur(10px);
    cursor: zoom-out;
  }

  .lightbox-panel {
    position: relative;
    z-index: 1;
    width: min(1100px, 100%);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
  }

  .lightbox-figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
  }

  .lightbox-figure img {
    width: 100%;
    max-height: min(72vh, 760px);
    object-fit: contain;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--card);
  }

  .lightbox-figure figcaption {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.875rem;
    color: var(--fg-secondary);
    text-align: center;
  }

  .lightbox-count {
    margin: 0;
    font-size: 0.8125rem;
    color: rgba(237, 236, 236, 0.45);
  }

  .lightbox-close,
  .lightbox-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    background: rgba(27, 25, 19, 0.92);
    color: var(--fg);
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .lightbox-close:hover,
  .lightbox-nav:hover {
    background: var(--card-03);
    border-color: rgba(237, 236, 236, 0.22);
  }

  .lightbox-close {
    position: absolute;
    top: -3rem;
    right: 0;
  }

  .lightbox-close svg,
  .lightbox-nav svg {
    width: 1rem;
    height: 1rem;
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

  @media (max-width: 640px) {
    .albums {
      grid-template-columns: 1fr;
    }

    .lightbox-panel {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .lightbox-nav {
      display: none;
    }

    .lightbox-close {
      top: -2.5rem;
      right: 0.25rem;
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
