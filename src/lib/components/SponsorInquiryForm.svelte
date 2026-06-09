<script lang="ts">
  import {
    contributionTypes,
    sponsorshipPackages,
    type ContributionType,
    type SponsorshipTier,
  } from '../hackathon'
  import { SPONSOR_INQUIRY_EMAIL } from '../config'

  type FormState = 'idle' | 'submitting' | 'success' | 'error'

  let name = $state('')
  let organization = $state('')
  let email = $state('')
  let tier = $state<SponsorshipTier | 'custom'>('custom')
  let contributionType = $state<ContributionType>(contributionTypes[0])
  let message = $state('')
  let status = $state<FormState>('idle')
  let errorMessage = $state<string | null>(null)

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    status = 'submitting'
    errorMessage = null

    const payload = {
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      tier,
      contributionType,
      message: message.trim(),
    }

    try {
      const response = await fetch('/api/sponsor-inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to send your request right now.')
      }

      status = 'success'
      name = ''
      organization = ''
      email = ''
      tier = 'custom'
      contributionType = contributionTypes[0]
      message = ''
    } catch (error) {
      status = 'error'
      errorMessage =
        error instanceof Error ? error.message : 'Unable to send your request right now.'
    }
  }
</script>

<form class="sponsor-form" onsubmit={handleSubmit}>
  <div class="form-grid">
    <label>
      <span>Name</span>
      <input type="text" name="name" bind:value={name} required autocomplete="name" />
    </label>

    <label>
      <span>Organization</span>
      <input
        type="text"
        name="organization"
        bind:value={organization}
        required
        autocomplete="organization"
      />
    </label>

    <label>
      <span>Email</span>
      <input type="email" name="email" bind:value={email} required autocomplete="email" />
    </label>

    <label>
      <span>Level</span>
      <select name="tier" bind:value={tier}>
        {#each sponsorshipPackages as pkg}
          <option value={pkg.id}>{pkg.name}</option>
        {/each}
        <option value="custom">Custom</option>
      </select>
    </label>

    <label class="full-width">
      <span>Support type</span>
      <select name="contributionType" bind:value={contributionType}>
        {#each contributionTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </label>

    <label class="full-width">
      <span>Message</span>
      <textarea
        name="message"
        bind:value={message}
        rows="4"
        required
        placeholder="Brief overview of how you'd like to support the event."
      ></textarea>
    </label>
  </div>

  {#if status === 'success'}
    <p class="form-message success" role="status">Request sent. We’ll be in touch soon.</p>
  {:else if status === 'error' && errorMessage}
    <p class="form-message error" role="alert">{errorMessage}</p>
  {/if}

  <div class="form-actions">
    <button type="submit" class="btn btn-primary" disabled={status === 'submitting'}>
      {status === 'submitting' ? 'Sending…' : 'Send request'}
    </button>
    <a
      href="mailto:{SPONSOR_INQUIRY_EMAIL}?subject={encodeURIComponent('Cursor Kigali Hackathon sponsorship')}"
      class="form-alt-link"
    >
      {SPONSOR_INQUIRY_EMAIL}
    </a>
  </div>
</form>

<style>
  .sponsor-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label span {
    font-size: 0.8125rem;
    color: var(--fg-secondary);
  }

  .full-width {
    grid-column: 1 / -1;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem 0.875rem;
    border-radius: 10px;
    border: 1px solid var(--border-strong);
    background: var(--card-02);
    color: var(--fg);
    font: inherit;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: rgba(245, 78, 0, 0.45);
    background: var(--card-03);
  }

  textarea {
    resize: vertical;
    min-height: 6rem;
  }

  .form-message {
    padding: 0.75rem 0.875rem;
    border-radius: 10px;
    font-size: 0.875rem;
  }

  .form-message.success {
    background: rgba(245, 78, 0, 0.08);
    border: 1px solid rgba(245, 78, 0, 0.25);
  }

  .form-message.error {
    background: rgba(255, 96, 96, 0.08);
    border: 1px solid rgba(255, 96, 96, 0.25);
    color: #ffb4b4;
  }

  .form-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  .form-alt-link {
    font-size: 0.8125rem;
    color: var(--fg-secondary);
  }

  .form-alt-link:hover {
    color: var(--fg);
  }

  @media (max-width: 640px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
