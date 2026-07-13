import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {resolve, dirname} from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,// listens on 0.0.0.0, not just localhost
    allowedHosts: ['radiantly-corporate-favorable.ngrok-free.dev'],
  },
  resolve: {
    alias: {
      '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
      '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
      '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
      '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
      '#hooks': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hooks'),
      '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
      '#mobile': resolve(dirname(fileURLToPath(import.meta.url)), 'src/mobile'),
    },
  },
})