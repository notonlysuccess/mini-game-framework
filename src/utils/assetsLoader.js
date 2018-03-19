import assetConfig from 'config/assets'

export default class AssetsLoader {
  static cbs = {}
  static _temp = {}
  static _loaded = false
  static _assets = {}
  static load(key, res, cb) {
    wx.downloadFile({
      url: res,
      success(r) {
        const path = r.tempFilePath
        Laya.loader.load([path], Laya.Handler.create(this, () => {
          if (!this.assets) {
            this._temp[key] = Laya.loader.getRes(path)
          } else {
            this.assets[key] = Laya.loader.getRes(path)
          }
          if (this.cbs[key]) {
            this.cbs[key]()
          }
          cb && cb()
        }))
      },
      fail(err) {
        console.error(err)
      }
    })
  }

  static loaded(key, cb) {
    if (this[key]) {
      cb()
    } else {
      this.cbs[key] = cb
    }
  }

  static init(cb) {
    if (this._loaded) {
      cb()
      return
    }

    const assetSrc = []

    for (const name in assetConfig) {
      const res = assetConfig[name]
      if (typeof res === 'string') {
        assetSrc.push(res)
      } else {
        for (let i = 0; i < res.NUMBER; ++i) {
          assetSrc.push(`${res.PATH}${i}.${res.EXT}`)
        }
      }
    }

    Laya.loader.load(assetSrc, Laya.Handler.create(this, () => {
      const assets = {}

      // assets.tap = Laya.loader.getRes(config.UI_RES.TAP)
      for (const k in assetConfig) {
        const res = assetConfig[k]
        const name = parseUnderlineToCamelCase(k)
        if (typeof res === 'string') {
          assets[name] = Laya.loader.getRes(res)
        } else {
          assets[name] = []
          for (let i = 0; i < res.NUMBER; ++i) {
            assets[name].push(Laya.loader.getRes(`${res.PATH}${i}.${res.EXT}`))
          }
        }
      }

      Object.assign(assets, this._temp)

      this._assets = assets

      for (const name in assets) {
        this[name] = assets[name]
      }
      for (const name in this._temp) {
        this[name] = this._temp[name]
      }
      this._loaded = true
      cb()
    }))
  }
}

function parseUnderlineToCamelCase(word) {
  return word.toLowerCase().split('_').reduce((result, cur) => {
    return result + (cur[0].toUpperCase() + cur.slice(1))
  })
}
