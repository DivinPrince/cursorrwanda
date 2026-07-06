<script lang="ts">
  import { onMount } from 'svelte'
  import type { GalleryPhoto } from '../gallery-data'
  import { buildMosaicLayout, MOSAIC_ROW_UNIT } from '../gallery-layout'

  interface Props {
    photos: readonly GalleryPhoto[]
    onPhotoClick: (index: number) => void
    animated?: boolean
  }

  let { photos, onPhotoClick, animated = true }: Props = $props()

  const mosaicPhotos = $derived(buildMosaicLayout(photos))

  let gridEl = $state<HTMLElement | null>(null)

  onMount(() => {
    if (!animated || !gridEl) return

    const tiles = gridEl.querySelectorAll<HTMLElement>('[data-tile]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    for (const tile of tiles) observer.observe(tile)

    return () => observer.disconnect()
  })
</script>

<div
  class="mosaic"
  class:animated
  bind:this={gridEl}
  style:--row-unit={MOSAIC_ROW_UNIT}
>
  {#each mosaicPhotos as photo, index}
    <button
      type="button"
      data-tile
      class="tile {photo.mosaic}"
      style:--row-span={photo.rowSpan}
      style:--aspect-ratio={photo.aspectRatio}
      style:--delay="{index * 40}ms"
      aria-label={`View photo ${index + 1} of ${photos.length}: ${photo.alt}`}
      onclick={() => onPhotoClick(index)}
    >
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      <span class="tile-shade" aria-hidden="true"></span>
      <span class="tile-meta" aria-hidden="true">
        <span class="tile-icon">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M6.25 6.25 10.75 2.75M10.75 2.75H7.5M10.75 2.75v3.25M9.75 9.75H3.25V3.25h3"
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

<style>
  .mosaic {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: 0.5rem;
  }

  .tile {
    position: relative;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--card);
    cursor: zoom-in;
    aspect-ratio: var(--aspect-ratio);
    grid-row: span 1;
    grid-column: span 1;
    transform: translateY(0);
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.3s ease,
      box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 18, 11, 0) 35%,
      rgba(20, 18, 11, 0.55) 100%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .tile-meta {
    position: absolute;
    right: 0.875rem;
    bottom: 0.875rem;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.35s ease,
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    border: 1px solid rgba(237, 236, 236, 0.2);
    background: rgba(20, 18, 11, 0.72);
    color: var(--fg);
    backdrop-filter: blur(8px);
  }

  .tile-icon svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  .tile:hover,
  .tile:focus-visible {
    transform: translateY(-3px);
    border-color: rgba(245, 78, 0, 0.35);
    box-shadow:
      0 18px 40px rgba(0, 0, 0, 0.35),
      0 0 0 1px rgba(245, 78, 0, 0.12);
  }

  .tile:hover img,
  .tile:focus-visible img {
    transform: scale(1.06);
  }

  .tile:hover .tile-shade,
  .tile:focus-visible .tile-shade,
  .tile:hover .tile-meta,
  .tile:focus-visible .tile-meta {
    opacity: 1;
    transform: translateY(0);
  }

  .tile:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .animated .tile {
    opacity: 0;
    transform: translateY(22px);
  }

  .animated .tile.is-visible {
    animation: tile-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay) forwards;
  }

  @keyframes tile-enter {
    from {
      opacity: 0;
      transform: translateY(22px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 700px) {
    .mosaic {
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-auto-rows: var(--row-unit);
      grid-auto-flow: dense;
      gap: 0.625rem;
    }

    .tile {
      aspect-ratio: auto;
      grid-row: span var(--row-span);
    }

    .standard {
      grid-column: span 2;
    }

    .wide {
      grid-column: span 3;
    }

    .tall {
      grid-column: span 2;
    }

    .feature {
      grid-column: span 4;
    }
  }

  @media (min-width: 1024px) {
    .mosaic {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .standard {
      grid-column: span 3;
    }

    .wide {
      grid-column: span 4;
    }

    .tall {
      grid-column: span 3;
    }

    .feature {
      grid-column: span 6;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animated .tile {
      opacity: 1;
      transform: none;
      animation: none;
    }

    .tile,
    .tile img,
    .tile-shade,
    .tile-meta {
      transition: none;
    }
  }
</style>
