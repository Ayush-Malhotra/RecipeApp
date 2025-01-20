import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['axios'], // Pre-bundle axios for development
  },
  build: {
    rollupOptions: {
      external: [''],
    },
  },
  server : {
    proxy : {
      '/api' : "http://localhost:3000"
    }
  }
})
