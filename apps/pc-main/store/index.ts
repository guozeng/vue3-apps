import type { App } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPersist)
export default function setupStore(app: App<Element>) {
  app.use(store)
}

export { store, storeToRefs }

export { default as useAuthStore } from './modules/auth'
