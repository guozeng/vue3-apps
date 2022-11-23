import utils from '../utils'
import parseHeaders from './parseHeaders'
import buildURL from './buildURL'
import settle from './settle'
import createError from './createError'
/**
 * data
 * headers
 * responseType
 * baseURL
 * url
 * method
 * params
 * paramsSerializer
 * timeout
 * timeoutErrorMessage
 * onDownloadProgress
 * validateStatus
 */
export default function http(config) {
  return new Promise((resolve, reject) => {
    var requestData = config.data
    var requestHeaders = config.headers
    var responseType = config.responseType

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    var request = new XMLHttpRequest()

    var fullPath = utils.buildFullPath(config.baseURL, config.url)

    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    )

    request.timeout = config.timeout

    function onloadend() {
      if (!request) {
        return
      }
      // Prepare the response
      var responseHeaders =
        'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null
      var responseData =
        !responseType || responseType === 'text' || responseType === 'json'
          ? request.responseText
          : request.response
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request,
      }

      settle(resolve, reject, response)

      // Clean up request
      request = null
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend)
      }
    }

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request))

      // Clean up request
      request = null
    }

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded'
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage
      }
      reject(
        createError(
          timeoutErrorMessage,
          config,
          config.transitional && config.transitional.clarifyTimeoutError
            ? 'ETIMEDOUT'
            : 'ECONNABORTED',
          request
        )
      )

      // Clean up request
      request = null
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key]
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val)
        }
      })
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress)
    }

    if (!requestData) {
      requestData = null
    }

    request.send(requestData === null ? null : JSON.stringify(requestData))
    //
  })
}

export function httpGet(url, params) {
  return http({
    url,
    params,
    method: 'get',
  }).then((res) => {
    return JSON.parse(res.data)
  })
}
export async function httpPost(url, data) {
  return http({
    url,
    data,
    method: 'post',
  }).then((res) => {
    return JSON.parse(res.data)
  })
}
export async function httpDelete(url, params) {
  return http({
    url,
    params,
    method: 'delete',
  }).then((res) => {
    return JSON.parse(res.data)
  })
}
