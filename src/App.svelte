<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/components/Header.svelte'
  import Footer from './lib/components/Footer.svelte'
  import HackathonPromo from './lib/components/HackathonPromo.svelte'
  import HomePage from './lib/pages/HomePage.svelte'
  import GalleryPage from './lib/pages/GalleryPage.svelte'

  let path = $state(typeof window !== 'undefined' ? window.location.pathname : '/')

  onMount(() => {
    const syncPath = () => {
      path = window.location.pathname
    }

    window.addEventListener('popstate', syncPath)

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.origin)
      if (url.origin !== window.location.origin) return
      if (url.pathname !== '/' && url.pathname !== '/gallery') return

      event.preventDefault()
      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, '', `${url.pathname}${url.hash}`)
        path = url.pathname
      } else if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', onDocumentClick)

    return () => {
      window.removeEventListener('popstate', syncPath)
      document.removeEventListener('click', onDocumentClick)
    }
  })
</script>

<Header />
<HackathonPromo />
<main>
  {#if path === '/gallery'}
    <GalleryPage />
  {:else}
    <HomePage />
  {/if}
</main>
<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
