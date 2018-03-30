import SessionData from './session'
import GameInfoData from './gameInfo'

const uniqueKey = 'anuniquekye_y9w8yf98hv89hv89hd9vh'

export default class DataCenter {
  static _data = {
    'session': new SessionData(),
    'gameInfo': new GameInfoData(),
  }

  static getData(names, cb, ...args) {
    if (typeof names === 'string') {
      this._data[names].getData(cb, false, ...args)
    } else {
      const fetchedData = {}
      names.forEach(name => {
        fetchedData[name] = uniqueKey
      })
      let cnt = 0
      const getAll = (name, data) => {
        if (fetchedData[name] === uniqueKey) {
          cnt++
        }
        fetchedData[name] = data
        if (cnt === names.length) {
          cb(fetchedData)
        }
      }
      names.forEach(name => {
        this._data[name].getData(data => {
          getAll(name, data)
        }, false, ...args)
      })
    }
  }

  static getNetworkData(name, cb, ...args) {
    this._data[name]._getFromNetwork(cb, true, ...args)
  }

  static getLocalData(name, ...args) {
    return this._data[name].getData(() => {}, true, ...args)
  }

  static setData(name, value) {
    this._data[name].setData(value)
  }
}
