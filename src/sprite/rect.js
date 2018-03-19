import Sprite from './sprite'

export default class Rect extends Sprite {
  _args = [{
    key: 'radius',
    value: 0,
    draw: true
  }, {
    key: 'brush',
    draw: true,
    value: {
      fillStyle: '#FFFFFF'
    }
  }, {
    key: 'pen',
    draw: true
  }, {
    key: 'corners',
    draw: true,
  }, {
    key: 'shadow',
    draw: true
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

    const pathes = []
    const radius = this._radius
    const width = this.width
    const height = this.height

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
    this.graphics.drawPath(0, 0, pathes, this._brush, this._pen, this._shadow)
  }
}
