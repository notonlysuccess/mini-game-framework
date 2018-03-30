import Sprite from './sprite'

export default class Circle extends Sprite {
  _args = [{
    key: 'radiusRatio',
    value: 1,
    draw: true
  }, {
    key: 'fillStyle',
    draw: true,
    value: '#FFFFFF',
  }, {
    key: 'strokeStyle',
    draw: true,
  }, {
    key: 'lineWidth',
    draw: true
  }, {
    key: 'shadowRatioX',
    draw: true,
    value: 0
  }, {
    key: 'shadowRatioY',
    draw: true,
    value: 0
  }, {
    key: 'shadowStyle',
    draw: true,
    value: '#FFFFFF'
  }]

  constructor() {
    super()

    this._setArguments(arguments)
    this.draw()
  }

  draw() {
    this.graphics.clear()

    const x = this.width / 2,
          y = this.height / 2

    const radius = Math.min(x, y) * this._radiusRatio

    if (this._shadowRatioX || this._shadowRatioY) {
      this.graphics.drawCircle(this._shadowRatioX * radius + x, this._shadowRatioY * radius + y, radius, this._shadowStyle)
    }

    this.graphics.drawCircle(x, y, radius, this._fillStyle, this._strokeStyle, this._lineWidth)
  }

  // { x, y, radius, fillStyle, strokeStyle, lineWidth } = arguments
  // drawCircle() {
  //   this.graphics.drawCircle(...arguments)
  // }
}
