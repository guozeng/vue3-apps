import type { RouteRecordRaw } from 'vue-router'
import PageEnums from '../PageEnums'

const basic: Record<string, RouteRecordRaw> = {
  Login: {
    path: '/',
    component: PageEnums.Login,
  },
  Layout: {
    path: '/layout',
    component: PageEnums.Layout,
  },
}
export default basic
