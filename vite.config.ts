import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite' // Change this if using 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), // Tailwind MUST be here for the browser to see it
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // If you had special test settings, put them here:
  test: {
    environment: 'jsdom',
    exclude: ['node_modules'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
})
