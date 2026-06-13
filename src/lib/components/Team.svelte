<script lang="ts">
  type SocialLink = {
    href: string;
    label: string;
    icon: 'web' | 'x' | 'directory' | 'linkedin';
  };

  const team = [
    {
      name: 'Irasubiza Divin Prince',
      role: 'Cursor Community Ambassador',
      location: 'Kigali, Rwanda',
      bio: 'Organizing Cursor meetups and workshops across Rwanda — helping local developers get started with AI-assisted coding and grow the community in Kigali and beyond.',
      photo: '/team/divinprince.jpeg',
      links: [
        { href: 'https://divinprince.com', label: 'divinprince.com', icon: 'web' },
        { href: 'https://x.com/divinprnc', label: '@divinprnc on X', icon: 'x' },
        { href: 'https://cursor.directory/u/divin', label: 'Cursor Directory profile', icon: 'directory' },
        {
          href: 'https://linkedin.com/in/divinprince',
          label: 'Divin Prince on LinkedIn',
          icon: 'linkedin',
        },
      ] satisfies SocialLink[],
    },
    {
      name: "Jean Paul Elisa NIYOKWIZERWA",
      role: "Cursor Rwanda Community Lead & Partnerships Lead",
      location: "Kigali, Rwanda",
      bio: "Leading programs and building partnerships that help grow the Cursor community across Rwanda — connecting developers through workshops, hackathons, and collaborative initiatives",
      photo: '/team/jean-paul-elisa.jpeg',
      links: [
        { href: 'https://me.ndevuspace.com', label: 'me.ndevuspace.com', icon: 'web' },
        {
          href: 'https://linkedin.com/in/jean-paul-elisa',
          label: 'Jean Paul Elisa on LinkedIn',
          icon: 'linkedin',
        },
      ]
    }
  ];
</script>

<section id="team" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Team</p>
      <h2>Team</h2>
      <p class="section-intro">
        The people organizing meetups, workshops, and community events across Rwanda.
      </p>
    </div>

    <div class="team-grid">
      {#each team as member}
        <article class="member-card">
          <div class="avatar">
            <img src={member.photo} alt={member.name} />
          </div>
          <div class="member-body">
            <h3>{member.name}</h3>
            <p class="role">{member.role} · {member.location}</p>
            <p class="bio">{member.bio}</p>
            <div class="links">
              {#each member.links as link}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  class="link-icon"
                  aria-label={link.label}
                  title={link.label}
                >
                  {#if link.icon === 'web'}
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                      <path d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                  {:else if link.icon === 'x'}
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  {:else if link.icon === 'directory'}
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                  {:else if link.icon === 'linkedin'}
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  {/if}
                </a>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
    gap: 1rem;
  }

  .member-card {
    display: flex;
    gap: 1.25rem;
    padding: 1.75rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  .avatar {
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 999px;
    overflow: hidden;
    background: var(--card-03);
    border: 1px solid var(--border-strong);
  }

  .avatar img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .member-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .member-body h3 {
    font-size: 1.125rem;
    font-weight: 400;
    margin: 0;
  }

  .role {
    font-size: 0.875rem;
    color: var(--accent);
    margin: 0;
  }

  .bio {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--fg-secondary);
    margin: 0;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
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
    width: 1rem;
    height: 1rem;
  }
</style>
