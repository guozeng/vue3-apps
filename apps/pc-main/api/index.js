import login from './modules/login'
/**
 * @params module
 * ```js
 * const module = {
 *  login,
 * }
 * ```
 */
function useHttp(module) {
  switch (module) {
    case 'login':
      return login
  }
}
export default useHttp
