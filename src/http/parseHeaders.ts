import { forEach, trim } from '../utils'

const ignoreDuplicateOf = [
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent',
]
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
export default function parseHeaders(headers: string) {
  var parsed: Record<string, string | string[]> = {}
  var key
  var val
  var i

  if (!headers) {
    return parsed
  }

  forEach(headers.split('\n'), function parser(line: string) {
    i = line.indexOf(':')
    key = trim(line.substr(0, i)).toLowerCase()
    val = trim(line.substr(i + 1))

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat(val)
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
      }
    }
  })

  return parsed
}
