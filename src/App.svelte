<script lang="ts">
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Features from './lib/components/Features.svelte';
  import Team from './lib/components/Team.svelte';
  import Community from './lib/components/Community.svelte';
  import Gallery from './lib/components/Gallery.svelte';
  import Events from './lib/components/Events.svelte';
  import Join from './lib/components/Join.svelte';
  import Footer from './lib/components/Footer.svelte';
</script>

<Header />
<main>
  <Hero />
  <Features />
  <Team />
  <Community />
  <Gallery />
  <Events />
  <Join />
</main>
<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
