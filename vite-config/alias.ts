import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(__dirname, '..', dir)
}

export default {
  'pc-main': pathResolve('apps/pc-main'),
  '/@/': pathResolve('src'),
}
