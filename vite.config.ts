import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { lumaApiPlugin } from './plugins/luma-api'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.LUMA_API_KEY = env.LUMA_API_KEY
  process.env.LUMA_CALENDAR_ID = env.LUMA_CALENDAR_ID

  return {
    plugins: [svelte(), lumaApiPlugin()],
  }
})
