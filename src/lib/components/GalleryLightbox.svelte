<script lang="ts">
  import type { GalleryPhoto } from '../gallery-data'

  interface Props {
    photos: readonly GalleryPhoto[]
    activeIndex: number | null
    onClose: () => void
    onPrevious: () => void
    onNext: () => void
  }

  let { photos, activeIndex, onClose, onPrevious, onNext }: Props = $props()

  function handleKeydown(event: KeyboardEvent) {
    if (activeIndex === null) return

    switch (event.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        onPrevious()
        break
      case 'ArrowRight':
        onNext()
        break
      default:
        break
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if activeIndex !== null}
  {@const activePhoto = photos[activeIndex]}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
    <button type="button" class="lightbox-backdrop" aria-label="Close preview" onclick={onClose}></button>

    <div class="lightbox-panel">
      <button type="button" class="lightbox-close" aria-label="Close preview" onclick={onClose}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m4 4 8 8M12 4l-8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <button type="button" class="lightbox-nav prev" aria-label="Previous photo" onclick={onPrevious}>
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

      <button type="button" class="lightbox-nav next" aria-label="Next photo" onclick={onNext}>
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
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 200;
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

  @media (max-width: 640px) {
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
</style>
