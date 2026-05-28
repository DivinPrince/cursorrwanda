<script lang="ts">
  const features = [
    {
      title: 'Monthly meetups in Kigali',
      description:
        'Hands-on sessions where we explore Agent mode, share workflows, and build together in real time.',
      tag: 'Meetups',
    },
    {
      title: 'Workshops for every level',
      description:
        'From first-time Cursor users to advanced agentic workflows — structured learning paths for the whole community.',
      tag: 'Workshops',
    },
    {
      title: 'Build nights and hackathons',
      description:
        'Focused sprints on local problems — fintech, agritech, health, education. Ship something meaningful in an evening.',
      tag: 'Hackathons',
    },
    {
      title: 'A network across Rwanda',
      description:
        'Connect with engineers, founders, and students building the future of software in East Africa.',
      tag: 'Network',
    },
  ];
</script>

<section id="about" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">What we do</p>
      <h2>Learn, build, and grow together.</h2>
      <p class="section-intro">
        Cursor Community Rwanda brings developers together to share knowledge,
        experiment with AI-assisted development, and push what's possible from
        Kigali to the rest of the country.
      </p>
    </div>

    <div class="grid">
      {#each features as feature, i}
        <article class="card" style="--delay: {i * 0.05}s">
          <span class="tag">{feature.tag}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .card {
    background: var(--card);
    padding: clamp(1.5rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: background 0.2s ease;
  }

  .card:hover {
    background: var(--card-01);
  }

  .tag {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--fg-secondary);
  }

  .card h3 {
    color: var(--fg);
  }

  .card p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--fg-secondary);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
