import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5985/api',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  }
})
