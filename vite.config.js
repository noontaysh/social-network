import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  base: "/way-of-the-samurai",
  plugins: [react()],
  server: {
    port: 3000
  }
})
