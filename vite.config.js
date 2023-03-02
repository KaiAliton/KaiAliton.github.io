import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/KaiAliton.github.io/',
  plugins: [react()],
  server: {
    host: true
  }
})
