import Data from './data'
import config from 'config/data'
import Network from 'network'

/**
 * session
 * openid
 */
export default class GameInfo extends Data {
  constructor() {
    super()

    this._storageKey = config.SESSION
  }

  _fetch(cb) {
    Network.getGameInfo(data => {
      cb(data)
    })
  }
}
