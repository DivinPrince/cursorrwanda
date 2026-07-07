<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_TITLE } from '../config'

  type Winner = {
    rank: number
    place: string
    medal: string
    name: string
    team: string
    tagline: string
    tech: string[]
    liveUrl: string
    githubUrl: string
  }

  const winners: Winner[] = [
    {
      rank: 1,
      place: '1st place',
      medal: '#e8b923',
      name: 'Terura',
      team: 'Terura',
      tagline:
        'A bilingual (English / Kinyarwanda) savings platform for Ikimina groups — members save together, request loans within their group, and admins curate live investment opportunities from Rwandan finance sources.',
      tech: ['React', 'Express', 'MongoDB', 'Gemini', 'Firecrawl'],
      liveUrl: 'https://terura.vercel.app',
      githubUrl: 'https://github.com/emilejosue100-boop/terura',
    },
    {
      rank: 2,
      place: '2nd place',
      medal: '#c9cbd1',
      name: 'Pixel Hills',
      team: 'Pixel Hills',
      tagline:
        'An interactive virtual science lab for Chemistry, Biology, Physics, and Geography — an animated periodic table, a human anatomy explorer, a projectile-motion simulator, and an interactive map of Rwanda.',
      tech: ['React', 'Vite', 'TypeScript'],
      liveUrl: 'https://wondrous-sopapillas-dc4d45.netlify.app',
      githubUrl: 'https://github.com/Emadsiddig/hacthon_project',
    },
    {
      rank: 3,
      place: '3rd place',
      medal: '#cd7f4b',
      name: 'ijwi',
      team: 'Voicers',
      tagline:
        'A civic-reporting platform — “ijwi” means “voice” in Kinyarwanda. Citizens report community issues like accidents, damage, and outages; reports route to the right authorities with SMS alerts and a verified emergency directory.',
      tech: ['React', 'Express', 'PostgreSQL'],
      liveUrl: 'https://ijwi-front.vercel.app',
      githubUrl: 'https://github.com/samnodier/ijwi',
    },
  ]
</script>

<section id="winners" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Hackathon</p>
      <h2>Hackathon winners.</h2>
      <p class="section-intro">
        The top three teams from {HACKATHON_TITLE}, {HACKATHON_DATE_LABEL} — building real
        products for Rwanda with Cursor in a single day.
      </p>
    </div>

    <div class="winners-grid">
      {#each winners as winner}
        <article class="winner-card" class:champion={winner.rank === 1} style="--medal: {winner.medal}">
          <div class="card-top">
            <span class="rank" aria-hidden="true">{winner.rank}</span>
            <span class="place">{winner.place}</span>
          </div>

          <div class="card-body">
            <h3>{winner.name}</h3>
            {#if winner.team !== winner.name}
              <p class="team">Team {winner.team}</p>
            {/if}
            <p class="tagline">{winner.tagline}</p>

            <ul class="tech">
              {#each winner.tech as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>

          <div class="card-links">
            <a href={winner.liveUrl} target="_blank" rel="noreferrer" class="link-arrow">
              Live demo
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6.5 2.5h7v7M13.5 2.5 7 9M9.5 6.5H3.5v7h7v-3.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              href={winner.githubUrl}
              target="_blank"
              rel="noreferrer"
              class="link-icon"
              aria-label={`${winner.name} source code on GitHub`}
              title="View source on GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.78.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"
                />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .winners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: 1rem;
  }

  .winner-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.75rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .winner-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }

  .winner-card.champion {
    border-color: color-mix(in srgb, var(--medal) 45%, var(--border));
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--medal) 7%, transparent), transparent 40%),
      var(--card);
  }

  .card-top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .rank {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    border-radius: 999px;
    font-size: 1.0625rem;
    color: var(--bg);
    background: var(--medal);
    border: 1px solid color-mix(in srgb, var(--medal) 60%, #000);
  }

  .place {
    font-size: 0.8125rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--medal) 70%, var(--fg));
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .card-body h3 {
    font-size: 1.375rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .team {
    font-size: 0.875rem;
    color: var(--fg-secondary);
    margin: 0;
  }

  .tagline {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--fg-secondary);
    margin: 0.25rem 0 0;
  }

  .tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
    padding: 0;
    margin: 0.75rem 0 0;
  }

  .tech li {
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    color: var(--fg-secondary);
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: var(--card-03);
    border: 1px solid var(--border);
  }

  .card-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.25rem;
  }

  .link-icon {
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--card-03);
    border: 1px solid var(--border);
    color: var(--fg-secondary);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .link-icon:hover {
    color: var(--fg);
    background: var(--card-02);
    border-color: var(--border-strong);
  }

  .link-icon svg {
    width: 1.125rem;
    height: 1.125rem;
  }
</style>
