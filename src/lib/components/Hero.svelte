<script lang="ts">
  import KigaliConventionCenter from './KigaliConventionCenter.svelte';
</script>

<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">Cursor Community · Rwanda</p>
      <h1>Where Rwanda builds with AI.</h1>
      <p class="hero-sub">
        A community of developers, founders, and builders using Cursor to ship
        faster — together in Kigali and across the country.
      </p>
      <div class="hero-actions">
        <a href="/#join" class="btn btn-primary">Join the community</a>
        <a href="https://luma.com/cursor-kigali-rwanda" target="_blank" rel="noreferrer" class="btn btn-secondary">Subscribe on Luma</a>
      </div>
    </div>

    <div class="hero-visual">
      <KigaliConventionCenter />
    </div>
  </div>

  <div class="trust-bar">
    <div class="container trust-inner">
      <p>Trusted by builders across Rwanda's tech ecosystem</p>
      <div class="trust-logos">
        <span>Kigali</span>
        <span>norrsken</span>
        <span>Carnegie Mellon · Africa</span>
        <span>ALU</span>
        <span>Startups</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding-top: clamp(3rem, 8vw, 6rem);
    padding-bottom: 0;
    overflow: hidden;
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: center;
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

  .eyebrow {
    font-size: 0.8125rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--fg-secondary);
    margin-bottom: 1.25rem;
  }

  .hero-sub {
    margin-top: 1.25rem;
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--fg-secondary);
    max-width: 32rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .hero-visual {
    position: relative;
    overflow: visible;
  }

  .trust-bar {
    border-top: 1px solid var(--border);
    padding-block: 2rem;
  }

  .trust-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
  }

  .trust-inner > p {
    font-size: 0.875rem;
    color: var(--fg-secondary);
  }

  .trust-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    font-size: 0.875rem;
    color: rgba(237, 236, 236, 0.35);
    letter-spacing: 0.02em;
  }

  @media (max-width: 900px) {
    .hero-inner {
      grid-template-columns: 1fr;
    }

    .hero-visual {
      order: -1;
    }
  }
</style>
