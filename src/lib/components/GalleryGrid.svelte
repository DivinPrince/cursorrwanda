<script lang="ts">
  import type { GalleryPhoto } from '../gallery-data'
  import { buildMasonryColumns, columnCountFor, pixiesetSize } from '../gallery-layout'

  interface Props {
    photos: readonly GalleryPhoto[]
    onPhotoClick: (index: number) => void
  }

  let { photos, onPhotoClick }: Props = $props()

  const GAP = 10

  let containerWidth = $state(0)

  const columns = $derived(buildMasonryColumns(photos, columnCountFor(containerWidth)))

  // Fade a tile in once its image paints. Driven via inline style (not a
  // class) so Svelte's scoped CSS can't prune it; default state stays visible
  // so a tile is never left hidden if these events don't fire.
  function fadeIn(img: HTMLImageElement) {
    if (img.complete && img.naturalWidth > 0) return
    img.style.opacity = '0'
    const reveal = () => {
      img.style.opacity = ''
    }
    img.addEventListener('load', reveal, { once: true })
    img.addEventListener('error', reveal, { once: true })
  }
</script>

<div class="masonry" bind:clientWidth={containerWidth} style:--gap="{GAP}px">
  {#each columns as column, columnIndex (columnIndex)}
    <div class="col">
      {#each column as tile (tile.src)}
        <button
          type="button"
          class="tile"
          style:aspect-ratio={tile.ratio}
          aria-label={`View photo ${tile.index + 1} of ${photos.length}: ${tile.alt}`}
          onclick={() => onPhotoClick(tile.index)}
        >
          <img
            src={pixiesetSize(tile.src, 'large')}
            alt={tile.alt}
            loading="lazy"
            decoding="async"
            use:fadeIn
          />
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
  {/each}
</div>

<style>
  .masonry {
    display: flex;
    align-items: flex-start;
    gap: var(--gap);
    width: 100%;
  }

  .col {
    display: flex;
    flex: 1 1 0;
    min-width: 0;
    flex-direction: column;
    gap: var(--gap);
  }

  .tile {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 8px;
    background: var(--card);
    cursor: zoom-in;
    transform: translateY(0);
    transition:
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition:
      opacity 0.5s ease,
      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 18, 11, 0) 55%,
      rgba(20, 18, 11, 0.5) 100%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .tile-meta {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
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
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .tile:hover img,
  .tile:focus-visible img {
    transform: scale(1.05);
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

  @media (prefers-reduced-motion: reduce) {
    .tile,
    .tile img,
    .tile-shade,
    .tile-meta {
      transition: none;
    }
  }
</style>
