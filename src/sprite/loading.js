import Sprite from './sprite'
import {
  alphaColor
} from 'utils'

export default class Loading extends Sprite {
  _args = [{
    key: 'number',
    value: 10,
  }, {
    key: 'fillStyle',
    value: '#000000',
    draw: true,
  }, {
    key: 'R',
    value: 1,
    draw: true,
  }, {
    key: 'r',
    value: 0.1,
    draw: true
  }]
  constructor() {
    super()
    this._setArguments(arguments)
    this.pivotX = this.width / 2
    this.pivotY = this.height / 2
    this.x += this.width / 2
    this.y += this.height / 2
    this.draw()

    this.playOnce({
      keyFrames: [{
        rotation: 0,
      }, {
        rotation: 360,
      }],
      duration: 2000,
      iterationCount: 'infinite',
    })
  }

  draw() {
    this.graphics.clear()
    const degree = 360 / this._number
    const R = this._R * this.width
    const r = this._r * this.width
    for (let i = 0; i < this._number; i ++) {
      const x = Math.cos((i * degree) / 180 * Math.PI) * R + this.pivotX
      const y = -Math.sin((i * degree) / 180 * Math.PI) * R + this.pivotY
      const color = alphaColor(this._fillStyle, 0.5 + 0.5 * (i + 1) / this._number)
      const radius = r + r * (i + 1) / this._number
      this.graphics.drawCircle(x, y, radius, color)
    }
  }
}
