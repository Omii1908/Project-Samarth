
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Project-Samarth/',
  plugins: [react()],
  define: {
    // This makes the environment variables available to the client code
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  }
})
