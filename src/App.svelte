<script lang="ts">
  import Header from './lib/components/Header.svelte'
  import Footer from './lib/components/Footer.svelte'
  import HackathonPromo from './lib/components/HackathonPromo.svelte'
  import HomePage from './lib/pages/HomePage.svelte'
  import HackathonPage from './lib/pages/HackathonPage.svelte'
  import { HACKATHON_PATH } from './lib/config'
  import { path } from './lib/router'

  const isHackathonPage = $derived($path === HACKATHON_PATH)
</script>

{#if isHackathonPage}
  <HackathonPage />
{:else}
  <Header />
  <HackathonPromo />
  <main>
    <HomePage />
  </main>
  <Footer />
{/if}

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
