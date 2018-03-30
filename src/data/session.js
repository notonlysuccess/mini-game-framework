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
    this._fetchEveryTime = true
  }

  _fetch(cb) {
    Network.login(0, data => {
      cb(data)
    })
  }
}
