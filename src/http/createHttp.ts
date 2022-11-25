import { httpPost, httpGet, httpDelete } from '.'

async function genApiPromise(promise: Promise<any>, errCallback: any) {
  try {
    return await new Promise((resolve, reject) => {
      promise
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          if (errCallback === false) {
            reject(err)
            return
          }

          if (typeof errCallback === 'function') {
            reject(err)
            errCallback(err)
          } else {
            // 非业务异常
            if (err instanceof Error) {
              throw err
            }
            reject(err)
          }
        })
        .catch((err_2) => {
          console.error(`❌==》网络异常： `, err_2)
          resolve(undefined)
        })
    })
  } catch (err_3) {
    console.warn(`code非200结果异常：`, err_3)
  }
}

export default function createApiFnGener(
  baseUrl: string,
  defaultErrHandler: (err: unknown) => any
) {
  if (typeof baseUrl === 'function') {
    defaultErrHandler = baseUrl
    baseUrl = '/'
  }
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/'
  }
  if (typeof defaultErrHandler !== 'function') {
    throw new Error(
      `Params [defaultErrHandler] expect function but get ${typeof defaultErrHandler}`
    )
  }
  return function (url: string, method?: string) {
    url = baseUrl + url
    return function (data: any, errFn = defaultErrHandler) {
      if (typeof data === 'function' || data === false) {
        errFn = data
        data = null
      }
      let promise: Promise<unknown> = Promise.resolve(undefined)
      method = (method || 'get').toLowerCase()
      if (method === 'get') {
        promise = httpGet(url, data)
      }
      if (method === 'post') {
        promise = httpPost(url, data)
      }
      if (method === 'delete') {
        promise = httpDelete(url, data)
      }
      return genApiPromise(promise, errFn)
    }
  }
}
