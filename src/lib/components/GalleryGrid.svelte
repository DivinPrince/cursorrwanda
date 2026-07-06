<script lang="ts">
  import type { GalleryPhoto } from '../gallery-data'

  interface Props {
    photos: readonly GalleryPhoto[]
    onPhotoClick: (index: number) => void
  }

  let { photos, onPhotoClick }: Props = $props()
</script>

<div class="grid">
  {#each photos as photo, index}
    <button
      type="button"
      class="tile"
      style:aspect-ratio="{photo.width} / {photo.height}"
      aria-label={`View photo ${index + 1} of ${photos.length}: ${photo.alt}`}
      onclick={() => onPhotoClick(index)}
    >
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
    </button>
  {/each}
</div>

<style>
  .grid {
    columns: 1;
    column-gap: 0.875rem;
  }

  .tile {
    break-inside: avoid;
    width: 100%;
    margin: 0 0 0.875rem;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--card);
    cursor: zoom-in;
    display: block;
    position: relative;
  }

  .tile img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .tile:hover img,
  .tile:focus-visible img {
    transform: scale(1.03);
  }

  .tile:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (min-width: 640px) {
    .grid {
      columns: 2;
    }
  }

  @media (min-width: 900px) {
    .grid {
      columns: 3;
    }
  }

  @media (min-width: 1200px) {
    .grid {
      columns: 4;
    }
  }
</style>
