import AssetsLoader from 'utils/assetsLoader'
import Sprite from './sprite'

export default class Texture extends Sprite {
  _args = [{
    key: 'texture',
    draw: true
  }, {
    key: 'mask',
    draw: true
  }]

  constructor() {
    super()

    this._setArguments(arguments)
    if (typeof this._texture === 'string') {
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
    this.draw()
  }

  draw() {
    this.graphics.clear()
    this.graphics.drawTexture(this._texture, 0, 0, this.width, this.height, undefined, undefined, this._mask)
  }
}
