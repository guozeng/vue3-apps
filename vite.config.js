import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createHtmlPlugin } from 'vite-plugin-html'
import htmlPluginConfig from './vite-config/html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createHtmlPlugin(htmlPluginConfig())],
})
