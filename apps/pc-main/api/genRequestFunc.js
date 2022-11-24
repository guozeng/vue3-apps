import { httpPost, httpGet, httpDelete } from '/@/'

export function defaultErrorHandler(err) {
  if (err instanceof Error) {
    throw err
  }
  console.log('default:', err)
}

async function genApiPromise(promise, errCallback) {
  try {
    return await new Promise((resolve, reject) => {
      promise
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)

          if (errCallback === false) {
            return
          }

          if (typeof errCallback === 'function') {
            errCallback(err)
          } else {
            defaultErrorHandler(err)
          }
        })
        .catch((err_2) => {
          console.error(`❌==》网络异常： `, err_2)
        })
    })
  } catch (err_3) {
    console.warn(`code非200结果异常：`, err_3)
  }
}

export function genRequestFunc(url, method) {
  url = 'test/api/' + url
  return function (data, errFn) {
    if (typeof data === 'function' || data === false) {
      errFn = data
      data = null
    }
    let promise
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
