import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/P6-Redesign/',
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false
  }
})
