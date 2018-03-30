import Sprite from './sprite'

export default class Rect extends Sprite {
  _args = [{
    key: 'radius',
    value: 0,
    draw: true
  }, {
    key: 'fillStyle',
    draw: true,
  }, {
    key: 'strokeStyle',
    draw: true,
  }, {
    key: 'lineWidth',
    draw: true
  }, {
    key: 'corners',
    draw: true,
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
    if (this._corners === undefined) {
      if (this._radius === undefined) {
        this._corners = 0
      } else {
        this._corners = 15
      }
    }
    this.draw()
  }

  draw() {
    this.graphics.clear()
    if (this._shadowRatioX || this._shadowRatioY) {
      this._drawRect(this._shadowRatioX * this.width, this._shadowRatioY * this.height, this.width, this.height, this._radius, this._shadowStyle)
    }
    this._drawRect(0, 0, this.width, this.height, this._radius, this._fillStyle, this._strokeStyle, this._lineWidth)
  }

  _drawRect(x, y, width, height, radius, fillStyle, strokeStyle, lineWidth) {
    const pathes = []
    if (this._corners & 1) {
      pathes.push(
        ['moveTo', 0, radius],
        ['arcTo', 0, 0, radius, 0, radius]
      )
    } else {
      pathes.push(['moveTo', 0, 0])
    }
    if (this._corners & 2) {
      pathes.push(
        ['lineTo', width - radius, 0],
        ['arcTo', width, 0, width, radius, radius],
      )
    } else {
      pathes.push(['lineTo', width, 0])
    }
    if (this._corners & 4) {
      pathes.push(
        ['lineTo', width, height - radius],
        ['arcTo', width, height, width - radius, height, radius],
      )
    } else {
      pathes.push(['lineTo', width, height])
    }
    if (this._corners & 8) {
      pathes.push(
        ['lineTo', radius, height],
        ['arcTo', 0, height, 0, height - radius, radius],
      )
    } else {
      pathes.push(['lineTo', 0, height])
    }
    pathes.push(['closePath'])
    let brush, pen
    if (fillStyle) {
      brush = {
        fillStyle
      }
    }
    if (strokeStyle || lineWidth) {
      pen = {}
      strokeStyle && (pen.strokeStyle = strokeStyle)
      lineWidth && (pen.lineWidth = lineWidth)
    }

    this.graphics.drawPath(x, y, pathes, brush, pen)
  }
}
