import Data from './data'
import config from 'config/data'
import Network from 'network'

/**
 * session
 * openid
 */
export default class SessionData extends Data {
  constructor() {
    super()

    this._storageKey = config.SESSION
    this._onlyFetchNoLocalData = true
  }

  _fetch(cb) {
    Network.login(data => {
      cb(data)
    })
  }
}
