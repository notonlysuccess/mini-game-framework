import {
  request
} from 'utils'

export default class Data {
  constructor() {
    this._storageKey = ''
    this._data = undefined
    this._fetched = false
    this._fetching = false
    this._cbs = []
  }

  _fetchFunction(cb) {
    cb(undefined)
  }

  _getDefaultData() {
    return undefined
  }

  _getFromStorage() {
    return wx.getStorageSync(this._storageKey)
  }

  /**
   * 如果未从网络获取过数据，则调用_fetch获取网络数据
   * 如果有已经在请求数据，但是还没有返回，则加入回调队列中
   * 如果在本次小程序生命周期内已经请求过数据且不是每次都要获取(_fetchEveryTime)，则不再调用
   */
  _getFromNetwork(callback) {
    if (!this._fetched || this._fetchEveryTime) {
      this._cbs.push(callback)
      if (!this._fetching) {
        this._fetching = true
        this._fetch(data => {
          this.setData(data)
          this._fetching = false
          this._fetched = true
          this._cbs.forEach(cb => cb(data))
          this._cbs = []
        })
      }
    }
  }

  /**
   * getData 会调一次或两次cb
   * 第一次是同步检查内存、storage，default，undefined，作为回调数据
   * 第二次是异步请求网络数据，返回后写入内存,之后的getData操作就不再调用网络接口
   * this._onlyFetchNoLocalData 只有在没有本地数据的时候才会发网络请求，以减少网络请求数。用于对数据实时性要求不高或者session这类特殊接口
   */
  getData(cb) {
    if (!this._onlyFetchNoLocalData) {
      this._getFromNetwork(cb)
    }

    if (this._data) {
      cb(this._data)
      return
    }

    const storageData = this._getFromStorage()
    if (storageData) {
      cb(storageData)
      return
    }

    if (!this._onlyFetchNoLocalData) {
      this._getFromStorage(cb)
      return
    }

    const defaultData = this._getDefaultData()
    if (defaultData) {
      cb(defaultData)
      return
    }

    cb(undefined)
  }

  setData(data) {
    this._data = data
    wx.setStorage({
      key: this._storageKey,
      data,
    })
  }
}
