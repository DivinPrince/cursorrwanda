<script lang="ts">
  const photos = [
    {
      src: '/gallery/38129.jpg',
      alt: 'Community meetup in Kigali',
      layout: 'portrait-main',
    },
    {
      src: '/gallery/38133.jpg',
      alt: 'Developers collaborating at a Cursor event',
      layout: 'landscape-top',
    },
    {
      src: '/gallery/38135.jpg',
      alt: 'Workshop session with the community',
      layout: 'portrait-side',
    },
    {
      src: '/gallery/38319.jpg',
      alt: 'Group photo from a Cursor Rwanda gathering',
      layout: 'landscape-bottom',
    },
  ] as const;
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

    <div class="bento">
      {#each photos as photo}
        <figure class="photo {photo.layout}">
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
        </figure>
      {/each}
    </div>
  </div>
</section>

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

  .photo:hover img {
    transform: scale(1.04);
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
