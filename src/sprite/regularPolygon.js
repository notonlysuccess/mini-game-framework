import Sprite from './sprite'

export default class RegularPolygon extends Sprite {
  _args = [{
    key: 'sides',
    value: 6,
    draw: true,
  }, {
    key: 'radius',
    value: 0,
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

    if (this._shadowRatioX || this._shadowRatioY) {
      this._drawRegularPolygon(this._shadowRatioX * this.width, this._shadowRatioY * this.height, this.width, this.height, this._sides, this._radius, this._shadowStyle)
    }
    this._drawRegularPolygon(0, 0, this.width, this.height, this._sides, this._radius, this._fillStyle, this._strokeStyle, this._lineWidth)
  }

  _drawRegularPolygon(x, y, width, height, sides, radius, fillStyle, strokeStyle, lineWidth) {
    const pathes = []
    const R = Math.min(width / 2, height / 1.73)
    radius = radius / 1.732 * 2
    const r = R - radius

    const centerX = width / 2
    const centerY = height / 2
    const degree = 360 / sides
    for (let i = 0; i < 6; i ++) {
      const x = Math.cos((i * degree) / 180 * Math.PI) * R + centerX
      const y = -Math.sin((i * degree) / 180 * Math.PI) * R + centerY
      const xx = Math.cos((i * degree) / 180 * Math.PI) * r + centerX
      const yy = -Math.sin((i * degree) / 180 * Math.PI) * r + centerY
      const x1 = Math.cos((i * degree - 30) / 180 * Math.PI) * radius + xx
      const y1 = -Math.sin((i * degree - 30) / 180 * Math.PI) * radius + yy
      const x2 = Math.cos((i * degree + 30) / 180 * Math.PI) * radius + xx
      const y2 = -Math.sin((i * degree + 30) / 180 * Math.PI) * radius + yy
      pathes.push([i === 0 ? 'moveTo' : 'lineTo', x1, y1])
      // pathes.push(['lineTo', x1, y1])
      pathes.push(['arcTo', x, y, x2, y2, radius])
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
