import Sprite from './sprite'

export default class Circle extends Sprite {
  _args = [{
    key: 'brush',
    draw: true,
    value: {
      fillStyle: '#FFFFFF'
    }
  }, {
    key: 'pen',
    draw: true
  }]

  constructor() {
    super()

    this._setArguments(arguments)
    this.draw()
  }

  draw() {
    this.graphics.clear()

    const radius = Math.min(this.width, this.height) / 2
    const fillStyle = this._brush.fillStyle
    const strokeStyle = this._pen ? this._pen.strokeStyle : undefined
    const lineWidth = this._pen ? this._pen.lineWidth : undefined
    this.graphics.drawCircle(this.width / 2, this.height / 2, radius, fillStyle, strokeStyle, lineWidth)
  }
}
