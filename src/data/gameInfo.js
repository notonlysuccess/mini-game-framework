import Data from './data'
import Network from 'network'
import config from 'config/data'
import AssetsLoader from 'utils/assetsLoader'
import DataCenter from './dataCenter'
import {
  random,
  shuffle,
} from 'utils'

export default class GameInfoData extends Data {
  constructor() {
    super()
    this._storageKey = config.GAME_INFO
  }

  _getDefaultData() {
    return {
    }
  }

  _fetch(cb) {
    Network.getGameInfo(data => {
      if (data) {
        cb(data)
      }
    })
  }
}
