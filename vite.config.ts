import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'ebook-turban-reborn.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
      'localhost',
      '127.0.0.1',
    ],
  },
})
