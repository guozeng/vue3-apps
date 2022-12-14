import chokidar from 'chokidar'
import debug from 'debug'
import path from 'path'
import render from 'json-templater/string.js'
import fs from 'fs'
import { EOL } from 'os'
// import { fileURLToPath } from 'url'
// const _dirname = path.dirname(fileURLToPath(import.meta.url))

const argv = process.argv.slice(2)[0] || ''
const cwd = process.cwd()
const watchDir = path.join(cwd, argv)
const dg = debug('gen-api:')
const processStart = new Date().getTime()
const OUTPUT_PATH = path.join(watchDir, '../index.js')
const IMPORT_TEMPLATE = "import {{name}} from './modules/{{name}}'"
const CASE_TEMPLATE = `
    case '{{name}}':
      return {{name}}
`
const MAIN_TEMPLATE = `/* Automatically generated by 'helper/gen-api.js' */

{{include}}

/**
 * @params module
 */
function useHttp(module) {
  switch (module) {
    {{case}}
  }
}
export default useHttp
`

dg('watching folder %o', argv)

function handler(filePath, opType) {
  if (new Date().getTime() - processStart < 1000) {
    return
  }
  dg(`${opType} file: %o`, path.basename(filePath))
  if (opType === 'change') {
    return
  }

  const includeTemplate = []
  const caseTemplate = []
  fs.readdir(watchDir, (err, fileList) => {
    const list = fileList.map((it) => it.replace(path.extname(it), ''))
    list.forEach((it) => {
      includeTemplate.push(render(IMPORT_TEMPLATE, { name: it }))
      caseTemplate.push(render(CASE_TEMPLATE, { name: it }))
    })
    const template = render(MAIN_TEMPLATE, {
      include: includeTemplate.join(EOL),
      case: caseTemplate.join(EOL),
    })
    fs.writeFile(OUTPUT_PATH, template, () => {})
  })
}

chokidar.watch(watchDir).on('add', (filePath) => {
  handler(filePath, 'add')
})
chokidar.watch(watchDir).on('unlink', (filePath) => {
  handler(filePath, 'unlink')
})

chokidar.watch(watchDir).on('change', (filePath) => {
  handler(filePath, 'change')
})
