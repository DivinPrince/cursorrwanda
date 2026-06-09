import { writable } from 'svelte/store'

function readPath(): string {
  const pathname = window.location.pathname
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export const path = writable(readPath())

export function navigate(to: string): void {
  if (to === readPath()) return
  history.pushState({}, '', to)
  path.set(readPath())
  window.scrollTo({ top: 0, behavior: 'instant' in window ? ('instant' as ScrollBehavior) : 'auto' })
}

window.addEventListener('popstate', () => {
  path.set(readPath())
})
