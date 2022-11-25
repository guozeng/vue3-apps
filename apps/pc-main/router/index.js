import { createRouter, createWebHashHistory } from 'vue-router'
import basic from './routes/basic'

const routes = Object.keys(basic).map((it) => basic[it])

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default function setupRouter(app) {
  app.use(router)
}
