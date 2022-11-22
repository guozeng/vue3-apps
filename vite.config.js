import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mpa, cert, alias, commonjs } from './vite-config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mpa(), cert(), commonjs()],
  server: {
    host: true,
    https: true,
  },
  resolve: {
    alias,
  },
})
