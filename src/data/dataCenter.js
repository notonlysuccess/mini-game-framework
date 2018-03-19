import SessionData from './session'
import GameInfoData from './gameInfo'

export default class DataCenter {
  static _data = {
    'session': new SessionData(),
    'gameInfo': new GameInfoData()
  }

  static getData(name, cb) {
    return this._data[name].getData(cb)
  }

  static setData(name, value) {
    this._data[name].setData(value)
  }
}
