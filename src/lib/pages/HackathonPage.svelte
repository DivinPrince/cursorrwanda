<script lang="ts">
  import { onMount } from 'svelte'
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import HackathonShare from '../components/HackathonShare.svelte'
  import KigaliConventionCenter from '../components/KigaliConventionCenter.svelte'
  import SponsorInquiryForm from '../components/SponsorInquiryForm.svelte'
  import {
    eventHighlights,
    partnerBenefits,
    sponsorshipPackages,
    supportAreas,
  } from '../hackathon'
  import {
    HACKATHON_DATE_LABEL,
    HACKATHON_LOCATION,
    HACKATHON_PARTNERSHIP_PDF,
    HACKATHON_TITLE,
    LUMA_CALENDAR_URL,
  } from '../config'

  onMount(() => {
    document.title = `${HACKATHON_TITLE} · 27 June 2026 · Cursor Community Rwanda`

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        `${HACKATHON_TITLE} on ${HACKATHON_DATE_LABEL} in ${HACKATHON_LOCATION}.`,
      )
    }
  })
</script>

<Header />
<HackathonShare />

<main class="hackathon-page">
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">Hackathon · Kigali</p>
        <h1>{HACKATHON_TITLE}</h1>
        <p class="hero-sub">A full-day build sprint with Rwanda’s Cursor community.</p>
        <dl class="hero-facts">
          <div>
            <dt>Date</dt>
            <dd>{HACKATHON_DATE_LABEL}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{HACKATHON_LOCATION}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Full-day hackathon</dd>
          </div>
          <div>
            <dt>Who</dt>
            <dd>Developers, founders, students</dd>
          </div>
        </dl>
        <div class="hero-actions">
          <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer" class="btn btn-primary">
            Get updates
          </a>
          <a href="#sponsor" class="btn btn-secondary">Partner with us</a>
        </div>
      </div>

      <div class="hero-visual">
        <KigaliConventionCenter />
      </div>
    </div>
  </section>

  <section class="section about">
    <div class="container">
      <div class="section-header">
        <p class="section-label">The event</p>
        <h2>What to expect.</h2>
      </div>

      <div class="highlight-grid">
        {#each eventHighlights as item}
          <article class="highlight-card">
            <span class="tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section partnership">
    <div class="container">
      <div class="section-header">
        <p class="section-label">Partnership</p>
        <h2>Support the hackathon.</h2>
        <p class="section-intro">
          Financial, in-kind, technical, or logistical contributions — levels are matched to the
          value and impact of your support.
        </p>
      </div>

      <div class="support-areas">
        {#each supportAreas as area}
          <span class="support-chip">{area}</span>
        {/each}
      </div>

      <div class="tier-grid">
        {#each sponsorshipPackages as tier}
          <article class="tier-card" data-tier={tier.id}>
            <div class="tier-head">
              <span class="tag">{tier.name}</span>
              <h3>{tier.subtitle}</h3>
              <p class="tier-summary">{tier.summary}</p>
            </div>

            <div class="tier-columns">
              <div class="tier-block">
                <h4>Contributions</h4>
                <ul>
                  {#each tier.contributions as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
              <div class="tier-block">
                <h4>Benefits</h4>
                <ul>
                  {#each tier.benefits as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              </div>
            </div>
          </article>
        {/each}
      </div>

      <a href={HACKATHON_PARTNERSHIP_PDF} target="_blank" rel="noreferrer" class="link-arrow pdf-link">
        Full partnership document (PDF)
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>

  <section class="section why">
    <div class="container">
      <div class="section-header">
        <p class="section-label">Why partner</p>
        <h2>Invest in Rwanda’s builders.</h2>
      </div>

      <ul class="benefit-grid">
        {#each partnerBenefits as benefit}
          <li>{benefit}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="sponsor" class="section sponsor">
    <div class="container sponsor-layout">
      <div class="section-header">
        <p class="section-label">Sponsors</p>
        <h2>Request sponsorship.</h2>
        <p class="section-intro">
          Tell us how you’d like to support the event. We’ll follow up to find the right fit.
        </p>
      </div>

      <div class="sponsor-form-wrap">
        <SponsorInquiryForm />
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
  .hackathon-page {
    display: flex;
    flex-direction: column;
  }

  .hero {
    padding-top: clamp(3rem, 8vw, 6rem);
    padding-bottom: clamp(2.5rem, 5vw, 4rem);
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: clamp(1.5rem, 4vw, 3rem);
    align-items: center;
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

  .hero-facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.5rem;
    margin: 1.75rem 0 0;
    padding: 1.25rem 0 0;
    border-top: 1px solid var(--border);
  }

  .hero-facts div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .hero-facts dt {
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-secondary);
  }

  .hero-facts dd {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--fg);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .hero-visual {
    overflow: visible;
  }

  .about {
    background: var(--card-01);
  }

  .highlight-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .highlight-card {
    background: var(--card);
    padding: clamp(1.5rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tag {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--fg-secondary);
  }

  .highlight-card h3,
  .tier-head h3 {
    color: var(--fg);
  }

  .highlight-card p,
  .tier-summary {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--fg-secondary);
  }

  .support-areas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .support-chip {
    font-size: 0.8125rem;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    color: var(--fg-secondary);
    background: var(--card);
  }

  .tier-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .tier-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
  }

  .tier-card[data-tier='platinum'] {
    border-color: rgba(245, 78, 0, 0.3);
  }

  .tier-head {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .tier-columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }

  .tier-block h4 {
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--fg-secondary);
    margin-bottom: 0.5rem;
  }

  .tier-block ul {
    margin: 0;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .tier-block li {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--fg-secondary);
  }

  .pdf-link {
    display: inline-flex;
    margin-top: 2rem;
  }

  .why {
    background: var(--card-01);
  }

  .benefit-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .benefit-grid li {
    padding: 1.25rem 1.5rem;
    background: var(--card);
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--fg-secondary);
  }

  .sponsor-layout {
    display: grid;
    grid-template-columns: 0.75fr 1.25fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }

  .sponsor-form-wrap {
    padding: clamp(1.25rem, 3vw, 1.75rem);
    border-radius: 12px;
    background: var(--card);
    border: 1px solid var(--border);
  }

  @media (max-width: 900px) {
    .hero-inner,
    .sponsor-layout {
      grid-template-columns: 1fr;
    }

    .hero-visual {
      order: -1;
    }

    .tier-grid,
    .benefit-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .highlight-grid {
      grid-template-columns: 1fr;
    }

    .hero-facts {
      grid-template-columns: 1fr;
    }
  }
</style>
