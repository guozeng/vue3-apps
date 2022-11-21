import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mpa, cert } from './vite-config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mpa(), cert()],
  server: {
    host: true,
    https: true,
  },
})
