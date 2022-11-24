import chokidar from 'chokidar'
import debug from 'debug'
import path from 'path'
// import { fileURLToPath } from 'url'
// const _dirname = path.dirname(fileURLToPath(import.meta.url))

const argv = process.argv.slice(2)[0] || ''
const cwd = process.cwd()
const watchDir = path.join(cwd, argv)
const dg = debug('gen-api:')

dg('watching folder %o', argv)

function listener(ev, path) {
  dg('add file %o', path, ev)
}

chokidar.watch(watchDir).on('add', listener)
chokidar.watch(watchDir).on('unlink', listener)
