import AssetsLoader from 'utils/assetsLoader'
import Sprite from './sprite'

export default class Texture extends Sprite {
  _args = [{
    key: 'texture',
    draw: true
  }, {
    key: 'mask',
    // circleMask
    draw: true
  }]

  constructor() {
    super()

    this._setArguments(arguments)
    this.draw()
  }

  _getTexture() {
    if (typeof this._texture === 'string' && this._texture.length < 1024) {
      if (this._texture.indexOf('http') !== -1) {
        Laya.loader.load(this._texture, Laya.Handler.create(this, tex => {
          this._texture = tex
          this.draw()
        }))
        // AssetsLoader.load(this._texture, this._texture, assets => {
          // this._texture = assets
          // this.draw()
        // })
        return false
      } else {
        const left = this._texture.indexOf('[')
        if (left === -1) {
          this._texture = AssetsLoader[this._texture]
        } else {
          const right = this._texture.indexOf(']')
          const key = this._texture.substr(0, left)
          const index = Number(this._texture.substr(left + 1, right - left - 1))
          this._texture = AssetsLoader[key][index]
        }
      }
    }
    return true
  }

  draw() {
    if (this._getTexture()) {
      this.graphics.clear()
      this.graphics.drawTexture(this._texture, 0, 0, this.width, this.height, undefined, undefined, this._mask)
      // console.log(this._texture, 0, 0, this.width, this.height, undefined, undefined, this._mask)
    }
  }
}
