import createError from './createError'

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
export default function settle(resolve: any, reject: any, response: any) {
  var validateStatus = response.config.validateStatus
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    let data
    try {
      data = JSON.parse(response.data)
    } catch (error) {
      reject(error)
      return
    }
    if (data.code === 200) {
      resolve(data)
    } else {
      reject(data)
    }
  } else {
    reject(
      createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      )
    )
  }
}
