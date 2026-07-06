<script lang="ts">
  import type { GalleryPhoto } from '../gallery-data'
  import { downloadGalleryPhoto } from '../gallery-utils'

  interface Props {
    photos: readonly GalleryPhoto[]
    activeIndex: number | null
    onClose: () => void
    onPrevious: () => void
    onNext: () => void
  }

  let { photos, activeIndex, onClose, onPrevious, onNext }: Props = $props()

  let isDownloading = $state(false)

  async function handleDownload(photo: GalleryPhoto) {
    if (isDownloading) return
    isDownloading = true
    try {
      await downloadGalleryPhoto(photo)
    } finally {
      isDownloading = false
    }
  }

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

    <div class="lightbox-stage">
      <img
        class="lightbox-image"
        src={activePhoto.src}
        alt={activePhoto.alt}
        draggable="false"
      />

      <div class="lightbox-toolbar">
        <button
          type="button"
          class="lightbox-action"
          aria-label="Download photo"
          disabled={isDownloading}
          onclick={() => handleDownload(activePhoto)}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2.5v7M8 9.5 5.5 7M8 9.5l2.5-2.5M3.5 11.5h9"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button type="button" class="lightbox-action" aria-label="Close preview" onclick={onClose}>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="m4 4 8 8M12 4l-8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

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

      <div class="lightbox-caption">
        <span class="lightbox-title">{activePhoto.alt}</span>
        <span class="lightbox-count">{activeIndex + 1} / {photos.length}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 200;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    border: none;
    background: #080705;
    cursor: zoom-out;
  }

  .lightbox-stage {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .lightbox-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
  }

  .lightbox-toolbar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(8, 7, 5, 0.72) 0%, rgba(8, 7, 5, 0) 100%);
  }

  .lightbox-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: linear-gradient(0deg, rgba(8, 7, 5, 0.78) 0%, rgba(8, 7, 5, 0) 100%);
    color: var(--fg);
    pointer-events: none;
  }

  .lightbox-title {
    font-size: 0.875rem;
    line-height: 1.4;
    color: rgba(237, 236, 236, 0.92);
  }

  .lightbox-count {
    flex-shrink: 0;
    font-size: 0.8125rem;
    color: rgba(237, 236, 236, 0.55);
  }

  .lightbox-action,
  .lightbox-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    border: 1px solid rgba(237, 236, 236, 0.16);
    background: rgba(20, 18, 11, 0.72);
    color: var(--fg);
    backdrop-filter: blur(10px);
    transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  }

  .lightbox-action:hover:not(:disabled),
  .lightbox-nav:hover {
    background: rgba(27, 25, 19, 0.92);
    border-color: rgba(237, 236, 236, 0.28);
  }

  .lightbox-action:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  .lightbox-action svg,
  .lightbox-nav svg {
    width: 1rem;
    height: 1rem;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
  }

  .lightbox-nav.prev {
    left: 1rem;
  }

  .lightbox-nav.next {
    right: 1rem;
  }

  @media (max-width: 640px) {
    .lightbox-toolbar {
      padding: 0.75rem;
    }

    .lightbox-caption {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      padding: 0.875rem 1rem 1rem;
    }

    .lightbox-nav {
      display: none;
    }
  }
</style>
