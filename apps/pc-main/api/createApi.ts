import { createApiFnGener } from '/@/'

export function defaultErrorHandler(err: any) {
  console.log('defaultErrorHandler: ', err)
}

const BASE_URL = 'test/api/'

export default createApiFnGener(BASE_URL, defaultErrorHandler)
